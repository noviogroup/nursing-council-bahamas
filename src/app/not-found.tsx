import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { InteriorPageHeader, PageAction } from "@/components/InteriorPage";

export default function NotFoundPage() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-white">
        <InteriorPageHeader
          title="We couldn’t find that page"
          breadcrumb="Page not found"
          description="The link may have changed. Return to the homepage, find a Council service or contact us for help."
        >
          <PageAction href="/">Go to the homepage</PageAction>
          <PageAction href="/forms" secondary>
            Find a service
          </PageAction>
          <PageAction href="/contact" secondary>
            Contact the Council
          </PageAction>
        </InteriorPageHeader>
      </main>
      <Footer />
    </>
  );
}
