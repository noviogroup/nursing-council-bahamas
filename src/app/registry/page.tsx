import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { InteriorPageHeader } from "@/components/InteriorPage";
import RegistrySampleClient from "@/components/registry/RegistrySampleClient";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Nurse registry",
  description:
    "Search the Nursing Council’s nurse registry by name, registration number, registration type, or original registration year.",
  path: "/registry",
});

export default function RegistryPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-slate-50">
        <InteriorPageHeader
          title="Search the Nurse Registry"
          breadcrumb="Nurse Registry"
          description="Find a nurse by name or registration number. Narrow the results by registration type or the year first registered."
        />

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
