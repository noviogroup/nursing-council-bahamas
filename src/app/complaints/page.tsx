import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  InteriorPageHeader,
  PageAction,
  PageAssistance,
} from "@/components/InteriorPage";
import { WarningCircle } from "@phosphor-icons/react/dist/ssr";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Complaints & Concerns",
  description:
    "Make a complaint to the Nursing Council or track a complaint you have already submitted.",
  path: "/complaints",
});

const processSteps = [
  {
    title: "Tell us what happened",
    description:
      "Give your contact details, who the complaint is about, what happened and when. You can attach documents or photos.",
  },
  {
    title: "Get a tracking number",
    description:
      "When you submit, you receive a tracking number such as NC-2026-00012. Keep it with the email address you used.",
  },
  {
    title: "The Council reviews it",
    description:
      "Council staff check the complaint, may contact you for more information, and decide the next step.",
  },
  {
    title: "Check progress",
    description:
      "Enter your tracking number and email address at any time to see the current status of your complaint.",
  },
];

const acceptedSubjects = ["Nurse", "Midwife", "Applicant", "Licensee"];

export default function ComplaintsPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <InteriorPageHeader
          title="Complaints & concerns"
          description="Report a concern about a nurse, midwife, applicant or licensee. You can save your answers and return later with a private link."
        >
          <PageAction href="/complaints/new">Start a complaint</PageAction>
          <PageAction href="/complaints/track" secondary>
            Track a complaint
          </PageAction>
        </InteriorPageHeader>
        <section className="bg-white py-10 lg:py-12">
          <div className="container mx-auto grid gap-8 px-4 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
            <div>
              <h2 className="text-2xl font-bold text-council-dark">
                Who a complaint can be about
              </h2>
              <p className="mt-3 max-w-xl leading-relaxed text-slate-600">
                You can mention the hospital, clinic or employer, but the
                complaint must be about an individual person.
              </p>
              <ul className="mt-5 flex flex-wrap gap-3">
                {acceptedSubjects.map((subject) => (
                  <li
                    key={subject}
                    className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-700"
                  >
                    {subject}
                  </li>
                ))}
              </ul>
            </div>
            <aside className="self-start rounded-lg border border-amber-200 bg-amber-50 p-5">
              <h2 className="flex items-center gap-2 text-lg font-bold text-amber-950">
                <WarningCircle size={24} aria-hidden="true" />
                Emergency matters
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-amber-950">
                This form is not an emergency service. If someone is in
                immediate danger, contact emergency services or the appropriate
                authority first.
              </p>
            </aside>
          </div>
        </section>
        <section className="bg-slate-50 py-10 lg:py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-council-dark">
              What happens when you complain
            </h2>
            <ol className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {processSteps.map((step, index) => (
                <li key={step.title}>
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-council-primary text-sm font-bold text-white">
                    {index + 1}
                  </span>
                  <h3 className="mt-4 text-lg font-bold text-council-dark">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {step.description}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>
        <PageAssistance
          title="Have a service or application question?"
          description="For help with an application, registration or another Council service, send a general enquiry."
          href="/contact#enquiry-form"
          action="Send an enquiry"
        />
      </main>
      <Footer />
    </>
  );
}
