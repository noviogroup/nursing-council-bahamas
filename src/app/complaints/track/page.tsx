'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, FileMagnifyingGlass as FileSearch, WarningCircle } from '@phosphor-icons/react/dist/ssr';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { formatComplaintDate } from '@/lib/complaints';
import { getSupabaseClient, hasSupabaseConfig } from '@/lib/supabase';

type TimelineItem = {
  status: string;
  label: string;
  note?: string | null;
  createdAt: string;
};

type TrackingResult = {
  reference_number: string;
  submitted_at: string | null;
  status: string;
  public_label: string;
  public_description: string | null;
  public_status_note: string | null;
  timeline: TimelineItem[] | null;
  information_requested: boolean;
  information_requests: {
    request_id: string;
    public_message: string;
    due_at: string | null;
    expires_at: string | null;
    response_received_at: string | null;
  }[];
  partial: boolean;
};

function textValue(value: unknown): string | null {
  return typeof value === 'string' && value.trim() ? value : null;
}

function dateValue(value: unknown): string | null {
  return typeof value === 'string' && !Number.isNaN(Date.parse(value)) ? value : null;
}

function readTrackingResult(value: unknown): TrackingResult | null {
  if (!value || typeof value !== 'object') return null;
  const row = value as Record<string, unknown>;
  const reference = textValue(row.reference_number);
  if (!reference) return null;
  let partial = false;
  const timeline: TimelineItem[] | null = Array.isArray(row.timeline)
    ? row.timeline.flatMap((item: unknown) => {
      if (!item || typeof item !== 'object') { partial = true; return []; }
      const entry = item as Record<string, unknown>;
      const label = textValue(entry.label);
      const createdAt = dateValue(entry.createdAt);
      if (!label || !createdAt) { partial = true; return []; }
      return [{ status: textValue(entry.status) || '', label, createdAt, note: textValue(entry.note) }];
    })
    : null;
  const submittedAt = dateValue(row.submitted_at);
  const publicLabel = textValue(row.public_label);
  const description = textValue(row.public_description);
  const informationRequests = Array.isArray(row.information_requests)
    ? row.information_requests.flatMap((item: unknown) => {
      if (!item || typeof item !== 'object') { partial = true; return []; }
      const entry = item as Record<string, unknown>;
      const requestId = textValue(entry.request_id);
      const publicMessage = textValue(entry.public_message);
      if (!requestId || !publicMessage) { partial = true; return []; }
      if ((entry.due_at != null && !dateValue(entry.due_at)) || (entry.expires_at != null && !dateValue(entry.expires_at))) partial = true;
      return [{ request_id: requestId, public_message: publicMessage, due_at: dateValue(entry.due_at), expires_at: dateValue(entry.expires_at), response_received_at: dateValue(entry.response_received_at) }];
    })
    : [];
  return {
    reference_number: reference,
    submitted_at: submittedAt,
    status: textValue(row.status) || '',
    public_label: publicLabel || 'Status update unavailable',
    public_description: description,
    public_status_note: textValue(row.public_status_note),
    timeline,
    information_requested: typeof row.action_required === 'boolean' ? row.action_required : row.information_requested === true || row.status === 'awaiting_documents' || row.status === 'pending_response',
    information_requests: informationRequests,
    partial: partial || !submittedAt || !publicLabel || !description || timeline === null,
  };
}

export default function ComplaintTrackPage() {
  const [referenceNumber, setReferenceNumber] = useState('');
  const [email, setEmail] = useState('');
  const [result, setResult] = useState<TrackingResult | null>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [announcement, setAnnouncement] = useState('');
  const inFlight = useRef(false);
  const activeRequest = useRef<AbortController | null>(null);
  const resultHeading = useRef<HTMLHeadingElement>(null);
  const errorPanel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ref = new URLSearchParams(window.location.search).get('ref');
    if (ref) setReferenceNumber(ref.toUpperCase());
    return () => activeRequest.current?.abort();
  }, []);

  useEffect(() => {
    if (error) errorPanel.current?.focus();
    else if (result) resultHeading.current?.focus();
  }, [error, result]);

  const trackComplaint = async (event: React.FormEvent) => {
    event.preventDefault();
    if (inFlight.current) return;
    setError('');
    setResult(null);
    setAnnouncement('');

    if (!hasSupabaseConfig()) {
      setError('Tracking is not available right now. Please call the Council on (242) 604-6015.');
      return;
    }

    inFlight.current = true;
    setIsLoading(true);
    setAnnouncement('Checking your complaint status…');
    const controller = new AbortController();
    activeRequest.current = controller;
    const timeout = window.setTimeout(() => controller.abort(), 20000);
    try {
      const followupEnabled = process.env.NEXT_PUBLIC_COMPLAINT_FOLLOWUP_ENABLED === 'true';
      const { data, error: trackError } = await getSupabaseClient().rpc(followupEnabled ? 'track_complaint_v2' : 'track_complaint', {
        p_reference_number: referenceNumber.trim().toUpperCase(),
        p_contact_email: email.trim(),
      }).abortSignal(controller.signal);
      if (trackError) throw new Error('Tracking unavailable');
      if (!followupEnabled && !Array.isArray(data)) throw new Error('Unexpected tracking result');
      const row = followupEnabled ? data : data[0];
      if (!row) {
        setError('We could not find a complaint with that tracking number and email address. Check both and try again.');
        return;
      }
      const nextResult = readTrackingResult(row);
      if (!nextResult) throw new Error('Incomplete tracking result');
      setResult(nextResult);
      setAnnouncement(nextResult.partial ? 'Complaint found. Some details could not be displayed.' : 'Complaint status found.');
    } catch {
      setError('We could not check your complaint status. Your details are still here. Please try again, or call the Council on (242) 604-6015.');
    } finally {
      window.clearTimeout(timeout);
      activeRequest.current = null;
      inFlight.current = false;
      setIsLoading(false);
      setAnnouncement((current) => current === 'Checking your complaint status…' ? '' : current);
    }
  };

  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="bg-council-primary py-16 text-white lg:py-20">
          <div className="container mx-auto max-w-4xl px-4">
            <h1 className="font-heading text-4xl font-bold leading-tight md:text-6xl">Track a complaint</h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/85 md:text-xl">
              Enter your tracking number and the email address you used when you submitted your complaint.
            </p>
          </div>
        </section>

        <section className="bg-gray-50 py-12 lg:py-16">
          <div className="container mx-auto grid max-w-6xl gap-8 px-4 lg:grid-cols-[0.42fr_0.58fr]">
            <form onSubmit={trackComplaint} className="min-w-0 rounded-lg border border-slate-200 bg-white p-5 sm:p-7" aria-busy={isLoading}>
              <FileSearch className="mb-6 h-9 w-9 text-council-primary" aria-hidden="true" />
              <label htmlFor="tracking-number" className="block text-sm font-medium text-gray-700">Tracking number</label>
              <Input id="tracking-number" required disabled={isLoading} maxLength={100} value={referenceNumber} onChange={(event) => setReferenceNumber(event.target.value.toUpperCase())} placeholder="NC-2026-00001" autoComplete="off" autoCapitalize="characters" spellCheck={false} className="mt-2 min-h-12 rounded-[8px]" />
              <label htmlFor="tracking-email" className="mt-5 block text-sm font-medium text-gray-700">Email address you used</label>
              <Input id="tracking-email" required disabled={isLoading} type="email" maxLength={254} value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" autoCapitalize="none" spellCheck={false} className="mt-2 min-h-12 rounded-[8px]" />
              <Button type="submit" disabled={isLoading} className="mt-6 min-h-12 w-full rounded-[8px] bg-council-primary hover:bg-council-secondary">
                {isLoading ? 'Checking…' : 'Check status'}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
              <p className="mt-5 text-sm leading-relaxed text-gray-500">
                You see the status and updates the Council shares with you. Staff notes and internal records are not shown here.
              </p>
            </form>

            <div className="min-w-0 rounded-lg border border-slate-200 bg-white p-5 sm:p-7" aria-busy={isLoading}>
              <p className="sr-only" role="status" aria-live="polite">{announcement}</p>
              {error && (
                <div ref={errorPanel} tabIndex={-1} role="alert" className="flex gap-3 rounded border-l-4 border-council-alert bg-red-50 p-4 text-sm text-red-900 focus:outline focus:outline-2 focus:outline-offset-4 focus:outline-council-primary">
                  <WarningCircle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
                  <p>{error}</p>
                </div>
              )}

              {!result && !error && (
                <div className="flex min-h-48 items-center justify-center rounded bg-gray-50 p-6 text-center text-gray-600">
                  {isLoading ? 'Checking your complaint status…' : 'Your complaint’s status will appear here.'}
                </div>
              )}

              {result && (
                <article>
                  <p className="text-sm font-semibold text-gray-500">Tracking number <span className="break-words font-mono text-council-dark">{result.reference_number}</span></p>
                  <h2 ref={resultHeading} tabIndex={-1} className="font-heading mt-2 rounded text-3xl font-bold text-council-dark focus:outline focus:outline-2 focus:outline-offset-4 focus:outline-council-primary">{result.public_label}</h2>
                  {result.partial && <p className="mt-4 rounded border border-amber-200 bg-amber-50 p-3 text-sm text-amber-900">Some details could not be displayed. You can check again using the form, or contact the Council.</p>}
                  {result.public_description && <p className="mt-4 whitespace-pre-wrap break-words text-lg leading-relaxed text-gray-600">{result.public_description}</p>}
                  {result.public_status_note && <p className="mt-5 whitespace-pre-wrap break-words border-l-4 border-council-accent bg-yellow-50 p-4 text-gray-700">{result.public_status_note}</p>}
                  {result.submitted_at && <p className="mt-5 text-sm text-gray-600">Submitted {formatComplaintDate(result.submitted_at)}</p>}
                  {result.information_requested && (
                    <section className="mt-5 rounded-lg border border-amber-200 bg-amber-50 p-4" aria-labelledby="requested-information-heading">
                      <h3 id="requested-information-heading" className="font-heading text-lg font-bold text-council-dark">Information needed from you</h3>
                      {result.information_requests.filter((item) => !item.response_received_at).length > 0 ? (
                        <ul className="mt-3 space-y-4">
                          {result.information_requests.filter((item) => !item.response_received_at).map((item) => (
                            <li key={item.request_id}>
                              <p className="whitespace-pre-wrap break-words text-sm leading-relaxed text-gray-700">{item.public_message}</p>
                              {item.due_at && <p className="mt-2 text-sm font-semibold text-council-dark">Requested by {formatComplaintDate(item.due_at)}</p>}
                              {item.expires_at && Date.parse(item.expires_at) <= Date.now() && <p className="mt-2 text-sm text-amber-900">This request’s secure link has expired. Contact the Council for a replacement link.</p>}
                            </li>
                          ))}
                        </ul>
                      ) : <p className="mt-2 text-sm leading-relaxed text-gray-700">The Council has asked for more information about your complaint.</p>}
                      <p className="mt-3 text-sm leading-relaxed text-gray-700">
                        {process.env.NEXT_PUBLIC_COMPLAINT_FOLLOWUP_ENABLED === 'true'
                          ? 'Use the secure response link supplied by the Council to send information or documents. If you do not have a working link, contact the Council.'
                          : 'Check the Council’s message for instructions on providing the information, or contact the Council for help.'}
                      </p>
                      <Link href="/contact" className="mt-2 inline-flex min-h-11 items-center rounded-sm text-sm font-semibold text-council-primary underline-offset-4 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-council-primary">Contact the Council <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" /></Link>
                    </section>
                  )}
                  <div className="mt-7">
                    <h3 className="font-heading mb-3 text-xl font-bold text-council-dark">History</h3>
                    {result.timeline === null ? (
                      <p className="text-sm leading-relaxed text-gray-600">History could not be displayed. Please check again or contact the Council.</p>
                    ) : result.timeline.length === 0 ? (
                      <p className="text-sm leading-relaxed text-gray-600">There are no public history entries to show yet.</p>
                    ) : (
                      <ol className="space-y-3">
                        {result.timeline.map((item, index) => (
                          <li key={`${item.status}-${item.createdAt}-${index}`} className="border-l-2 border-council-primary bg-gray-50 p-4">
                            <p className="font-semibold text-council-dark">{item.label}</p>
                            <p className="text-sm text-gray-500">{formatComplaintDate(item.createdAt)}</p>
                            {item.note && <p className="mt-2 whitespace-pre-wrap break-words text-sm text-gray-600">{item.note}</p>}
                          </li>
                        ))}
                      </ol>
                    )}
                  </div>
                </article>
              )}
            </div>
          </div>
          <div className="container mx-auto mt-8 px-4 text-center">
            <Link href="/complaints/new" className="inline-flex min-h-11 items-center rounded-sm font-semibold text-council-primary hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-council-primary">Need to submit a new complaint?</Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
