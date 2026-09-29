import Link from 'next/link';
import { ArrowRight, ClipboardText, FileMagnifyingGlass as FileSearch, ShieldCheck, WarningCircle } from '@phosphor-icons/react/dist/ssr';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'Public Complaints',
  description: 'Submit a complaint about a nurse, midwife, applicant or licensee, and track it with your tracking number.',
  path: '/complaints',
});

const processSteps = [
  { title: 'Tell us what happened', description: 'Give your contact details, who the complaint is about, what happened and when. You can attach documents or photos.' },
  { title: 'Get a tracking number', description: 'When you submit, you receive a tracking number such as NC-2026-00012. Keep it with the email address you used.' },
  { title: 'The Council reviews it', description: 'Council staff check the complaint, may contact you for more information, and decide the next step.' },
  { title: 'Check progress', description: 'Enter your tracking number and email address at any time to see the current status of your complaint.' },
];

const acceptedSubjects = ['Nurse', 'Midwife', 'Applicant', 'Licensee'];

export default function ComplaintsPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="bg-council-primary py-20 text-white lg:py-28" data-page-hero="complaints">
          <div className="container mx-auto grid gap-10 px-4 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <p className="mb-5 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.16em] text-council-accent">
                <span className="h-px w-10 bg-council-accent" />
                Public complaints
              </p>
              <h1 className="font-heading mb-6 text-5xl font-bold leading-tight md:text-6xl">Submit a complaint or concern.</h1>
              <p className="max-w-2xl text-xl leading-relaxed text-white/85">
                Report a concern about a nurse, midwife, applicant or licensee. It takes about 10 minutes, and you can save your progress and finish later.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/complaints/new" className="inline-flex min-h-12 items-center gap-2 bg-white px-6 font-semibold text-council-primary transition-colors hover:bg-council-accent hover:text-council-dark">
                  Start a complaint <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/complaints/track" className="inline-flex min-h-12 items-center gap-2 border border-white/60 px-6 font-semibold text-white transition-colors hover:bg-white/10">
                  Track a complaint
                </Link>
              </div>
            </div>
            <div className="border-l-4 border-council-accent bg-white/10 p-7">
              <WarningCircle className="mb-5 h-9 w-9 text-council-accent" />
              <h2 className="font-heading text-2xl font-bold">Emergency matters</h2>
              <p className="mt-3 leading-relaxed text-white/80">
                This form is not an emergency service. If someone is in immediate danger, contact emergency services or the appropriate authority first.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white py-16 lg:py-20">
          <div className="container mx-auto grid gap-8 px-4 lg:grid-cols-[0.7fr_0.3fr]">
            <div className="grid gap-px border border-slate-200 bg-slate-200 md:grid-cols-2">
              {processSteps.map((step, index) => (
                <article key={step.title} className="bg-white p-7">
                  <span className="font-heading text-xl font-bold text-council-primary">0{index + 1}</span>
                  <h2 className="font-heading mt-8 text-2xl font-bold text-council-dark">{step.title}</h2>
                  <p className="mt-3 leading-relaxed text-gray-600">{step.description}</p>
                </article>
              ))}
            </div>
            <aside className="bg-gray-50 p-7">
              <h2 className="font-heading text-2xl font-bold text-council-dark">Who a complaint can be about</h2>
              <div className="mt-6 space-y-3">
                {acceptedSubjects.map((subject) => (
                  <div key={subject} className="flex items-center gap-3 border-b border-slate-200 pb-3 text-gray-700">
                    <ShieldCheck className="h-5 w-5 text-council-primary" />
                    {subject}
                  </div>
                ))}
              </div>
              <p className="mt-6 text-sm leading-relaxed text-gray-600">
                You can mention the hospital, clinic or employer, but the complaint must be about an individual person.
              </p>
            </aside>
          </div>
        </section>

        <section className="bg-gray-50 py-16 lg:py-20">
          <div className="container mx-auto grid gap-6 px-4 md:grid-cols-2">
            <Link href="/complaints/new" className="group bg-white p-8 shadow-sm transition-colors hover:bg-gray-100">
              <ClipboardText className="mb-10 h-10 w-10 text-council-primary" />
              <h2 className="font-heading text-3xl font-bold text-council-dark">Start a complaint</h2>
              <p className="mt-4 leading-relaxed text-gray-600">Answer a few short sections and receive a tracking number when you submit.</p>
              <span className="mt-8 inline-flex items-center gap-2 font-semibold text-council-primary">
                Start a complaint <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
            <Link href="/complaints/track" className="group bg-white p-8 shadow-sm transition-colors hover:bg-gray-100">
              <FileSearch className="mb-10 h-10 w-10 text-council-primary" />
              <h2 className="font-heading text-3xl font-bold text-council-dark">Track a complaint</h2>
              <p className="mt-4 leading-relaxed text-gray-600">Enter your tracking number and the email address you used to see the current status.</p>
              <span className="mt-8 inline-flex items-center gap-2 font-semibold text-council-primary">
                Check the status <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
