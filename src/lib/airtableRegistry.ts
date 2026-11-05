const AIRTABLE_API_URL = "https://api.airtable.com/v0";
const AIRTABLE_PAGE_SIZE = 100;

type AirtableFields = Record<string, unknown>;

type AirtableRecord = {
  id: string;
  fields: AirtableFields;
};

type AirtableResponse = {
  records?: AirtableRecord[];
  offset?: string;
  error?: {
    type?: string;
    message?: string;
  };
};

type RegistrySource = {
  tableId: string;
  viewId: string;
  fields: {
    name: string;
    registrationType: string;
    registrationNumber: string;
    registrationYear: string;
    /** Free-text notes that name the newer-table record a row was imported from. */
    importNotes?: string;
  };
};

export type AirtableRegistryEnvironment = {
  token: string;
  baseId: string;
  oldTableId: string;
  oldViewId: string;
  newTableId: string;
  newViewId: string;
};

export type PublicRegistryRecord = {
  id: string;
  name: string;
  type: string;
  registrationNumber: string;
  registrationYear: number | null;
};

type SourceRecord = PublicRegistryRecord & {
  /** Newer-table record this historical row was imported from, if any. */
  importedFrom: string | null;
  /** Council review marker that keeps an unresolved row out of public search. */
  publicationBlocked: boolean;
};

function getRequiredEnvironmentVariable(name: string) {
  const value = process.env[name]?.trim();

  if (!value) {
    throw new Error(`Missing required Airtable configuration: ${name}`);
  }

  return value;
}

export function getAirtableRegistryEnvironment(): AirtableRegistryEnvironment {
  return {
    token: getRequiredEnvironmentVariable("AIRTABLE_TOKEN"),
    baseId: getRequiredEnvironmentVariable("AIRTABLE_BASE_ID"),
    oldTableId: getRequiredEnvironmentVariable("AIRTABLE_OLD_NURSES_TABLE_ID"),
    oldViewId: getRequiredEnvironmentVariable("AIRTABLE_OLD_NURSES_VIEW_ID"),
    newTableId: getRequiredEnvironmentVariable("AIRTABLE_NEW_NURSES_TABLE_ID"),
    newViewId: getRequiredEnvironmentVariable("AIRTABLE_NEW_NURSES_VIEW_ID"),
  };
}

function getRegistrySources(environment: AirtableRegistryEnvironment): {
  oldRecords: RegistrySource;
  newRecords: RegistrySource;
} {
  return {
    oldRecords: {
      tableId: environment.oldTableId,
      viewId: environment.oldViewId,
      fields: {
        name: "Full Name (as filed)",
        registrationType: "Category",
        registrationNumber: "Licence No. (as filed)",
        registrationYear: "Licence Year (derived)",
        importNotes: "Notes",
      },
    },
    newRecords: {
      tableId: environment.newTableId,
      viewId: environment.newViewId,
      fields: {
        name: "Full Name (as written)",
        registrationType: "Category",
        registrationNumber: "Registration No.",
        registrationYear: "Registration Date / Period",
      },
    },
  };
}

function cleanText(value: unknown) {
  if (typeof value !== "string") return "";
  return value.trim().replace(/\s+/g, " ");
}

function hasPublishableName(value: string) {
  const normalized = value.toLowerCase().replace(/[()]/g, "").trim();

  return Boolean(
    normalized &&
      normalized !== "no name" &&
      !normalized.startsWith("no name in file"),
  );
}

function parseRegistrationYear(value: unknown) {
  if (typeof value === "number" && Number.isFinite(value)) {
    return Math.trunc(value);
  }

  if (typeof value !== "string") return null;

  const match = value.match(/(?:18|19|20|21)\d{2}/);
  return match ? Number(match[0]) : null;
}

export function normalizeRegistrationNumber(value: string) {
  return value.toUpperCase().replace(/[^A-Z0-9]/g, "");
}

// The newer table files numbers without the category prefix ("25-5734"),
// the historical table with it ("RN 25-5734"). Key both the same way.
function registryKey(record: PublicRegistryRecord) {
  const normalizedNumber = normalizeRegistrationNumber(
    record.registrationNumber,
  );
  if (!normalizedNumber) return `airtable:${record.id}`;
  return /^\d/.test(normalizedNumber)
    ? `${record.type}${normalizedNumber}`
    : normalizedNumber;
}

function parseImportedFrom(value: unknown) {
  if (typeof value !== "string") return null;
  return value.match(/Source record ID:\s*(rec[A-Za-z0-9]{14})/)?.[1] ?? null;
}

function isPublicationBlocked(value: unknown) {
  return typeof value === "string" && /\bdo not publish\b/i.test(value);
}

async function fetchAirtablePage(url: string, token: string) {
  const maximumAttempts = 3;

  for (let attempt = 1; attempt <= maximumAttempts; attempt += 1) {
    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });
    const payload = (await response
      .json()
      .catch(() => ({}))) as AirtableResponse;

    if (response.ok) return payload;

    if (
      (response.status === 429 || response.status >= 500) &&
      attempt < maximumAttempts
    ) {
      await new Promise((resolve) => setTimeout(resolve, attempt * 600));
      continue;
    }

    throw new Error(
      `Airtable registry request failed: ${payload.error?.type || response.status}`,
    );
  }

  throw new Error("Airtable registry request failed after multiple attempts");
}

async function fetchSourceRecords(
  baseId: string,
  token: string,
  source: RegistrySource,
) {
  const records: SourceRecord[] = [];
  let offset: string | undefined;

  do {
    const searchParams = new URLSearchParams({
      pageSize: String(AIRTABLE_PAGE_SIZE),
      view: source.viewId,
    });

    for (const fieldName of Object.values(source.fields)) {
      searchParams.append("fields[]", fieldName);
    }

    if (offset) searchParams.set("offset", offset);

    const url = `${AIRTABLE_API_URL}/${encodeURIComponent(baseId)}/${encodeURIComponent(source.tableId)}?${searchParams.toString()}`;
    const payload = await fetchAirtablePage(url, token);

    for (const record of payload.records || []) {
      const importNotes = source.fields.importNotes
        ? record.fields[source.fields.importNotes]
        : undefined;

      records.push({
        id: record.id,
        name: cleanText(record.fields[source.fields.name]),
        type: cleanText(
          record.fields[source.fields.registrationType],
        ).toUpperCase(),
        registrationNumber: cleanText(
          record.fields[source.fields.registrationNumber],
        ),
        registrationYear: parseRegistrationYear(
          record.fields[source.fields.registrationYear],
        ),
        importedFrom: parseImportedFrom(importNotes),
        publicationBlocked: isPublicationBlocked(importNotes),
      });
    }

    offset = payload.offset;
  } while (offset);

  return records;
}

export async function loadRegistryFromAirtable(
  environment = getAirtableRegistryEnvironment(),
) {
  const { oldRecords, newRecords } = getRegistrySources(environment);

  // Fetch sequentially to remain within Airtable's per-base request limit.
  const historicalRecords = await fetchSourceRecords(
    environment.baseId,
    environment.token,
    oldRecords,
  );
  const recentRecords = await fetchSourceRecords(
    environment.baseId,
    environment.token,
    newRecords,
  );
  const combined = new Map<string, PublicRegistryRecord>();
  const importedIds = new Set<string>();

  for (const {
    importedFrom,
    publicationBlocked,
    ...record
  } of historicalRecords) {
    if (importedFrom) importedIds.add(importedFrom);
    if (publicationBlocked) continue;
    if (!hasPublishableName(record.name) || !record.registrationNumber)
      continue;

    combined.set(registryKey(record), record);
  }

  // A matching record in the newer table is authoritative, unless it has
  // already been imported into the historical table. The imported copy is
  // the corrected one (name order, licence prefix, year), so keep it.
  for (const {
    importedFrom: _,
    publicationBlocked: __,
    ...record
  } of recentRecords) {
    if (importedIds.has(record.id)) continue;
    if (!hasPublishableName(record.name) || !record.registrationNumber)
      continue;

    combined.set(registryKey(record), record);
  }

  return [...combined.values()].sort((left, right) =>
    left.name.localeCompare(right.name, "en", { sensitivity: "base" }),
  );
}
