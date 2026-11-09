"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  FileText,
  MagnifyingGlass,
  X,
} from "@phosphor-icons/react/dist/ssr";
import Header from "@/components/Header";
import { InteriorPageHeader, PageAssistance } from "@/components/InteriorPage";
import Footer from "@/components/Footer";
import { councilServiceGroups, councilServices } from "@/lib/councilServices";

const formGroups = councilServiceGroups.map((group) => ({
  ...group,
  forms: councilServices.filter((service) => service.group === group.id),
}));
const totalFormCount = councilServices.length;

export default function FormsPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");

  const normalizedSearch = search.trim().toLowerCase();
  const visibleGroups = useMemo(
    () =>
      formGroups
        .filter(
          (group) => activeCategory === "all" || group.id === activeCategory,
        )
        .map((group) => ({
          ...group,
          forms: group.forms.filter((form) =>
            `${form.title} ${form.description}`
              .toLowerCase()
              .includes(normalizedSearch),
          ),
        }))
        .filter((group) => group.forms.length > 0),
    [activeCategory, normalizedSearch],
  );
  const visibleFormCount = visibleGroups.reduce(
    (total, group) => total + group.forms.length,
    0,
  );

  function clearFilters() {
    setSearch("");
    setActiveCategory("all");
  }

  return (
    <>
      <Header />
      <main className="flex-1">
        <InteriorPageHeader
          title="Forms & Applications"
          description="Find your next step for registration, education, professional development, nursing agencies and Unlicensed Assistive Personnel."
        />

        <section className="bg-white py-10 lg:py-12">
          <div className="container mx-auto px-4">
            <div className="grid gap-4 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
              <div>
                <h2 className="font-heading text-2xl font-bold leading-tight text-council-dark md:text-3xl">
                  What do you need to do?
                </h2>
              </div>
              <p className="max-w-2xl leading-relaxed text-gray-600">
                Start available applications in Nurse 360 or ask the Council for
                help with other services. Read each entry for what to prepare
                and how to follow up.
              </p>
            </div>

            <div className="mt-6">
              <label className="relative block">
                <span className="sr-only">Search forms and applications</span>
                <MagnifyingGlass
                  className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-council-primary"
                  aria-hidden="true"
                />
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
                    onClick={() => setSearch("")}
                    className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-[8px] text-slate-500 transition-colors hover:bg-slate-200 hover:text-council-dark focus:outline-none focus:ring-2 focus:ring-council-primary focus:ring-offset-2"
                    aria-label="Clear form search"
                  >
                    <X className="h-4 w-4" aria-hidden="true" />
                  </button>
                )}
              </label>
              <div
                className="mt-4 flex flex-wrap gap-2"
                role="group"
                aria-label="Filter services by category"
              >
                <button
                  type="button"
                  onClick={() => setActiveCategory("all")}
                  aria-pressed={activeCategory === "all"}
                  className={`min-h-12 rounded-lg border px-4 py-2.5 text-left text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-council-primary ${activeCategory === "all" ? "border-council-primary bg-council-primary text-white" : "border-slate-200 bg-white text-council-primary hover:bg-slate-50"}`}
                >
                  All services{" "}
                  <span className="ml-1 font-normal">({totalFormCount})</span>
                </button>
                {formGroups.map((group) => (
                  <button
                    key={group.id}
                    type="button"
                    onClick={() => setActiveCategory(group.id)}
                    aria-pressed={activeCategory === group.id}
                    className={`min-h-12 rounded-lg border px-4 py-2.5 text-left text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-council-primary ${activeCategory === group.id ? "border-council-primary bg-council-primary text-white" : "border-slate-200 bg-white text-council-primary hover:bg-slate-50"}`}
                  >
                    {group.title}{" "}
                    <span className="ml-1 font-normal">
                      ({group.forms.length})
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="bg-gray-50 py-10 lg:py-12">
          <div className="container mx-auto px-4">
            <div className="mb-6 flex flex-wrap items-end justify-between gap-4 border-b border-slate-200 pb-5">
              <div>
                <h2
                  aria-live="polite"
                  className="font-heading text-2xl font-bold text-council-dark"
                >
                  {visibleFormCount}{" "}
                  {visibleFormCount === 1 ? "service" : "services"} shown
                </h2>
              </div>
              <p className="max-w-xl text-sm leading-relaxed text-gray-600">
                Check the portal or ask the Council for current fees and
                processing guidance before submitting documents or making a
                payment.
              </p>
            </div>

            {visibleGroups.length > 0 ? (
              <div className="overflow-hidden rounded-[8px] border border-slate-200 bg-white">
                {visibleGroups.map((group, groupIndex) => (
                  <section
                    key={group.id}
                    className={
                      groupIndex > 0 ? "border-t-8 border-gray-50" : ""
                    }
                    aria-labelledby={`${group.id}-heading`}
                  >
                    <div className="grid gap-4 border-b border-slate-200 px-6 py-6 md:grid-cols-[minmax(15rem,0.65fr)_1.35fr] md:items-end md:px-8">
                      <div>
                        <h3
                          id={`${group.id}-heading`}
                          className="font-heading text-2xl font-bold text-council-dark"
                        >
                          {group.title}
                        </h3>
                      </div>
                      <div>
                        <p className="max-w-xl text-sm leading-relaxed text-gray-600">
                          {group.description}
                        </p>
                        {group.id === "education" && (
                          <Link
                            href="/indexing"
                            className="mt-2 inline-flex min-h-11 items-center text-sm font-semibold text-council-primary underline underline-offset-4 focus-visible:outline focus-visible:outline-2"
                          >
                            Read student indexing guidance
                          </Link>
                        )}
                        {group.id === "agencies-uaps" && (
                          <div className="mt-2 flex flex-wrap gap-x-5">
                            <Link
                              href="/nursing-agencies"
                              className="inline-flex min-h-11 items-center text-sm font-semibold text-council-primary underline underline-offset-4 focus-visible:outline focus-visible:outline-2"
                            >
                              Nursing agency guidance
                            </Link>
                            <Link
                              href="/uaps"
                              className="inline-flex min-h-11 items-center text-sm font-semibold text-council-primary underline underline-offset-4 focus-visible:outline focus-visible:outline-2"
                            >
                              UAP guidance
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="divide-y divide-slate-200">
                      {group.forms.map((form) => (
                        <article
                          id={form.id}
                          key={form.id}
                          className="scroll-mt-32 px-6 py-7 sm:px-8"
                        >
                          <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_17rem] lg:items-start">
                            <div className="min-w-0">
                              <div className="mb-2 flex flex-wrap items-center gap-3">
                                <h4 className="font-heading text-xl font-bold text-council-dark">
                                  {form.title}
                                </h4>
                                <span
                                  className={`rounded-full px-2.5 py-1 text-xs font-semibold ${form.availability === "online" ? "bg-council-primary/10 text-council-primary" : "bg-slate-100 text-slate-600"}`}
                                >
                                  {form.availability === "online"
                                    ? "Nurse 360"
                                    : form.availability === "guidance"
                                      ? "Guidance"
                                      : "Council assistance"}
                                </span>
                              </div>
                              <p className="max-w-2xl text-sm leading-relaxed text-gray-600">
                                {form.description}
                              </p>
                              <details className="mt-4 text-sm text-gray-600">
                                <summary className="w-fit cursor-pointer rounded py-2 font-semibold text-council-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-council-primary">
                                  What to prepare and how to follow up
                                </summary>
                                <dl className="mt-3 max-w-2xl space-y-4 border-l-2 border-[#f23d5c]/40 pl-4 leading-relaxed">
                                  <div>
                                    <dt className="font-semibold text-council-dark">
                                      Before you start
                                    </dt>
                                    <dd className="mt-1">{form.preparation}</dd>
                                  </div>
                                  <div>
                                    <dt className="font-semibold text-council-dark">
                                      What happens next
                                    </dt>
                                    <dd className="mt-1">{form.followUp}</dd>
                                  </div>
                                </dl>
                              </details>
                            </div>
                            <Link
                              href={form.href}
                              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-[8px] border border-council-primary/20 bg-white px-4 py-3 text-center text-sm font-semibold text-council-primary transition-colors hover:bg-council-primary hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-council-primary"
                            >
                              {form.action}
                              <ArrowRight
                                className="h-4 w-4 shrink-0"
                                aria-hidden="true"
                              />
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
                <FileText
                  className="mx-auto h-10 w-10 text-council-primary"
                  aria-hidden="true"
                />
                <h3 className="font-heading mt-5 text-2xl font-bold text-council-dark">
                  No matching services found.
                </h3>
                <p className="mx-auto mt-3 max-w-md leading-relaxed text-gray-600">
                  Try another search term or return to the complete service
                  directory.
                </p>
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

        <PageAssistance
          title="Need help choosing a service?"
          description="Tell the Council what you need to do and ask which route applies to you."
        />
      </main>
      <Footer />
    </>
  );
}
