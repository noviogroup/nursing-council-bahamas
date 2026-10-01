import { createHash, randomUUID } from "node:crypto";
import { createClient } from "@supabase/supabase-js";
import { formatPersonName } from "@/lib/formatName";
import {
  type AirtableRegistryEnvironment,
  getAirtableRegistryEnvironment,
  loadRegistryFromAirtable,
  normalizeRegistrationNumber,
} from "./airtableRegistry";

const INSERT_CHUNK_SIZE = 500;

type SupabaseRegistryEnvironment = {
  url: string;
  anonKey: string;
  syncSecret?: string;
  /** Server-only key. The sync endpoints accept only the service role. */
  serviceRoleKey?: string;
};

export type RegistrySyncEnvironment = {
  airtable?: AirtableRegistryEnvironment;
  supabase?: SupabaseRegistryEnvironment;
  /** Rebuild even when Airtable has not changed since the last sync. */
  force?: boolean;
};

type RegistryIndexRow = {
  source_record_id: string;
  display_name: string;
  registration_type: string | null;
  registration_number: string;
  registration_number_key: string;
  registration_year: number | null;
};

/** Same rows in any order give the same fingerprint. */
function fingerprintRows(rows: RegistryIndexRow[]) {
  const sorted = [...rows].sort((a, b) =>
    a.source_record_id < b.source_record_id ? -1 : a.source_record_id > b.source_record_id ? 1 : 0,
  );
  const hash = createHash("sha256");
  for (const row of sorted) {
    hash.update(
      JSON.stringify([
        row.source_record_id,
        row.display_name,
        row.registration_type,
        row.registration_number,
        row.registration_number_key,
        row.registration_year,
      ]),
    );
    hash.update("\n");
  }
  return hash.digest("hex");
}

type RegistrySearchFilters = {
  query: string;
  registrationType: string;
  registrationYearFrom: number | null;
  registrationYearTo: number | null;
  limit: number;
  offset: number;
};

type RegistrySearchRow = {
  nurse_name: string;
  registration_type: string | null;
  registration_number: string;
  registration_year: number | null;
  total_count: number | string;
};

function getRequiredEnvironmentVariable(name: string) {
  const value = process.env[name]?.trim();

  if (!value)
    throw new Error(`Missing required registry configuration: ${name}`);
  return value;
}

function getSupabaseRegistryEnvironment(
  requireSyncSecret = false,
): SupabaseRegistryEnvironment {
  const syncSecret = process.env.REGISTRY_SYNC_SECRET?.trim();

  if (requireSyncSecret && !syncSecret) {
    throw new Error(
      "Missing required registry configuration: REGISTRY_SYNC_SECRET",
    );
  }

  return {
    url: getRequiredEnvironmentVariable("NEXT_PUBLIC_SUPABASE_URL"),
    anonKey: getRequiredEnvironmentVariable("NEXT_PUBLIC_SUPABASE_ANON_KEY"),
    syncSecret,
    ...(requireSyncSecret
      ? { serviceRoleKey: getRequiredEnvironmentVariable("SUPABASE_SERVICE_ROLE_KEY") }
      : {}),
  };
}

function createRegistryClient(environment?: SupabaseRegistryEnvironment) {
  const config = environment || getSupabaseRegistryEnvironment();

  // Search uses the public key; syncing uses the server-only key.
  return createClient(config.url, config.serviceRoleKey || config.anonKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

export async function syncRegistryIndex(
  environment: RegistrySyncEnvironment = {},
) {
  const startedAt = Date.now();
  const records = await loadRegistryFromAirtable(
    environment.airtable || getAirtableRegistryEnvironment(),
  );
  const supabaseEnvironment =
    environment.supabase || getSupabaseRegistryEnvironment(true);
  const syncSecret = supabaseEnvironment.syncSecret?.trim();
  if (!supabaseEnvironment.serviceRoleKey?.trim()) {
    throw new Error(
      "Missing required registry configuration: SUPABASE_SERVICE_ROLE_KEY",
    );
  }

  if (!syncSecret) {
    throw new Error(
      "Missing required registry configuration: REGISTRY_SYNC_SECRET",
    );
  }

  const supabase = createRegistryClient(supabaseEnvironment);
  const syncId = randomUUID();

  const rows: RegistryIndexRow[] = records.map((record) => ({
    source_record_id: record.id,
    display_name: record.name,
    registration_type: record.type || null,
    registration_number: record.registrationNumber,
    registration_number_key: normalizeRegistrationNumber(
      record.registrationNumber,
    ),
    registration_year: record.registrationYear,
  }));

  const fingerprint = fingerprintRows(rows);

  // Rebuilding rewrites every row and both search indexes, so skip it when
  // the active index already holds exactly these rows. If the check is not
  // available (older database), fall through to a full rebuild.
  if (!environment.force && rows.length > 0) {
    const { data: unchanged, error: checkError } = await supabase.rpc(
      "check_airtable_registry_fingerprint",
      { p_fingerprint: fingerprint, p_secret: syncSecret },
    );
    if (!checkError && unchanged === true) {
      return {
        recordCount: rows.length,
        durationMs: Date.now() - startedAt,
        skipped: true,
      };
    }
  }

  try {
    for (let start = 0; start < rows.length; start += INSERT_CHUNK_SIZE) {
      const { error } = await supabase.rpc("stage_airtable_registry_sync", {
        p_sync_id: syncId,
        p_records: rows.slice(start, start + INSERT_CHUNK_SIZE),
        p_secret: syncSecret,
      });

      if (error)
        throw new Error(`Unable to stage registry index: ${error.code}`);
    }

    const activationArgs = {
      p_sync_id: syncId,
      p_expected_count: rows.length,
      p_secret: syncSecret,
    };
    let { data: activatedCount, error: activationError } = await supabase.rpc(
      "activate_airtable_registry_sync",
      { ...activationArgs, p_fingerprint: fingerprint },
    );
    // A database without the fingerprint column still has the older
    // three-argument function (PGRST202: no function with these arguments).
    if (activationError?.code === "PGRST202") {
      ({ data: activatedCount, error: activationError } = await supabase.rpc(
        "activate_airtable_registry_sync",
        activationArgs,
      ));
    }

    if (activationError) {
      throw new Error(
        `Unable to activate registry index: ${activationError.code}`,
      );
    }

    return {
      recordCount: Number(activatedCount || rows.length),
      durationMs: Date.now() - startedAt,
      skipped: false,
    };
  } catch (error) {
    await supabase.rpc("discard_airtable_registry_sync", {
      p_sync_id: syncId,
      p_secret: syncSecret,
    });
    throw error;
  }
}

export async function searchRegistryIndex(filters: RegistrySearchFilters) {
  const supabase = createRegistryClient();
  const { data, error } = await supabase.rpc("search_airtable_registry_index", {
    p_query: filters.query || null,
    p_registration_type: filters.registrationType || null,
    p_registration_year_from: filters.registrationYearFrom,
    p_registration_year_to: filters.registrationYearTo,
    p_limit: filters.limit,
    p_offset: filters.offset,
  });

  if (error) throw new Error(`Registry index search failed: ${error.code}`);

  const rows = (data || []) as RegistrySearchRow[];
  return {
    records: rows.map((row) => ({
      name: formatPersonName(row.nurse_name),
      type: row.registration_type || "Not recorded",
      registrationNumber: row.registration_number,
      registrationYear: row.registration_year,
    })),
    total: Number(rows[0]?.total_count || 0),
  };
}
