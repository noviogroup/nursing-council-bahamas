import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function AccessibilityPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-white">
        <section className="bg-council-primary py-20 text-white">
          <div className="container mx-auto max-w-4xl px-4">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-council-accent">Website policy</p>
            <h1 className="font-heading text-5xl font-bold">Accessibility</h1>
            <p className="mt-5 text-xl leading-relaxed text-white/85">The Council aims to make digital information and services usable for all visitors.</p>
          </div>
        </section>
        <section className="container mx-auto max-w-4xl px-4 py-16">
          <div className="space-y-8 text-gray-700">
            <section><h2 className="font-heading mb-3 text-2xl font-bold text-council-dark">Our Approach</h2><p>The website uses semantic page structure, keyboard-accessible navigation, readable contrast, and descriptive labels for important actions.</p></section>
            <section><h2 className="font-heading mb-3 text-2xl font-bold text-council-dark">Supported Access</h2><p>Visitors can navigate core pages, registration links, renewal links, verification links, and contact information using standard browser and assistive technology controls.</p></section>
            <section><h2 className="font-heading mb-3 text-2xl font-bold text-council-dark">Feedback</h2><p>If you experience an accessibility barrier, contact the Council at info@nursingcouncilbahamas.com or call (242) 604-6015 / 6017.</p></section>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
