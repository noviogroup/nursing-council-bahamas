import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { InteriorPageHeader, PageSectionNav } from "@/components/InteriorPage";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Terms of Service",
  description:
    "Information about using the Council’s public website and linked online services.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-white">
        <InteriorPageHeader
          title="Terms of Service"
          description="Information about using the Council’s public website and linked online services."
        />
        <PageSectionNav
          links={[
            { label: "Using website information", href: "#information" },
            { label: "Official records", href: "#records" },
            { label: "Linked services", href: "#linked-services" },
            { label: "Updates and assistance", href: "#updates" },
          ]}
        />
        <div className="container mx-auto px-4 py-10 lg:py-12">
          <div className="max-w-3xl space-y-7">
            <section
              id="information"
              className="scroll-mt-6 border-b border-slate-200 pb-7 last:border-b-0"
            >
              <h2 className="mb-3 text-2xl font-bold text-council-dark">
                Using website information
              </h2>
              <div className="space-y-4 leading-[1.8] text-slate-600">
                <p>
                  This website provides information about Council services,
                  nursing education, registration, enrollment, committees and
                  public contact channels.
                </p>
                <p>
                  Check the relevant service guidance before preparing an
                  application or making a payment. Some services are available
                  in Nurse 360; others require Council assistance.
                </p>
              </div>
            </section>
            <section
              id="records"
              className="scroll-mt-6 border-b border-slate-200 pb-7 last:border-b-0"
            >
              <h2 className="mb-3 text-2xl font-bold text-council-dark">
                Official records
              </h2>
              <div className="space-y-4 leading-[1.8] text-slate-600">
                <p>
                  Official registration, enrollment, licence, payment and
                  verification records are maintained through Council systems
                  and authorised Council processes.
                </p>
                <p>
                  An enquiry acknowledgement confirms that a message was
                  recorded. It does not approve an application, issue a licence
                  or confirm a complaint decision.
                </p>
              </div>
            </section>
            <section
              id="linked-services"
              className="scroll-mt-6 border-b border-slate-200 pb-7 last:border-b-0"
            >
              <h2 className="mb-3 text-2xl font-bold text-council-dark">
                Linked services
              </h2>
              <div className="space-y-4 leading-[1.8] text-slate-600">
                <p>
                  Some links open Nurse 360 for applications, official letters
                  and account access. Portal users are responsible for
                  submitting accurate information.
                </p>
                <p>
                  News links open articles from their original publishers.
                  Document links identify PDF files and indicate when a new tab
                  will open.
                </p>
              </div>
            </section>
            <section
              id="updates"
              className="scroll-mt-6 border-b border-slate-200 pb-7 last:border-b-0"
            >
              <h2 className="mb-3 text-2xl font-bold text-council-dark">
                Updates and assistance
              </h2>
              <div className="space-y-4 leading-[1.8] text-slate-600">
                <p>
                  The Council may update website content, links and service
                  information as operational requirements change.
                </p>
                <p>
                  For help choosing a service or clarifying information,{" "}
                  <a
                    href="/contact"
                    className="font-semibold text-council-primary underline underline-offset-4"
                  >
                    contact the Council
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
