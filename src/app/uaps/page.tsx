import {
  ClipboardText,
  GraduationCap,
  ArrowsClockwise as Repeat,
  ShieldCheck,
} from "@phosphor-icons/react/dist/ssr";
import Header from "@/components/Header";
import {
  InteriorPageHeader,
  PageAction,
  PageAssistance,
} from "@/components/InteriorPage";
import Footer from "@/components/Footer";
import { createPageMetadata } from "@/lib/seo";
import { serviceContactPath } from "@/lib/councilServices";

export const metadata = createPageMetadata({
  title: "Unlicensed Assistive Personnel",
  description:
    "Contact the Nursing Council for guidance on UAP recording, renewal, training, and continuing professional development.",
  path: "/uaps",
});

const uapSections = [
  {
    title: "Application to be Recorded",
    description:
      "Ask the Council how to be recorded as Unlicensed Assistive Personnel and which evidence is required for your circumstances.",
    icon: ClipboardText,
    action: "Ask about UAP recording",
    href: serviceContactPath("uap-recording"),
  },
  {
    title: "Application for Renewal",
    description:
      "Have your current Council record details available and ask for the renewal requirements that apply to you.",
    icon: Repeat,
    action: "Ask about UAP renewal",
    href: serviceContactPath("uap-renewal"),
  },
  {
    title: "Training Institutions",
    description:
      "Before enrolling in a UAP course, ask the Council to confirm the institution and programme’s approval status.",
    icon: GraduationCap,
    action: "Ask about UAP training",
    href: "/contact?service=uap-training#enquiry-form",
  },
  {
    title: "Continuing Professional Development",
    description:
      "Ask the Council which CPD requirements, providers, and evidence apply to your UAP record and renewal period.",
    icon: ShieldCheck,
    action: "Ask about UAP CPD",
    href: "/contact?service=uap-cpd#enquiry-form",
  },
];

export default function UapsPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <InteriorPageHeader
          title="Unlicensed Assistive Personnel"
          breadcrumb="UAP information"
          description="Council guidance for Unlicensed Assistive Personnel (UAPs): recording, renewal, training and continuing professional development."
        />

        <section className="bg-white py-10 lg:py-12">
          <div className="container mx-auto px-4">
            <div className="mb-7 grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
              <div>
                <h2 className="font-heading text-2xl font-bold leading-tight text-council-dark md:text-3xl">
                  Choose the help you need
                </h2>
              </div>
              <p className="max-w-2xl leading-relaxed text-gray-600">
                These services currently need Council assistance. Send an
                enquiry to confirm the current process before submitting
                documents or making a payment.
              </p>
            </div>

            <div className="grid gap-px overflow-hidden rounded-[8px] border border-slate-200 bg-slate-200 md:grid-cols-2">
              {uapSections.map((section) => {
                const Icon = section.icon;
                return (
                  <article key={section.title} className="bg-white p-7 md:p-8">
                    <div className="mb-4 flex items-start justify-between">
                      <Icon
                        className="h-9 w-9 text-council-primary"
                        aria-hidden="true"
                      />
                    </div>
                    <h3 className="font-heading mb-3 text-2xl font-bold text-council-dark">
                      {section.title}
                    </h3>
                    <p className="mb-6 leading-relaxed text-gray-600">
                      {section.description}
                    </p>
                    <PageAction href={section.href} secondary>
                      {section.action}
                    </PageAction>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <PageAssistance
          title="Before you apply"
          description="An enquiry asks the Council for guidance; it does not submit a UAP application. The service directory explains what to prepare for recording and renewal."
          href="/forms#uap-recording"
          action="View UAP services"
        />
      </main>
      <Footer />
    </>
  );
}
