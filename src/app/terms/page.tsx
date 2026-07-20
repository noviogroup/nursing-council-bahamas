import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-white">
        <section className="bg-council-primary py-20 text-white">
          <div className="container mx-auto max-w-4xl px-4">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-council-accent">Website policy</p>
            <h1 className="font-heading text-5xl font-bold">Terms of Service</h1>
            <p className="mt-5 text-xl leading-relaxed text-white/85">Terms for using the Nursing Council public website and linked online services.</p>
          </div>
        </section>
        <section className="container mx-auto max-w-4xl px-4 py-16">
          <div className="space-y-8 text-gray-700">
            <section><h2 className="font-heading mb-3 text-2xl font-bold text-council-dark">Use of Website Information</h2><p>This website provides public information about Nursing Council services, committees, registration, renewal, and public contact channels.</p></section>
            <section><h2 className="font-heading mb-3 text-2xl font-bold text-council-dark">Official Records</h2><p>Official registration, licence, payment, and verification records are maintained through Council systems and authorised Council processes.</p></section>
            <section><h2 className="font-heading mb-3 text-2xl font-bold text-council-dark">Linked Services</h2><p>Some links open the secure Council portal for registration, renewal, verification, payment, or account access. Portal users are responsible for submitting accurate information.</p></section>
            <section><h2 className="font-heading mb-3 text-2xl font-bold text-council-dark">Updates</h2><p>The Council may update website content, links, and service information as operational requirements change.</p></section>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
