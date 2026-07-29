import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PublicComplaintForm from '@/components/complaints/PublicComplaintForm';

export default function NewComplaintPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-gray-50 py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <PublicComplaintForm />
        </div>
      </main>
      <Footer />
    </>
  );
}
