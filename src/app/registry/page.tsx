import Footer from "@/components/Footer";
import Header from "@/components/Header";
import RegistrySampleClient from "@/components/registry/RegistrySampleClient";
import { AlertTriangle, Database, ShieldCheck } from "lucide-react";
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
                Browse the published register using a nurse’s name,
                registration number, type, or original registration year.
              </p>
            </div>

            <div className="grid grid-cols-3 divide-x divide-white/15 rounded-sm border border-white/20 bg-white/10 p-5 backdrop-blur-sm">
              <div className="px-3 text-center">
                <strong className="block text-2xl font-bold text-council-accent">
                  3,124
                </strong>
                <span className="text-xs text-white/75">records</span>
              </div>
              <div className="px-3 text-center">
                <strong className="block text-2xl font-bold text-council-accent">
                  1973–2024
                </strong>
                <span className="text-xs text-white/75">years</span>
              </div>
              <div className="px-3 text-center">
                <strong className="block text-2xl font-bold text-council-accent">
                  4
                </strong>
                <span className="text-xs text-white/75">types</span>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-amber-200 bg-amber-50">
          <div className="container mx-auto flex max-w-6xl items-start gap-4 px-4 py-5 text-amber-950">
            <AlertTriangle
              className="mt-0.5 h-6 w-6 shrink-0 text-amber-700"
              aria-hidden="true"
            />
            <div>
              <h2 className="font-heading font-bold">
                Registry listing — not proof of current good standing
              </h2>
              <p className="mt-1 text-sm leading-relaxed">
                Inclusion confirms that the person appears in the Council’s
                published historical registry. It does not confirm that a
                licence is current, active, unrestricted, or in good standing.
              </p>
            </div>
          </div>
        </section>

        <section className="py-12 lg:py-16">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="mb-8 grid gap-5 sm:grid-cols-2">
              <div className="flex items-start gap-4 rounded-sm border border-slate-200 bg-white p-5">
                <Database
                  className="mt-0.5 h-6 w-6 shrink-0 text-council-primary"
                  aria-hidden="true"
                />
                <div>
                  <h2 className="font-heading font-bold text-council-dark">
                    Limited public fields
                  </h2>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">
                    Only name, registration type, registration number, and
                    original registration year are shown.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 rounded-sm border border-slate-200 bg-white p-5">
                <ShieldCheck
                  className="mt-0.5 h-6 w-6 shrink-0 text-council-primary"
                  aria-hidden="true"
                />
                <div>
                  <h2 className="font-heading font-bold text-council-dark">
                    Formal verification remains separate
                  </h2>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">
                    Contact the Council or use its verification service when
                    current status or an official letter is required.
                  </p>
                </div>
              </div>
            </div>

            <RegistrySampleClient />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
