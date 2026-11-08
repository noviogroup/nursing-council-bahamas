import Footer from "@/components/Footer";
import Header from "@/components/Header";
import RegistrySampleClient from "@/components/registry/RegistrySampleClient";
import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'Nurse registry',
  description: 'Search the Nursing Council’s nurse registry by name, registration number, registration type, or original registration year.',
  path: '/registry',
});

export default function RegistryPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-slate-50">
        <section className="bg-council-primary py-10 text-white lg:py-12" data-page-hero="registry">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="max-w-3xl">
              <h1 className="font-heading mb-4 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
                Search the nurse registry.
              </h1>
              <p className="max-w-2xl text-lg leading-relaxed text-white/85">
                Find a nurse by name or registration number. You can also narrow
                the results by registration type or the year first registered.
              </p>
            </div>
          </div>
        </section>

        <section className="py-8 lg:py-10">
          <div className="container mx-auto max-w-6xl px-4">
            <RegistrySampleClient />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
