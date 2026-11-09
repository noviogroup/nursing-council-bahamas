import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { InteriorPageHeader, PageSectionNav } from "@/components/InteriorPage";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Privacy Policy",
  description:
    "How the Council website handles enquiries, complaints and information about visits to its online services.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-white">
        <InteriorPageHeader
          title="Privacy Policy"
          description="How the Council website handles enquiries, complaints and information about visits to its online services."
        />
        <PageSectionNav
          links={[
            { label: "General enquiries", href: "#enquiries" },
            { label: "Complaints and saved drafts", href: "#complaints" },
            { label: "Website and portal visits", href: "#visits" },
            { label: "Nurse 360 and other services", href: "#services" },
            { label: "Questions about your information", href: "#questions" },
          ]}
        />
        <div className="container mx-auto px-4 py-10 lg:py-12">
          <div className="max-w-3xl space-y-7">
            <section
              id="enquiries"
              className="scroll-mt-6 border-b border-slate-200 pb-7 last:border-b-0"
            >
              <h2 className="mb-3 text-2xl font-bold text-council-dark">
                General enquiries
              </h2>
              <div className="space-y-4 leading-[1.8] text-slate-600">
                <p>
                  When you use the enquiry form, the Council receives your name,
                  email address, optional phone number, selected topic, subject
                  and message. Your enquiry is recorded so Council staff can
                  review and respond to it.
                </p>
                <p>
                  A general enquiry is separate from a formal complaint or an
                  application. Do not include passwords, patient records or
                  identity documents in the general enquiry form.
                </p>
              </div>
            </section>
            <section
              id="complaints"
              className="scroll-mt-6 border-b border-slate-200 pb-7 last:border-b-0"
            >
              <h2 className="mb-3 text-2xl font-bold text-council-dark">
                Complaints and saved drafts
              </h2>
              <div className="space-y-4 leading-[1.8] text-slate-600">
                <p>
                  A complaint can include your contact details, information
                  about the person concerned, an account of what happened and
                  any evidence you choose to provide. The Council uses this
                  information to review the concern, contact you and manage the
                  complaint.
                </p>
                <p>
                  Saving a draft stores your answers and provides a private link
                  for returning to them. The save confirmation shows when the
                  link expires. Selected evidence files are not saved in a draft
                  and must be chosen again before submission.
                </p>
                <p>
                  Keep draft and secure-response links private. Complaint
                  tracking shows the status and updates shared with you, rather
                  than the Council’s internal notes.
                </p>
              </div>
            </section>
            <section
              id="visits"
              className="scroll-mt-6 border-b border-slate-200 pb-7 last:border-b-0"
            >
              <h2 className="mb-3 text-2xl font-bold text-council-dark">
                Website and portal visits
              </h2>
              <div className="space-y-4 leading-[1.8] text-slate-600">
                <p>
                  While a page is open, the Council’s visit tracking records the
                  page, internet (IP) address, browser and device information,
                  and a random browser identifier. The identifier is stored in
                  your browser.
                </p>
                <p>
                  If you sign in to Nurse 360, that browser’s visit record is
                  associated with your account. This association can remain
                  after you sign out. Council staff use visit information to
                  understand service use, support visitors and help keep the
                  services secure.
                </p>
                <p>
                  Visit records that have been inactive for more than 30 days
                  are removed during routine cleanup. Website complaint
                  tracking, receipt, draft-resume and secure-response pages are
                  excluded from this visit tracking. Form answers are not sent
                  as part of a website visit record.
                </p>
              </div>
            </section>
            <section
              id="services"
              className="scroll-mt-6 border-b border-slate-200 pb-7 last:border-b-0"
            >
              <h2 className="mb-3 text-2xl font-bold text-council-dark">
                Nurse 360 and other services
              </h2>
              <div className="space-y-4 leading-[1.8] text-slate-600">
                <p>
                  Online applications and account services use Nurse 360 and the
                  privacy and security controls configured for that service.
                  Service availability and any required information are
                  explained in the relevant application.
                </p>
                <p>
                  The Contact page includes an embedded Google map. Viewing the
                  map connects your browser to Google Maps. External news
                  articles and other linked websites have their own privacy
                  practices.
                </p>
              </div>
            </section>
            <section
              id="questions"
              className="scroll-mt-6 border-b border-slate-200 pb-7 last:border-b-0"
            >
              <h2 className="mb-3 text-2xl font-bold text-council-dark">
                Questions about your information
              </h2>
              <div className="space-y-4 leading-[1.8] text-slate-600">
                <p>
                  Contact the Council with questions about how your enquiry,
                  complaint or application information is used, who can access
                  it, or how long it is retained.
                </p>
                <p>
                  <a
                    href="mailto:info@nursingcouncilbahamas.com"
                    className="break-all font-semibold text-council-primary underline underline-offset-4"
                  >
                    info@nursingcouncilbahamas.com
                  </a>
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
