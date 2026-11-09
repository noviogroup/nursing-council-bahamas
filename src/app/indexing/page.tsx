import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  InteriorPageHeader,
  PageSectionNav,
  PageAction,
  PageAssistance,
} from "@/components/InteriorPage";
import { portalPath } from "@/lib/portal";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Nursing Student Indexing",
  description:
    "Prepare for student indexing: review the documents and steps, then start in Nurse 360.",
  path: "/indexing",
});

// Aligned with the portal's indexingDocumentSlots and StartPage indexing guide.
const documents = [
  {
    title: "College preparatory transcript",
    detail: "A certified copy of your transcript.",
  },
  {
    title: "Medical certificate",
    detail: "Signed by a registered medical practitioner.",
  },
  {
    title: "Character reference",
    detail:
      "A signed letter from someone who knows you, other than a relative.",
  },
  {
    title: "Police character certificate",
    detail:
      "Issued within the last six months. Upload a copy and bring the original to the Council.",
  },
  { title: "Birth certificate", detail: "Your digital birth certificate." },
  {
    title: "First four pages of your passport",
    detail:
      "Your passport must be current. Use one PDF or clear photographs of all four pages.",
  },
  {
    title: "Marriage certificate",
    detail: "If you enter a maiden name in your application.",
    conditional: true,
  },
  {
    title: "Photo I.D.",
    detail: "A clear, recent photograph of your face for your indexing form.",
  },
];
const steps = [
  {
    title: "Complete your application",
    detail:
      "Start in Nurse 360, enter your details and upload your documents. You receive a tracking number when you submit.",
  },
  {
    title: "Get your school’s signatures",
    detail:
      "Print your form and take it, with your documents, to your programme coordinator and chairperson to sign.",
  },
  {
    title: "Provide your documents",
    detail:
      "Your school sends your packet to the Council. Bring your original police certificate to the Council and follow the fee guidance shown in Nurse 360.",
  },
  {
    title: "Follow the Council’s review",
    detail:
      "The Council checks your packet and issues your index number. You are notified in the portal.",
  },
];

export default function IndexingPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <InteriorPageHeader
          title="Student indexing"
          description="For students entering a Council-approved nursing or midwifery programme who have not yet been indexed. Indexing records you with the Council as a student."
          parent={{
            label: "Education & training",
            href: "/education-training",
          }}
        >
          <PageAction href={portalPath("/start/indexing")}>
            Start student indexing
          </PageAction>
          <PageAction
            href="/education-training#approved-institutions"
            secondary
          >
            Approved schools & programmes
          </PageAction>
        </InteriorPageHeader>
        <PageSectionNav
          links={[
            { label: "What to prepare", href: "#prepare" },
            { label: "How it works", href: "#how-it-works" },
          ]}
        />
        <section id="prepare" className="scroll-mt-6 bg-white py-10 lg:py-12">
          <div className="container mx-auto grid gap-8 px-4 lg:grid-cols-[0.65fr_1.35fr] lg:gap-12">
            <div>
              <h2 className="text-3xl font-bold text-council-dark">
                What to prepare
              </h2>
              <p className="mt-3 max-w-md leading-relaxed text-slate-600">
                Have your programme and education details ready, including your
                high school diploma or equivalent, certificate types, subjects,
                grades and completion years.
              </p>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-600">
                Enter names and qualifications as they appear on your documents.
                Nurse 360 explains the uploads and any requirements that apply
                to your answers.
              </p>
            </div>
            <dl className="grid gap-x-8 sm:grid-cols-2">
              {documents.map((document) => (
                <div
                  key={document.title}
                  className="border-t border-slate-200 py-5"
                >
                  <dt className="font-bold text-council-dark">
                    {document.title}
                    {document.conditional && (
                      <span className="ml-2 inline-block rounded bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
                        If applicable
                      </span>
                    )}
                  </dt>
                  <dd className="mt-2 text-sm leading-relaxed text-slate-600">
                    {document.detail}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
        <section
          id="how-it-works"
          className="scroll-mt-6 bg-slate-50 py-10 lg:py-12"
        >
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-council-dark">
              How indexing works
            </h2>
            <ol className="mt-7 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((step, index) => (
                <li key={step.title}>
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-council-primary text-sm font-bold text-white">
                    {index + 1}
                  </span>
                  <h3 className="mt-4 text-lg font-bold text-council-dark">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {step.detail}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>
        <PageAssistance
          title="Need help preparing your application?"
          description="Ask the Council about student indexing before you submit. If you are already indexed and want to sit an examination, choose the examination service in Nurse 360."
          href="/contact?service=student-indexing#enquiry-form"
          action="Ask about student indexing"
        />
      </main>
      <Footer />
    </>
  );
}
