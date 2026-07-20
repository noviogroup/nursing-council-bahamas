import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function NotFoundPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-white">
        <section className="bg-council-primary py-24 text-white">
          <div className="container mx-auto max-w-3xl px-4 text-center">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-council-accent">Page not found</p>
            <h1 className="font-heading text-5xl font-bold">We could not find that page.</h1>
            <p className="mx-auto mt-5 max-w-2xl text-xl leading-relaxed text-white/85">Use the main navigation or return to the homepage to continue.</p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link href="/" className="rounded-md bg-council-accent px-6 py-3 font-semibold text-council-dark transition-colors hover:bg-[#e7b820]">Go home</Link>
              <Link href="/contact" className="rounded-md border border-white/40 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10">Contact us</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
