import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, CalendarBlank as Calendar, Clock, User } from '@phosphor-icons/react/dist/ssr';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getNewsItem, newsItems } from '@/lib/news';

type NewsDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return newsItems.flatMap((item) => [{ slug: String(item.id) }, { slug: item.slug }]);
}

export async function generateMetadata({ params }: NewsDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getNewsItem(slug);
  if (!item) return {};

  return {
    title: item.title,
    description: item.excerpt,
    openGraph: {
      title: item.title,
      description: item.excerpt,
      images: [item.image],
    },
  };
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const { slug } = await params;
  const item = getNewsItem(slug);
  if (!item) notFound();

  return (
    <>
      <Header />
      <main className="flex-1 bg-white">
        <section className="bg-council-primary py-14 text-white lg:py-20">
          <div className="container mx-auto px-4">
            <Link href="/news" className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-council-accent hover:text-white">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back to news
            </Link>
            <div className="max-w-4xl">
              <p className="mb-5 w-fit bg-council-accent px-3 py-1 text-xs font-bold uppercase tracking-wide text-council-dark">
                {item.categoryName}
              </p>
              <h1 className="font-heading mb-6 text-4xl font-bold leading-tight md:text-6xl">{item.title}</h1>
              <p className="max-w-3xl text-xl leading-relaxed text-white/85">{item.excerpt}</p>
              <div className="mt-8 flex flex-wrap gap-5 text-sm text-white/75">
                <span className="inline-flex items-center gap-2"><Calendar className="h-4 w-4" />{new Date(item.date).toLocaleDateString('en-BS')}</span>
                <span className="inline-flex items-center gap-2"><Clock className="h-4 w-4" />{item.readTime}</span>
                <span className="inline-flex items-center gap-2"><User className="h-4 w-4" />{item.author}</span>
              </div>
            </div>
          </div>
        </section>

        <article className="container mx-auto px-4 py-14 lg:py-20">
          <div className="mx-auto max-w-4xl">
            <div className="relative mb-10 aspect-[16/9] overflow-hidden bg-gray-100">
              <Image src={item.image} alt="" fill sizes="(min-width: 1024px) 768px, 100vw" className="object-cover" priority />
            </div>
            <div className="space-y-6 text-lg leading-8 text-gray-700">
              {item.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-12 border-t border-slate-200 pt-8">
              <Link href="/contact" className="inline-flex items-center rounded-md bg-council-primary px-6 py-3 font-semibold text-white transition-colors hover:bg-council-secondary">
                Contact the Council
              </Link>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
