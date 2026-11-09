import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  InteriorPageHeader,
  PageSectionNav,
  PageAction,
  PageAssistance,
} from "@/components/InteriorPage";
import { createPageMetadata } from "@/lib/seo";
import { licensedAgencies } from "@/lib/councilContent";
import { serviceContactPath } from "@/lib/councilServices";

export const metadata = createPageMetadata({
  title: "Nursing Agencies",
  description:
    "View the Council-supplied nursing agency list and get assistance with agency licensing and renewal.",
  path: "/nursing-agencies",
  image: "/assets/approved/agency-hero-home-care.jpg",
});

export default function NursingAgenciesPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <InteriorPageHeader
          title="Nursing agencies"
          description="Find nursing agencies listed by the Council, or get guidance on agency licensing, renewal and compliance."
          image={{
            src: "/assets/approved/agency-hero-home-care.jpg",
            alt: "Nurse providing care and medication guidance to an older adult at home",
            position: "right center",
          }}
        />
        <PageSectionNav
          links={[
            { label: "Agency directory", href: "#agency-directory" },
            { label: "Licensing & renewal", href: "#agency-licensing" },
          ]}
        />
        <section
          id="agency-directory"
          className="scroll-mt-6 bg-white py-10 lg:py-12"
        >
          <div className="container mx-auto px-4">
            <div className="mb-7 grid gap-4 lg:grid-cols-2">
              <h2 className="text-3xl font-bold text-council-dark">
                Agency directory
              </h2>
              <p className="max-w-2xl leading-relaxed text-slate-600">
                These agencies appear on the list supplied by the Council.
                Contact the Council to confirm an agency’s current licence
                status.
              </p>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {licensedAgencies.map((agency) => (
                <article
                  key={agency.name}
                  className="overflow-hidden rounded-lg border border-slate-200 bg-white"
                >
                  <div
                    className={`relative h-32 border-b border-slate-100 ${agency.logoPanelClassName}`}
                  >
                    <Image
                      src={agency.logo}
                      alt={agency.logoAlt}
                      fill
                      sizes="(min-width: 768px) 30vw, 100vw"
                      className={agency.logoClassName}
                    />
                  </div>
                  <h3 className="p-5 text-lg font-bold leading-snug text-council-dark">
                    {agency.name}
                  </h3>
                </article>
              ))}
            </div>
            <div className="mt-6">
              <PageAction
                href="/contact?service=agency-status#enquiry-form"
                secondary
              >
                Ask about an agency’s status
              </PageAction>
            </div>
          </div>
        </section>
        <section
          id="agency-licensing"
          className="scroll-mt-6 bg-slate-50 py-10 lg:py-12"
        >
          <div className="container mx-auto grid gap-8 px-4 lg:grid-cols-2 lg:gap-12">
            <div>
              <h2 className="text-3xl font-bold text-council-dark">
                Licensing & renewal
              </h2>
              <p className="mt-3 max-w-xl leading-relaxed text-slate-600">
                Agency applications and renewals currently need Council
                assistance. Ask for the approved documents, requirements and
                applicable fees before preparing your submission.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <PageAction href={serviceContactPath("agency-application")}>
                  Ask about agency licensing
                </PageAction>
                <PageAction
                  href={serviceContactPath("agency-renewal")}
                  secondary
                >
                  Ask about renewal
                </PageAction>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-council-dark">
                What happens next
              </h3>
              <ol className="mt-4 space-y-4">
                {[
                  "Prepare and submit the documents confirmed by the Council.",
                  "The Council reviews your application and compliance information.",
                  "The Council communicates its licensing, renewal or follow-up decision.",
                ].map((step, index) => (
                  <li
                    key={step}
                    className="flex gap-3 text-sm leading-relaxed text-slate-600"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-slate-300 font-bold text-council-primary">
                      {index + 1}
                    </span>
                    <span className="pt-0.5">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </section>
        <PageAssistance
          title="Looking for other Council services?"
          description="The service directory explains the available applications and how to get assistance."
          href="/forms"
          action="View Forms & Applications"
        />
      </main>
      <Footer />
    </>
  );
}
