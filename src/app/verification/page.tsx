import Link from 'next/link';
import {
  ArrowRight,
  CheckCircle,
  IdentificationCard,
  SealCheck,
} from '@phosphor-icons/react/dist/ssr';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { createPageMetadata } from '@/lib/seo';
import { portalPath } from '@/lib/portal';

export const metadata = createPageMetadata({
  title: 'Registration and Licence Verification',
  description: 'Browse the nurse registry, access licence verification, or request official good-standing guidance from the Nursing Council.',
  path: '/verification',
});

const verificationOptions = [
  {
    audience: 'For the public',
    title: 'Verify a nurse’s registration or enrollment',
    description: 'Search the public registry by name or registration/enrollment number.',
    icon: IdentificationCard,
    action: 'Browse the nurse registry',
    href: '/registry',
  },
  {
    audience: 'For nurses',
    title: 'Request a Letter of Good Standing',
    description: 'Sign in to Nurse 360 and choose Certificate of good standing in Certificates & Letters. Have the purpose and recipient details ready.',
    icon: SealCheck,
    action: 'Open Certificates & Letters',
    href: portalPath('/nursing/certificates'),
  },
];

const publicInfo = [
  'Nurse’s name',
  'Registration or enrollment type',
  'Registration or enrollment number',
  'Original registration or enrollment year',
];

export default function VerificationPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="bg-council-primary py-20 text-white lg:py-28" data-page-hero="verification">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="font-heading mb-6 text-5xl font-bold leading-tight md:text-6xl">
                Verify a nurse or request an official letter.
              </h1>
              <p className="text-xl leading-relaxed text-white/85">
                Members of the public can search the nurse registry. Nurses can request an official Letter of Good Standing.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white py-20 lg:py-28">
          <div className="container mx-auto px-4">
            <div className="mb-12 grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
              <div>
                <h2 className="font-heading text-4xl font-bold leading-tight text-council-dark md:text-5xl">
                  Choose a verification service.
                </h2>
              </div>
              <p className="max-w-2xl text-lg leading-relaxed text-gray-600">
                Use the public registry for a registration or enrollment check. Request official letters in Nurse 360 and follow the Council’s review there.
              </p>
            </div>

            <div className="grid gap-px overflow-hidden rounded-[8px] border border-slate-200 bg-slate-200 md:grid-cols-2">
              {verificationOptions.map((option) => {
                const Icon = option.icon;
                return (
                  <article key={option.title} className="bg-white p-8">
                    <Icon className="mb-8 h-10 w-10 text-council-primary" aria-hidden="true" />
                    <p className="mb-3 text-sm font-bold uppercase tracking-[0.14em] text-council-primary">{option.audience}</p>
                    <h3 className="font-heading mb-4 text-3xl font-bold text-council-dark">{option.title}</h3>
                    <p className="mb-8 leading-relaxed text-gray-600">{option.description}</p>
                    <Link href={option.href} className="inline-flex items-center gap-2 rounded-[8px] bg-council-primary px-5 py-3 font-semibold text-white transition-colors hover:bg-council-secondary">
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
              <h2 className="font-heading mb-5 text-4xl font-bold leading-tight text-council-dark md:text-5xl">
                Information shown in the public registry.
              </h2>
              <p className="max-w-md leading-relaxed text-gray-600">
                The registry displays limited public information. Contact the Council if a result is unclear.
              </p>
            </div>
            <div className="grid gap-px overflow-hidden rounded-[8px] border border-slate-200 bg-slate-200 sm:grid-cols-2">
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
              <h2 className="font-heading text-4xl font-bold">Nurses can request a Letter of Good Standing through the Council.</h2>
            </div>
            <Link href={portalPath('/nursing/certificates')} className="inline-flex items-center justify-center gap-2 rounded-[8px] bg-white px-6 py-3 font-semibold text-council-primary transition-colors hover:bg-gray-100">
              Open Certificates & Letters
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
