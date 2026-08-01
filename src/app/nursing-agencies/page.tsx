import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Buildings,
  CheckCircle,
  ClipboardText,
  FileText,
  ShieldCheck,
} from '@phosphor-icons/react/dist/ssr';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const agencyHighlights = [
  {
    title: 'Licensed Nursing Agencies',
    description: 'Public list placeholder for agencies with current Council licensure.',
    icon: ShieldCheck,
    items: ['Agency name placeholder', 'Licence status placeholder', 'Renewal date placeholder'],
  },
  {
    title: 'Current Forms & Documents',
    description: 'Placeholder entries for agency licensing forms until official PDFs are supplied.',
    icon: FileText,
    items: ['Agency application form placeholder', 'Agency renewal form placeholder', 'Compliance checklist placeholder'],
  },
  {
    title: 'Agency Process',
    description: 'Overview of the review pathway for operating a nursing agency in The Bahamas.',
    icon: ClipboardText,
    items: ['Submit application documents', 'Council compliance review', 'Licensure, renewal, or follow-up decision'],
  },
];

const requirements = [
  'Valid business registration in The Bahamas',
  'Designated nursing supervisor with current registration',
  'Policies, procedures, and evidence of compliance controls',
  'Annual inspection or review where required by the Council',
];

export default function NursingAgenciesPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="bg-council-primary py-20 text-white lg:py-28">
          <div className="container mx-auto grid gap-10 px-4 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <div>
              <p className="mb-5 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.16em] text-council-accent">
                <span className="h-px w-10 bg-council-accent" />
                Nursing agencies
              </p>
              <h1 className="font-heading mb-6 text-5xl font-bold leading-tight md:text-6xl">
                Agency licensing and compliance.
              </h1>
              <p className="max-w-2xl text-xl leading-relaxed text-white/85">
                Review licensed nursing agencies, required documents, and the Council process for agency licensing and renewal.
              </p>
            </div>
            <div className="relative min-h-[340px] overflow-hidden rounded-sm border border-white/20">
              <Image
                src="/assets/approved/nurses-ub-1.png"
                alt="University of The Bahamas nursing pinning ceremony"
                fill
                priority
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </section>

        <section className="bg-white py-20 lg:py-28">
          <div className="container mx-auto px-4">
            <div className="mb-12 grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
              <div>
                <p className="mb-4 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.16em] text-council-primary">
                  <span className="h-px w-9 bg-council-accent" />
                  Public agency information
                </p>
                <h2 className="font-heading text-4xl font-bold leading-tight text-council-dark md:text-5xl">
                  Licensed agencies and documents.
                </h2>
              </div>
              <p className="max-w-2xl text-lg leading-relaxed text-gray-600">
                These entries are placeholders until the Council provides the official list of currently licensed agencies and PDF documents.
              </p>
            </div>

            <div className="grid gap-px overflow-hidden rounded-sm border border-slate-200 bg-slate-200 lg:grid-cols-3">
              {agencyHighlights.map((highlight, index) => {
                const Icon = highlight.icon;
                return (
                  <article key={highlight.title} className="bg-white p-7">
                    <div className="mb-8 flex items-start justify-between">
                      <Icon className="h-9 w-9 text-council-primary" aria-hidden="true" />
                      <span className="font-heading text-2xl font-bold text-council-accent">0{index + 1}</span>
                    </div>
                    <h3 className="font-heading mb-3 text-2xl font-bold text-council-dark">{highlight.title}</h3>
                    <p className="mb-6 leading-relaxed text-gray-600">{highlight.description}</p>
                    <ul className="space-y-3">
                      {highlight.items.map((item) => (
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
                Requirements
              </p>
              <h2 className="font-heading mb-5 text-4xl font-bold leading-tight text-council-dark md:text-5xl">
                Core requirements for agency licensure.
              </h2>
              <p className="max-w-md leading-relaxed text-gray-600">
                Final requirements should be confirmed by the Council before documents are published for public download.
              </p>
            </div>
            <div className="grid gap-px overflow-hidden rounded-sm border border-slate-200 bg-slate-200 sm:grid-cols-2">
              {requirements.map((requirement) => (
                <div key={requirement} className="bg-white p-6">
                  <Buildings className="mb-5 h-8 w-8 text-council-primary" aria-hidden="true" />
                  <p className="leading-relaxed text-gray-700">{requirement}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-council-primary py-20 text-white">
          <div className="container mx-auto grid gap-8 px-4 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-council-accent">Forms pending</p>
              <h2 className="font-heading text-4xl font-bold">Agency form PDFs will be added when supplied.</h2>
            </div>
            <Link href="/forms" className="inline-flex items-center justify-center gap-2 rounded-sm bg-white px-6 py-3 font-semibold text-council-primary transition-colors hover:bg-gray-100">
              View form placeholders
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
