import Link from 'next/link';
import {
  ArrowRight,
  CheckCircle,
  FileText,
} from '@phosphor-icons/react/dist/ssr';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { portalPath } from '@/lib/portal';
import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'Nursing Student Indexing',
  description: 'Review the Nursing Council process and requirements for nursing student indexing in The Bahamas.',
  path: '/indexing',
});

const indexingSteps = [
  'Confirm eligibility through an approved nursing or midwifery education pathway.',
  'Prepare the required identification, education, and programme documents.',
  'Submit the Nursing Student Indexing application through the portal or approved Council process.',
  'Track Council review status and respond to requests for additional information.',
];

const academicRequirements = [
  'High school diploma or equivalent',
  'Academic qualifications, including certificate type, subjects, grades, and year completed',
  'Confirmation of admission to an approved nursing or midwifery programme',
];

const supportingDocuments = [
  'College preparatory transcript',
  'Medical certificate',
  'Character reference',
  'Police certificate',
  'Birth certificate and passport',
  'Marriage certificate, if applicable',
  'Government-issued photo identification',
];

export default function IndexingPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="bg-council-primary py-20 text-white lg:py-28" data-page-hero="indexing">
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
                Nursing Student Indexing records applicants entering an approved nursing or midwifery education programme as students under Council oversight.
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
                Review the requirements before starting. The portal guides applicants through each section and identifies any missing information.
              </p>
            </div>
            <ol className="space-y-4">
              {indexingSteps.map((step, index) => (
                <li key={step} className="grid grid-cols-[3rem_1fr] gap-4 rounded-[8px] bg-gray-50 p-5">
                  <span className="flex h-12 w-12 items-center justify-center rounded-[8px] bg-council-primary font-heading text-lg font-bold text-white">
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
                  Application requirements
                </p>
                <h2 className="font-heading text-4xl font-bold leading-tight text-council-dark md:text-5xl">
                  Prepare your education details and documents.
                </h2>
              </div>
              <p className="max-w-2xl text-lg leading-relaxed text-gray-600">
                Enter your academic qualifications as they appear on your certificates, including subjects, grades, and completion year.
              </p>
            </div>
            <div className="grid gap-6 lg:grid-cols-2">
              <article className="rounded-[8px] border border-slate-200 bg-white p-7 shadow-sm">
                <CheckCircle className="mb-6 h-9 w-9 text-council-primary" aria-hidden="true" />
                <h3 className="font-heading text-2xl font-bold text-council-dark">Education information</h3>
                <ul className="mt-6 space-y-4">
                  {academicRequirements.map((item) => (
                    <li key={item} className="flex gap-3 leading-relaxed text-gray-700">
                      <CheckCircle className="mt-1 h-5 w-5 shrink-0 text-council-primary" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
              <article className="rounded-[8px] border border-slate-200 bg-white p-7 shadow-sm">
                <FileText className="mb-6 h-9 w-9 text-council-primary" aria-hidden="true" />
                <h3 className="font-heading text-2xl font-bold text-council-dark">Supporting documents</h3>
                <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                  {supportingDocuments.map((item) => (
                    <li key={item} className="flex gap-3 leading-relaxed text-gray-700">
                      <CheckCircle className="mt-1 h-5 w-5 shrink-0 text-council-primary" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </div>
          </div>
        </section>

        <section className="bg-council-primary py-20 text-white">
          <div className="container mx-auto grid gap-8 px-4 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-council-accent">Online action</p>
              <h2 className="font-heading text-4xl font-bold">Begin Nursing Student Indexing through the Council portal.</h2>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href={portalPath('/start/indexing')} className="inline-flex items-center justify-center gap-2 rounded-[8px] bg-white px-6 py-3 font-semibold text-council-primary transition-colors hover:bg-gray-100">
                Apply for Nursing Student Indexing
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link href="/forms" className="inline-flex items-center justify-center gap-2 rounded-[8px] border border-white/40 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10">
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
