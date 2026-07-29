import Link from 'next/link';
import { ArrowRight, ClipboardText, FileMagnifyingGlass as FileSearch, ShieldCheck, WarningCircle } from '@phosphor-icons/react/dist/ssr';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const processSteps = [
  { title: 'Submit the complaint', description: 'Provide contact details, information about the individual practitioner, incident details, and supporting documents.' },
  { title: 'Receive a reference number', description: 'The system creates a secure Nursing Council reference number for tracking.' },
  { title: 'Council review', description: 'Authorized staff triage, assign, investigate, and update the complaint through the secure staff portal.' },
  { title: 'Track public progress', description: 'Use the reference number and email address to see safe public status updates.' },
];

const acceptedSubjects = ['Nurse', 'Midwife', 'Applicant', 'Licensee'];

export default function ComplaintsPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="bg-council-primary py-20 text-white lg:py-28">
          <div className="container mx-auto grid gap-10 px-4 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <p className="mb-5 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.16em] text-council-accent">
                <span className="h-px w-10 bg-council-accent" />
                Public complaints
              </p>
              <h1 className="font-heading mb-6 text-5xl font-bold leading-tight md:text-6xl">Submit a complaint or concern.</h1>
              <p className="max-w-2xl text-xl leading-relaxed text-white/85">
                Use the online complaint portal to report concerns involving an individual nurse, midwife, applicant, or licensee.
              </p>
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
              <h2 className="font-heading text-2xl font-bold text-council-dark">Accepted complaint subjects</h2>
              <div className="mt-6 space-y-3">
                {acceptedSubjects.map((subject) => (
                  <div key={subject} className="flex items-center gap-3 border-b border-slate-200 pb-3 text-gray-700">
                    <ShieldCheck className="h-5 w-5 text-council-primary" />
                    {subject}
                  </div>
                ))}
              </div>
              <p className="mt-6 text-sm leading-relaxed text-gray-600">
                Facility or employer details may be included as context, but the complaint respondent must be an individual practitioner, applicant, or licensee.
              </p>
            </aside>
          </div>
        </section>

        <section className="bg-gray-50 py-16 lg:py-20">
          <div className="container mx-auto grid gap-6 px-4 md:grid-cols-2">
            <Link href="/complaints/new" className="group bg-white p-8 shadow-sm transition-colors hover:bg-gray-100">
              <ClipboardText className="mb-10 h-10 w-10 text-council-primary" />
              <h2 className="font-heading text-3xl font-bold text-council-dark">Start a complaint</h2>
              <p className="mt-4 leading-relaxed text-gray-600">Complete the multi-step public complaint form and receive a reference number.</p>
              <span className="mt-8 inline-flex items-center gap-2 font-semibold text-council-primary">
                Open form <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
            <Link href="/complaints/track" className="group bg-white p-8 shadow-sm transition-colors hover:bg-gray-100">
              <FileSearch className="mb-10 h-10 w-10 text-council-primary" />
              <h2 className="font-heading text-3xl font-bold text-council-dark">Track a complaint</h2>
              <p className="mt-4 leading-relaxed text-gray-600">Use a reference number and contact email to view safe public progress updates.</p>
              <span className="mt-8 inline-flex items-center gap-2 font-semibold text-council-primary">
                Track status <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
