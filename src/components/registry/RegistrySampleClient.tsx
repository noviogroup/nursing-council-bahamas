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
import { type FormEvent, useEffect, useState } from "react";

type RegistryRecord = {
  id: number;
  name: string;
  type: string;
  registrationNumber: string;
  registrationYear: number;
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
  year: string;
};

const EMPTY_FILTERS: Filters = { query: "", type: "", year: "" };
const REGISTRATION_TYPES = [
  { value: "RN", label: "RN — Registered Nurse" },
  { value: "EN", label: "EN — Enrolled Nurse, including TCNs/LPNs" },
  { value: "RM", label: "RM — Registered Midwife" },
  { value: "APN", label: "APN — Advanced Practice Nurse" },
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
    if (activeFilters.year) params.set("year", activeFilters.year);

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

  const hasFilters = Boolean(
    activeFilters.query || activeFilters.type || activeFilters.year,
  );
  const firstResult = total === 0 ? 0 : (page - 1) * 25 + 1;
  const lastResult = Math.min(page * 25, total);

  return (
    <div className="space-y-8">
      <form
        onSubmit={handleSubmit}
        className="grid gap-4 rounded-sm border border-slate-200 bg-white p-5 shadow-sm lg:grid-cols-[minmax(0,1fr)_180px_180px_auto] lg:items-end lg:p-6"
        aria-label="Search public nurse registry"
      >
        <div>
          <label
            htmlFor="registry-search"
            className="mb-2 block text-sm font-semibold text-council-dark"
          >
            Name or registration/enrollment number
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

        <div>
          <label
            htmlFor="registry-type"
            className="mb-2 block text-sm font-semibold text-council-dark"
          >
            Registration/Enrollment Type
          </label>
          <select
            id="registry-type"
            value={formFilters.type}
            onChange={(event) =>
              setFormFilters((current) => ({
                ...current,
                type: event.target.value,
              }))
            }
            className="h-12 w-full rounded-sm border border-input bg-white px-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-council-primary"
          >
            <option value="">All types</option>
            {REGISTRATION_TYPES.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="registry-year"
            className="mb-2 block text-sm font-semibold text-council-dark"
          >
            Registration/Enrollment Year
          </label>
          <Input
            id="registry-year"
            type="number"
            min={1900}
            max={new Date().getFullYear()}
            value={formFilters.year}
            onChange={(event) =>
              setFormFilters((current) => ({
                ...current,
                year: event.target.value,
              }))
            }
            placeholder="All years"
            className="h-12"
          />
        </div>

        <Button
          type="submit"
          className="h-12 rounded-sm bg-council-primary px-6 font-semibold hover:bg-council-secondary"
        >
          <Search className="h-4 w-4" aria-hidden="true" />
          Search
        </Button>
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
                      Registration/Enrollment number
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-4 text-right font-semibold"
                    >
                      Original year
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {records.map((record) => (
                    <tr key={record.id} className="hover:bg-slate-50/70">
                      <th
                        scope="row"
                        className="px-6 py-4 font-semibold text-council-dark"
                      >
                        {record.name}
                      </th>
                      <td className="px-6 py-4">
                        <span className="inline-flex min-w-11 justify-center rounded-full bg-council-primary/10 px-3 py-1 text-sm font-semibold text-council-primary">
                          {record.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-mono text-sm text-slate-700">
                        {record.registrationNumber}
                      </td>
                      <td className="px-6 py-4 text-right text-slate-700">
                        {record.registrationYear}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="divide-y divide-slate-100 md:hidden">
              {records.map((record) => (
                <article key={record.id} className="p-5">
                  <div className="mb-3 flex items-start justify-between gap-4">
                    <h3 className="font-heading text-lg font-bold text-council-dark">
                      {record.name}
                    </h3>
                    <span className="rounded-full bg-council-primary/10 px-3 py-1 text-sm font-semibold text-council-primary">
                      {record.type}
                    </span>
                  </div>
                  <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm">
                    <dt className="text-slate-500">Registration/Enrollment</dt>
                    <dd className="text-right font-mono text-slate-800">
                      {record.registrationNumber}
                    </dd>
                    <dt className="text-slate-500">Original year</dt>
                    <dd className="text-right font-semibold text-slate-800">
                      {record.registrationYear}
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
