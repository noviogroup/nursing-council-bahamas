import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { InteriorPageHeader, PageSectionNav } from "@/components/InteriorPage";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Accessibility",
  description:
    "The Council aims to make its public information and online services usable for all visitors.",
  path: "/accessibility",
});

export default function AccessibilityPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-white">
        <InteriorPageHeader
          title="Accessibility"
          description="The Council aims to make its public information and online services usable for all visitors."
        />
        <PageSectionNav
          links={[
            { label: "Using this website", href: "#using-the-site" },
            { label: "Documents and linked services", href: "#documents" },
            { label: "Report an accessibility barrier", href: "#help" },
          ]}
        />
        <div className="container mx-auto px-4 py-10 lg:py-12">
          <div className="max-w-3xl space-y-7">
            <section
              id="using-the-site"
              className="scroll-mt-6 border-b border-slate-200 pb-7 last:border-b-0"
            >
              <h2 className="mb-3 text-2xl font-bold text-council-dark">
                Using this website
              </h2>
              <div className="space-y-4 leading-[1.8] text-slate-600">
                <p>
                  The website uses headings, labelled controls and visible
                  keyboard focus to help visitors navigate. You can use the Tab
                  key to move between links and controls, and use your browser’s
                  zoom controls to enlarge text.
                </p>
                <p>
                  Longer information pages include section links and expandable
                  content. You can open expandable sections with the keyboard
                  and return to the main navigation to choose another service.
                </p>
              </div>
            </section>
            <section
              id="documents"
              className="scroll-mt-6 border-b border-slate-200 pb-7 last:border-b-0"
            >
              <h2 className="mb-3 text-2xl font-bold text-council-dark">
                Documents and linked services
              </h2>
              <div className="space-y-4 leading-[1.8] text-slate-600">
                <p>
                  Some information is provided as a PDF or through a linked
                  service. If a document or service is difficult to use, contact
                  the Council and explain what information you need and the
                  format that would help.
                </p>
              </div>
            </section>
            <section
              id="help"
              className="scroll-mt-6 border-b border-slate-200 pb-7 last:border-b-0"
            >
              <h2 className="mb-3 text-2xl font-bold text-council-dark">
                Report an accessibility barrier
              </h2>
              <div className="space-y-4 leading-[1.8] text-slate-600">
                <p>
                  Tell us which page or service you were using, what you were
                  trying to do and what prevented you from completing it.
                  Include your browser or assistive technology if you are
                  comfortable sharing it.
                </p>
                <p>
                  <a
                    href="mailto:info@nursingcouncilbahamas.com"
                    className="break-all font-semibold text-council-primary underline underline-offset-4"
                  >
                    Email info@nursingcouncilbahamas.com
                  </a>
                  , or call{" "}
                  <a
                    href="tel:+12426046015"
                    className="font-semibold text-council-primary underline underline-offset-4"
                  >
                    (242) 604-6015
                  </a>{" "}
                  /{" "}
                  <a
                    href="tel:+12426046017"
                    className="font-semibold text-council-primary underline underline-offset-4"
                  >
                    6017
                  </a>
                  .
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
