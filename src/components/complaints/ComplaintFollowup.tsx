'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle, FileText, LockKey, WarningCircle, X } from '@phosphor-icons/react/dist/ssr';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { formatComplaintDate } from '@/lib/complaints';
import {
  followupFileType,
  followupRpcStatus,
  pendingFollowupUploads,
  prepareFollowupPayload,
  readFollowupReceipt,
  readFollowupRequest,
  type FollowupPayload,
  type FollowupReceipt,
  type FollowupRequest,
} from '@/lib/complaint-followup';
import { getSupabaseClient, hasSupabaseConfig } from '@/lib/supabase';

const maxFiles = 10;
const maxFileBytes = 10 * 1024 * 1024;
const maxMessageLength = 20000;
const focusClass = 'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-council-primary';

type Attachment = {
  uploadId: string;
  file: File;
  status: 'ready' | 'uploading' | 'uploaded' | 'error';
  attachmentId?: string;
};
type PageState = 'loading' | 'ready' | 'received' | 'unavailable' | 'invalid' | 'expired' | 'used';

class FollowupError extends Error {
  constructor(public status: number) { super('Follow-up request failed'); }
}

export default function ComplaintFollowup({ token, enabled = process.env.NEXT_PUBLIC_COMPLAINT_FOLLOWUP_ENABLED === 'true' }: { token: string; enabled?: boolean }) {
  const [pageState, setPageState] = useState<PageState>('loading');
  const [request, setRequest] = useState<FollowupRequest | null>(null);
  const [receipt, setReceipt] = useState<FollowupReceipt | null>(null);
  const [message, setMessage] = useState('');
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [error, setError] = useState('');
  const [announcement, setAnnouncement] = useState('');
  const [busy, setBusy] = useState(false);
  const [frozen, setFrozen] = useState(false);
  const attachmentsRef = useRef<Attachment[]>([]);
  const payloadRef = useRef<FollowupPayload | null>(null);
  const attemptIdRef = useRef<string | null>(null);
  const inFlight = useRef(false);
  const controllerRef = useRef<AbortController | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const errorRef = useRef<HTMLDivElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const updateAttachments = (next: Attachment[]) => {
    attachmentsRef.current = next;
    setAttachments(next);
  };

  const loadRequest = useCallback(async () => {
    if (!enabled) return;
    if (!hasSupabaseConfig()) { setPageState('unavailable'); return; }
    setPageState('loading');
    setError('');
    const controller = new AbortController();
    controllerRef.current?.abort();
    controllerRef.current = controller;
    const timeout = window.setTimeout(() => controller.abort(), 20000);
    try {
      const { data, error: readError, status } = await getSupabaseClient()
        .rpc('get_complaint_followup_v1', { p_token: token }).abortSignal(controller.signal);
      if (readError) throw new FollowupError(followupRpcStatus(status, readError.code));
      const nextRequest = readFollowupRequest(data);
      if (!nextRequest) throw new FollowupError(data === null ? 404 : 503);
      setRequest(nextRequest);
      if (nextRequest.response_received_at) {
        setReceipt({ receipt_id: nextRequest.receipt_id, reference_number: nextRequest.reference_number, received_at: nextRequest.response_received_at });
        setPageState('received');
      } else if (Date.parse(nextRequest.expires_at) <= Date.now()) {
        setPageState('expired');
      } else {
        setPageState('ready');
      }
    } catch (cause) {
      if (controllerRef.current !== controller) return;
      const status = cause instanceof FollowupError ? cause.status : 0;
      setPageState(status === 404 ? 'invalid' : status === 409 ? 'used' : 'unavailable');
    } finally {
      window.clearTimeout(timeout);
      if (controllerRef.current === controller) controllerRef.current = null;
    }
  }, [token, enabled]);

  useEffect(() => {
    void loadRequest();
    return () => controllerRef.current?.abort();
  }, [loadRequest]);

  useEffect(() => {
    if (error) errorRef.current?.focus();
  }, [error]);

  useEffect(() => {
    if (pageState !== 'loading') headingRef.current?.focus();
  }, [pageState]);

  useEffect(() => {
    if (!request || pageState !== 'ready' || busy) return;
    const remaining = Date.parse(request.expires_at) - Date.now();
    const timer = window.setTimeout(() => {
      if (Date.parse(request.expires_at) <= Date.now()) setPageState('expired');
    }, Math.min(Math.max(remaining, 0), 2147483647));
    return () => window.clearTimeout(timer);
  }, [request, pageState, busy]);

  const addFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
    const incoming = Array.from(event.target.files || []);
    event.target.value = '';
    if (!incoming.length || busy || frozen) return;
    setError('');
    if (attachmentsRef.current.length + incoming.length > maxFiles) {
      setError('You can include up to 10 documents. Remove a document before adding another.');
      return;
    }
    for (const file of incoming) {
      if (!followupFileType(file.name, file.type)) {
        setError('Choose PDF, JPG, PNG, DOC or DOCX documents. Your other selected documents are still here.');
        return;
      }
      if (file.size === 0 || file.size > maxFileBytes) {
        setError('Each document must contain data and be no larger than 10 MB. Your other selected documents are still here.');
        return;
      }
    }
    const unique = incoming.filter((file) => !attachmentsRef.current.some((item) => item.file.name === file.name && item.file.size === file.size && item.file.lastModified === file.lastModified));
    updateAttachments([...attachmentsRef.current, ...unique.map((file) => ({ uploadId: crypto.randomUUID(), file, status: 'ready' as const }))]);
    setAnnouncement(`${unique.length} document${unique.length === 1 ? '' : 's'} selected.`);
  };

  const uploadAttachment = async (item: Attachment) => {
    const body = new FormData();
    body.append('token', token);
    body.append('upload_id', item.uploadId);
    const mimeType = followupFileType(item.file.name, item.file.type);
    if (!mimeType) throw new FollowupError(400);
    body.append('file', item.file.type ? item.file : new File([item.file], item.file.name, { type: mimeType, lastModified: item.file.lastModified }));
    const controller = new AbortController();
    controllerRef.current = controller;
    const timeout = window.setTimeout(() => controller.abort(), 60000);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL!.replace(/\/$/, '')}/functions/v1/complaint-followup-upload`, {
        method: 'POST',
        headers: { apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!}` },
        body,
        signal: controller.signal,
        referrerPolicy: 'no-referrer',
        cache: 'no-store',
      });
      if (!response.ok) throw new FollowupError(response.status);
      const data: unknown = await response.json();
      if (!data || typeof data !== 'object' || !('attachment_id' in data) || typeof data.attachment_id !== 'string') throw new FollowupError(503);
      return data.attachment_id;
    } finally {
      window.clearTimeout(timeout);
      if (controllerRef.current === controller) controllerRef.current = null;
    }
  };

  const submitResponse = async (event: React.FormEvent) => {
    event.preventDefault();
    if (inFlight.current || !request || !enabled || pageState !== 'ready') return;
    setError('');
    if (Date.parse(request.expires_at) <= Date.now()) { setPageState('expired'); return; }
    if (!message.trim() && attachmentsRef.current.length === 0) {
      setError('Write a response or select a document before submitting.');
      messageRef.current?.focus();
      return;
    }
    if (!hasSupabaseConfig()) { setError('Secure responses are not available right now. Your response is still here. Please try again later.'); return; }
    inFlight.current = true;
    setBusy(true);
    attemptIdRef.current ||= crypto.randomUUID();
    let responseAttempted = false;
    try {
      for (const item of pendingFollowupUploads(attachmentsRef.current)) {
        updateAttachments(attachmentsRef.current.map((entry) => entry.uploadId === item.uploadId ? { ...entry, status: 'uploading' } : entry));
        setAnnouncement(`Uploading document ${attachmentsRef.current.findIndex((entry) => entry.uploadId === item.uploadId) + 1} of ${attachmentsRef.current.length}…`);
        try {
          const attachmentId = await uploadAttachment(item);
          updateAttachments(attachmentsRef.current.map((entry) => entry.uploadId === item.uploadId ? { ...entry, attachmentId, status: 'uploaded' } : entry));
        } catch (cause) {
          updateAttachments(attachmentsRef.current.map((entry) => entry.uploadId === item.uploadId ? { ...entry, status: 'error' } : entry));
          throw cause;
        }
      }
      payloadRef.current = prepareFollowupPayload(payloadRef.current, attemptIdRef.current, message, attachmentsRef.current.map((item) => item.attachmentId!));
      setFrozen(true);
      responseAttempted = true;
      setAnnouncement('Recording your response…');
      const controller = new AbortController();
      controllerRef.current = controller;
      const timeout = window.setTimeout(() => controller.abort(), 30000);
      try {
        const payload = payloadRef.current;
        const { data, error: submitError, status } = await getSupabaseClient().rpc('submit_complaint_followup_v1', {
          p_token: token,
          p_request_id: payload.requestId,
          p_message: payload.message,
          p_attachment_ids: payload.attachmentIds,
        }).abortSignal(controller.signal);
        if (submitError) throw new FollowupError(followupRpcStatus(status, submitError.code));
        const nextReceipt = readFollowupReceipt(data);
        if (!nextReceipt) throw new FollowupError(503);
        setReceipt(nextReceipt);
        setPageState('received');
        setMessage('');
        updateAttachments([]);
        setAnnouncement('Your response has been recorded.');
      } finally {
        window.clearTimeout(timeout);
        if (controllerRef.current === controller) controllerRef.current = null;
      }
    } catch (cause) {
      const status = cause instanceof FollowupError ? cause.status : 0;
      if (status === 404) {
        setPageState('invalid');
      } else if (status === 409) {
        await loadRequest();
      } else {
        if (status === 400 && responseAttempted) {
          // A rejected validation request was not recorded. Keep its stable ID
          // while allowing the person to correct the rejected content.
          payloadRef.current = null;
          setFrozen(false);
        }
        setError(responseAttempted && status !== 400
          ? 'We could not confirm receipt. Your response is kept on this page. Retry to send the same response safely, or check for a receipt before leaving.'
          : status === 400
            ? 'The response or a document could not be accepted. Review your message and selected documents, then try again. Your work is still here.'
            : 'A document could not be uploaded. Your response and completed uploads are still here. Try again, or remove the document that failed.');
      }
      setAnnouncement('');
    } finally {
      inFlight.current = false;
      setBusy(false);
    }
  };

  const helpLinks = (
    <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
      <Link href="/contact" className={`inline-flex min-h-11 items-center rounded-sm font-semibold text-council-primary hover:underline ${focusClass}`}>Contact the Council <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" /></Link>
      <Link href="/complaints/track" className={`inline-flex min-h-11 items-center rounded-sm text-council-primary hover:underline ${focusClass}`}>Track your complaint</Link>
    </div>
  );

  if (!enabled) return (
    <section className="rounded-lg border border-slate-200 bg-white p-6 sm:p-8">
      <h1 className="font-heading text-3xl font-bold text-council-dark">Secure responses are not available yet</h1>
      <p className="mt-4 leading-relaxed text-slate-600">Contact the Council for help responding to a request for information about your complaint.</p>
      {helpLinks}
    </section>
  );

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 sm:p-8" aria-busy={pageState === 'loading' || busy}>
      <p className="sr-only" role="status" aria-live="polite">{announcement || (pageState === 'loading' ? 'Checking your secure response link…' : '')}</p>
      {pageState === 'loading' ? (
        <><h1 className="font-heading text-3xl font-bold text-council-dark">Checking your secure link…</h1><p className="mt-4 text-slate-600">Please wait while we check the Council’s request.</p></>
      ) : pageState === 'received' && receipt ? (
        <>
          <CheckCircle className="mb-4 h-10 w-10 text-emerald-700" aria-hidden="true" />
          <h1 ref={headingRef} tabIndex={-1} className={`font-heading rounded-sm text-3xl font-bold text-council-dark ${focusClass}`}>Response received</h1>
          <p className="mt-4 leading-relaxed text-slate-600">A response was recorded for complaint <strong className="break-words text-council-dark">{receipt.reference_number}</strong> on {formatComplaintDate(receipt.received_at)}. It is attached to the existing complaint.</p>
          {receipt.receipt_id && <p className="mt-4 break-words text-sm text-slate-600">Response receipt: <span className="font-mono text-council-dark">{receipt.receipt_id}</span></p>}
          {receipt.attachment_count !== undefined && <p className="mt-2 text-sm text-slate-600">{receipt.attachment_count} document{receipt.attachment_count === 1 ? '' : 's'} included.</p>}
          <p className="mt-4 rounded bg-slate-50 p-4 text-sm leading-relaxed text-slate-600">
            {receipt.receipt_email_status === 'sent' ? 'A receipt email has been sent.'
              : receipt.receipt_email_status === 'queued' || receipt.receipt_email_status === 'processing' ? 'A receipt email is queued. This page confirms that your response was recorded.'
                : receipt.receipt_email_status === 'failed' ? 'The receipt email could not be sent. Your response is still recorded; keep the receipt shown here.'
                  : receipt.receipt_email_status === 'not_queued' ? 'No receipt email was queued. Keep this page’s receipt for your records.'
                    : 'Email delivery status is not available here. This page confirms that a response was recorded.'}
          </p>
          {helpLinks}
        </>
      ) : pageState !== 'ready' ? (
        <>
          <WarningCircle className="mb-4 h-9 w-9 text-council-primary" aria-hidden="true" />
          <h1 ref={headingRef} tabIndex={-1} className={`font-heading rounded-sm text-3xl font-bold text-council-dark ${focusClass}`}>
            {pageState === 'expired' ? 'This response link has expired' : pageState === 'used' ? 'This response link has already been used' : pageState === 'invalid' ? 'This response link is no longer available' : 'We could not open this request'}
          </h1>
          <p className="mt-4 leading-relaxed text-slate-600">
            {pageState === 'expired' || pageState === 'invalid'
              ? 'The link may have expired or been withdrawn. Contact the Council for help or a replacement link. We cannot accept a response through this link.'
              : pageState === 'used'
                ? 'A response has already been submitted using this link. Use the complaint tracker or contact the Council if you need to provide anything further.'
                : 'The service is temporarily unavailable. Please try again, or contact the Council for help.'}
          </p>
          {message && <div className="mt-5"><label htmlFor="unsent-response" className="block text-sm font-semibold text-council-dark">Your unsent response</label><p className="mt-1 text-sm text-slate-600">Copy this text before leaving. It is kept only on this page.</p><Textarea id="unsent-response" readOnly value={message} className="mt-2 min-h-40 rounded-lg" /></div>}
          {pageState === 'unavailable' && <Button type="button" onClick={() => void loadRequest()} className="mt-5 min-h-12 rounded-lg bg-council-primary hover:bg-council-secondary">Try again</Button>}
          {helpLinks}
        </>
      ) : request && (
        <>
          <LockKey className="mb-4 h-9 w-9 text-council-primary" aria-hidden="true" />
          <h1 ref={headingRef} tabIndex={-1} className={`font-heading rounded-sm text-3xl font-bold text-council-dark ${focusClass}`}>Respond to the Council</h1>
          <p className="mt-3 text-sm text-slate-600">Complaint <strong className="break-words font-mono text-council-dark">{request.reference_number}</strong></p>
          <div className="mt-6 rounded-lg border border-slate-200 bg-slate-50 p-4 sm:p-5">
            <h2 className="font-heading text-xl font-bold text-council-dark">Information requested</h2>
            <p className="mt-3 whitespace-pre-wrap break-words leading-relaxed text-slate-700">{request.public_message}</p>
            {request.due_at && <p className="mt-3 text-sm font-semibold text-council-dark">Requested by {formatComplaintDate(request.due_at)}</p>}
            <p className="mt-2 text-sm text-slate-600">This secure link expires {formatComplaintDate(request.expires_at)}. Keep it private.</p>
          </div>
          <form onSubmit={submitResponse} className="mt-7" aria-busy={busy}>
            {error && <div ref={errorRef} tabIndex={-1} role="alert" className="mb-6 rounded border-l-4 border-council-alert bg-red-50 p-4 text-sm leading-relaxed text-red-900 focus:outline focus:outline-2 focus:outline-offset-4 focus:outline-council-primary">{error}</div>}
            <label htmlFor="followup-message" className="block font-semibold text-council-dark">Your response</label>
            <p id="followup-message-help" className="mt-1 text-sm leading-relaxed text-slate-600">Write a response, add documents, or both. Include only information relevant to this request.</p>
            <Textarea id="followup-message" ref={messageRef} value={message} onChange={(event) => setMessage(event.target.value)} maxLength={maxMessageLength} readOnly={frozen} disabled={busy} aria-describedby="followup-message-help followup-retention" className="mt-3 min-h-48 rounded-lg" />
            <p className="mt-2 text-right text-xs text-slate-500">{message.length.toLocaleString()} / {maxMessageLength.toLocaleString()} characters</p>
            <fieldset disabled={busy || frozen} className="mt-6">
              <legend className="font-semibold text-council-dark">Documents <span className="font-normal text-slate-500">(optional)</span></legend>
              <p id="followup-files-help" className="mt-2 text-sm leading-relaxed text-slate-600">Up to 10 files, 10 MB each. PDF, JPG, PNG, DOC or DOCX. Documents upload when you submit.</p>
              <input type="file" multiple accept=".pdf,.jpg,.jpeg,.png,.doc,.docx" onChange={addFiles} aria-label="Choose documents" aria-describedby="followup-files-help" className={`mt-3 block min-h-12 w-full min-w-0 rounded-lg border border-slate-300 p-2 text-sm text-slate-600 file:mr-3 file:rounded file:border-0 file:bg-slate-100 file:px-3 file:py-2 file:font-semibold file:text-council-primary disabled:opacity-60 ${focusClass}`} />
              {attachments.length > 0 && <ul className="mt-4 space-y-2">
                {attachments.map((item) => <li key={item.uploadId} className="flex items-center gap-3 rounded-lg border border-slate-200 p-3">
                  <FileText className="h-6 w-6 shrink-0 text-council-primary" aria-hidden="true" />
                  <div className="min-w-0 flex-1"><p className="break-words text-sm font-medium text-council-dark">{item.file.name}</p><p className="mt-1 text-xs text-slate-600">{(item.file.size / (1024 * 1024)).toFixed(2)} MB · {item.status === 'uploaded' ? 'Uploaded, ready to include' : item.status === 'uploading' ? 'Uploading…' : item.status === 'error' ? 'Upload failed; retry or remove' : 'Ready to upload'}</p></div>
                  <button type="button" onClick={() => updateAttachments(attachmentsRef.current.filter((entry) => entry.uploadId !== item.uploadId))} aria-label={`Remove ${item.file.name}`} className={`flex h-11 w-11 shrink-0 items-center justify-center rounded text-slate-600 hover:bg-slate-100 disabled:opacity-50 ${focusClass}`}><X className="h-5 w-5" aria-hidden="true" /></button>
                </li>)}
              </ul>}
            </fieldset>
            <p id="followup-retention" className="mt-5 text-sm leading-relaxed text-slate-600">Your written response is kept only on this page until it is submitted. Keep this page open while sending. A confirmation appears only after the Council’s system records your response.</p>
            {frozen && <p className="mt-3 rounded bg-amber-50 p-3 text-sm leading-relaxed text-amber-900">The response is locked while receipt is uncertain, so a retry uses the same message and documents. You can also check whether it was received.</p>}
            <div className="mt-6 flex flex-wrap gap-3">
              <Button type="submit" disabled={busy} className="min-h-12 rounded-lg bg-council-primary hover:bg-council-secondary">{busy ? 'Sending response…' : frozen ? 'Retry response' : 'Submit response'} <ArrowRight className="h-4 w-4" aria-hidden="true" /></Button>
              {frozen && <Button type="button" variant="outline" disabled={busy} onClick={() => void loadRequest()} className="min-h-12 rounded-lg">Check for receipt</Button>}
            </div>
          </form>
          {helpLinks}
        </>
      )}
    </section>
  );
}
