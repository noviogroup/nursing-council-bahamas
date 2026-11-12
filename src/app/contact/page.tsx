"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle,
  EnvelopeSimple as Mail,
  MapPin,
  PaperPlaneTilt as Send,
  Phone,
} from "@phosphor-icons/react/dist/ssr";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { InteriorPageHeader, PageSectionNav } from "@/components/InteriorPage";
import {
  emptyInquiry,
  findInquiryService,
  inquiryServices,
  inquiryTopics,
  isInquiryReference,
  validateInquiry,
  type InquiryField,
  type InquiryInput,
} from "@/lib/contactInquiry";

const departmentContacts = [
  {
    department: "Registration Services",
    email: "registration@nursingcouncilbahamas.com",
    phone: "(242) 604-6015 ext. 101",
    description: "New registrations, renewals, and licence verifications",
  },
  {
    department: "Education & Continuing Education",
    email: "education@nursingcouncilbahamas.com",
    phone: "(242) 604-6015 ext. 102",
    description:
      "CE requirements, approved programs, and educational standards",
  },
  {
    department: "Committees & Governance",
    email: "committees@nursingcouncilbahamas.com",
    phone: "(242) 604-6015 ext. 103",
    description: "Council committees and governance enquiries",
  },
  {
    department: "Nursing Agency Licensing",
    email: "agencies@nursingcouncilbahamas.com",
    phone: "(242) 604-6015 ext. 104",
    description: "Agency licensing, compliance, and regulations",
  },
];

function EnquiryForm() {
  const [formData, setFormData] = useState<InquiryInput>({ ...emptyInquiry });
  const [pending, setPending] = useState(false);
  const [uncertain, setUncertain] = useState(false);
  const [error, setError] = useState<{
    message: string;
    field?: InquiryField;
  } | null>(null);
  const [reference, setReference] = useState<string | null>(null);
  const inFlight = useRef(false);
  const feedback = useRef<HTMLDivElement>(null);
  const confirmation = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const service = findInquiryService(
      new URLSearchParams(window.location.search).get("service") || "",
    );
    if (service)
      setFormData((previous) => ({
        ...previous,
        topic: `service:${service.id}`,
      }));
  }, []);

  useEffect(() => {
    if (error) feedback.current?.focus();
  }, [error]);
  useEffect(() => {
    if (reference) confirmation.current?.focus();
  }, [reference]);

  const handleInputChange = (field: keyof InquiryInput, value: string) => {
    setFormData((previous) => ({ ...previous, [field]: value }));
    if (error?.field === field) setError(null);
  };
  const fieldError = (field: InquiryField) =>
    error?.field === field ? "enquiry-error" : undefined;
  const selectedService = formData.topic.startsWith("service:")
    ? findInquiryService(formData.topic.slice(8))
    : undefined;

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (inFlight.current || uncertain) return;
    const validation = validateInquiry(formData);
    if (!validation.ok) {
      setError({ message: validation.error, field: validation.field });
      return;
    }
    setError(null);
    setPending(true);
    inFlight.current = true;
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 25000);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        signal: controller.signal,
      });
      const result = await response.json();
      if (!response.ok) {
        setUncertain(
          result.uncertain === true ||
            (response.status >= 500 && typeof result.error !== "string"),
        );
        setError({
          message:
            typeof result.error === "string"
              ? result.error
              : "We could not record your enquiry. Your message is still here. Please try again or contact the Council.",
          field: result.field,
        });
        return;
      }
      if (result.ok !== true || !isInquiryReference(result.reference)) {
        setUncertain(true);
        setError({
          message:
            "We could not confirm your enquiry reference. Keep a copy of your message and contact the Council before sending it again.",
        });
        return;
      }
      setReference(result.reference);
    } catch {
      setUncertain(true);
      setError({
        message:
          "We could not confirm whether your enquiry was recorded. Your message is still here. Keep a copy and contact the Council before sending it again.",
      });
    } finally {
      window.clearTimeout(timeout);
      inFlight.current = false;
      setPending(false);
    }
  }

  if (reference)
    return (
      <div
        ref={confirmation}
        tabIndex={-1}
        className="rounded-[8px] border border-council-primary/20 bg-slate-50 p-6 outline-none focus-visible:ring-2 focus-visible:ring-council-primary md:p-8"
      >
        <CheckCircle
          className="h-10 w-10 text-council-primary"
          aria-hidden="true"
        />
        <h3 className="font-heading mt-4 text-2xl font-bold text-council-dark">
          Your enquiry has been recorded
        </h3>
        <p className="mt-3 leading-relaxed text-gray-600">
          Keep this reference and quote it when contacting the Council about
          your enquiry.
        </p>
        <p className="mt-4 text-sm font-semibold text-council-dark">
          Enquiry reference
        </p>
        <p className="mt-1 break-all rounded-[8px] border border-slate-200 bg-white p-3 font-mono text-sm text-council-primary">
          {reference}
        </p>
        <p className="mt-4 text-sm leading-relaxed text-gray-600">
          Your message is in the Council’s general-enquiry queue. This
          confirmation is not an application approval or a complaint tracking
          number.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-gray-600">
          For follow-up, call{" "}
          <a
            className="font-semibold text-council-primary underline"
            href="tel:+12426046015"
          >
            (242) 604-6015
          </a>{" "}
          or email{" "}
          <a
            className="break-all font-semibold text-council-primary underline"
            href="mailto:info@nursingcouncilbahamas.com"
          >
            info@nursingcouncilbahamas.com
          </a>
          .
        </p>
        <button
          type="button"
          onClick={() => {
            setReference(null);
            setFormData({ ...emptyInquiry });
          }}
          className="mt-6 min-h-11 rounded-[8px] border border-council-primary/20 px-4 py-2 font-semibold text-council-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-council-primary"
        >
          Start another enquiry
        </button>
      </div>
    );

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-busy={pending}
      className="rounded-[8px] border border-slate-200 bg-white p-6 shadow-sm md:p-8"
    >
      <p className="mb-6 text-sm leading-relaxed text-gray-600">
        Fields marked * are required. Your message will be recorded for the
        Council. A reference appears here after it is accepted.
      </p>
      {error && (
        <div
          ref={feedback}
          tabIndex={-1}
          role="alert"
          id="enquiry-error"
          className="mb-6 rounded-[8px] border border-red-200 bg-red-50 p-4 text-sm leading-relaxed text-red-900 focus:outline focus:outline-2 focus:outline-red-800"
        >
          <p className="font-semibold">{error.message}</p>
          {error.field && (
            <a
              href={`#enquiry-${error.field}`}
              onClick={(event) => {
                event.preventDefault();
                document.getElementById(`enquiry-${error.field}`)?.focus();
              }}
              className="mt-2 inline-block underline underline-offset-2"
            >
              Go to this field
            </a>
          )}
        </div>
      )}
      <fieldset disabled={pending} className="min-w-0">
        <div className="grid gap-5 md:grid-cols-2">
          <label
            className="text-sm font-medium text-gray-700"
            htmlFor="enquiry-name"
          >
            Full name *
            <Input
              id="enquiry-name"
              name="name"
              required
              maxLength={120}
              autoComplete="name"
              value={formData.name}
              onChange={(event) =>
                handleInputChange("name", event.target.value)
              }
              aria-invalid={error?.field === "name"}
              aria-describedby={fieldError("name")}
              className="mt-2 min-h-12 rounded-[8px]"
            />
          </label>
          <label
            className="text-sm font-medium text-gray-700"
            htmlFor="enquiry-email"
          >
            Email address *
            <Input
              id="enquiry-email"
              name="email"
              type="email"
              required
              maxLength={254}
              autoComplete="email"
              autoCapitalize="none"
              spellCheck={false}
              value={formData.email}
              onChange={(event) =>
                handleInputChange("email", event.target.value)
              }
              aria-invalid={error?.field === "email"}
              aria-describedby={fieldError("email")}
              className="mt-2 min-h-12 rounded-[8px]"
            />
          </label>
          <label
            className="text-sm font-medium text-gray-700"
            htmlFor="enquiry-phone"
          >
            Phone number (optional)
            <Input
              id="enquiry-phone"
              name="phone"
              type="tel"
              inputMode="tel"
              maxLength={40}
              autoComplete="tel"
              value={formData.phone}
              onChange={(event) =>
                handleInputChange("phone", event.target.value)
              }
              aria-invalid={error?.field === "phone"}
              aria-describedby={fieldError("phone")}
              className="mt-2 min-h-12 rounded-[8px]"
            />
          </label>
        </div>
        <label
          className="mt-5 block text-sm font-medium text-gray-700"
          htmlFor="enquiry-topic"
        >
          What do you need help with? *
          <select
            id="enquiry-topic"
            name="topic"
            required
            value={formData.topic}
            onChange={(event) => handleInputChange("topic", event.target.value)}
            aria-invalid={error?.field === "topic"}
            aria-describedby={fieldError("topic")}
            className="mt-2 min-h-12 w-full min-w-0 rounded-[8px] border border-input bg-white px-3 py-2 text-base focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-council-primary"
          >
            <optgroup label="General enquiries">
              {inquiryTopics.map((topic) => (
                <option key={topic.value} value={topic.value}>
                  {topic.label}
                </option>
              ))}
            </optgroup>
            <optgroup label="Forms and applications">
              {inquiryServices.map((service) => (
                <option key={service.id} value={`service:${service.id}`}>
                  {service.title}
                </option>
              ))}
            </optgroup>
          </select>
        </label>
        {selectedService && (
          <p className="mt-3 text-sm leading-relaxed text-gray-600">
            {selectedService.availability === "online" ? (
              <>
                This service is available in Nurse 360.{" "}
                <Link
                  className="font-semibold text-council-primary underline"
                  href={selectedService.href}
                >
                  {selectedService.action}
                </Link>
                , or use this form if you need help.
              </>
            ) : (
              "This form asks the Council for guidance. It does not submit an application for this service."
            )}
          </p>
        )}
        <label
          className="mt-5 block text-sm font-medium text-gray-700"
          htmlFor="enquiry-subject"
        >
          Subject *
          <Input
            id="enquiry-subject"
            name="subject"
            required
            minLength={3}
            maxLength={160}
            autoComplete="off"
            value={formData.subject}
            onChange={(event) =>
              handleInputChange("subject", event.target.value)
            }
            aria-invalid={error?.field === "subject"}
            aria-describedby={fieldError("subject")}
            className="mt-2 min-h-12 rounded-[8px]"
          />
        </label>
        <label
          className="mt-5 block text-sm font-medium text-gray-700"
          htmlFor="enquiry-message"
        >
          Message *
          <Textarea
            id="enquiry-message"
            name="message"
            required
            minLength={10}
            maxLength={3800}
            rows={7}
            value={formData.message}
            onChange={(event) =>
              handleInputChange("message", event.target.value)
            }
            aria-invalid={error?.field === "message"}
            aria-describedby={fieldError("message") || "enquiry-message-help"}
            className="mt-2 resize-y rounded-[8px]"
          />
        </label>
        <p
          id="enquiry-message-help"
          className="mt-2 text-sm leading-relaxed text-gray-500"
        >
          Up to 3,800 characters. Please do not include passwords, patient
          records, or identity documents.
        </p>
        <div hidden aria-hidden="true">
          <label>
            Leave this blank
            <input
              name="website"
              value={formData.website}
              onChange={(event) =>
                handleInputChange("website", event.target.value)
              }
              tabIndex={-1}
              autoComplete="off"
            />
          </label>
        </div>
        <Button
          type="submit"
          disabled={pending || uncertain}
          className="mt-6 min-h-14 w-full rounded-[8px] bg-council-primary text-base hover:bg-council-secondary"
        >
          <Send className="h-5 w-5" aria-hidden="true" />
          {pending
            ? "Recording your enquiry…"
            : uncertain
              ? "Contact the Council to confirm receipt"
              : "Submit enquiry"}
        </Button>
      </fieldset>
      <p
        role="status"
        aria-live="polite"
        className="mt-4 text-center text-sm text-gray-500"
      >
        {pending
          ? "Please keep this page open while your enquiry is recorded."
          : "For a formal complaint, use the complaints service below."}
      </p>
      <Link
        href="/complaints"
        className="mt-3 flex min-h-11 items-center justify-center gap-2 rounded text-sm font-semibold text-council-primary underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-council-primary"
      >
        Make or track a complaint
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </form>
  );
}

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <InteriorPageHeader
          title="Contact & help"
          description="Get help with Council services, an application or a question about nursing regulation in The Bahamas."
        />
        <PageSectionNav
          links={[
            { label: "Send an enquiry", href: "#enquiry-form" },
            { label: "Visit the Council", href: "#office-location" },
            { label: "Department contacts", href: "#departments" },
          ]}
        />
        <section
          className="bg-white py-8"
          aria-label="Ways to contact the Council"
        >
          <div className="container mx-auto grid gap-6 px-4 md:grid-cols-3">
            <div className="border-l-2 border-rose-200 pl-5">
              <h2 className="flex items-center gap-2 text-lg font-bold text-council-dark">
                <Phone size={21} aria-hidden="true" />
                Call us
              </h2>
              <div className="mt-2 flex flex-wrap gap-x-4">
                <a
                  href="tel:+12426046015"
                  className="inline-flex min-h-11 items-center text-sm font-semibold text-council-primary underline underline-offset-4 focus-visible:outline focus-visible:outline-2"
                >
                  (242) 604-6015
                </a>
                <a
                  href="tel:+12426046017"
                  className="inline-flex min-h-11 items-center text-sm font-semibold text-council-primary underline underline-offset-4 focus-visible:outline focus-visible:outline-2"
                >
                  (242) 604-6017
                </a>
              </div>
              <p className="text-sm text-slate-600">
                Monday–Friday, 9:00am–5:00pm
              </p>
            </div>
            <div className="min-w-0 border-l-2 border-rose-200 pl-5">
              <h2 className="flex items-center gap-2 text-lg font-bold text-council-dark">
                <Mail size={21} aria-hidden="true" />
                Email us
              </h2>
              <a
                href="mailto:info@nursingcouncilbahamas.com"
                className="mt-2 inline-flex min-h-11 items-center break-all text-sm font-semibold text-council-primary underline underline-offset-4 focus-visible:outline focus-visible:outline-2"
              >
                info@nursingcouncilbahamas.com
              </a>
              <p className="text-sm text-slate-600">
                General Council enquiries
              </p>
            </div>
            <div className="border-l-2 border-rose-200 pl-5">
              <h2 className="flex items-center gap-2 text-lg font-bold text-council-dark">
                <MapPin size={21} aria-hidden="true" />
                Visit us
              </h2>
              <a
                href="#office-location"
                className="mt-2 inline-flex min-h-11 items-center text-sm font-semibold text-council-primary underline underline-offset-4 focus-visible:outline focus-visible:outline-2"
              >
                #23 Capital House, Nassau
              </a>
              <p className="text-sm text-slate-600">
                Virginia and Augusta Streets
              </p>
            </div>
          </div>
        </section>
        <section className="border-t border-slate-100 bg-slate-50 py-10 lg:py-12">
          <div className="container mx-auto grid gap-10 px-4 lg:grid-cols-[1.1fr_0.9fr]">
            <div id="enquiry-form" className="min-w-0 scroll-mt-6">
              <h2 className="mb-3 text-3xl font-bold text-council-dark">
                Send an enquiry
              </h2>
              <p className="mb-6 max-w-xl leading-relaxed text-slate-600">
                Ask about Council services or get help with an application. For
                concerns about nursing care or professional conduct,{" "}
                <Link
                  href="/complaints"
                  className="font-semibold text-council-primary underline underline-offset-4"
                >
                  use the complaints service
                </Link>
                .
              </p>
              <EnquiryForm />
            </div>
            <div id="office-location" className="min-w-0 scroll-mt-6">
              <h2 className="mb-5 text-3xl font-bold text-council-dark">
                Our location
              </h2>
              <div
                className="overflow-hidden rounded-lg border border-slate-200 bg-slate-100"
                style={{ height: "280px" }}
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3604.456!2d-77.356!3d25.08!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x892f7c99b66b7e23%3A0x8e7b8f0c8e7b8f0c!2sVirginia%20St%20%26%20Augusta%20St%2C%20Nassau%2C%20Bahamas!5e0!3m2!1sen!2sus!4v1643723400000"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Nursing Council of the Bahamas Location"
                />
              </div>
              <dl className="mt-6 grid gap-6 sm:grid-cols-2">
                <div>
                  <dt className="font-bold text-council-dark">Address</dt>
                  <dd className="mt-2 text-sm leading-relaxed text-slate-600">
                    #23 Capital House
                    <br />
                    Virginia and Augusta Streets
                    <br />
                    Nassau, Bahamas
                  </dd>
                </div>
                <div>
                  <dt className="font-bold text-council-dark">Office hours</dt>
                  <dd className="mt-2 text-sm leading-relaxed text-slate-600">
                    Monday–Friday: 9:00am–5:00pm
                    <br />
                    Saturday–Sunday: Closed
                  </dd>
                </div>
                <div>
                  <dt className="font-bold text-council-dark">
                    Public holidays
                  </dt>
                  <dd className="mt-2 text-sm leading-relaxed text-slate-600">
                    Closed on Bahamian public holidays.
                  </dd>
                </div>
                <div>
                  <dt className="font-bold text-council-dark">Parking</dt>
                  <dd className="mt-2 text-sm leading-relaxed text-slate-600">
                    Designated parking at the rear of the building and along
                    Augusta Street.
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </section>
        <section
          id="departments"
          className="scroll-mt-6 bg-white py-10 lg:py-12"
        >
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-council-dark">
              Department contacts
            </h2>
            <p className="mt-3 max-w-2xl leading-relaxed text-slate-600">
              Use the general enquiry form if you are unsure which team to
              contact.
            </p>
            <div className="mt-7 grid gap-x-10 gap-y-6 md:grid-cols-2">
              {departmentContacts.map((department) => (
                <article
                  key={department.department}
                  className="min-w-0 border-t border-slate-200 pt-5"
                >
                  <h3 className="text-xl font-bold text-council-dark">
                    {department.department}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {department.description}
                  </p>
                  <div className="mt-3 flex flex-col items-start">
                    <a
                      href={`mailto:${department.email}`}
                      className="inline-flex min-h-11 items-center gap-2 break-all text-sm font-semibold text-council-primary underline underline-offset-4 focus-visible:outline focus-visible:outline-2"
                    >
                      <Mail size={16} aria-hidden="true" className="shrink-0" />
                      {department.email}
                    </a>
                    <a
                      href={`tel:+12426046015;ext=${department.phone.split("ext. ")[1]}`}
                      className="inline-flex min-h-11 items-center gap-2 text-sm text-slate-600 underline underline-offset-4 focus-visible:outline focus-visible:outline-2"
                    >
                      <Phone size={16} aria-hidden="true" />
                      {department.phone}
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
