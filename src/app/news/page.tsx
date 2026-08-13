import Image from 'next/image';
import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { formatNewsDate, newsArticles } from '@/lib/news';

export default function NewsPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="relative isolate min-h-[520px] overflow-hidden bg-council-primary text-white lg:min-h-[580px]">
          <div className="absolute inset-y-0 right-0 w-[88%] sm:w-[72%] lg:w-[52%]">
            <Image
              src="/assets/news/ub-pinning-ceremony.jpg"
              alt="Nursing graduates at a University of The Bahamas pinning ceremony"
              fill
              priority
              sizes="(min-width: 1024px) 52vw, (min-width: 640px) 72vw, 88vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-council-primary via-council-primary/15 to-transparent" />
          </div>
          <div className="container relative mx-auto flex min-h-[520px] items-center px-4 py-20 lg:min-h-[580px] lg:py-28">
            <div className="max-w-[88%] sm:max-w-2xl lg:max-w-[58%]">
              <p className="mb-5 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.16em] text-council-accent">
                <span className="h-px w-10 bg-council-accent" />
                News and updates
              </p>
              <h1 className="font-heading text-5xl font-bold leading-tight md:text-6xl">Nursing news from The Bahamas.</h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/85 md:text-xl">
                Selected external reporting and public information related to nursing, midwifery, education, workforce development, and the Council&apos;s statutory work.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white py-20 lg:py-28">
          <div className="container mx-auto px-4">
            <div className="mb-12 flex max-w-3xl flex-col gap-5">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-council-primary">External sources</p>
              <h2 className="font-heading text-4xl font-bold leading-tight text-council-dark md:text-5xl">Latest news and historical context.</h2>
              <p className="text-lg leading-relaxed text-gray-600">
                Each item opens the original publisher&apos;s article. Article images are shown from the respective source.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {newsArticles.map((article) => (
                <article key={article.href} className="group flex h-full flex-col overflow-hidden rounded-[4px] border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-lg">
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                    <Image src={article.image} alt={article.imageAlt} fill sizes="(min-width: 1280px) 30vw, (min-width: 768px) 46vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="mb-4 flex items-center justify-between gap-3 text-sm font-medium text-gray-500">
                      <span>{article.publisher}</span>
                      <time dateTime={article.publishedAt}>{formatNewsDate(article)}</time>
                    </div>
                    <h2 className="font-heading text-2xl font-bold leading-snug text-council-dark">{article.title}</h2>
                    <p className="mt-4 flex-1 leading-relaxed text-gray-600">{article.summary}</p>
                    <a href={article.href} target="_blank" rel="noreferrer" className="mt-7 inline-flex w-fit items-center gap-2 font-semibold text-council-primary transition-colors hover:text-council-secondary focus:outline-none focus:ring-2 focus:ring-council-primary focus:ring-offset-4">
                      Read source article
                      <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
