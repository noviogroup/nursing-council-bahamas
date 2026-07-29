import Link from 'next/link';
import {
  ArrowRight,
  FilePdf,
  FileText,
  FolderOpen,
  MagnifyingGlass,
} from '@phosphor-icons/react/dist/ssr';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const formGroups = [
  {
    title: 'Registration & Licensure',
    forms: [
      'Graduate Nurse Letter',
      'Registration - Local',
      'Registration - International',
      'Provisional (Temporary) Licence',
      'Licence Renewal',
    ],
  },
  {
    title: 'Education & Examination',
    forms: ['Indexing', 'Examination', 'Training Institution Approval'],
  },
  {
    title: 'Continuing Professional Development',
    forms: ['CPD Provider', 'CPD Event', 'Approved CPD Requirements'],
  },
  {
    title: 'Nursing Agencies & UAPs',
    forms: ['Nursing Agency Application', 'Nursing Agency Renewal', 'UAP Application to be Recorded', 'UAP Renewal'],
  },
];

export default function FormsPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="bg-council-primary py-20 text-white lg:py-28">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <p className="mb-5 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.16em] text-council-accent">
                <span className="h-px w-10 bg-council-accent" />
                Forms & documents
              </p>
              <h1 className="font-heading mb-6 text-5xl font-bold leading-tight md:text-6xl">
                Public forms library.
              </h1>
              <p className="text-xl leading-relaxed text-white/85">
                Placeholder entries are ready for Council forms. PDF files can be attached when the official documents are supplied.
              </p>
            </div>
          </div>
        </section>

        <section className="border-b border-slate-200 bg-white">
          <div className="container mx-auto px-4 py-6">
            <div className="relative max-w-xl">
              <MagnifyingGlass className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-council-primary" aria-hidden="true" />
              <div className="flex min-h-14 items-center rounded-sm border border-slate-300 bg-slate-50 pl-12 pr-4 text-sm text-slate-500">
                Search will be enabled when official form metadata is loaded.
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gray-50 py-20 lg:py-28">
          <div className="container mx-auto px-4">
            <div className="mb-12 grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
              <div>
                <p className="mb-4 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.16em] text-council-primary">
                  <span className="h-px w-9 bg-council-accent" />
                  Placeholder PDFs
                </p>
                <h2 className="font-heading text-4xl font-bold leading-tight text-council-dark md:text-5xl">
                  Forms requested by the Council.
                </h2>
              </div>
              <p className="max-w-2xl text-lg leading-relaxed text-gray-600">
                Each row is intentionally visible but inactive for now. When PDF files are provided, these placeholders can become download links.
              </p>
            </div>

            <div className="space-y-8">
              {formGroups.map((group) => (
                <section key={group.title} className="overflow-hidden rounded-sm border border-slate-200 bg-white shadow-sm">
                  <div className="border-b border-slate-200 bg-white p-6">
                    <div className="flex items-center gap-3">
                      <FolderOpen className="h-8 w-8 text-council-primary" aria-hidden="true" />
                      <h3 className="font-heading text-2xl font-bold text-council-dark">{group.title}</h3>
                    </div>
                  </div>
                  <div className="divide-y divide-slate-200">
                    {group.forms.map((form) => (
                      <div key={form} className="grid gap-4 p-5 sm:grid-cols-[1fr_auto] sm:items-center">
                        <div className="flex items-start gap-4">
                          <FileText className="mt-1 h-6 w-6 shrink-0 text-council-primary" aria-hidden="true" />
                          <div>
                            <h4 className="font-heading text-lg font-bold text-council-dark">{form}</h4>
                            <p className="mt-1 text-sm text-gray-500">PDF placeholder - official file not yet supplied.</p>
                          </div>
                        </div>
                        <span className="inline-flex w-fit items-center gap-2 rounded-sm border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-500">
                          <FilePdf className="h-4 w-4" aria-hidden="true" />
                          Coming soon
                        </span>
                      </div>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-council-primary py-20 text-white">
          <div className="container mx-auto grid gap-8 px-4 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-council-accent">Need help choosing a form?</p>
              <h2 className="font-heading text-4xl font-bold">Contact the Council before submitting documents.</h2>
            </div>
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 rounded-sm bg-white px-6 py-3 font-semibold text-council-primary transition-colors hover:bg-gray-100">
              Contact us
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
