import { createClient } from "@supabase/supabase-js";
import { type NextRequest, NextResponse } from "next/server";

const PAGE_SIZE = 25;
const ALLOWED_TYPES = new Set(["RN", "EN", "RM", "TCN", "LPN", "APRN"]);
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
      { error: "The registry preview is not configured in this environment." },
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
      { error: "Select a valid registration type." },
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
      { error: "Select a valid registration year." },
      { status: 400 },
    );
  }

  if (!Number.isInteger(page) || page < 1 || page > 20) {
    return NextResponse.json(
      { error: "Select a valid results page." },
      { status: 400 },
    );
  }

  const supabase = createClient(supabaseUrl, anonKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const { data, error } = await supabase.rpc("public_search_registry_sample", {
    p_query: query || null,
    p_registration_type: registrationType || null,
    p_registration_year: registrationYear,
    p_limit: PAGE_SIZE,
    p_offset: (page - 1) * PAGE_SIZE,
  });

  if (error) {
    console.error("Public registry sample query failed", error.code);
    return NextResponse.json(
      {
        error:
          "The registry preview is temporarily unavailable. Please try again.",
      },
      { status: 502 },
    );
  }

  const rows = (data || []) as RegistryRow[];
  const total = Number(rows[0]?.total_count || 0);

  return NextResponse.json(
    {
      records: rows.map((row) => ({
        id: row.entry_id,
        name: row.nurse_name,
        type: row.registration_type,
        registrationNumber: row.registration_number,
        registrationYear: row.registration_year,
      })),
      pagination: {
        page,
        pageSize: PAGE_SIZE,
        total,
        pages: Math.ceil(total / PAGE_SIZE),
      },
      sample: true,
    },
    {
      headers: {
        "Cache-Control": "private, no-store, max-age=0",
      },
    },
  );
}
