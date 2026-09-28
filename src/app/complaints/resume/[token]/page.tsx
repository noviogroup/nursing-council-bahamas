import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PublicComplaintForm from '@/components/complaints/PublicComplaintForm';

export const metadata: Metadata = {
  title: 'Resume Complaint Draft',
  robots: {
    index: false,
    follow: false,
  },
};

type ResumeComplaintPageProps = {
  params: Promise<{ token: string }>;
};

export default async function ResumeComplaintPage({ params }: ResumeComplaintPageProps) {
  const { token } = await params;

  return (
    <>
      <Header />
      <main className="flex-1 bg-gray-50 py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <PublicComplaintForm draftToken={token} />
        </div>
      </main>
      <Footer />
    </>
  );
}
