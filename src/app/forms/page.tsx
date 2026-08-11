'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Clock,
  FilePdf,
  FileText,
  FolderOpen,
  MagnifyingGlass,
  X,
} from '@phosphor-icons/react/dist/ssr';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const formGroups = [
  {
    id: 'registration',
    title: 'Registration & Licensure',
    description: 'Forms for entry to practice, registration, licensing, and renewal.',
    forms: [
      'Graduate Nurse Letter',
      'Registration - Local',
      'Registration - International',
      'Provisional (Temporary) Licence',
      'Licence Renewal',
    ],
  },
  {
    id: 'education',
    title: 'Education & Examination',
    description: 'Forms for education pathways, examinations, and institutional approval.',
    forms: ['Indexing', 'Examination', 'Training Institution Approval'],
  },
  {
    id: 'cpd',
    title: 'Continuing Professional Development',
    description: 'Forms and guidance for continuing professional development activity.',
    forms: ['CPD Provider', 'CPD Event', 'Approved CPD Requirements'],
  },
  {
    id: 'agencies-uaps',
    title: 'Nursing Agencies & UAPs',
    description: 'Forms for nursing-agency licensing and Unlicensed Assistive Personnel records.',
    forms: ['Nursing Agency Application', 'Nursing Agency Renewal', 'UAP Application to be Recorded', 'UAP Renewal'],
  },
];

const totalFormCount = formGroups.reduce((total, group) => total + group.forms.length, 0);

export default function FormsPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [search, setSearch] = useState('');

  const normalizedSearch = search.trim().toLowerCase();
  const visibleGroups = useMemo(
    () => formGroups
      .filter((group) => activeCategory === 'all' || group.id === activeCategory)
      .map((group) => ({
        ...group,
        forms: group.forms.filter((form) => form.toLowerCase().includes(normalizedSearch)),
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
              <p className="mb-5 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.16em] text-council-accent">
                <span className="h-px w-10 bg-council-accent" />
                Forms & documents
              </p>
              <h1 className="font-heading mb-6 text-5xl font-bold leading-tight md:text-6xl">
                Find the right Council form.
              </h1>
              <p className="max-w-2xl text-xl leading-relaxed text-white/85">
                Browse forms for registration, education, professional development, agencies, and Unlicensed Assistive Personnel.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white py-16 lg:py-20">
          <div className="container mx-auto px-4">
            <div className="grid gap-8 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
              <div>
                <p className="mb-4 flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.16em] text-council-primary">
                  <span className="h-px w-9 bg-council-accent" />
                  Forms directory
                </p>
                <h2 className="font-heading text-4xl font-bold leading-tight text-council-dark md:text-5xl">
                  Browse by purpose.
                </h2>
              </div>
              <p className="max-w-2xl text-lg leading-relaxed text-gray-600">
                {totalFormCount} Council form titles are organized below. Official PDF files will appear in the same directory when they are approved for publication.
              </p>
            </div>

            <div className="mt-12 border-y border-slate-200 py-6">
              <label className="relative block">
                <span className="sr-only">Search Council forms</span>
                <MagnifyingGlass className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-council-primary" aria-hidden="true" />
                <input
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search forms by name"
                  className="min-h-14 w-full rounded-sm border border-slate-300 bg-slate-50 py-3 pl-12 pr-12 text-base text-council-dark outline-none transition-colors placeholder:text-slate-500 focus:border-council-primary focus:ring-2 focus:ring-council-primary/20"
                />
                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch('')}
                    className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-sm text-slate-500 transition-colors hover:bg-slate-200 hover:text-council-dark focus:outline-none focus:ring-2 focus:ring-council-primary focus:ring-offset-2"
                    aria-label="Clear form search"
                  >
                    <X className="h-4 w-4" aria-hidden="true" />
                  </button>
                )}
              </label>
              <div className="mt-5 grid gap-px overflow-hidden rounded-sm border border-slate-200 bg-slate-200 sm:grid-cols-2 xl:grid-cols-5">
                <button
                  type="button"
                  onClick={() => setActiveCategory('all')}
                  aria-pressed={activeCategory === 'all'}
                  className={`min-h-28 p-5 text-left transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-council-primary ${activeCategory === 'all' ? 'bg-council-primary text-white' : 'bg-white text-council-dark hover:bg-slate-50'}`}
                >
                  <FolderOpen className={`mb-4 h-7 w-7 ${activeCategory === 'all' ? 'text-council-accent' : 'text-council-primary'}`} aria-hidden="true" />
                  <span className="block font-heading text-lg font-bold">All forms</span>
                  <span className={`mt-1 block text-sm ${activeCategory === 'all' ? 'text-white/75' : 'text-gray-500'}`}>{totalFormCount} listed forms</span>
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
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-council-primary">Available form titles</p>
                <h2 className="font-heading mt-2 text-3xl font-bold text-council-dark sm:text-4xl">{visibleFormCount} {visibleFormCount === 1 ? 'form' : 'forms'} shown</h2>
              </div>
              <span className="inline-flex items-center gap-2 rounded-sm border border-council-accent/60 bg-council-accent/10 px-3 py-2 text-sm font-semibold text-council-dark">
                <Clock className="h-4 w-4" aria-hidden="true" />
                Pending Council publication
              </span>
            </div>

            {visibleGroups.length > 0 ? (
              <div className="overflow-hidden rounded-sm border border-slate-200 bg-white">
                {visibleGroups.map((group, groupIndex) => (
                  <section key={group.id} className={groupIndex > 0 ? 'border-t-8 border-gray-50' : ''} aria-labelledby={`${group.id}-heading`}>
                    <div className="grid gap-4 border-b border-slate-200 px-6 py-6 md:grid-cols-[minmax(15rem,0.65fr)_1.35fr] md:items-end md:px-8">
                      <div>
                        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-council-primary">Form category</p>
                        <h3 id={`${group.id}-heading`} className="font-heading text-2xl font-bold text-council-dark">{group.title}</h3>
                      </div>
                      <p className="max-w-xl text-sm leading-relaxed text-gray-600">{group.description}</p>
                    </div>
                    <div className="divide-y divide-slate-200">
                      {group.forms.map((form) => (
                        <article key={form} className="grid gap-5 px-6 py-5 sm:grid-cols-[auto_1fr_auto] sm:items-center sm:px-8">
                          <FileText className="h-7 w-7 shrink-0 text-council-primary" aria-hidden="true" />
                          <div>
                            <h4 className="font-heading text-lg font-bold text-council-dark">{form}</h4>
                            <p className="mt-1 text-sm leading-relaxed text-gray-500">Official PDF not yet supplied for publication.</p>
                          </div>
                          <span className="inline-flex w-fit items-center gap-2 border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-600">
                            <FilePdf className="h-4 w-4 text-council-primary" aria-hidden="true" />
                            PDF pending
                          </span>
                        </article>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            ) : (
              <div className="border border-slate-200 bg-white px-6 py-14 text-center">
                <FileText className="mx-auto h-10 w-10 text-council-primary" aria-hidden="true" />
                <h3 className="font-heading mt-5 text-2xl font-bold text-council-dark">No matching forms found.</h3>
                <p className="mx-auto mt-3 max-w-md leading-relaxed text-gray-600">Try another search term or return to the complete forms directory.</p>
                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-6 inline-flex items-center justify-center rounded-sm bg-council-primary px-5 py-3 font-semibold text-white transition-colors hover:bg-council-secondary focus:outline-none focus:ring-2 focus:ring-council-primary focus:ring-offset-2"
                >
                  View all forms
                </button>
              </div>
            )}
          </div>
        </section>

        <section className="bg-council-primary py-20 text-white">
          <div className="container mx-auto grid gap-8 px-4 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.16em] text-council-accent">Need help choosing a form?</p>
              <h2 className="font-heading text-4xl font-bold">Contact the Council before submitting documents.</h2>
            </div>
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 rounded-sm bg-white px-6 py-3 font-semibold text-council-primary transition-colors hover:bg-gray-100">
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
