import Header from "@/components/Header";
import { InteriorPageHeader } from "@/components/InteriorPage";
import Footer from "@/components/Footer";
import NewsCard from "@/components/NewsCard";
import { newsArticles } from "@/lib/news";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "News and Updates",
  description:
    "Read external news and public updates relevant to nursing, midwifery, education, regulation, and workforce development in The Bahamas.",
  path: "/news",
  image: "/assets/news/regional-nursing-body-bahamas-delegation.jpg",
});

export default function NewsPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <InteriorPageHeader
          title="Nursing & midwifery news"
          breadcrumb="News"
          description="News and public updates on nursing, education, regulation and the workforce in The Bahamas."
          image={{
            src: "/assets/news/regional-nursing-body-bahamas-delegation.jpg",
            alt: "Nursing Council of The Bahamas delegation at a regional nursing meeting",
          }}
        />

        <section
          className="bg-slate-50 py-14 lg:py-16"
          aria-labelledby="news-list-heading"
        >
          <div className="container mx-auto px-4">
            <p
              id="news-list-heading"
              className="mb-6 text-sm leading-relaxed text-slate-600"
            >
              Each story opens the original publisher’s article in a new tab.
              Sources and publication dates are shown with each item.
            </p>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {newsArticles.map((article) => (
                <NewsCard key={article.href} article={article} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
