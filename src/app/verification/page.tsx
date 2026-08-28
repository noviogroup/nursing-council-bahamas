import Link from 'next/link';
import {
  ArrowRight,
  CheckCircle,
  IdentificationCard,
  SealCheck,
} from '@phosphor-icons/react/dist/ssr';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
const verificationOptions = [
  {
    title: 'Verify a Nurse’s Registration/Enrollment Status',
    description: 'Search the published registry by name or registration/enrollment number.',
    icon: IdentificationCard,
    action: 'Browse nurse registry',
    href: '/registry',
  },
  {
    title: 'Apply as a Nurse for a Letter of Good Standing',
    description: 'Use the Council application process to request an official Letter of Good Standing for employment, education, or regulatory purposes.',
    icon: SealCheck,
    action: 'Find the application form',
    href: '/forms',
  },
];

const publicInfo = [
  'Name and registration/enrollment reference where available',
  'General registration/enrollment status',
  'Instructions for requesting formal letters',
  'Council contact instructions for unclear results',
];

export default function VerificationPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="bg-council-primary py-20 text-white lg:py-28">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <p className="mb-5 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.16em] text-council-accent">
                <span className="h-px w-10 bg-council-accent" />
                Verification
              </p>
              <h1 className="font-heading mb-6 text-5xl font-bold leading-tight md:text-6xl">
                Verify registration/enrollment or request good standing.
              </h1>
              <p className="text-xl leading-relaxed text-white/85">
                Choose whether to verify a nurse&apos;s registration/enrollment status or apply as a nurse for a Letter of Good Standing.
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
                  Verification services
                </p>
                <h2 className="font-heading text-4xl font-bold leading-tight text-council-dark md:text-5xl">
                  Select the correct verification path.
                </h2>
              </div>
              <p className="max-w-2xl text-lg leading-relaxed text-gray-600">
                Public verification shows only the information needed to confirm status and directs formal requests to the Council.
              </p>
            </div>

            <div className="grid gap-px overflow-hidden rounded-sm border border-slate-200 bg-slate-200 md:grid-cols-2">
              {verificationOptions.map((option) => {
                const Icon = option.icon;
                return (
                  <article key={option.title} className="bg-white p-8">
                    <Icon className="mb-8 h-10 w-10 text-council-primary" aria-hidden="true" />
                    <h3 className="font-heading mb-4 text-3xl font-bold text-council-dark">{option.title}</h3>
                    <p className="mb-8 leading-relaxed text-gray-600">{option.description}</p>
                    <Link href={option.href} className="inline-flex items-center gap-2 rounded-sm bg-council-primary px-5 py-3 font-semibold text-white transition-colors hover:bg-council-secondary">
                      {option.action}
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
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
                Public details
              </p>
              <h2 className="font-heading mb-5 text-4xl font-bold leading-tight text-council-dark md:text-5xl">
                What public verification should include.
              </h2>
              <p className="max-w-md leading-relaxed text-gray-600">
                Formal letters and detailed records should remain controlled through Council staff processes.
              </p>
            </div>
            <div className="grid gap-px overflow-hidden rounded-sm border border-slate-200 bg-slate-200 sm:grid-cols-2">
              {publicInfo.map((item) => (
                <div key={item} className="bg-white p-6">
                  <CheckCircle className="mb-5 h-8 w-8 text-council-primary" aria-hidden="true" />
                  <p className="leading-relaxed text-gray-700">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-council-primary py-20 text-white">
          <div className="container mx-auto grid gap-8 px-4 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-council-accent">Need a document?</p>
              <h2 className="font-heading text-4xl font-bold">Use the Council process for official good standing letters.</h2>
            </div>
            <Link href="/forms" className="inline-flex items-center justify-center gap-2 rounded-sm bg-white px-6 py-3 font-semibold text-council-primary transition-colors hover:bg-gray-100">
              View forms
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
