import Image from 'next/image';
import { ArrowUpRight } from '@phosphor-icons/react/dist/ssr';
import { formatNewsDate, type NewsArticle } from '@/lib/news';

type Props = {
  article: NewsArticle;
  variant?: 'standard' | 'featured' | 'compact';
};

export default function NewsCard({ article, variant = 'standard' }: Props) {
  const compact = variant === 'compact';
  const featured = variant === 'featured';

  return (
    <article className={`group relative flex h-full min-w-0 flex-col rounded-[8px] border border-slate-200 bg-white transition-colors hover:border-[#f23d5c] motion-reduce:transition-none ${compact ? 'sm:grid sm:grid-cols-[112px_minmax(0,1fr)] sm:items-center sm:gap-5 sm:p-5' : ''}`}>
      <div className={`relative overflow-hidden rounded-t-[7px] bg-slate-100 ${compact ? 'aspect-[16/9] sm:aspect-square sm:rounded-[6px]' : featured ? 'aspect-[16/9] sm:aspect-[2/1]' : 'aspect-[16/9]'}`}>
        <Image
          src={article.image}
          alt={article.imageAlt}
          fill
          sizes={compact ? '(min-width: 640px) 112px, 100vw' : featured ? '(min-width: 1024px) 48vw, 100vw' : '(min-width: 1280px) 31vw, (min-width: 768px) 48vw, 100vw'}
          className="object-cover"
        />
      </div>
      <div className={`flex min-w-0 flex-1 flex-col ${compact ? 'p-5 sm:p-0' : 'p-5 sm:p-6'}`}>
        <div className="mb-3 flex flex-wrap items-baseline gap-x-3 gap-y-1 text-xs leading-relaxed">
          <span className="font-semibold text-council-primary">{article.publisher}</span>
          {article.publishedAt ? (
            <time dateTime={article.publishedAt} className="text-slate-600">{formatNewsDate(article)}</time>
          ) : (
            <span className="text-slate-600">{formatNewsDate(article)}</span>
          )}
        </div>
        <h3 className={`font-heading font-bold text-council-dark group-hover:text-council-primary ${compact ? 'text-lg leading-snug' : featured ? 'text-2xl leading-snug sm:text-[1.65rem]' : 'text-xl leading-snug'}`}>
          <a
            href={article.href}
            target="_blank"
            rel="noreferrer"
            className="after:absolute after:inset-0 after:rounded-[8px] focus-visible:outline-none focus-visible:after:outline focus-visible:after:outline-2 focus-visible:after:outline-offset-4 focus-visible:after:outline-council-primary"
          >
            {article.title}
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </h3>
        {variant === 'standard' && <p className="mt-3 text-sm leading-relaxed text-slate-600">{article.summary}</p>}
        <div aria-hidden="true" className={`flex items-center justify-between gap-4 text-sm font-semibold text-council-primary ${compact ? 'mt-4' : 'mt-auto pt-5'}`}>
          <span className="underline-offset-4 group-hover:underline">Read article</span>
          <span className={`flex shrink-0 items-center justify-center rounded-full bg-[#fff0f3] text-council-primary ${compact ? 'h-7 w-7' : 'h-9 w-9'}`}>
            <ArrowUpRight size={18} aria-hidden="true" />
          </span>
        </div>
      </div>
    </article>
  );
}
