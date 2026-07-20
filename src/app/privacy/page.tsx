import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-white">
        <section className="bg-council-primary py-20 text-white">
          <div className="container mx-auto max-w-4xl px-4">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-council-accent">Website policy</p>
            <h1 className="font-heading text-5xl font-bold">Privacy Policy</h1>
            <p className="mt-5 text-xl leading-relaxed text-white/85">How the Nursing Council website handles information submitted by visitors.</p>
          </div>
        </section>
        <section className="container mx-auto max-w-4xl px-4 py-16">
          <div className="space-y-8 text-gray-700">
            <section><h2 className="font-heading mb-3 text-2xl font-bold text-council-dark">Information We Collect</h2><p>When you contact the Council, we may receive your name, contact details, inquiry type, subject, and message so staff can respond to your request.</p></section>
            <section><h2 className="font-heading mb-3 text-2xl font-bold text-council-dark">How Information Is Used</h2><p>Information is used to respond to public inquiries, support registration and licensing services, and improve Council communications.</p></section>
            <section><h2 className="font-heading mb-3 text-2xl font-bold text-council-dark">Portal Services</h2><p>Registration, renewal, verification, and payment workflows are handled through the secure Council portal and follow the privacy and security controls configured for that system.</p></section>
            <section><h2 className="font-heading mb-3 text-2xl font-bold text-council-dark">Contact</h2><p>Questions about privacy can be sent to info@nursingcouncilbahamas.com.</p></section>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
