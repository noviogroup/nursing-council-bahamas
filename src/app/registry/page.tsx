import Footer from "@/components/Footer";
import Header from "@/components/Header";
import RegistrySampleClient from "@/components/registry/RegistrySampleClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nurse Registry | The Nursing Council of The Bahamas",
  description:
    "Search the Nursing Council’s published nurse registry by name, registration number, type, or original registration year.",
};

export default function RegistryPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-slate-50">
        <section className="relative overflow-hidden bg-council-primary py-16 text-white lg:py-20">
          <div
            className="absolute inset-y-0 right-0 w-1/3 bg-[radial-gradient(circle_at_center,rgba(255,199,44,0.16),transparent_68%)]"
            aria-hidden="true"
          />
          <div className="container relative mx-auto grid gap-10 px-4 lg:grid-cols-[1fr_360px] lg:items-end">
            <div className="max-w-3xl">
              <p className="mb-5 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.16em] text-council-accent">
                <span className="h-px w-10 bg-council-accent" />
                Official public registry
              </p>
              <h1 className="font-heading mb-5 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                Search the nurse registry.
              </h1>
              <p className="max-w-2xl text-lg leading-relaxed text-white/85">
                Browse the published register using a nurse’s name, registration
                number, type, or original registration year.
              </p>
            </div>

            <div className="grid w-full grid-cols-3 divide-x divide-white/15 rounded-sm border border-white/20 bg-white/10 px-2 py-5 backdrop-blur-sm sm:px-4 lg:px-2">
              <div className="min-w-0 px-2 text-center sm:px-3">
                <strong className="block text-xl font-bold text-council-accent sm:text-2xl">
                  4,300+
                </strong>
                <span className="mt-1 block text-xs text-white/75">
                  records
                </span>
              </div>
              <div className="min-w-0 px-2 text-center sm:px-3">
                <strong className="block text-lg font-bold text-council-accent sm:text-2xl">
                  Combined
                </strong>
                <span className="mt-1 block text-xs text-white/75">
                  registry
                </span>
              </div>
              <div className="min-w-0 px-2 text-center sm:px-3">
                <strong className="block text-xl font-bold text-council-accent sm:text-2xl">
                  4
                </strong>
                <span className="mt-1 block text-xs text-white/75">types</span>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 lg:py-16">
          <div className="container mx-auto max-w-6xl px-4">
            <RegistrySampleClient />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
