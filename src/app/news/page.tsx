import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import NewsCard from '@/components/NewsCard';
import { newsArticles } from '@/lib/news';
import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'News and Updates',
  description: 'Read external news and public updates relevant to nursing, midwifery, education, regulation, and workforce development in The Bahamas.',
  path: '/news',
  image: '/assets/news/regional-nursing-body-bahamas-delegation.jpg',
});

export default function NewsPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="relative isolate min-h-[520px] overflow-hidden bg-council-primary text-white lg:min-h-[580px]" data-page-hero="news">
          <div className="absolute inset-y-0 right-0 w-[88%] sm:w-[72%] lg:w-[52%]">
            <Image
              src="/assets/news/regional-nursing-body-bahamas-delegation.jpg"
              alt="Nursing Council of The Bahamas delegation participating in a regional nursing meeting"
              fill
              priority
              sizes="(min-width: 1024px) 52vw, (min-width: 640px) 72vw, 88vw"
              className="object-cover object-[45%_center] lg:object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-council-primary via-council-primary/15 to-transparent" />
          </div>
          <div className="container relative mx-auto flex min-h-[520px] items-center px-4 py-20 lg:min-h-[580px] lg:py-28">
            <div className="max-w-[88%] sm:max-w-2xl lg:max-w-[58%]">
              <p className="mb-5 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.16em] text-council-accent">
                <span className="h-px w-10 bg-council-accent" />
                Nursing and midwifery
              </p>
              <h1 className="font-heading text-5xl font-bold leading-tight md:text-6xl">Nursing and Midwifery News &amp; Updates.</h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/85 md:text-xl">
                Council-relevant updates on nursing, midwifery, education, legislation, regulation, and workforce development in The Bahamas.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-slate-50 py-14 lg:py-16" aria-labelledby="news-list-heading">
          <div className="container mx-auto px-4">
            <div className="mb-8 max-w-3xl">
              <span className="mb-4 block h-1 w-10 rounded-full bg-[#f23d5c]" aria-hidden="true" />
              <h2 id="news-list-heading" className="font-heading text-3xl font-bold leading-tight text-council-primary md:text-4xl">News &amp; updates</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                Each item opens the original publisher&apos;s article. Article images are shown from the respective source.
              </p>
            </div>

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
