import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ComplaintFollowup from '@/components/complaints/ComplaintFollowup';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Respond to the Council',
  description: 'Securely respond to a request for information about your complaint.',
  referrer: 'no-referrer',
  robots: { index: false, follow: false, noarchive: true, googleBot: { index: false, follow: false, noimageindex: true } },
};

export default async function ComplaintResponsePage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  return (
    <>
      <Header />
      <main className="flex-1 bg-slate-50 py-12 lg:py-16">
        <div className="container mx-auto max-w-3xl px-4">
          <ComplaintFollowup key={token} token={token} />
        </div>
      </main>
      <Footer />
    </>
  );
}
