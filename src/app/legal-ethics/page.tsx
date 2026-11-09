import {
  ArrowUpRight,
  DownloadSimple,
  FileText,
} from "@phosphor-icons/react/dist/ssr";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { InteriorPageHeader, PageAssistance } from "@/components/InteriorPage";
import { createPageMetadata } from "@/lib/seo";
import { councilDocuments } from "@/lib/councilContent";

export const metadata = createPageMetadata({
  title: "Legal & Ethics",
  description:
    "Read the Nurses and Midwives Act, Appointed Day Notice and Council Code of Ethics.",
  path: "/legal-ethics",
  image: "/assets/approved/legal-hero-nurse.jpg",
});
const documents: {
  id: string;
  label: string;
  href: string;
  description: string;
  external?: boolean;
}[] = [
  {
    id: "act",
    ...councilDocuments.act,
    description:
      "The legal framework for nursing and midwifery education, registration, enrollment, licensure, conduct and professional practice.",
  },
  {
    id: "appointed-day",
    ...councilDocuments.appointedDayNotice,
    description:
      "The official Appointed Day Notice associated with the Nurses and Midwives Act.",
    external: true,
  },
  {
    id: "code-of-ethics",
    ...councilDocuments.codeOfEthics,
    description:
      "Professional ethical guidance on responsibilities to patients, the public, colleagues and the nursing profession.",
  },
];

export default function LegalEthicsPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <InteriorPageHeader
          title="Legal & ethics"
          description="Read the legislation and professional guidance that underpin nursing and midwifery practice in The Bahamas."
          image={{
            src: "/assets/approved/legal-hero-nurse.jpg",
            alt: "Nursing professional wearing a stethoscope",
            position: "60% center",
          }}
        />
        <section
          className="bg-white py-10 lg:py-12"
          aria-label="Council documents"
        >
          <div className="container mx-auto px-4">
            <div className="divide-y divide-slate-200 rounded-lg border border-slate-200">
              {documents.map((document) => (
                <article
                  key={document.id}
                  id={document.id}
                  className="grid scroll-mt-6 gap-5 p-5 sm:p-7 lg:grid-cols-[1fr_auto] lg:items-center"
                >
                  <div className="flex items-start gap-4">
                    <FileText
                      size={28}
                      aria-hidden="true"
                      className="mt-1 shrink-0 text-council-primary"
                    />
                    <div>
                      <h2 className="text-xl font-bold text-council-dark sm:text-2xl">
                        {document.label}
                      </h2>
                      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
                        {document.description}
                      </p>
                      <p className="mt-2 text-xs font-medium text-slate-500">
                        PDF
                        {document.external
                          ? " · Bahamas legislation website"
                          : ""}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <a
                      href={document.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Open ${document.label} (PDF, new tab)`}
                      className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-council-primary px-5 py-3 text-sm font-bold text-white hover:bg-council-secondary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-council-primary"
                    >
                      Open PDF
                      <ArrowUpRight size={17} aria-hidden="true" />
                    </a>
                    {!document.external && (
                      <a
                        href={document.href}
                        download
                        aria-label={`Download ${document.label} (PDF)`}
                        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg border border-slate-200 px-4 py-3 text-sm font-semibold text-council-primary hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-council-primary"
                      >
                        <DownloadSimple size={17} aria-hidden="true" />
                        Download
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
        <PageAssistance
          title="Need help finding guidance?"
          description="Contact the Council about a document or a question relating to nursing regulation."
        />
      </main>
      <Footer />
    </>
  );
}
