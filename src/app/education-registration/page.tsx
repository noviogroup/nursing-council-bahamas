import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  CheckCircle,
  ClipboardText,
  GraduationCap,
  SealCheck,
  Stethoscope,
} from '@phosphor-icons/react/dist/ssr';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { portalPath } from '@/lib/portal';

const educationSections = [
  {
    title: 'Approved Training Institutions',
    description: 'Recognized nursing and midwifery education providers approved by the Council.',
    icon: GraduationCap,
    items: ['Approved institution list placeholder', 'Programme approval status placeholder', 'Institution renewal status placeholder'],
  },
  {
    title: 'Approved Clinical Sites',
    description: 'Clinical learning environments reviewed for student placement and professional training.',
    icon: Stethoscope,
    items: ['Approved clinical site list placeholder', 'Placement capacity placeholder', 'Site approval status placeholder'],
  },
  {
    title: 'Approved CPD Providers',
    description: 'Continuing professional development providers recognized for licence renewal requirements.',
    icon: SealCheck,
    items: ['Approved CPD provider list placeholder', 'Provider approval status placeholder', 'Provider contact placeholder'],
  },
  {
    title: 'Approved CPD Requirements',
    description: 'Current continuing professional development expectations for registration and renewal.',
    icon: ClipboardText,
    items: ['Annual CPD requirement placeholder', 'Required learning categories placeholder', 'Submission guidance placeholder'],
  },
];

const processSteps = [
  'Submit education, clinical site, or CPD provider request documentation.',
  'Council reviews the application against education and professional standards.',
  'Applicants receive approval status, conditions, or requests for additional information.',
];

export default function EducationRegistrationPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="bg-council-primary py-20 text-white lg:py-28">
          <div className="container mx-auto grid gap-10 px-4 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <div>
              <p className="mb-5 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.16em] text-council-accent">
                <span className="h-px w-10 bg-council-accent" />
                Education & training
              </p>
              <h1 className="font-heading mb-6 text-5xl font-bold leading-tight md:text-6xl">
                Approved pathways for nursing education.
              </h1>
              <p className="max-w-2xl text-xl leading-relaxed text-white/85">
                Review approved training institutions, clinical sites, CPD providers, and CPD requirements for nursing and midwifery practice in The Bahamas.
              </p>
            </div>
            <div className="relative min-h-[340px] overflow-hidden rounded-sm border border-white/20">
              <Image
                src="/assets/nursing-ceremony-2.jpg"
                alt="Nursing students at a formal ceremony"
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
                  Public lists
                </p>
                <h2 className="font-heading text-4xl font-bold leading-tight text-council-dark md:text-5xl">
                  Education standards and approvals.
                </h2>
              </div>
              <p className="max-w-2xl text-lg leading-relaxed text-gray-600">
                These public lists are prepared as placeholders until the Council supplies the official approved providers and requirements.
              </p>
            </div>

            <div className="grid gap-px overflow-hidden rounded-sm border border-slate-200 bg-slate-200 md:grid-cols-2">
              {educationSections.map((section, index) => {
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
                Approval process
              </p>
              <h2 className="font-heading mb-5 text-4xl font-bold leading-tight text-council-dark md:text-5xl">
                Clear review for education and CPD approvals.
              </h2>
              <p className="max-w-md leading-relaxed text-gray-600">
                The Council reviews education, clinical training, and CPD submissions against approved standards before listing providers publicly.
              </p>
            </div>
            <ol className="space-y-4">
              {processSteps.map((step, index) => (
                <li key={step} className="grid grid-cols-[3rem_1fr] gap-4 rounded-sm bg-white p-5 shadow-sm">
                  <span className="flex h-12 w-12 items-center justify-center rounded-sm bg-council-primary font-heading text-lg font-bold text-white">
                    {index + 1}
                  </span>
                  <p className="pt-2 leading-relaxed text-gray-700">{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="bg-council-primary py-20 text-white">
          <div className="container mx-auto grid gap-8 px-4 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-council-accent">Need to submit records?</p>
              <h2 className="font-heading text-4xl font-bold">Use the Council portal for registration and renewal actions.</h2>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href={portalPath('/register?type=registration')} className="inline-flex items-center justify-center gap-2 rounded-sm bg-white px-6 py-3 font-semibold text-council-primary transition-colors hover:bg-gray-100">
                Start registration
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
