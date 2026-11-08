import Link from 'next/link';
import {
  ArrowRight,
  ClipboardText,
  FileText,
  GraduationCap,
  ArrowsClockwise as Repeat,
  ShieldCheck,
} from '@phosphor-icons/react/dist/ssr';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { createPageMetadata } from '@/lib/seo';
import { serviceContactPath } from '@/lib/councilServices';

export const metadata = createPageMetadata({
  title: 'Unlicensed Assistive Personnel',
  description: 'Contact the Nursing Council for guidance on UAP recording, renewal, training, and continuing professional development.',
  path: '/uaps',
});

const uapSections = [
  {
    title: 'Application to be Recorded',
    description: 'Ask the Council how to be recorded as Unlicensed Assistive Personnel and which evidence is required for your circumstances.',
    icon: ClipboardText,
    action: 'Ask about UAP recording',
    href: serviceContactPath('uap-recording'),
  },
  {
    title: 'Application for Renewal',
    description: 'Have your current Council record details available and ask for the renewal requirements that apply to you.',
    icon: Repeat,
    action: 'Ask about UAP renewal',
    href: serviceContactPath('uap-renewal'),
  },
  {
    title: 'Training Institutions',
    description: 'Before enrolling in a UAP course, ask the Council to confirm the institution and programme’s approval status.',
    icon: GraduationCap,
    action: 'Ask about UAP training',
    href: '/contact?service=uap-training#enquiry-form',
  },
  {
    title: 'Continuing Professional Development',
    description: 'Ask the Council which CPD requirements, providers, and evidence apply to your UAP record and renewal period.',
    icon: ShieldCheck,
    action: 'Ask about UAP CPD',
    href: '/contact?service=uap-cpd#enquiry-form',
  },
];

export default function UapsPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="bg-council-primary py-20 text-white lg:py-28" data-page-hero="uaps">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="font-heading mb-6 text-5xl font-bold leading-tight md:text-6xl">
                Unlicensed assistive personnel information.
              </h1>
              <p className="text-xl leading-relaxed text-white/85">
                Find the right Council contact for recording, renewal, training, and continuing professional development.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white py-20 lg:py-28">
          <div className="container mx-auto px-4">
            <div className="mb-12 grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
              <div>
                <h2 className="font-heading text-4xl font-bold leading-tight text-council-dark md:text-5xl">
                  Recording, renewal, training, and CPD.
                </h2>
              </div>
              <p className="max-w-2xl text-lg leading-relaxed text-gray-600">
                These services currently need Council assistance. Send an enquiry to confirm the current process before submitting documents or making a payment.
              </p>
            </div>

            <div className="grid gap-px overflow-hidden rounded-[8px] border border-slate-200 bg-slate-200 md:grid-cols-2">
              {uapSections.map((section) => {
                const Icon = section.icon;
                return (
                  <article key={section.title} className="bg-white p-7 md:p-8">
                    <div className="mb-8 flex items-start justify-between">
                      <Icon className="h-9 w-9 text-council-primary" aria-hidden="true" />
                    </div>
                    <h3 className="font-heading mb-3 text-2xl font-bold text-council-dark">{section.title}</h3>
                    <p className="mb-6 leading-relaxed text-gray-600">{section.description}</p>
                    <Link href={section.href} className="inline-flex min-h-11 items-center gap-2 rounded-[8px] font-semibold text-council-primary underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-council-primary">{section.action}<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
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
                Get guidance before you apply.
              </h2>
              <p className="max-w-md leading-relaxed text-gray-600">
                The Council can confirm the documents, applicable fees, and next steps for your request. An enquiry does not submit a UAP application.
              </p>
            </div>
            <div className="rounded-[8px] border border-slate-200 bg-white p-8 shadow-sm">
              <FileText className="mb-6 h-10 w-10 text-council-primary" aria-hidden="true" />
              <h3 className="font-heading mb-3 text-2xl font-bold text-council-dark">Find UAP services in Forms & Applications.</h3>
              <p className="mb-8 leading-relaxed text-gray-600">
                The service directory explains what to prepare and connects you with the Council for recording and renewal assistance.
              </p>
              <Link href="/forms#uap-recording" className="inline-flex items-center gap-2 rounded-[8px] bg-council-primary px-5 py-3 font-semibold text-white transition-colors hover:bg-council-secondary">
                View UAP services
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
