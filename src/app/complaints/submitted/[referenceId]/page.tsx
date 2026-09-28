import type { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle, FileMagnifyingGlass as FileSearch } from '@phosphor-icons/react/dist/ssr';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

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

export default async function ComplaintSubmittedPage({ params }: ComplaintSubmittedPageProps) {
  const { referenceId: rawReferenceId } = await params;
  const referenceId = decodeURIComponent(rawReferenceId);

  return (
    <>
      <Header />
      <main className="flex-1 bg-gray-50 py-20 lg:py-28">
        <div className="container mx-auto max-w-4xl px-4">
          <section className="bg-white p-8 text-center shadow-sm md:p-12">
            <CheckCircle className="mx-auto mb-6 h-16 w-16 text-council-primary" />
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-council-primary">Complaint submitted</p>
            <h1 className="font-heading text-4xl font-bold text-council-dark md:text-5xl">Reference {referenceId}</h1>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-gray-600">
              Your complaint has been received. Email delivery is currently drafted only, so keep this reference number for tracking.
            </p>
            <div className="mx-auto mt-8 max-w-sm border border-slate-200 bg-gray-50 p-5">
              <p className="text-sm text-gray-500">Public tracking requires</p>
              <p className="mt-2 font-semibold text-council-dark">Reference number + contact email</p>
            </div>
            <Link href="/complaints/track" className="mt-8 inline-flex min-h-12 items-center gap-2 bg-council-primary px-7 font-semibold text-white transition-colors hover:bg-council-secondary">
              <FileSearch className="h-5 w-5" />
              Track complaint
            </Link>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
