import { submitNotListedRequest } from "@/lib/registryIndex";
import { type NextRequest, NextResponse } from "next/server";

const ALLOWED_TYPES = new Set(["RN", "LPN", "RM"]);
// The inquiry function accepts letters, numbers, spaces and ' . , - in names.
const NAME_PATTERN = /^[\p{L}\p{N}' .,-]+$/u;
const EMAIL_PATTERN = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
const PHONE_PATTERN = /^[0-9+() -]+$/;

type Body = Record<string, unknown>;

function text(body: Body, key: string, max: number) {
  const value = body[key];
  if (typeof value !== "string") return "";
  return value.replace(/[’‘`]/g, "'").replace(/\s+/g, " ").trim().slice(0, max);
}

function badRequest(error: string, field?: string) {
  return NextResponse.json({ error, field }, { status: 400 });
}

export async function POST(request: NextRequest) {
  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return badRequest("Something went wrong sending your request. Please try again.");
  }
  if (!body || typeof body !== "object") {
    return badRequest("Something went wrong sending your request. Please try again.");
  }

  // Hidden field people never see; bots fill it in. Pretend it worked.
  if (text(body, "website", 200)) {
    return NextResponse.json({ ok: true });
  }

  const fullName = text(body, "fullName", 120);
  const otherNames = text(body, "otherNames", 120);
  const registrationType = text(body, "registrationType", 3).toUpperCase();
  const registrationNumber = text(body, "registrationNumber", 30);
  const yearValue = text(body, "yearRegistered", 4);
  const email = text(body, "email", 254).toLowerCase();
  const phone = text(body, "phone", 40);
  const searchedFor = text(body, "searchedFor", 80);
  const note = typeof body.note === "string" ? body.note.trim().slice(0, 1500) : "";
  const year = yearValue ? Number(yearValue) : null;

  if (fullName.length < 2 || !NAME_PATTERN.test(fullName)) {
    return badRequest("Enter your full name using letters, spaces, apostrophes or hyphens.", "fullName");
  }
  if (otherNames && !NAME_PATTERN.test(otherNames)) {
    return badRequest("Enter other names using letters, spaces, apostrophes or hyphens.", "otherNames");
  }
  if (registrationType && !ALLOWED_TYPES.has(registrationType)) {
    return badRequest("Select a registration type.", "registrationType");
  }
  if (year !== null && (!Number.isInteger(year) || year < 1940 || year > new Date().getFullYear())) {
    return badRequest(`Enter a year between 1940 and ${new Date().getFullYear()}.`, "yearRegistered");
  }
  if (!EMAIL_PATTERN.test(email)) {
    return badRequest("Enter an email address, like name@example.com.", "email");
  }
  if (phone && !PHONE_PATTERN.test(phone)) {
    return badRequest("Enter a phone number using numbers, spaces, +, ( ) or -.", "phone");
  }

  const message = [
    `Full name: ${fullName}`,
    otherNames && `Other or former names: ${otherNames}`,
    `Registration type: ${registrationType || "Not given"}`,
    `Registration number: ${registrationNumber || "Not given"}`,
    `Year first registered: ${year ?? "Not given"}`,
    searchedFor && `Searched the registry for: ${searchedFor}`,
    note && `\nNote from the nurse:\n${note}`,
  ]
    .filter(Boolean)
    .join("\n");

  try {
    await submitNotListedRequest({
      name: fullName,
      email,
      phone,
      subject: `Not in the registry: ${fullName}`,
      message,
    });
  } catch (error) {
    const detail = error instanceof Error ? error.message : "";
    if (/wait|rate limit|limit exceeded|duplicate/i.test(detail)) {
      return NextResponse.json(
        {
          error:
            "We already have a recent request from this email address. Please wait a few minutes before sending another.",
        },
        { status: 429 },
      );
    }
    console.error("Registry not-listed request failed", detail || "Unknown error");
    return NextResponse.json(
      { error: "We could not send your request. Please try again, or contact the Council." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
