import Link from 'next/link';
import {
  ArrowRight,
  FileText,
  IdentificationBadge,
} from '@phosphor-icons/react/dist/ssr';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { portalPath } from '@/lib/portal';

const indexingSteps = [
  'Confirm eligibility through an approved nursing or midwifery education pathway.',
  'Prepare the required identification, education, and programme documents.',
  'Submit the nursing student indexing application through the portal or approved Council process.',
  'Track Council review status and respond to requests for additional information.',
];

const placeholders = [
  'Nursing student indexing application form placeholder',
  'Programme confirmation document placeholder',
  'Student identification requirement placeholder',
  'Council review checklist placeholder',
];

export default function IndexingPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="bg-council-primary py-20 text-white lg:py-28">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <p className="mb-5 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.16em] text-council-accent">
                <span className="h-px w-10 bg-council-accent" />
                Nursing Student Indexing
              </p>
              <h1 className="font-heading mb-6 text-5xl font-bold leading-tight md:text-6xl">
                Nursing Student Indexing.
              </h1>
              <p className="text-xl leading-relaxed text-white/85">
                Nursing student indexing records students and applicants entering a nurse education programme under Council oversight.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white py-20 lg:py-28">
          <div className="container mx-auto grid gap-12 px-4 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <p className="mb-4 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.16em] text-council-primary">
                <span className="h-px w-9 bg-council-accent" />
                Process
              </p>
              <h2 className="font-heading mb-5 text-4xl font-bold leading-tight text-council-dark md:text-5xl">
                A clear route into Council records.
              </h2>
              <p className="max-w-md leading-relaxed text-gray-600">
                The final instructions and PDF forms are placeholders until the Council supplies the approved wording and documents.
              </p>
            </div>
            <ol className="space-y-4">
              {indexingSteps.map((step, index) => (
                <li key={step} className="grid grid-cols-[3rem_1fr] gap-4 rounded-sm bg-gray-50 p-5">
                  <span className="flex h-12 w-12 items-center justify-center rounded-sm bg-council-primary font-heading text-lg font-bold text-white">
                    {index + 1}
                  </span>
                  <p className="pt-2 leading-relaxed text-gray-700">{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="bg-gray-50 py-20 lg:py-28">
          <div className="container mx-auto px-4">
            <div className="mb-12 grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
              <div>
                <p className="mb-4 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.16em] text-council-primary">
                  <span className="h-px w-9 bg-council-accent" />
                  Forms pending
                </p>
                <h2 className="font-heading text-4xl font-bold leading-tight text-council-dark md:text-5xl">
                  Nursing student indexing documents.
                </h2>
              </div>
              <p className="max-w-2xl text-lg leading-relaxed text-gray-600">
                Placeholder rows are shown now so official PDFs can be attached later without changing the page structure.
              </p>
            </div>
            <div className="grid gap-px overflow-hidden rounded-sm border border-slate-200 bg-slate-200 md:grid-cols-2">
              {placeholders.map((item, index) => (
                <article key={item} className="bg-white p-7">
                  <div className="mb-7 flex items-start justify-between">
                    {index % 2 === 0 ? (
                      <FileText className="h-9 w-9 text-council-primary" aria-hidden="true" />
                    ) : (
                      <IdentificationBadge className="h-9 w-9 text-council-primary" aria-hidden="true" />
                    )}
                    <span className="rounded-sm bg-slate-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-slate-500">PDF coming soon</span>
                  </div>
                  <h3 className="font-heading text-xl font-bold text-council-dark">{item}</h3>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-council-primary py-20 text-white">
          <div className="container mx-auto grid gap-8 px-4 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-council-accent">Online action</p>
              <h2 className="font-heading text-4xl font-bold">Begin nursing student indexing through the Council portal.</h2>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href={portalPath('/register?type=indexing')} className="inline-flex items-center justify-center gap-2 rounded-sm bg-white px-6 py-3 font-semibold text-council-primary transition-colors hover:bg-gray-100">
                Apply for nursing student indexing
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link href="/forms" className="inline-flex items-center justify-center gap-2 rounded-sm border border-white/40 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10">
                View forms
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
