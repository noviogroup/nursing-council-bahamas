import Link from 'next/link';
import {
  ArrowRight,
  CheckCircle,
  ClipboardText,
  FileText,
  GraduationCap,
  ArrowsClockwise as Repeat,
  ShieldCheck,
} from '@phosphor-icons/react/dist/ssr';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'Unregulated Assistive Personnel',
  description: 'Review public guidance, application pathways, renewal information, and training resources for unregulated assistive personnel.',
  path: '/uaps',
});

const uapSections = [
  {
    title: 'Application to be Recorded',
    description: 'Placeholder guidance for UAP applicants who need to be recorded with the Council.',
    icon: ClipboardText,
    items: ['Application form placeholder', 'Identification requirement placeholder', 'Training evidence placeholder'],
  },
  {
    title: 'Application for Renewal',
    description: 'Placeholder guidance for UAP renewal requirements and supporting documents.',
    icon: Repeat,
    items: ['Renewal form placeholder', 'Current record confirmation placeholder', 'Renewal timeline placeholder'],
  },
  {
    title: 'Approved Training Institutions',
    description: 'Placeholder list for institutions approved to provide UAP training.',
    icon: GraduationCap,
    items: ['Institution list placeholder', 'Training programme status placeholder', 'Approval period placeholder'],
  },
  {
    title: 'Approved CPD Requirement',
    description: 'Placeholder for continuing professional development requirements applicable to UAPs.',
    icon: ShieldCheck,
    items: ['CPD hours placeholder', 'Accepted provider placeholder', 'Submission requirement placeholder'],
  },
];

export default function UapsPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="bg-council-primary py-20 text-white lg:py-28">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <p className="mb-5 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.16em] text-council-accent">
                <span className="h-px w-10 bg-council-accent" />
                UAPs
              </p>
              <h1 className="font-heading mb-6 text-5xl font-bold leading-tight md:text-6xl">
                Unlicensed assistive personnel information.
              </h1>
              <p className="text-xl leading-relaxed text-white/85">
                Public placeholder content for UAP recording, renewal, approved training institutions, and CPD requirements.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white py-20 lg:py-28">
          <div className="container mx-auto px-4">
            <div className="mb-12 grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
              <div>
                <p className="mb-4 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.16em] text-council-primary">
                  <span className="h-px w-9 bg-council-accent" />
                  UAP public resources
                </p>
                <h2 className="font-heading text-4xl font-bold leading-tight text-council-dark md:text-5xl">
                  Recording, renewal, training, and CPD.
                </h2>
              </div>
              <p className="max-w-2xl text-lg leading-relaxed text-gray-600">
                Official form PDFs and final requirement text can be attached once supplied by the Council.
              </p>
            </div>

            <div className="grid gap-px overflow-hidden rounded-[8px] border border-slate-200 bg-slate-200 md:grid-cols-2">
              {uapSections.map((section, index) => {
                const Icon = section.icon;
                return (
                  <article key={section.title} className="bg-white p-7 md:p-8">
                    <div className="mb-8 flex items-start justify-between">
                      <Icon className="h-9 w-9 text-council-primary" aria-hidden="true" />
                      <span className="font-heading text-2xl font-bold text-council-accent">0{index + 1}</span>
                    </div>
                    <h3 className="font-heading mb-3 text-2xl font-bold text-council-dark">{section.title}</h3>
                    <p className="mb-6 leading-relaxed text-gray-600">{section.description}</p>
                    <ul className="space-y-3">
                      {section.items.map((item) => (
                        <li key={item} className="flex gap-3 text-sm leading-relaxed text-gray-700">
                          <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-council-primary" aria-hidden="true" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-gray-50 py-20 lg:py-28">
          <div className="container mx-auto grid gap-12 px-4 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <p className="mb-4 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.16em] text-council-primary">
                <span className="h-px w-9 bg-council-accent" />
                Documents
              </p>
              <h2 className="font-heading mb-5 text-4xl font-bold leading-tight text-council-dark md:text-5xl">
                UAP PDFs are placeholders for now.
              </h2>
              <p className="max-w-md leading-relaxed text-gray-600">
                The page structure is ready for final forms, requirements, and approved training lists.
              </p>
            </div>
            <div className="rounded-[8px] border border-slate-200 bg-white p-8 shadow-sm">
              <FileText className="mb-6 h-10 w-10 text-council-primary" aria-hidden="true" />
              <h3 className="font-heading mb-3 text-2xl font-bold text-council-dark">Forms will be published in the Forms library.</h3>
              <p className="mb-8 leading-relaxed text-gray-600">
                UAP application and renewal forms are visible as placeholder rows on the Forms & Documents page.
              </p>
              <Link href="/forms" className="inline-flex items-center gap-2 rounded-[8px] bg-council-primary px-5 py-3 font-semibold text-white transition-colors hover:bg-council-secondary">
                View UAP form placeholders
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
