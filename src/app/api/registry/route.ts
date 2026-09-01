import { searchRegistryIndex } from "@/lib/registryIndex";
import { type NextRequest, NextResponse } from "next/server";

const PAGE_SIZE = 25;
const ALLOWED_TYPES = new Set(["RN", "EN", "RM", "TCN"]);
const ALLOWED_YEAR_RANGES = new Set([
  "2021-2030",
  "2011-2020",
  "2001-2010",
  "1991-2000",
  "1981-1990",
  "1971-1980",
]);
const SEARCH_PATTERN = /^[\p{L}\p{N}’'./ -]+$/u;

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q")?.trim() || "";
  const registrationType =
    request.nextUrl.searchParams.get("type")?.trim().toUpperCase() || "";
  const yearFromValue =
    request.nextUrl.searchParams.get("yearFrom")?.trim() || "";
  const yearToValue = request.nextUrl.searchParams.get("yearTo")?.trim() || "";
  const pageValue = request.nextUrl.searchParams.get("page")?.trim() || "1";
  const page = Number(pageValue);
  const registrationYearFrom = yearFromValue ? Number(yearFromValue) : null;
  const registrationYearTo = yearToValue ? Number(yearToValue) : null;

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
    (registrationYearFrom === null) !== (registrationYearTo === null) ||
    (registrationYearFrom !== null &&
      registrationYearTo !== null &&
      (!Number.isInteger(registrationYearFrom) ||
        !Number.isInteger(registrationYearTo) ||
        !ALLOWED_YEAR_RANGES.has(
          `${registrationYearFrom}-${registrationYearTo}`,
        )))
  ) {
    return NextResponse.json(
      { error: "Select a valid registration period." },
      { status: 400 },
    );
  }

  if (!Number.isInteger(page) || page < 1 || page > 500) {
    return NextResponse.json(
      { error: "Select a valid results page." },
      { status: 400 },
    );
  }

  let result: Awaited<ReturnType<typeof searchRegistryIndex>>;

  try {
    result = await searchRegistryIndex({
      query,
      registrationType,
      registrationYearFrom,
      registrationYearTo,
      limit: PAGE_SIZE,
      offset: (page - 1) * PAGE_SIZE,
    });
  } catch (error) {
    console.error(
      "Public registry index query failed",
      error instanceof Error ? error.message : "Unknown error",
    );
    return NextResponse.json(
      {
        error:
          "The public registry is temporarily unavailable. Please try again.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json(
    {
      records: result.records,
      pagination: {
        page,
        pageSize: PAGE_SIZE,
        total: result.total,
        pages: Math.ceil(result.total / PAGE_SIZE),
      },
    },
    {
      headers: {
        "Cache-Control": "private, no-store, max-age=0",
      },
    },
  );
}
