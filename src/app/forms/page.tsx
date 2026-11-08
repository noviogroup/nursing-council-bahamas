'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  FileText,
  FolderOpen,
  MagnifyingGlass,
  X,
} from '@phosphor-icons/react/dist/ssr';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { councilServiceGroups, councilServices } from '@/lib/councilServices';

const formGroups = councilServiceGroups.map((group) => ({ ...group, forms: councilServices.filter((service) => service.group === group.id) }));
const totalFormCount = councilServices.length;

export default function FormsPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [search, setSearch] = useState('');

  const normalizedSearch = search.trim().toLowerCase();
  const visibleGroups = useMemo(
    () => formGroups
      .filter((group) => activeCategory === 'all' || group.id === activeCategory)
      .map((group) => ({
        ...group,
        forms: group.forms.filter((form) => `${form.title} ${form.description}`.toLowerCase().includes(normalizedSearch)),
      }))
      .filter((group) => group.forms.length > 0),
    [activeCategory, normalizedSearch],
  );
  const visibleFormCount = visibleGroups.reduce((total, group) => total + group.forms.length, 0);

  function clearFilters() {
    setSearch('');
    setActiveCategory('all');
  }

  return (
    <>
      <Header />
      <main className="flex-1">
        <section
          className="relative isolate min-h-[520px] overflow-hidden bg-council-primary text-white lg:min-h-[580px]"
          data-page-hero="forms"
        >
          <div className="absolute inset-y-0 right-0 w-[88%] sm:w-[72%] lg:w-[52%]">
            <Image
              src="/assets/approved/nurses-bahamas.png"
              alt="Nursing graduates at a formal ceremony"
              fill
              priority
              sizes="(min-width: 1024px) 52vw, (min-width: 640px) 72vw, 88vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-council-primary via-council-primary/15 to-transparent" />
          </div>
          <div className="container relative mx-auto flex min-h-[520px] items-center px-4 py-20 lg:min-h-[580px] lg:py-28">
            <div className="max-w-[88%] sm:max-w-2xl lg:max-w-[58%]">
              <h1 className="font-heading mb-6 text-4xl font-bold leading-tight sm:text-5xl md:text-6xl">
                Forms & Applications
              </h1>
              <p className="max-w-2xl text-xl leading-relaxed text-white/85">
                Find your next step for registration, education, professional development, agencies, and Unlicensed Assistive Personnel.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white py-16 lg:py-20">
          <div className="container mx-auto px-4">
            <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
              <div>
                <h2 className="font-heading text-4xl font-bold leading-tight text-council-dark md:text-5xl">
                  What do you need to do?
                </h2>
              </div>
              <p className="max-w-2xl text-lg leading-relaxed text-gray-600">
                Start available applications in Nurse 360 or ask the Council for help with other services. Read each entry for what to prepare and how to follow up.
              </p>
            </div>

            <div className="mt-12 border-y border-slate-200 py-6">
              <label className="relative block">
                <span className="sr-only">Search forms and applications</span>
                <MagnifyingGlass className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-council-primary" aria-hidden="true" />
                <input
                  type="search"
                  autoComplete="off"
                  enterKeyHint="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search by service or application name"
                  className="min-h-14 w-full rounded-[8px] border border-slate-300 bg-slate-50 py-3 pl-12 pr-12 text-base text-council-dark outline-none transition-colors placeholder:text-slate-500 focus:border-council-primary focus:ring-2 focus:ring-council-primary/20"
                />
                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch('')}
                    className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-[8px] text-slate-500 transition-colors hover:bg-slate-200 hover:text-council-dark focus:outline-none focus:ring-2 focus:ring-council-primary focus:ring-offset-2"
                    aria-label="Clear form search"
                  >
                    <X className="h-4 w-4" aria-hidden="true" />
                  </button>
                )}
              </label>
              <div className="mt-5 grid gap-px overflow-hidden rounded-[8px] border border-slate-200 bg-slate-200 sm:grid-cols-2 xl:grid-cols-5">
                <button
                  type="button"
                  onClick={() => setActiveCategory('all')}
                  aria-pressed={activeCategory === 'all'}
                  className={`min-h-28 p-5 text-left transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-council-primary ${activeCategory === 'all' ? 'bg-council-primary text-white' : 'bg-white text-council-dark hover:bg-slate-50'}`}
                >
                  <FolderOpen className={`mb-4 h-7 w-7 ${activeCategory === 'all' ? 'text-council-accent' : 'text-council-primary'}`} aria-hidden="true" />
                  <span className="block font-heading text-lg font-bold">All services</span>
                  <span className={`mt-1 block text-sm ${activeCategory === 'all' ? 'text-white/75' : 'text-gray-500'}`}>{totalFormCount} services and guides</span>
                </button>
                {formGroups.map((group) => {
                  const selected = activeCategory === group.id;

                  return (
                    <button
                      key={group.id}
                      type="button"
                      onClick={() => setActiveCategory(group.id)}
                      aria-pressed={selected}
                      className={`min-h-28 p-5 text-left transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-council-primary ${selected ? 'bg-council-primary text-white' : 'bg-white text-council-dark hover:bg-slate-50'}`}
                    >
                      <span className={`font-heading text-2xl font-bold ${selected ? 'text-council-accent' : 'text-council-primary'}`}>0{group.forms.length}</span>
                      <span className="mt-3 block font-heading text-lg font-bold leading-snug">{group.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gray-50 py-20 lg:py-28">
          <div className="container mx-auto px-4">
            <div className="mb-9 flex flex-wrap items-end justify-between gap-4 border-b border-slate-200 pb-5">
              <div>
                <h2 aria-live="polite" className="font-heading text-3xl font-bold text-council-dark sm:text-4xl">{visibleFormCount} {visibleFormCount === 1 ? 'service' : 'services'} shown</h2>
              </div>
              <p className="max-w-xl text-sm leading-relaxed text-gray-600">Check the portal or ask the Council for current fees and processing guidance before submitting documents or making a payment.</p>
            </div>

            {visibleGroups.length > 0 ? (
              <div className="overflow-hidden rounded-[8px] border border-slate-200 bg-white">
                {visibleGroups.map((group, groupIndex) => (
                  <section key={group.id} className={groupIndex > 0 ? 'border-t-8 border-gray-50' : ''} aria-labelledby={`${group.id}-heading`}>
                    <div className="grid gap-4 border-b border-slate-200 px-6 py-6 md:grid-cols-[minmax(15rem,0.65fr)_1.35fr] md:items-end md:px-8">
                      <div>
                        <h3 id={`${group.id}-heading`} className="font-heading text-2xl font-bold text-council-dark">{group.title}</h3>
                      </div>
                      <p className="max-w-xl text-sm leading-relaxed text-gray-600">{group.description}</p>
                    </div>
                    <div className="divide-y divide-slate-200">
                      {group.forms.map((form) => (
                        <article id={form.id} key={form.id} className="scroll-mt-32 px-6 py-7 sm:px-8">
                          <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_17rem] lg:items-start">
                            <div className="min-w-0">
                              <div className="mb-2 flex flex-wrap items-center gap-3">
                                <h4 className="font-heading text-xl font-bold text-council-dark">{form.title}</h4>
                                <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${form.availability === 'online' ? 'bg-council-primary/10 text-council-primary' : 'bg-slate-100 text-slate-600'}`}>
                                  {form.availability === 'online' ? 'Nurse 360' : form.availability === 'guidance' ? 'Guidance' : 'Council assistance'}
                                </span>
                              </div>
                              <p className="max-w-2xl text-sm leading-relaxed text-gray-600">{form.description}</p>
                              <details className="mt-4 text-sm text-gray-600">
                                <summary className="w-fit cursor-pointer rounded py-2 font-semibold text-council-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-council-primary">What to prepare and how to follow up</summary>
                                <dl className="mt-3 max-w-2xl space-y-4 border-l-2 border-[#f23d5c]/40 pl-4 leading-relaxed">
                                  <div><dt className="font-semibold text-council-dark">Before you start</dt><dd className="mt-1">{form.preparation}</dd></div>
                                  <div><dt className="font-semibold text-council-dark">What happens next</dt><dd className="mt-1">{form.followUp}</dd></div>
                                </dl>
                              </details>
                            </div>
                            <Link href={form.href} className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[8px] border border-council-primary/20 bg-white px-4 py-3 text-center text-sm font-semibold text-council-primary transition-colors hover:bg-council-primary hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-council-primary">
                              {form.action}<ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                            </Link>
                          </div>
                        </article>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            ) : (
              <div className="border border-slate-200 bg-white px-6 py-14 text-center">
                <FileText className="mx-auto h-10 w-10 text-council-primary" aria-hidden="true" />
                <h3 className="font-heading mt-5 text-2xl font-bold text-council-dark">No matching services found.</h3>
                <p className="mx-auto mt-3 max-w-md leading-relaxed text-gray-600">Try another search term or return to the complete service directory.</p>
                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-6 inline-flex items-center justify-center rounded-[8px] bg-council-primary px-5 py-3 font-semibold text-white transition-colors hover:bg-council-secondary focus:outline-none focus:ring-2 focus:ring-council-primary focus:ring-offset-2"
                >
                  View all services
                </button>
              </div>
            )}
          </div>
        </section>

        <section className="bg-council-primary py-20 text-white">
          <div className="container mx-auto grid gap-8 px-4 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <h2 className="font-heading text-4xl font-bold">Need help choosing a service?</h2>
            </div>
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 rounded-[8px] bg-white px-6 py-3 font-semibold text-council-primary transition-colors hover:bg-gray-100">
              Contact us
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
