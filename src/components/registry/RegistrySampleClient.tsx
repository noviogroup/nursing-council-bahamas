"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AlertTriangle,
  Check,
  ChevronLeft,
  ChevronRight,
  LoaderCircle,
  Search,
  X,
} from "lucide-react";
import { type FormEvent, useEffect, useState } from "react";

type RegistryRecord = {
  name: string;
  type: string;
  registrationNumber: string;
  registrationYear: number | null;
};

type RegistryResponse = {
  records: RegistryRecord[];
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
  { label: "Enrolled Nurse", value: "EN" },
  { label: "Registered Midwife", value: "RM" },
  { label: "Trained Clinical Nurse", value: "TCN" },
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
  const [pages, setPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

        if (!response.ok) {
          throw new Error(
            payload.error || "Unable to load the public registry.",
          );
        }

        const result = payload as RegistryResponse;
        setRecords(result.records);
        setTotal(result.pagination.total);
        setPages(result.pagination.pages);
      } catch (loadError) {
        if (controller.signal.aborted) return;
        setRecords([]);
        setTotal(0);
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
  }, [activeFilters, page]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const query = formFilters.query.trim();

    if (query && query.length < 2) {
      setError("Enter at least two letters or numbers to search.");
      return;
    }

    setError("");
    setPage(1);
    setActiveFilters({ ...formFilters, query });
  }

  function clearFilters() {
    setFormFilters(EMPTY_FILTERS);
    setActiveFilters(EMPTY_FILTERS);
    setPage(1);
  }

  function handleDecadeSelection(yearRange: string) {
    const query = formFilters.query.trim();

    if (query && query.length < 2) {
      setError("Enter at least two letters or numbers to search.");
      return;
    }

    const nextYearRange = formFilters.yearRange === yearRange ? "" : yearRange;
    const nextFilters = { ...formFilters, query, yearRange: nextYearRange };

    setError("");
    setFormFilters(nextFilters);
    setActiveFilters(nextFilters);
    setPage(1);
  }

  function handleTypeSelection(type: string) {
    const query = formFilters.query.trim();

    if (query && query.length < 2) {
      setError("Enter at least two letters or numbers to search.");
      return;
    }

    const nextFilters = { ...formFilters, query, type };

    setError("");
    setFormFilters(nextFilters);
    setActiveFilters(nextFilters);
    setPage(1);
  }

  const hasFilters = Boolean(
    activeFilters.query || activeFilters.type || activeFilters.yearRange,
  );
  const firstResult = total === 0 ? 0 : (page - 1) * 25 + 1;
  const lastResult = Math.min(page * 25, total);

  return (
    <div className="space-y-8">
      <form
        onSubmit={handleSubmit}
        className="rounded-sm border border-slate-200 bg-white p-5 shadow-sm lg:p-6"
        aria-label="Search public nurse registry"
      >
        <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
          <div>
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
                id="registry-search"
                value={formFilters.query}
                onChange={(event) =>
                  setFormFilters((current) => ({
                    ...current,
                    query: event.target.value,
                  }))
                }
                placeholder="e.g. Rolle or RN 24-5537"
                maxLength={80}
                className="h-12 pl-10"
              />
            </div>
          </div>

          <Button
            type="submit"
            className="h-12 rounded-sm bg-council-primary px-6 font-semibold hover:bg-council-secondary"
          >
            <Search className="h-4 w-4" aria-hidden="true" />
            Search
          </Button>
        </div>

        <fieldset className="mt-6 border-t border-slate-200 pt-5">
          <legend className="mx-auto px-3 text-center text-sm font-semibold text-council-dark">
            Registration type
          </legend>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
            {REGISTRATION_TYPES.map((type) => {
              const isSelected = formFilters.type === type.value;

              return (
                <button
                  key={type.value || "all"}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => handleTypeSelection(type.value)}
                  className={`flex min-h-16 items-center justify-center gap-2 rounded-sm border px-4 py-3 text-center text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-council-primary focus:ring-offset-2 ${
                    isSelected
                      ? "border-council-primary bg-council-primary/10 text-council-primary"
                      : "border-slate-300 bg-white text-slate-700 hover:border-council-primary hover:bg-council-primary/5 hover:text-council-primary"
                  }`}
                >
                  <Check
                    className={`h-4 w-4 shrink-0 ${isSelected ? "opacity-100" : "opacity-0"}`}
                    aria-hidden="true"
                  />
                  <span>{type.label}</span>
                </button>
              );
            })}
          </div>
        </fieldset>

        <fieldset className="mt-6 border-t border-slate-200 pt-5">
          <legend className="mx-auto px-3 text-center text-sm font-semibold text-council-dark">
            Registration period
          </legend>
          <div
            className="flex flex-wrap justify-center gap-2"
            aria-label="Registration period"
          >
            {REGISTRATION_DECADES.map((decade) => {
              const isSelected = formFilters.yearRange === decade.value;

              return (
                <button
                  key={decade.value}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => handleDecadeSelection(decade.value)}
                  className={`min-h-10 rounded-full border px-4 py-2 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-council-primary focus:ring-offset-2 ${
                    isSelected
                      ? "border-council-primary bg-council-primary text-white"
                      : "border-slate-300 bg-white text-council-primary hover:border-council-primary hover:bg-council-primary/5"
                  }`}
                >
                  {decade.label}
                </button>
              );
            })}
          </div>
        </fieldset>
      </form>

      {error && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-sm border border-red-200 bg-red-50 p-4 text-red-900"
        >
          <AlertTriangle
            className="mt-0.5 h-5 w-5 shrink-0"
            aria-hidden="true"
          />
          <p>{error}</p>
        </div>
      )}

      <section
        className="overflow-hidden rounded-sm border border-slate-200 bg-white shadow-sm"
        aria-busy={loading}
      >
        <div className="flex flex-col gap-3 border-b border-slate-200 px-5 py-5 sm:flex-row sm:items-center sm:justify-between lg:px-6">
          <div>
            <h2 className="font-heading text-2xl font-bold text-council-dark">
              Registry results
            </h2>
            <p className="mt-1 text-sm text-slate-600" aria-live="polite">
              {loading
                ? "Loading records…"
                : total === 0
                  ? "No matching records"
                  : `Showing ${firstResult}–${lastResult} of ${total} records`}
            </p>
          </div>
          {hasFilters && (
            <Button
              type="button"
              variant="outline"
              onClick={clearFilters}
              className="h-11 self-start sm:self-auto"
            >
              <X className="h-4 w-4" aria-hidden="true" />
              Clear filters
            </Button>
          )}
        </div>

        {loading ? (
          <div className="flex min-h-64 items-center justify-center gap-3 text-slate-600">
            <LoaderCircle className="h-5 w-5 animate-spin" aria-hidden="true" />
            Loading public registry…
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
                  <div className="mb-3 flex items-start justify-between gap-4">
                    <h3 className="font-heading text-lg font-bold text-council-dark">
                      {record.name}
                    </h3>
                    <span className="rounded-full bg-council-primary/10 px-3 py-1 text-sm font-semibold text-council-primary">
                        {REGISTRATION_TYPE_LABELS.get(record.type) ??
                          record.type}
                    </span>
                  </div>
                  <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm">
                    <dt className="text-slate-500">Registration</dt>
                    <dd className="text-right font-mono text-slate-800">
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
          </>
        ) : (
          <div className="min-h-64 px-6 py-16 text-center">
            <Search
              className="mx-auto mb-4 h-9 w-9 text-slate-400"
              aria-hidden="true"
            />
            <h3 className="font-heading text-xl font-bold text-council-dark">
              No registry records found
            </h3>
            <p className="mx-auto mt-2 max-w-lg text-slate-600">
              Check the spelling or clear a filter to search the full published
              registry.
            </p>
          </div>
        )}

        {!loading && total > 0 && (
          <div className="flex items-center justify-between gap-4 border-t border-slate-200 px-5 py-4 lg:px-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => setPage((current) => Math.max(1, current - 1))}
              disabled={page <= 1}
              className="h-11"
            >
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
              Previous
            </Button>
            <span className="text-sm font-medium text-slate-700">
              Page {page} of {Math.max(pages, 1)}
            </span>
            <Button
              type="button"
              variant="outline"
              onClick={() => setPage((current) => Math.min(pages, current + 1))}
              disabled={page >= pages}
              className="h-11"
            >
              Next
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        )}
      </section>
    </div>
  );
}
