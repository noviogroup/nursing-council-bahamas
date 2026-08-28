import { createClient } from "@supabase/supabase-js";
import { type NextRequest, NextResponse } from "next/server";

const PAGE_SIZE = 25;
const ALLOWED_TYPES = new Set(["RN", "EN", "RM", "APN"]);
const SEARCH_PATTERN = /^[\p{L}\p{N}’'./ -]+$/u;

type RegistryRow = {
  entry_id: number;
  nurse_name: string;
  registration_type: string;
  registration_number: string;
  registration_year: number;
  total_count: number | string;
};

export async function GET(request: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !anonKey) {
    return NextResponse.json(
      { error: "The public registry is not configured in this environment." },
      { status: 503 },
    );
  }

  const query = request.nextUrl.searchParams.get("q")?.trim() || "";
  const registrationType =
    request.nextUrl.searchParams.get("type")?.trim().toUpperCase() || "";
  const yearValue = request.nextUrl.searchParams.get("year")?.trim() || "";
  const pageValue = request.nextUrl.searchParams.get("page")?.trim() || "1";
  const page = Number(pageValue);
  const registrationYear = yearValue ? Number(yearValue) : null;
  const currentYear = new Date().getFullYear();

  if (
    query &&
    (query.length < 2 || query.length > 80 || !SEARCH_PATTERN.test(query))
  ) {
    return NextResponse.json(
      { error: "Enter at least two letters or numbers to search." },
      { status: 400 },
    );
  }

  if (registrationType && !ALLOWED_TYPES.has(registrationType)) {
    return NextResponse.json(
      { error: "Select a valid registration/enrollment type." },
      { status: 400 },
    );
  }

  if (
    registrationYear !== null &&
    (!Number.isInteger(registrationYear) ||
      registrationYear < 1900 ||
      registrationYear > currentYear)
  ) {
    return NextResponse.json(
      { error: "Select a valid registration/enrollment year." },
      { status: 400 },
    );
  }

  if (!Number.isInteger(page) || page < 1 || page > 500) {
    return NextResponse.json(
      { error: "Select a valid results page." },
      { status: 400 },
    );
  }

  const supabase = createClient(supabaseUrl, anonKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const backendTypes: Array<string | null> =
    registrationType === "EN"
      ? ["EN", "TCN", "LPN"]
      : registrationType === "APN"
        ? ["APRN"]
        : [registrationType || null];
  const offset = (page - 1) * PAGE_SIZE;
  const isGroupedEnrollmentSearch = backendTypes.length > 1;
  const queryLimit = isGroupedEnrollmentSearch ? page * PAGE_SIZE : PAGE_SIZE;
  const queryOffset = isGroupedEnrollmentSearch ? 0 : offset;

  const results = await Promise.all(
    backendTypes.map((backendType) =>
      supabase.rpc("public_search_registry", {
        p_query: query || null,
        p_registration_type: backendType,
        p_registration_year: registrationYear,
        p_limit: queryLimit,
        p_offset: queryOffset,
      }),
    ),
  );
  const failedResult = results.find((result) => result.error);

  if (failedResult?.error) {
    console.error("Public registry query failed", failedResult.error.code);
    return NextResponse.json(
      {
        error:
          "The public registry is temporarily unavailable. Please try again.",
      },
      { status: 502 },
    );
  }

  const dataSets = results.map(
    (result) => (result.data || []) as RegistryRow[],
  );
  const total = dataSets.reduce(
    (sum, dataSet) => sum + Number(dataSet[0]?.total_count || 0),
    0,
  );
  const rows = dataSets
    .flat()
    .sort(
      (left, right) =>
        left.nurse_name.localeCompare(right.nurse_name) ||
        left.registration_number.localeCompare(right.registration_number) ||
        left.entry_id - right.entry_id,
    )
    .slice(isGroupedEnrollmentSearch ? offset : 0, PAGE_SIZE);

  return NextResponse.json(
    {
      records: rows.map((row) => ({
        id: row.entry_id,
        name: row.nurse_name,
        type:
          row.registration_type === "TCN" || row.registration_type === "LPN"
            ? "EN"
            : row.registration_type === "APRN"
              ? "APN"
              : row.registration_type,
        registrationNumber: row.registration_number,
        registrationYear: row.registration_year,
      })),
      pagination: {
        page,
        pageSize: PAGE_SIZE,
        total,
        pages: Math.ceil(total / PAGE_SIZE),
      },
      source: "published_registry",
    },
    {
      headers: {
        "Cache-Control": "private, no-store, max-age=0",
      },
    },
  );
}
