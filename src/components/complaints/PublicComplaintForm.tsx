"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Copy,
  FloppyDisk,
} from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  allowedComplaintFileTypes,
  contactMethodOptions,
  defaultComplaintFormData,
  maxComplaintUploadFiles,
  maxComplaintUploadMb,
  relationshipOptions,
  respondentTypes,
  type ComplaintFormData,
} from "@/lib/complaints";
import {
  acknowledgements,
  complaintPayload,
  concernGroups,
  intakeSteps,
  normalizeComplaintDraft,
  publicCategoryLabels,
  validComplaintEmail,
  validateIntake,
  type IntakeError,
} from "@/lib/complaint-intake";
import {
  ComplaintSubmission,
  isExistingUpload,
  type ComplaintReceipt,
} from "@/lib/complaint-submission";
import {
  complaintStorageBucket,
  getSupabaseClient,
  hasSupabaseConfig,
} from "@/lib/supabase";

const v2Enabled = process.env.NEXT_PUBLIC_COMPLAINTS_V2_ENABLED === "true";
const inputClass =
  "mt-2 min-h-12 w-full rounded-lg border border-slate-300 bg-white px-3 text-base text-council-dark shadow-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-council-primary";
const actionClass = "min-h-12 rounded-lg";
type Section = Exclude<keyof ComplaintFormData, "category">;
type FieldOptions = {
  type?: string;
  rows?: number;
  required?: boolean;
  autoComplete?: string;
  options?: { value: string; label: string }[];
};
class LegacyDocumentReceiptUnknown extends Error {}
type CachedAttempt = {
  requestId: string;
  started: boolean;
  receipt: ComplaintReceipt | null;
  documentsPending: boolean;
};

function Field({
  id,
  label,
  value,
  onChange,
  error,
  type = "text",
  rows,
  required,
  autoComplete = "off",
  options,
}: FieldOptions & {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
}) {
  const shared = {
    id,
    value,
    onChange: (
      event: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) => onChange(event.target.value),
    required,
    "aria-invalid": Boolean(error),
    "aria-describedby": error ? `${id}-error` : undefined,
    className: inputClass,
  };
  return (
    <div>
      <label htmlFor={id} className="text-sm font-semibold text-council-dark">
        {label}
        {required && " *"}
      </label>
      {options ? (
        <select {...shared}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : rows ? (
        <Textarea {...shared} rows={rows} />
      ) : (
        <Input
          {...shared}
          type={type}
          autoComplete={autoComplete}
          max={
            type === "date" ? new Date().toLocaleDateString("en-CA") : undefined
          }
        />
      )}
      {error && (
        <p id={`${id}-error`} className="mt-2 text-sm text-red-800">
          {error}
        </p>
      )}
    </div>
  );
}
function ReviewBlock({
  title,
  step,
  onEdit,
  rows,
}: {
  title: string;
  step: number;
  onEdit: (step: number) => void;
  rows: [string, string | boolean][];
}) {
  return (
    <section className="rounded-lg border border-slate-200 p-5">
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-lg font-semibold">{title}</h3>
        <button
          type="button"
          onClick={() => onEdit(step)}
          className="min-h-11 px-2 font-semibold text-council-primary underline underline-offset-4"
          aria-label={`Edit ${title.toLowerCase()}`}
        >
          Edit
        </button>
      </div>
      <dl className="mt-3 space-y-3">
        {rows.map(([label, value]) => (
          <div key={label}>
            <dt className="text-sm text-slate-600">{label}</dt>
            <dd className="mt-1 whitespace-pre-wrap break-words text-council-dark">
              {typeof value === "boolean"
                ? value
                  ? "Yes"
                  : "No"
                : value || "Not provided"}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export default function PublicComplaintForm({
  draftToken,
}: { draftToken?: string }) {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [visited, setVisited] = useState<number[]>([]);
  const [furthest, setFurthest] = useState(0);
  const [formData, setFormData] = useState<ComplaintFormData>(
    defaultComplaintFormData,
  );
  const [group, setGroup] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [resumeToken, setResumeToken] = useState(draftToken || "");
  const [resumeUrl, setResumeUrl] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<IntakeError[]>([]);
  const [isLoading, setIsLoading] = useState(Boolean(draftToken));
  const [draftUnavailable, setDraftUnavailable] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [receipt, setReceipt] = useState<ComplaintReceipt | null>(null);
  const [uncertain, setUncertain] = useState(false);
  const [reloadedAttempt, setReloadedAttempt] = useState(false);
  const [documentsPending, setDocumentsPending] = useState(false);
  const [documentReceiptUnknown, setDocumentReceiptUnknown] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const errorRef = useRef<HTMLDivElement>(null);
  const sessionRef = useRef<ComplaintSubmission | null>(null);
  const busyRef = useRef(false);
  const storageKey = `council-complaint-attempt:${draftToken || "new"}`;
  const blocked = isSubmitting || isSaving;
  const locked = Boolean(receipt) || uncertain;
  const buildResumeUrl = (token: string) =>
    `${window.location.origin}/complaints/resume/${encodeURIComponent(token)}`;
  const getSession = () =>
    (sessionRef.current ??= new ComplaintSubmission(
      crypto.randomUUID(),
      v2Enabled,
    ));
  const cacheAttempt = (pendingDocuments: boolean) => {
    const session = getSession();
    try {
      sessionStorage.setItem(
        storageKey,
        JSON.stringify({
          requestId: session.requestId,
          started: session.started,
          receipt: session.receipt,
          documentsPending: pendingDocuments,
        } satisfies CachedAttempt),
      );
    } catch {
      /* In-memory recovery still works when browser storage is unavailable. */
    }
  };
  const moveTo = (next: number) => {
    setStep(next);
    setFurthest((current) => Math.max(current, next));
    setFieldErrors([]);
    setError("");
    requestAnimationFrame(() => headingRef.current?.focus());
  };

  useEffect(() => {
    let cancelled = false;
    try {
      const cached: CachedAttempt | null = JSON.parse(
        sessionStorage.getItem(storageKey) || "null",
      );
      if (cached?.started && cached.requestId) {
        const session = new ComplaintSubmission(cached.requestId, v2Enabled);
        session.started = true;
        session.receipt = cached.receipt;
        sessionRef.current = session;
        setReceipt(cached.receipt);
        setUncertain(!cached.receipt);
        setReloadedAttempt(true);
        setDocumentsPending(cached.documentsPending);
        setIsLoading(false);
        return;
      }
    } catch {
      /* An unavailable cache does not prevent a new form. */
    }
    async function load() {
      if (!draftToken) return;
      try {
        if (!hasSupabaseConfig()) throw new Error("Unavailable");
        const { data, error: failure } = await getSupabaseClient().rpc(
          "get_complaint_draft",
          { p_resume_token: draftToken },
        );
        if (cancelled) return;
        if (failure || !data?.[0]) {
          setDraftUnavailable(true);
          setError(
            "This draft could not be opened. The link may have expired or the complaint may already have been submitted. Check the link or contact the Council.",
          );
          return;
        }
        const restored = normalizeComplaintDraft(data[0].form_data);
        setFormData(restored);
        setGroup(
          concernGroups.find((item) => item.codes.includes(restored.category))
            ?.label || "",
        );
        setResumeUrl(buildResumeUrl(draftToken));
        setFurthest(4);
        const savedKey = data[0].form_data?._submissionRequestId;
        if (typeof savedKey === "string" && /^[0-9a-f-]{36}$/i.test(savedKey))
          sessionRef.current = new ComplaintSubmission(savedKey, v2Enabled);
        setStatus(
          "Your saved answers are ready. Attachments are not saved in a draft; choose them again before submitting.",
        );
      } catch {
        if (!cancelled) {
          setDraftUnavailable(true);
          setError("We could not load your draft. Refresh to try again.");
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }
    void load();
    return () => {
      cancelled = true;
    };
  }, [draftToken, storageKey]);
  useEffect(() => {
    if (error || fieldErrors.length) errorRef.current?.focus();
  }, [error, fieldErrors]);

  const setValue = <T extends Section, K extends keyof ComplaintFormData[T]>(
    section: T,
    key: K,
    value: ComplaintFormData[T][K],
  ) => {
    setFormData((current) => ({
      ...current,
      [section]: { ...current[section], [key]: value },
    }));
    setFieldErrors((current) =>
      current.filter((item) => item.field !== `${section}-${String(key)}`),
    );
  };
  const field = <T extends Section>(
    section: T,
    key: keyof ComplaintFormData[T],
    label: string,
    options: FieldOptions = {},
  ) => (
    <Field
      key={`${section}-${String(key)}`}
      id={`${section}-${String(key)}`}
      label={label}
      value={String(formData[section][key])}
      onChange={(value) =>
        setValue(section, key, value as ComplaintFormData[T][typeof key])
      }
      error={
        fieldErrors.find((item) => item.field === `${section}-${String(key)}`)
          ?.message
      }
      {...options}
    />
  );
  const checkbox = <T extends Section>(
    section: T,
    key: keyof ComplaintFormData[T],
    label: ReactNode,
  ) => (
    <label className="flex min-h-11 items-start gap-3 text-sm leading-relaxed text-slate-700">
      <input
        id={`${section}-${String(key)}`}
        type="checkbox"
        checked={Boolean(formData[section][key])}
        onChange={(event) =>
          setValue(
            section,
            key,
            event.target.checked as ComplaintFormData[T][typeof key],
          )
        }
        className="mt-1 h-5 w-5 shrink-0 accent-council-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-council-primary"
      />
      {label}
    </label>
  );
  const showErrors = (errors: IntakeError[]) => {
    setStep(errors[0].step);
    setFurthest((current) => Math.max(current, errors[0].step));
    setFieldErrors(errors);
  };
  const next = () => {
    const errors = validateIntake(formData, step);
    if (errors.length) {
      showErrors(errors);
      return;
    }
    setVisited((current) => [...new Set([...current, step])]);
    moveTo(step + 1);
  };

  const saveDraft = async () => {
    if (busyRef.current || locked) return;
    if (!validComplaintEmail(formData.complainant.email)) {
      showErrors([
        {
          field: "complainant-email",
          message: "Enter a valid email address to save a draft.",
          step: 2,
        },
      ]);
      return;
    }
    setError("");
    setStatus("");
    setIsSaving(true);
    busyRef.current = true;
    try {
      if (!hasSupabaseConfig()) throw new Error("Unavailable");
      const payload = {
        ...formData,
        _submissionRequestId: getSession().requestId,
      };
      const { data, error: failure } = await getSupabaseClient().rpc(
        resumeToken ? "update_complaint_draft" : "create_complaint_draft",
        resumeToken
          ? { p_resume_token: resumeToken, p_payload: payload }
          : {
              p_contact_email: formData.complainant.email.trim(),
              p_payload: payload,
            },
      );
      if (failure) throw failure;
      const token = resumeToken || data?.[0]?.resume_token;
      const expiry = data?.[0]?.expires_at;
      if (!token || !expiry || !Number.isFinite(Date.parse(expiry))) throw new Error("No draft returned");
      setResumeToken(token);
      setResumeUrl(buildResumeUrl(token));
      setStatus(
        `Draft saved until ${new Intl.DateTimeFormat('en-BS', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(expiry))}. Keep this private link. Attachments are not saved; choose them again when you return.`,
      );
    } catch {
      setError(
        "Your draft could not be saved. Your answers are still here. Please try again.",
      );
    } finally {
      setIsSaving(false);
      busyRef.current = false;
    }
  };
  const handleFiles = (list: FileList | null) => {
    if (!list) return;
    setError("");
    const additions = Array.from(list).filter(
      (file) =>
        !files.some(
          (existing) =>
            existing.name === file.name &&
            existing.size === file.size &&
            existing.lastModified === file.lastModified,
        ),
    );
    if (files.length + additions.length > maxComplaintUploadFiles) {
      setError(`Choose up to ${maxComplaintUploadFiles} files in total.`);
      return;
    }
    if (
      additions.some(
        (file) =>
          !allowedComplaintFileTypes.includes(file.type) ||
          file.size > maxComplaintUploadMb * 1024 * 1024 ||
          file.size === 0,
      )
    ) {
      setError(
        `Choose PDF, JPG, PNG, DOC or DOCX files, each non-empty and no larger than ${maxComplaintUploadMb}MB.`,
      );
      return;
    }
    setFiles((current) => [...current, ...additions]);
  };
  const attach = async () => {
    const supabase = getSupabaseClient();
    await getSession().attach(
      files,
      async (file, record) => {
        const { error: failure } = await supabase.storage
          .from(complaintStorageBucket)
          .upload(record.storagePath, file, {
            contentType: file.type,
            upsert: false,
          });
        // A lost upload response can leave the same private path in storage. Registering
        // that path is checked again by the server; never create a second path on retry.
        if (
          failure &&
          !isExistingUpload(failure)
        )
          throw failure;
      },
      async (record) => {
        const session = getSession();
        const { error: failure } = await supabase.rpc(
          v2Enabled
            ? "register_complaint_documents_v2"
            : "register_complaint_documents",
          v2Enabled
            ? { p_request_id: session.requestId, p_documents: [record] }
            : {
                p_reference_number: session.receipt!.reference_number,
                p_contact_email: formData.complainant.email.trim(),
                p_documents: [record],
              },
        );
        if (failure) {
          if (!v2Enabled) throw new LegacyDocumentReceiptUnknown();
          throw failure;
        }
      },
    );
  };
  const finishDocuments = async () => {
    try {
      await attach();
      setDocumentsPending(false);
      cacheAttempt(false);
    } catch (failure) {
      setDocumentReceiptUnknown(failure instanceof LegacyDocumentReceiptUnknown);
      setDocumentsPending(true);
      cacheAttempt(true);
      setError(
        failure instanceof LegacyDocumentReceiptUnknown
          ? "Your complaint was received. We could not confirm that all documents were recorded. Contact the Council with your tracking number before sending them again."
          : "Your complaint was received, but some documents could not be attached. Retry the documents below. You do not need to submit the complaint again.",
      );
    }
  };
  const submit = async () => {
    if (busyRef.current || (uncertain && (!v2Enabled || reloadedAttempt)))
      return;
    if (!uncertain) {
      const errors = validateIntake(formData);
      if (errors.length) {
        showErrors(errors);
        return;
      }
    }
    if (!hasSupabaseConfig()) {
      setError(
        "Online submission is unavailable. Your answers are still here. Please try again later or call (242) 604-6015.",
      );
      return;
    }
    busyRef.current = true;
    setIsSubmitting(true);
    setError("");
    setStatus("");
    try {
      const session = getSession();
      const pending = session.submit(
        complaintPayload(formData),
        async (payload, requestId) => {
          const { data, error: failure } = await getSupabaseClient().rpc(
            v2Enabled ? "submit_complaint_v2" : "submit_complaint",
            {
              p_payload: payload,
              p_draft_token: resumeToken || null,
              ...(v2Enabled ? { p_request_id: requestId } : {}),
            },
          );
          if (failure) throw failure;
          return data?.[0] as ComplaintReceipt;
        },
      );
      cacheAttempt(files.length > 0);
      const confirmed = await pending;
      setDocumentsPending(files.length > 0);
      setReceipt(confirmed);
      setUncertain(false);
      cacheAttempt(files.length > 0);
      await finishDocuments();
      requestAnimationFrame(() => headingRef.current?.focus());
    } catch {
      setUncertain(true);
      setError(
        v2Enabled
          ? "We could not confirm the response. Retry this same submission safely below. Your answers are kept unchanged during recovery."
          : "We could not confirm whether your complaint was received. Check your email for a tracking number or contact the Council before submitting again. Your answers remain on this page.",
      );
    } finally {
      setIsSubmitting(false);
      busyRef.current = false;
    }
  };
  const retryDocuments = async () => {
    if (busyRef.current) return;
    busyRef.current = true;
    setIsSubmitting(true);
    setError("");
    try {
      await finishDocuments();
    } finally {
      setIsSubmitting(false);
      busyRef.current = false;
    }
  };

  if (isLoading)
    return (
      <div
        role="status"
        className="rounded-lg border border-slate-200 bg-white p-8"
      >
        Loading your saved draft…
      </div>
    );
  if (draftUnavailable)
    return (
      <section className="mx-auto max-w-2xl rounded-lg border border-slate-200 bg-white p-6">
        <h1 className="text-3xl font-bold">Your saved complaint</h1>
        <p role="alert" className="mt-4 text-slate-700">
          {error}
        </p>
        <div className="mt-6 flex flex-wrap gap-4">
          <Button type="button" onClick={() => window.location.reload()}>
            Try loading again
          </Button>
          <Link
            href="/complaints/track"
            className="inline-flex min-h-12 items-center text-council-primary underline"
          >
            Check a submitted complaint
          </Link>
          <Link
            href="/contact"
            className="inline-flex min-h-12 items-center text-council-primary underline"
          >
            Contact the Council
          </Link>
        </div>
      </section>
    );
  if (receipt)
    return (
      <section className="mx-auto max-w-3xl rounded-lg border border-slate-200 bg-white p-6 md:p-10">
        <CheckCircle
          className="mb-4 h-10 w-10 text-council-primary"
          aria-hidden="true"
        />
        <h1 ref={headingRef} tabIndex={-1} className="text-3xl font-bold">
          Your complaint was received
        </h1>
        <p className="mt-5 text-slate-600">
          Keep your tracking number. You need it and the email address you gave
          to check for updates.
        </p>
        <p className="mt-3 break-all font-mono text-2xl font-bold text-council-primary">
          {receipt.reference_number}
        </p>
        <p className="mt-4 text-sm text-slate-600">
          {receipt.receipt_email_status === "sent"
            ? "A receipt email has been sent."
            : receipt.receipt_email_status === "queued"
              ? "Your receipt email is queued for delivery."
              : "Keep this number even if a receipt email does not arrive."}
        </p>
        {error && (
          <div
            ref={errorRef}
            role="alert"
            tabIndex={-1}
            className="mt-5 rounded-lg bg-rose-50 p-4 text-red-900"
          >
            {error}
          </div>
        )}
        {documentsPending && (
          <div className="mt-5 rounded-lg border border-amber-200 bg-amber-50 p-5">
            <h2 className="font-semibold">Documents still need attention</h2>
            <p className="mt-2 text-sm">
              {documentReceiptUnknown ? "Contact the Council using your tracking number to check which evidence was received. Your complaint does not need to be resubmitted." : reloadedAttempt
                ? "Files selected before the page was closed cannot be restored. Contact the Council using your tracking number for help sending your evidence."
                : "Keep this page open to retry the selected files. Files that were already attached will not be uploaded again."}
            </p>
            {!reloadedAttempt && !documentReceiptUnknown && (
              <Button
                type="button"
                onClick={retryDocuments}
                disabled={isSubmitting}
                className="mt-4 min-h-12"
              >
                {isSubmitting ? "Attaching documents…" : "Retry documents"}
              </Button>
            )}
          </div>
        )}
        <div className="mt-7 flex flex-wrap gap-3">
          {!isSubmitting && <Link
            className="inline-flex min-h-12 items-center rounded-lg bg-council-primary px-5 font-semibold text-white"
            href={`/complaints/track?ref=${encodeURIComponent(receipt.reference_number)}`}
          >
            Track my complaint
          </Link>}
          <Button
            variant="outline"
            type="button"
            disabled={isSubmitting}
            onClick={() =>
              router.push(
                `/complaints/submitted/${encodeURIComponent(receipt.reference_number)}`,
              )
            }
            className={actionClass}
          >
            What happens next
          </Button>
        </div>
        {!draftToken && !documentsPending && !isSubmitting && (
          <button
            type="button"
            className="mt-5 min-h-11 text-sm text-council-primary underline"
            onClick={() => {
              try {
                sessionStorage.removeItem(storageKey);
              } catch {}
              sessionRef.current = null;
              setReceipt(null);
              setFormData(structuredClone(defaultComplaintFormData));
              setFiles([]);
              setGroup("");
              setVisited([]);
              setResumeToken("");
              setResumeUrl("");
              setStatus("");
              setReloadedAttempt(false);
              moveTo(0);
              setFurthest(0);
            }}
          >
            Start a separate complaint
          </button>
        )}
      </section>
    );

  return (
    <div className="grid items-start gap-6 lg:grid-cols-[270px_minmax(0,1fr)]">
      <aside className="rounded-lg border border-slate-200 bg-white p-5 lg:sticky lg:top-6">
        <h2 className="text-xl font-bold text-council-primary">
          Submit a complaint
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-600">
          Tell the Council about a nurse, midwife, applicant or licensee. Fields
          marked * are required.
        </p>
        <p className="mt-4 rounded-lg bg-rose-50 p-3 text-sm leading-relaxed text-slate-700">
          This form is not an emergency service. If someone is in immediate
          danger, contact emergency services or the appropriate authority first.
        </p>
        <p className="mt-3 text-sm text-slate-600">
          For help with an application or a general question,{" "}
          <Link
            href="/contact#enquiry-form"
            className="font-semibold text-council-primary underline"
          >
            send an enquiry
          </Link>
          .
        </p>
        <nav aria-label="Complaint progress" className="mt-5 hidden lg:block">
          <ol className="space-y-1">
            {intakeSteps.map((label, index) => (
              <li key={label}>
                <button
                  type="button"
                  aria-current={step === index ? "step" : undefined}
                  disabled={blocked || locked || index > furthest}
                  onClick={() => moveTo(index)}
                  className={`flex min-h-12 w-full items-center gap-3 rounded-lg px-3 py-3 text-left text-sm disabled:opacity-60 ${step === index ? "bg-council-primary text-white" : "text-council-primary hover:bg-slate-50"}`}
                >
                  <span
                    aria-hidden="true"
                    className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-current text-xs"
                  >
                    {visited.includes(index) &&
                    !validateIntake(formData, index).length
                      ? "✓"
                      : index + 1}
                  </span>
                  {label}
                  {visited.includes(index) &&
                    !validateIntake(formData, index).length && (
                      <span className="sr-only">, completed</span>
                    )}
                </button>
              </li>
            ))}
          </ol>
        </nav>
        <p className="mt-5 hidden border-t border-slate-200 pt-4 text-sm leading-relaxed text-slate-600 lg:block">
          You can save your answers and return with a private link. Documents
          must be selected again when you return.
        </p>
        <Link
          href="/complaints/track"
          className="mt-4 inline-flex min-h-11 items-center text-sm font-semibold text-council-primary underline underline-offset-4"
        >
          Already submitted? Track it here
        </Link>
      </aside>
      <section className="min-w-0 rounded-lg border border-slate-200 bg-white p-5 md:p-8">
        <div className="mb-7 border-b border-slate-200 pb-5">
          <p className="text-sm text-slate-600">
            Step {step + 1} of {intakeSteps.length}
          </p>
          <h1
            ref={headingRef}
            tabIndex={-1}
            className="mt-2 text-3xl font-bold text-council-dark focus-visible:outline-council-primary"
          >
            {intakeSteps[step]}
          </h1>
        </div>
        {(error || fieldErrors.length > 0) && (
          <div
            ref={errorRef}
            role="alert"
            tabIndex={-1}
            className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-900"
          >
            {error || (
              <>
                <p className="font-semibold">Please check the following:</p>
                <ul className="mt-2 list-disc space-y-2 pl-5">
                  {fieldErrors.map((item) => (
                    <li key={item.field}>
                      <a
                        href={`#${item.field}`}
                        onClick={(event) => {
                          event.preventDefault();
                          document.getElementById(item.field)?.focus();
                        }}
                        className="underline underline-offset-2"
                      >
                        {item.message}
                      </a>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        )}
        {status && (
          <p
            role="status"
            className="mb-5 rounded-lg bg-blue-50 p-4 text-sm text-council-primary"
          >
            {status}
          </p>
        )}
        {resumeUrl && (
          <div className="mb-6 rounded-lg border border-slate-200 p-4">
            <label htmlFor="resume-link" className="text-sm font-semibold">
              Your private draft link
            </label>
            <div className="mt-2 flex flex-col gap-2 sm:flex-row">
              <Input
                id="resume-link"
                readOnly
                value={resumeUrl}
                className="min-h-12 min-w-0"
              />
              <Button
                type="button"
                variant="outline"
                className={actionClass}
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(resumeUrl);
                    setStatus("Draft link copied. Keep it private.");
                  } catch {
                    setStatus("Select and copy the draft link above.");
                  }
                }}
              >
                <Copy aria-hidden="true" />
                Copy link
              </Button>
            </div>
          </div>
        )}
        {uncertain && (
          <div className="mb-6 rounded-lg border border-amber-200 bg-amber-50 p-5">
            <h2 className="font-semibold">Check your submission</h2>
            <p className="mt-2 text-sm">
              {reloadedAttempt
                ? "An earlier submission in this tab has not been confirmed. Check your email for a tracking number or call the Council on (242) 604-6015 before starting again."
                : "Your answers are held while we confirm the result, to help avoid creating another complaint."}
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              {v2Enabled && !reloadedAttempt && !documentReceiptUnknown && (
                <Button type="button" onClick={submit} disabled={isSubmitting}>
                  {isSubmitting
                    ? "Checking submission…"
                    : "Retry same submission"}
                </Button>
              )}
              <Link
                className="inline-flex min-h-12 items-center font-semibold text-council-primary underline"
                href="/complaints/track"
              >
                Track a complaint
              </Link>
              <a
                href="tel:+12426046015"
                className="inline-flex min-h-12 items-center font-semibold text-council-primary underline"
              >
                Call the Council
              </a>
            </div>
          </div>
        )}
        {!reloadedAttempt && !documentReceiptUnknown && (
          <form
            noValidate
            onSubmit={(event) => {
              event.preventDefault();
              if (step === 4) void submit();
              else next();
            }}
          >
            <fieldset
              disabled={blocked || locked}
              className="min-w-0 space-y-6"
            >
              {step === 0 && (
                <>
                  <fieldset>
                    <legend className="mb-3 font-semibold">
                      What is your concern about? *
                    </legend>
                    <div
                      id="category"
                      tabIndex={-1}
                      className="grid gap-2 sm:grid-cols-2"
                    >
                      {concernGroups.map((item) => (
                        <label
                          key={item.label}
                          className={`flex min-h-14 cursor-pointer items-center gap-3 rounded-lg border p-4 text-sm ${group === item.label ? "border-council-primary bg-blue-50" : "border-slate-200"}`}
                        >
                          <input
                            type="radio"
                            name="concern-group"
                            checked={group === item.label}
                            onChange={() => {
                              setGroup(item.label);
                              setFormData((current) => ({
                                ...current,
                                category:
                                  item.codes.length === 1 ? item.codes[0] : "",
                              }));
                              setFieldErrors((current) =>
                                current.filter(
                                  (error) => error.field !== "category",
                                ),
                              );
                            }}
                            className="h-4 w-4 shrink-0 accent-council-primary"
                          />
                          {item.label}
                        </label>
                      ))}
                    </div>
                    {fieldErrors.find((item) => item.field === "category") && (
                      <p className="mt-2 text-sm text-red-800">
                        {
                          fieldErrors.find((item) => item.field === "category")
                            ?.message
                        }
                      </p>
                    )}
                    {group &&
                      (concernGroups.find((item) => item.label === group)?.codes
                        .length || 0) > 1 && (
                        <div className="mt-4">
                          <Field
                            id="concern-detail"
                            label="Which best describes it?"
                            required
                            options={[
                              { value: "", label: "Choose a concern" },
                              ...concernGroups
                                .find((item) => item.label === group)!
                                .codes.map((code) => ({
                                  value: code,
                                  label: publicCategoryLabels[code],
                                })),
                            ]}
                            value={formData.category}
                            onChange={(category) =>
                              setFormData((current) => ({
                                ...current,
                                category,
                              }))
                            }
                          />
                        </div>
                      )}
                  </fieldset>
                  <div className="border-t border-slate-200 pt-5">
                    <h2 className="mb-4 text-xl font-semibold">
                      Who is it about?
                    </h2>
                    <div className="grid gap-5 sm:grid-cols-2">
                      {field("respondent", "type", "Complaint is about", {
                        required: true,
                        options: [
                          { value: "", label: "Choose a person’s role" },
                          ...respondentTypes,
                        ],
                      })}
                      {field("respondent", "name", "Name", { required: true })}
                      {field(
                        "respondent",
                        "registrationNumber",
                        "Registration or licence number, if known",
                      )}
                      {field("respondent", "employer", "Employer or facility")}
                      {field("respondent", "department", "Department or unit")}
                      {field(
                        "respondent",
                        "contact",
                        "Contact details, if known",
                      )}
                      {field("respondent", "location", "Location")}
                    </div>
                  </div>
                </>
              )}
              {step === 1 && (
                <>
                  <div className="grid gap-5 sm:grid-cols-2">
                    {field("incident", "date", "Incident date", {
                      type: "date",
                    })}
                    {field("incident", "location", "Incident location")}
                  </div>
                  {field("incident", "summary", "Short summary", {
                    required: true,
                  })}
                  {field("incident", "description", "Describe what happened", {
                    rows: 7,
                    required: true,
                  })}
                  {field(
                    "incident",
                    "peopleInvolved",
                    "Other people involved",
                    { rows: 3 },
                  )}
                  {checkbox("incident", "ongoing", "This matter is ongoing.")}
                  {checkbox(
                    "incident",
                    "immediateRisk",
                    "There may be immediate risk or a public safety concern.",
                  )}
                  {field(
                    "incident",
                    "outcome",
                    "What outcome are you seeking?",
                    { rows: 3 },
                  )}
                  <div className="space-y-4 border-t border-slate-200 pt-5">
                    <h2 className="text-xl font-semibold">Earlier steps</h2>
                    {checkbox(
                      "priorAction",
                      "taken",
                      "I have already contacted a nurse, employer, facility, police, court, regulator or other agency about this matter.",
                    )}
                    {formData.priorAction.taken && (
                      <div className="space-y-5">
                        {field("priorAction", "details", "What was done", {
                          rows: 4,
                        })}
                        {field("priorAction", "response", "Response received", {
                          rows: 3,
                        })}
                        {field(
                          "priorAction",
                          "referenceNumbers",
                          "Any case or reference numbers you were given",
                        )}
                      </div>
                    )}
                  </div>
                </>
              )}
              {step === 2 && (
                <>
                  <p className="text-sm leading-relaxed text-slate-600">
                    The Council uses these details to contact you about your
                    complaint. Use the same email address when tracking it.
                  </p>
                  <div className="grid gap-5 sm:grid-cols-2">
                    {field("complainant", "name", "Full name", {
                      required: true,
                      autoComplete: "name",
                    })}
                    {field("complainant", "email", "Email address", {
                      type: "email",
                      required: true,
                      autoComplete: "email",
                    })}
                    {field("complainant", "phone", "Phone number", {
                      type: "tel",
                      required: true,
                      autoComplete: "tel",
                    })}
                    {field(
                      "complainant",
                      "preferredContact",
                      "Preferred contact",
                      {
                        options: contactMethodOptions.map((value) => ({
                          value: value.toLowerCase(),
                          label: value,
                        })),
                      },
                    )}
                    {field("complainant", "address", "Address or location", {
                      autoComplete: "street-address",
                    })}
                    {field(
                      "complainant",
                      "relationship",
                      "Relationship to the matter",
                      {
                        options: [
                          {
                            value: "",
                            label: "Select relationship (optional)",
                          },
                          ...relationshipOptions.map((value) => ({
                            value,
                            label: value,
                          })),
                        ],
                      },
                    )}
                  </div>
                </>
              )}
              {step === 3 && (
                <>
                  <p className="leading-relaxed text-slate-600">
                    Add supporting documents if you have them. You can continue
                    without files. Only include sensitive information that is
                    relevant to your complaint.
                  </p>
                  <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-5">
                    <label htmlFor="evidence-files" className="font-semibold">
                      Choose supporting documents
                    </label>
                    <p id="file-help" className="mt-2 text-sm text-slate-600">
                      PDF, JPG, PNG, DOC or DOCX. Up to{" "}
                      {maxComplaintUploadFiles} files, {maxComplaintUploadMb}MB
                      each. Drafts do not save attachments.
                    </p>
                    <input
                      id="evidence-files"
                      type="file"
                      multiple
                      accept={allowedComplaintFileTypes.join(",")}
                      aria-describedby="file-help"
                      onChange={(event) => {
                        handleFiles(event.target.files);
                        event.target.value = "";
                      }}
                      className="mt-4 block w-full min-w-0 text-sm file:mr-3 file:min-h-11 file:rounded-lg file:border file:border-slate-300 file:bg-white file:px-3 file:font-semibold"
                    />
                  </div>
                  <ul className="space-y-2">
                    {files.map((file, index) => (
                      <li
                        key={`${file.name}-${index}`}
                        className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 p-3 text-sm"
                      >
                        <span className="min-w-0 break-all">
                          {file.name}
                          <span className="block text-slate-500">
                            {Math.ceil(file.size / 1024)} KB
                          </span>
                        </span>
                        <button
                          type="button"
                          aria-label={`Remove ${file.name}`}
                          onClick={() =>
                            setFiles((current) =>
                              current.filter(
                                (_, position) => position !== index,
                              ),
                            )
                          }
                          className="min-h-11 shrink-0 px-2 font-semibold text-council-primary underline"
                        >
                          Remove
                        </button>
                      </li>
                    ))}
                  </ul>
                </>
              )}
              {step === 4 && (
                <>
                  <p className="text-slate-600">
                    Review your answers and documents before sending them to the
                    Council.
                  </p>
                  <ReviewBlock
                    title="Your concern"
                    step={0}
                    onEdit={moveTo}
                    rows={[
                      [
                        "Concern",
                        publicCategoryLabels[formData.category] || "",
                      ],
                      [
                        "Person’s role",
                        respondentTypes.find(
                          (item) => item.value === formData.respondent.type,
                        )?.label || "",
                      ],
                      ["Name", formData.respondent.name],
                      [
                        "Registration or licence number",
                        formData.respondent.registrationNumber,
                      ],
                      ["Employer or facility", formData.respondent.employer],
                      ["Department or unit", formData.respondent.department],
                      ["Contact details", formData.respondent.contact],
                      ["Location", formData.respondent.location],
                    ]}
                  />
                  <ReviewBlock
                    title="What happened"
                    step={1}
                    onEdit={moveTo}
                    rows={[
                      ["Incident date", formData.incident.date],
                      ["Incident location", formData.incident.location],
                      ["Summary", formData.incident.summary],
                      ["Description", formData.incident.description],
                      [
                        "Other people involved",
                        formData.incident.peopleInvolved,
                      ],
                      ["Ongoing", formData.incident.ongoing],
                      [
                        "Immediate risk or public safety concern",
                        formData.incident.immediateRisk,
                      ],
                      ["Outcome requested", formData.incident.outcome],
                      ["Earlier contact made", formData.priorAction.taken],
                      ...(formData.priorAction.taken
                        ? ([
                            ["What was done", formData.priorAction.details],
                            [
                              "Response received",
                              formData.priorAction.response,
                            ],
                            [
                              "Case or reference numbers",
                              formData.priorAction.referenceNumbers,
                            ],
                          ] as [string, string][])
                        : []),
                    ]}
                  />
                  <ReviewBlock
                    title="Your details"
                    step={2}
                    onEdit={moveTo}
                    rows={[
                      ["Full name", formData.complainant.name],
                      ["Email", formData.complainant.email],
                      ["Phone", formData.complainant.phone],
                      [
                        "Preferred contact",
                        formData.complainant.preferredContact,
                      ],
                      ["Address or location", formData.complainant.address],
                      ["Relationship", formData.complainant.relationship],
                    ]}
                  />
                  <ReviewBlock
                    title="Evidence"
                    step={3}
                    onEdit={moveTo}
                    rows={[
                      [
                        "Documents",
                        files.length
                          ? files
                              .map(
                                (file) =>
                                  `${file.name} (${Math.ceil(file.size / 1024)} KB)`,
                              )
                              .join("\n")
                          : "No documents selected",
                      ],
                    ]}
                  />
                  <fieldset className="space-y-4 rounded-lg bg-slate-50 p-5">
                    <legend className="px-1 font-semibold">
                      Acknowledgements *
                    </legend>
                    {acknowledgements.map(([key, label]) => (
                      <div key={key}>
                        {checkbox("acknowledgement", key, label)}
                      </div>
                    ))}
                  </fieldset>
                </>
              )}
            </fieldset>
            <div className="mt-8 flex flex-col gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:flex-wrap sm:justify-between">
              <Button
                type="button"
                variant="outline"
                disabled={step === 0 || blocked || locked}
                onClick={() => moveTo(step - 1)}
                className={actionClass}
              >
                <ArrowLeft aria-hidden="true" />
                Back
              </Button>
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button
                  type="button"
                  variant="outline"
                  onClick={saveDraft}
                  disabled={blocked || locked}
                  className={actionClass}
                >
                  <FloppyDisk aria-hidden="true" />
                  {isSaving ? "Saving…" : "Save draft"}
                </Button>
                <Button
                  type="submit"
                  disabled={blocked || locked}
                  className={`${actionClass} bg-council-primary px-6 text-white`}
                >
                  {isSubmitting
                    ? "Submitting…"
                    : step === 4
                      ? "Submit complaint"
                      : "Continue"}
                  <ArrowRight aria-hidden="true" />
                </Button>
              </div>
            </div>
          </form>
        )}
      </section>
    </div>
  );
}
