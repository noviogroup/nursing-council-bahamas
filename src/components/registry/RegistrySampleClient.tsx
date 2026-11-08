"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  LoaderCircle,
  Search,
  X,
} from "lucide-react";
import { type FormEvent, useEffect, useRef, useState } from "react";
import RegistryNotListedForm from "./RegistryNotListedForm";

type RegistryRecord = {
  name: string;
  type: string;
  registrationNumber: string;
  registrationYear: number | null;
};

type RegistryResponse = {
  records: RegistryRecord[];
  closeMatches: boolean;
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    pages: number;
  };
};

type Filters = {
  query: string;
  type: string;
  yearRange: string;
};

const EMPTY_FILTERS: Filters = { query: "", type: "", yearRange: "" };
const REGISTRATION_TYPES = [
  { label: "All registration types", value: "" },
  { label: "Registered Nurse", value: "RN" },
  { label: "Licensed Practical Nurse", value: "LPN" },
  { label: "Registered Midwife", value: "RM" },
];
const REGISTRATION_TYPE_LABELS = new Map(
  REGISTRATION_TYPES.map((type) => [type.value, type.label]),
);
const REGISTRATION_DECADES = [
  { label: "2021–2030", value: "2021-2030", from: 2021, to: 2030 },
  { label: "2011–2020", value: "2011-2020", from: 2011, to: 2020 },
  { label: "2001–2010", value: "2001-2010", from: 2001, to: 2010 },
  { label: "1991–2000", value: "1991-2000", from: 1991, to: 2000 },
  { label: "1981–1990", value: "1981-1990", from: 1981, to: 1990 },
  { label: "1971–1980", value: "1971-1980", from: 1971, to: 1980 },
];

export default function RegistrySampleClient() {
  const [formFilters, setFormFilters] = useState<Filters>(EMPTY_FILTERS);
  const [activeFilters, setActiveFilters] = useState<Filters>(EMPTY_FILTERS);
  const [records, setRecords] = useState<RegistryRecord[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [closeMatches, setCloseMatches] = useState(false);
  const [pages, setPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [validationError, setValidationError] = useState("");
  const [retryCount, setRetryCount] = useState(0);
  const [helpOpen, setHelpOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const helpRef = useRef<HTMLDivElement>(null);
  const resultsHeadingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const controller = new AbortController();
    const params = new URLSearchParams({ page: String(page) });
    if (activeFilters.query) params.set("q", activeFilters.query);
    if (activeFilters.type) params.set("type", activeFilters.type);
    const selectedDecade = REGISTRATION_DECADES.find(
      (decade) => decade.value === activeFilters.yearRange,
    );
    if (selectedDecade) {
      params.set("yearFrom", String(selectedDecade.from));
      params.set("yearTo", String(selectedDecade.to));
    }

    async function loadRegistry() {
      setLoading(true);
      setError("");

      try {
        const response = await fetch(`/api/registry?${params.toString()}`, {
          cache: "no-store",
          signal: controller.signal,
        });
        const payload = await response.json();
        if (controller.signal.aborted) return;

        if (!response.ok) {
          throw new Error(
            payload.error || "Unable to load the public registry.",
          );
        }

        const result = payload as RegistryResponse;
        setRecords(result.records);
        setTotal(result.pagination.total);
        setCloseMatches(result.closeMatches);
        setPages(result.pagination.pages);
      } catch (loadError) {
        if (controller.signal.aborted) return;
        setRecords([]);
        setTotal(0);
        setCloseMatches(false);
        setPages(0);
        setError(
          loadError instanceof Error
            ? loadError.message
            : "Unable to load the public registry.",
        );
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    void loadRegistry();
    return () => controller.abort();
  }, [activeFilters, page, retryCount]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const query = formFilters.query.trim();

    if (query && query.length < 2) {
      setValidationError("Enter at least two letters or numbers to search.");
      searchRef.current?.focus();
      return;
    }
    if (query && !/^[\p{L}\p{N}’'.,/ -]+$/u.test(query)) {
      setValidationError("Use letters, numbers, spaces, apostrophes, hyphens or slashes.");
      searchRef.current?.focus();
      return;
    }

    setValidationError("");
    setError("");
    setLoading(true);
    setPage(1);
    setFormFilters((current) => ({ ...current, query }));
    setActiveFilters({ ...formFilters, query });
  }

  function clearFilters() {
    searchRef.current?.focus();
    setFormFilters(EMPTY_FILTERS);
    setActiveFilters({ ...EMPTY_FILTERS });
    setPage(1);
    setValidationError("");
    setError("");
    setLoading(true);
  }

  function openHelp() {
    setHelpOpen(true);
    // Revisit an already-open draft or confirmation without resetting it.
    helpRef.current?.querySelector<HTMLElement>("#not-listed-heading, [role='status']")?.focus();
  }

  function goToPage(nextPage: number) {
    resultsHeadingRef.current?.focus();
    setLoading(true);
    setPage(nextPage);
  }

  function retrySearch() {
    resultsHeadingRef.current?.focus();
    setLoading(true);
    setRetryCount((current) => current + 1);
  }

  const hasFilters = Boolean(
    activeFilters.query || activeFilters.type || activeFilters.yearRange,
  );
  const hasDraftFilters = Boolean(
    formFilters.query || formFilters.type || formFilters.yearRange,
  );
  const hasPendingChanges =
    formFilters.query.trim() !== activeFilters.query ||
    formFilters.type !== activeFilters.type ||
    formFilters.yearRange !== activeFilters.yearRange;
  const firstResult = total === 0 ? 0 : (page - 1) * 25 + 1;
  const lastResult = Math.min(page * 25, total);
  const appliedSummary = [
    activeFilters.query && `“${activeFilters.query}”`,
    activeFilters.type && REGISTRATION_TYPE_LABELS.get(activeFilters.type),
    activeFilters.yearRange && `First registered ${REGISTRATION_DECADES.find((decade) => decade.value === activeFilters.yearRange)?.label}`,
  ].filter(Boolean).join(" · ");
  const selectClass = "h-12 w-full min-w-0 rounded-[8px] border border-slate-300 bg-white px-3 text-sm text-council-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-council-primary";

  return (
    <div className="space-y-6">
      <form
        onSubmit={handleSubmit}
        className="rounded-[8px] border border-slate-200 bg-white p-5 text-council-dark shadow-sm lg:p-6"
        aria-label="Search the nurse registry"
      >
        <div className="grid items-end gap-4 sm:grid-cols-2 xl:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)_minmax(0,0.85fr)_auto]">
          <div className="min-w-0 sm:col-span-2 xl:col-span-1">
            <label
              htmlFor="registry-search"
              className="mb-2 block text-sm font-semibold text-council-dark"
            >
              Name or registration number
            </label>
            <div className="relative">
              <Search
                className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400"
                aria-hidden="true"
              />
              <Input
                ref={searchRef}
                id="registry-search"
                type="search"
                autoComplete="off"
                enterKeyHint="search"
                spellCheck={false}
                value={formFilters.query}
                onChange={(event) => {
                  setValidationError("");
                  setFormFilters((current) => ({
                    ...current,
                    query: event.target.value,
                  }));
                }}
                aria-invalid={Boolean(validationError)}
                aria-describedby={validationError ? "registry-search-error" : undefined}
                placeholder="e.g. Rolle or RN 24-5537"
                maxLength={80}
                className="h-12 rounded-[8px] bg-white pl-10 text-council-dark placeholder:text-slate-500"
              />
            </div>
          </div>

          <div className="min-w-0">
            <label htmlFor="registry-type" className="mb-2 block text-sm font-semibold">Registration type</label>
            <select id="registry-type" value={formFilters.type} onChange={(event) => setFormFilters((current) => ({ ...current, type: event.target.value }))} className={selectClass}>
              {REGISTRATION_TYPES.map((type) => <option key={type.value || "all"} value={type.value}>{type.label}</option>)}
            </select>
          </div>
          <div className="min-w-0">
            <label htmlFor="registry-period" className="mb-2 block text-sm font-semibold">First registered</label>
            <select id="registry-period" value={formFilters.yearRange} onChange={(event) => setFormFilters((current) => ({ ...current, yearRange: event.target.value }))} className={selectClass}>
              <option value="">All periods</option>
              {REGISTRATION_DECADES.map((decade) => <option key={decade.value} value={decade.value}>{decade.label}</option>)}
            </select>
          </div>
          <Button
            type="submit"
            className="h-12 rounded-[8px] bg-council-primary px-6 font-semibold hover:bg-council-secondary sm:col-span-2 xl:col-span-1"
          >
            <Search className="h-4 w-4" aria-hidden="true" />
            Search
          </Button>
        </div>

        {validationError && <p id="registry-search-error" role="alert" className="mt-3 text-sm font-semibold text-red-700">{validationError}</p>}
        {(hasPendingChanges || hasFilters || hasDraftFilters) && (
          <div className="mt-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
            <p className="text-sm text-slate-600">{hasPendingChanges ? "Changes not applied. Select Search to update the results." : "Search using any combination of these fields."}</p>
            <Button type="button" variant="ghost" onClick={clearFilters} className="h-11 rounded-[8px] text-council-primary"><X className="h-4 w-4" aria-hidden="true" />Clear filters</Button>
          </div>
        )}
      </form>

      <div id="registry-help" ref={helpRef} className="scroll-mt-6">
        <RegistryNotListedForm open={helpOpen} onOpenChange={setHelpOpen} searchedFor={activeFilters.query} registrationType={activeFilters.type} />
      </div>

      <section
        className="overflow-hidden rounded-[8px] border border-slate-200 bg-white text-council-dark shadow-sm"
        aria-busy={loading}
        aria-labelledby="registry-results-heading"
      >
        <div className="flex flex-col gap-3 border-b border-slate-200 px-5 py-5 sm:flex-row sm:items-center sm:justify-between lg:px-6">
          <div>
            <h2 id="registry-results-heading" ref={resultsHeadingRef} tabIndex={-1} className="font-heading text-2xl font-bold text-council-dark outline-none">
              Registry results
            </h2>
            <p className="mt-1 text-sm text-slate-600" aria-live="polite" aria-atomic="true">
              {loading
                ? "Loading records…"
                : error
                  ? "Records could not be loaded"
                  : total === 0
                  ? "No matching records"
                  : closeMatches
                    ? total === 1
                      ? "No exact match. Showing 1 close match"
                      : `No exact match. Showing ${firstResult}–${lastResult} of ${total.toLocaleString()} close matches`
                    : `Showing ${firstResult}–${lastResult} of ${total.toLocaleString()} records`}
            </p>
            {appliedSummary && <p className="mt-2 break-words text-sm font-medium text-council-primary">Results for {appliedSummary}</p>}
            {!loading && closeMatches && total > 0 && (
              <p className="mt-1 text-sm text-slate-600">
                These names are spelt similarly to your search. Check the name
                and registration number before relying on a result.
              </p>
            )}
          </div>
        </div>

        {loading ? (
          <div className="flex min-h-64 items-center justify-center gap-3 text-slate-600">
            <LoaderCircle className="h-5 w-5 animate-spin" aria-hidden="true" />
            Loading public registry…
          </div>
        ) : error ? (
          <div className="px-5 py-10 lg:px-6">
            <div role="alert" className="flex items-start gap-3 text-red-900">
              <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
              <div><p className="font-semibold">We couldn’t load the registry.</p><p className="mt-1 text-sm">{error}</p></div>
            </div>
            <Button type="button" variant="outline" onClick={retrySearch} className="mt-5 h-11 rounded-[8px]">Try again</Button>
          </div>
        ) : records.length > 0 ? (
          <>
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full border-collapse text-left">
                <thead className="bg-slate-50 text-xs uppercase tracking-[0.12em] text-slate-600">
                  <tr>
                    <th scope="col" className="px-6 py-4 font-semibold">
                      Name
                    </th>
                    <th scope="col" className="px-6 py-4 font-semibold">
                      Type
                    </th>
                    <th scope="col" className="px-6 py-4 font-semibold">
                      Registration number
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 text-right font-semibold"
                    >
                      Year registered
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {records.map((record, index) => (
                    <tr
                      key={`${record.registrationNumber}:${record.name}:${index}`}
                      className="hover:bg-slate-50/70"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-semibold text-council-dark"
                      >
                        {record.name}
                      </th>
                      <td className="px-6 py-4">
                        <span className="inline-flex min-w-11 justify-center rounded-full bg-council-primary/10 px-3 py-1 text-sm font-semibold text-council-primary">
                          {REGISTRATION_TYPE_LABELS.get(record.type) ??
                            record.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-mono text-sm text-slate-700">
                        {record.registrationNumber}
                      </td>
                      <td className="px-6 py-4 text-right text-slate-700">
                        {record.registrationYear ?? "Not recorded"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="divide-y divide-slate-100 md:hidden">
              {records.map((record, index) => (
                <article
                  key={`${record.registrationNumber}:${record.name}:${index}`}
                  className="p-5"
                >
                  <div className="mb-3 flex flex-col items-start gap-2 sm:flex-row sm:justify-between sm:gap-4">
                    <h3 className="font-heading break-words text-lg font-bold text-council-dark">
                      {record.name}
                    </h3>
                    <span className="rounded-full bg-council-primary/10 px-3 py-1 text-sm font-semibold text-council-primary">
                        {REGISTRATION_TYPE_LABELS.get(record.type) ??
                          record.type}
                    </span>
                  </div>
                  <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm">
                    <dt className="text-slate-500">Registration</dt>
                    <dd className="break-all text-right font-mono text-slate-800">
                      {record.registrationNumber}
                    </dd>
                    <dt className="text-slate-500">Year registered</dt>
                    <dd className="text-right font-semibold text-slate-800">
                      {record.registrationYear ?? "Not recorded"}
                    </dd>
                  </dl>
                </article>
              ))}
            </div>
            {closeMatches && activeFilters.query && (
              <div className="border-t border-slate-200 px-5 py-6 lg:px-6">
                <p className="text-sm text-slate-600">If none of these records is yours, you can ask the Council to check.</p>
                <Button type="button" variant="outline" onClick={openHelp} className="mt-3 h-11 rounded-[8px]">I’m not in the registry</Button>
              </div>
            )}
          </>
        ) : (
          <div className="min-h-64 px-6 py-16 text-center">
            <Search
              className="mx-auto mb-4 h-9 w-9 text-slate-400"
              aria-hidden="true"
            />
            <h3 className="font-heading text-xl font-bold text-council-dark">No matching records</h3>
            <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-slate-600">Try a different spelling or registration number, or clear the filters to broaden your search. If you still can’t find your own record, ask the Council to check.</p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              {hasFilters && <Button type="button" variant="outline" onClick={clearFilters} className="h-11 rounded-[8px]">Clear filters</Button>}
              <Button type="button" variant="outline" onClick={openHelp} className="h-11 rounded-[8px]">I’m not in the registry</Button>
            </div>
          </div>
        )}

        {!loading && !error && total > 0 && (
          <nav aria-label="Registry results pages" className="flex items-center justify-between gap-2 border-t border-slate-200 px-5 py-4 lg:px-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => goToPage(Math.max(1, page - 1))}
              disabled={page <= 1}
              className="h-11 rounded-[8px] px-2 sm:px-4"
            >
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
              Previous
            </Button>
            <span className="text-center text-sm font-medium text-slate-700">
              Page {page} of {Math.max(pages, 1)}
            </span>
            <Button
              type="button"
              variant="outline"
              onClick={() => goToPage(Math.min(pages, page + 1))}
              disabled={page >= pages}
              className="h-11 rounded-[8px] px-2 sm:px-4"
            >
              Next
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </nav>
        )}
      </section>
    </div>
  );
}
