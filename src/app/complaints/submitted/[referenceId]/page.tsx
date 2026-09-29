import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle, FileMagnifyingGlass as FileSearch } from '@phosphor-icons/react/dist/ssr';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CopyTrackingNumber from '@/components/complaints/CopyTrackingNumber';

export const metadata: Metadata = {
  title: 'Complaint Submitted',
  robots: {
    index: false,
    follow: false,
  },
};

type ComplaintSubmittedPageProps = {
  params: Promise<{ referenceId: string }>;
};

const nextSteps = [
  'Council staff check your complaint and decide how it should be handled.',
  'If they need more information, they will contact you using the details you gave.',
  'You can check the status at any time with your tracking number and email address.',
];

export default async function ComplaintSubmittedPage({ params }: ComplaintSubmittedPageProps) {
  const { referenceId: rawReferenceId } = await params;
  const referenceId = decodeURIComponent(rawReferenceId);

  return (
    <>
      <Header />
      <main className="flex-1 bg-gray-50 py-14 lg:py-20">
        <div className="container mx-auto max-w-2xl px-4">
          <section className="bg-white p-7 shadow-sm md:p-10">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-8 w-8 shrink-0 text-council-primary" />
              <h1 className="font-heading text-3xl font-bold text-council-dark">We received your complaint</h1>
            </div>

            <div className="mt-7 border border-slate-200 bg-gray-50 p-5">
              <p className="text-sm font-semibold text-gray-600">Your tracking number</p>
              <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
                <p id="tracking-number" className="font-mono text-2xl font-bold tracking-wide text-council-dark md:text-3xl">{referenceId}</p>
                <CopyTrackingNumber value={referenceId} />
              </div>
              <p className="mt-3 text-sm leading-relaxed text-gray-600">
                Write it down or save it. You need this number and the email address you used to check on your complaint.
              </p>
            </div>

            <h2 className="font-heading mt-8 text-xl font-bold text-council-dark">What happens next</h2>
            <ol className="mt-3 space-y-2">
              {nextSteps.map((step, index) => (
                <li key={step} className="flex gap-3 text-gray-700">
                  <span className="font-heading font-bold text-council-primary">{index + 1}.</span>
                  <span className="leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href={`/complaints/track?ref=${encodeURIComponent(referenceId)}`} className="inline-flex min-h-12 items-center gap-2 bg-council-primary px-6 font-semibold text-white transition-colors hover:bg-council-secondary">
                <FileSearch className="h-5 w-5" />
                Track my complaint
              </Link>
              <Link href="/" className="inline-flex min-h-12 items-center px-4 font-semibold text-council-primary hover:underline">
                Back to the home page
              </Link>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
