'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  CalendarBlank as Calendar,
  Clock,
  Funnel as Filter,
  MagnifyingGlass as Search,
  User,
} from '@phosphor-icons/react/dist/ssr';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { categoryDefinitions, newsItems } from '@/lib/news';

export default function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const normalisedSearch = searchQuery.trim().toLowerCase();
  const categories = categoryDefinitions.map((category) => ({ ...category, count: category.id === 'all' ? newsItems.length : newsItems.filter((item) => item.category === category.id).length }));
  const filteredNews = newsItems.filter((item) => (selectedCategory === 'all' || item.category === selectedCategory) && (normalisedSearch === '' || item.title.toLowerCase().includes(normalisedSearch) || item.excerpt.toLowerCase().includes(normalisedSearch)));
  const featuredNews = newsItems.filter((item) => item.featured);
  const showFeatured = selectedCategory === 'all' && normalisedSearch === '';
  const displayedNews = showFeatured ? filteredNews.filter((item) => !item.featured) : filteredNews;
  const currentCategory = categories.find((category) => category.id === selectedCategory)?.name ?? 'News';

  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="bg-council-primary py-20 text-white lg:py-28"><div className="container mx-auto px-4"><div className="max-w-3xl"><p className="mb-5 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.16em] text-council-accent"><span className="h-px w-10 bg-council-accent" />From the Council</p><h1 className="font-heading mb-6 text-5xl font-bold leading-tight md:text-6xl">News & Updates</h1><p className="text-xl leading-relaxed text-white/85">The latest announcements, professional updates, and opportunities from the Nursing Council of The Bahamas.</p></div></div></section>

        <section className="border-b border-slate-200 bg-white"><div className="container mx-auto px-4 py-6"><div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between"><div className="relative w-full max-w-xl"><Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-council-primary" aria-hidden="true" /><Input type="search" placeholder="Search news and updates..." value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} className="min-h-14 rounded-none border-slate-300 pl-12 focus-visible:ring-council-primary" /></div><div className="flex items-center gap-2 text-sm font-semibold text-gray-600"><Filter className="h-4 w-4 text-council-primary" />{filteredNews.length} updates found</div></div><div className="mt-6 flex gap-1 overflow-x-auto border-b border-slate-200" role="tablist" aria-label="News categories">{categories.map((category) => <button key={category.id} type="button" onClick={() => setSelectedCategory(category.id)} className={`shrink-0 border-b-2 px-4 py-3 text-sm font-semibold transition-colors ${selectedCategory === category.id ? 'border-council-primary text-council-primary' : 'border-transparent text-gray-600 hover:border-council-accent hover:text-council-primary'}`} role="tab" aria-selected={selectedCategory === category.id}>{category.name} <span className="ml-1 text-xs opacity-70">{category.count}</span></button>)}</div></div></section>

        <section className="bg-gray-50 py-16 lg:py-20"><div className="container mx-auto px-4">
          {showFeatured && <section className="mb-16"><div className="mb-8 flex items-end justify-between"><div><p className="mb-3 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.16em] text-council-primary"><span className="h-px w-9 bg-council-accent" />Highlights</p><h2 className="font-heading text-4xl font-bold text-council-dark">Featured updates</h2></div><span className="hidden text-sm text-gray-500 md:block">Important news from the Council</span></div><div className="grid gap-6 lg:grid-cols-2">{featuredNews.map((item) => <article key={item.id} className="group overflow-hidden bg-council-primary text-white shadow-sm"><Link href={`/news/${item.slug}`} className="grid h-full md:grid-cols-[0.92fr_1.08fr] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-council-accent"><div className="relative min-h-64 overflow-hidden"><Image src={item.image} alt="" fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-council-primary/30 to-transparent" /></div><div className="flex flex-col p-7"><span className="mb-6 w-fit bg-council-accent px-3 py-1 text-xs font-bold uppercase tracking-wide text-council-dark">{item.categoryName}</span><h3 className="font-heading mb-4 text-2xl font-bold leading-tight">{item.title}</h3><p className="mb-6 line-clamp-3 leading-relaxed text-white/80">{item.excerpt}</p><div className="mt-auto flex items-center justify-between text-sm text-white/70"><span className="flex items-center gap-2"><Calendar className="h-4 w-4" />{new Date(item.date).toLocaleDateString('en-BS')}</span><span className="inline-flex items-center gap-2 font-semibold text-council-accent">Read update <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span></div></div></Link></article>)}</div></section>}

          <section><div className="mb-8 flex items-end justify-between"><div><p className="mb-3 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.16em] text-council-primary"><span className="h-px w-9 bg-council-accent" />Latest</p><h2 className="font-heading text-4xl font-bold text-council-dark">{showFeatured ? 'More news' : currentCategory}</h2></div><span className="text-sm text-gray-500">{displayedNews.length} articles</span></div>{displayedNews.length > 0 ? <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">{displayedNews.map((item) => <article key={item.id} className="group overflow-hidden bg-white shadow-sm transition-shadow hover:shadow-xl"><Link href={`/news/${item.slug}`} className="block h-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-council-primary"><div className="relative h-56 overflow-hidden"><Image src={item.image} alt="" fill sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw" className="object-cover transition-transform duration-500 group-hover:scale-105" /><span className="absolute left-4 top-4 bg-council-primary px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">{item.categoryName}</span></div><div className="p-6"><div className="mb-4 flex items-center gap-4 text-sm text-gray-500"><span className="flex items-center gap-1"><Calendar className="h-4 w-4 text-council-primary" />{new Date(item.date).toLocaleDateString('en-BS')}</span><span className="flex items-center gap-1"><Clock className="h-4 w-4 text-council-primary" />{item.readTime}</span></div><h3 className="font-heading mb-3 text-2xl font-bold leading-tight text-council-dark">{item.title}</h3><p className="mb-6 line-clamp-3 leading-relaxed text-gray-600">{item.excerpt}</p><div className="flex items-center justify-between border-t border-slate-200 pt-4 text-sm"><span className="flex items-center gap-2 text-gray-500"><User className="h-4 w-4 text-council-primary" />{item.author}</span><span className="inline-flex items-center gap-2 font-semibold text-council-primary">Read more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span></div></div></Link></article>)}</div> : <div className="bg-white py-20 text-center"><Search className="mx-auto mb-4 h-10 w-10 text-council-primary" /><h3 className="font-heading mb-2 text-2xl font-bold text-council-dark">No updates found</h3><p className="text-gray-600">Try adjusting your search or category filter.</p></div>}</section>
        </div></section>

        <section className="bg-council-primary py-20 text-white"><div className="container mx-auto px-4 text-center"><p className="mb-4 flex items-center justify-center gap-3 text-sm font-semibold uppercase tracking-[0.16em] text-council-accent"><span className="h-px w-9 bg-council-accent" />Stay informed</p><h2 className="font-heading mb-4 text-4xl font-bold">Receive Council updates</h2><p className="mx-auto mb-8 max-w-2xl text-lg leading-relaxed text-white/85">Subscribe to receive the latest news, announcements, and professional updates directly in your inbox.</p><div className="mx-auto flex max-w-md gap-3"><Input type="email" placeholder="Enter your email address" className="min-h-14 rounded-none border-0 bg-white text-gray-900" /><Button className="min-h-14 rounded-none bg-council-accent px-6 font-semibold text-council-dark hover:bg-[#e7b820]">Subscribe</Button></div><p className="mt-4 text-sm text-white/65">Unsubscribe at any time. We respect your privacy.</p></div></section>
      </main>
      <Footer />
    </>
  );
}
