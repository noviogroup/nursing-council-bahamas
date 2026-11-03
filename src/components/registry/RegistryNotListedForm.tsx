"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AlertTriangle, CheckCircle2, LoaderCircle, Send } from "lucide-react";
import { type FormEvent, useState } from "react";

type Props = {
  /** The last registry search, sent so staff can see what the nurse tried. */
  searchedFor: string;
  registrationType: string;
  /** Sits inside the results panel rather than in its own card. */
  embedded?: boolean;
  /** Shown under a list of close matches, after the nurse has checked them. */
  afterCloseMatches?: boolean;
};

type Fields = {
  fullName: string;
  otherNames: string;
  registrationType: string;
  registrationNumber: string;
  yearRegistered: string;
  email: string;
  phone: string;
  note: string;
  website: string;
};

const fieldClass =
  "h-11 rounded-[8px] bg-white text-council-dark placeholder:text-slate-500";
const labelClass = "mb-2 block text-sm font-semibold text-council-dark";

export default function RegistryNotListedForm({
  searchedFor,
  registrationType,
  embedded = false,
  afterCloseMatches = false,
}: Props) {
  const frame = embedded
    ? "text-left text-council-dark"
    : "rounded-[8px] border border-slate-200 bg-white p-5 text-council-dark shadow-sm lg:p-6";
  const [open, setOpen] = useState(false);
  const [fields, setFields] = useState<Fields>(() => ({
    // A name search is a good starting point; a number search is not.
    fullName: /\d/.test(searchedFor) ? "" : searchedFor,
    otherNames: "",
    registrationType,
    registrationNumber: /\d/.test(searchedFor) ? searchedFor : "",
    yearRegistered: "",
    email: "",
    phone: "",
    note: "",
    website: "",
  }));
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<{ message: string; field?: string }>();
  const [sent, setSent] = useState(false);

  function update(key: keyof Fields, value: string) {
    setFields((current) => ({ ...current, [key]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(undefined);

    if (fields.fullName.trim().length < 2) {
      setError({ message: "Enter your full name.", field: "fullName" });
      return;
    }
    if (!fields.email.trim()) {
      setError({
        message: "Enter an email address so the Council can reply.",
        field: "email",
      });
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch("/api/registry/not-listed", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...fields, searchedFor }),
      });
      const payload = await response.json().catch(() => ({}));
      if (!response.ok) {
        setError({
          message:
            payload.error ||
            "We could not send your request. Please try again.",
          field: payload.field,
        });
        return;
      }
      setSent(true);
    } catch {
      setError({
        message: "We could not send your request. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  if (sent) {
    return (
      <div
        role="status"
        className={`flex items-start gap-3 ${embedded ? "mx-auto max-w-lg text-left text-council-dark" : frame}`}
      >
        <CheckCircle2
          className="mt-0.5 h-5 w-5 shrink-0 text-council-primary"
          aria-hidden="true"
        />
        <div>
          <p className="font-semibold text-council-dark">Request sent</p>
          <p className="mt-1 text-sm text-slate-600">
            Thank you. Council staff will check our records and contact you at{" "}
            {fields.email.trim()}. We have also emailed you a receipt.
          </p>
        </div>
      </div>
    );
  }

  if (!open) {
    return (
      <div
        className={
          embedded && !afterCloseMatches
            ? "mx-auto flex max-w-lg flex-col items-center gap-4 text-center text-council-dark"
            : `flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between ${frame}`
        }
      >
        <div>
          <p className="font-semibold text-council-dark">
            {afterCloseMatches
              ? "None of these is you?"
              : "Can\u2019t find your record?"}
          </p>
          <p className="mt-1 text-sm text-slate-600">
            {afterCloseMatches
              ? "If you are a registered nurse or midwife and none of these records is yours, tell the Council and staff will check your record."
              : "If you are a registered nurse or midwife and you are not in the registry, tell the Council and staff will check your record."}
          </p>
        </div>
        <Button
          type="button"
          variant="outline"
          onClick={() => setOpen(true)}
          className="h-11 shrink-0 rounded-[8px]"
        >
          I&rsquo;m not in the registry
        </Button>
      </div>
    );
  }

  const Heading = embedded ? "h3" : "h2";
  const describedBy = (field: keyof Fields) =>
    error?.field === field ? "not-listed-error" : undefined;

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-labelledby="not-listed-heading"
      className={frame}
    >
      <Heading
        id="not-listed-heading"
        className="font-heading text-2xl font-bold text-council-dark"
      >
        I&rsquo;m not in the registry
      </Heading>
      <p className="mt-1 text-sm text-slate-600">
        Tell us who you are and how you were registered. Council staff will
        check our records and reply by email.
      </p>

      <div className="mt-6 grid items-start gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="not-listed-name" className={labelClass}>
            Full name
          </label>
          <Input
            id="not-listed-name"
            autoComplete="name"
            maxLength={120}
            value={fields.fullName}
            onChange={(event) => update("fullName", event.target.value)}
            aria-invalid={error?.field === "fullName" || undefined}
            aria-describedby={describedBy("fullName")}
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="not-listed-other-names" className={labelClass}>
            Former or maiden name{" "}
            <span className="font-normal text-slate-500">(optional)</span>
          </label>
          <Input
            id="not-listed-other-names"
            maxLength={120}
            value={fields.otherNames}
            onChange={(event) => update("otherNames", event.target.value)}
            aria-invalid={error?.field === "otherNames" || undefined}
            aria-describedby={describedBy("otherNames")}
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="not-listed-type" className={labelClass}>
            Registration type{" "}
            <span className="font-normal text-slate-500">(optional)</span>
          </label>
          <select
            id="not-listed-type"
            value={fields.registrationType}
            onChange={(event) => update("registrationType", event.target.value)}
            className={`${fieldClass} w-full border border-input px-3 text-sm`}
          >
            <option value="">Not sure</option>
            <option value="RN">Registered Nurse</option>
            <option value="LPN">Licensed Practical Nurse</option>
            <option value="RM">Registered Midwife</option>
          </select>
        </div>
        <div>
          <label htmlFor="not-listed-number" className={labelClass}>
            Registration number{" "}
            <span className="font-normal text-slate-500">(if you know it)</span>
          </label>
          <Input
            id="not-listed-number"
            maxLength={30}
            spellCheck={false}
            value={fields.registrationNumber}
            onChange={(event) =>
              update("registrationNumber", event.target.value)
            }
            className={`${fieldClass} font-mono`}
          />
        </div>
        <div>
          <label htmlFor="not-listed-year" className={labelClass}>
            Year first registered{" "}
            <span className="font-normal text-slate-500">(optional)</span>
          </label>
          <Input
            id="not-listed-year"
            inputMode="numeric"
            maxLength={4}
            placeholder="e.g. 2014"
            value={fields.yearRegistered}
            onChange={(event) =>
              update("yearRegistered", event.target.value.replace(/\D/g, ""))
            }
            aria-invalid={error?.field === "yearRegistered" || undefined}
            aria-describedby={describedBy("yearRegistered")}
            className={fieldClass}
          />
        </div>
        <div className="hidden sm:block" aria-hidden="true" />
        <div>
          <label htmlFor="not-listed-email" className={labelClass}>
            Email address
          </label>
          <Input
            id="not-listed-email"
            type="email"
            autoComplete="email"
            maxLength={254}
            value={fields.email}
            onChange={(event) => update("email", event.target.value)}
            aria-invalid={error?.field === "email" || undefined}
            aria-describedby={describedBy("email")}
            className={fieldClass}
          />
        </div>
        <div>
          <label htmlFor="not-listed-phone" className={labelClass}>
            Phone number{" "}
            <span className="font-normal text-slate-500">(optional)</span>
          </label>
          <Input
            id="not-listed-phone"
            type="tel"
            autoComplete="tel"
            maxLength={40}
            value={fields.phone}
            onChange={(event) => update("phone", event.target.value)}
            aria-invalid={error?.field === "phone" || undefined}
            aria-describedby={describedBy("phone")}
            className={fieldClass}
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="not-listed-note" className={labelClass}>
            Anything else we should know{" "}
            <span className="font-normal text-slate-500">(optional)</span>
          </label>
          <Textarea
            id="not-listed-note"
            rows={4}
            maxLength={1500}
            placeholder="For example, where you trained or when you last renewed."
            value={fields.note}
            onChange={(event) => update("note", event.target.value)}
            className="rounded-[8px] bg-white text-council-dark placeholder:text-slate-500"
          />
        </div>
        {/* Left empty by people; bots fill it in. */}
        <div className="absolute -left-[9999px]" aria-hidden="true">
          <label htmlFor="not-listed-website">Website</label>
          <input
            id="not-listed-website"
            tabIndex={-1}
            autoComplete="off"
            value={fields.website}
            onChange={(event) => update("website", event.target.value)}
          />
        </div>
      </div>

      {error && (
        <p
          id="not-listed-error"
          role="alert"
          className="mt-5 flex items-start gap-2 text-sm font-semibold text-red-700"
        >
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          {error.message}
        </p>
      )}

      <div className="mt-6 flex flex-wrap gap-3">
        <Button
          type="submit"
          disabled={submitting}
          className="h-11 rounded-[8px] bg-council-primary px-6 font-semibold hover:bg-council-secondary"
        >
          {submitting ? (
            <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />
          ) : (
            <Send className="h-4 w-4" aria-hidden="true" />
          )}
          Send to the Council
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => {
            setOpen(false);
            setError(undefined);
          }}
          className="h-11 rounded-[8px]"
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
