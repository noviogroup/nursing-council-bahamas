import { randomUUID } from "node:crypto";
import { createClient } from "@supabase/supabase-js";
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
};

export type RegistrySyncEnvironment = {
  airtable?: AirtableRegistryEnvironment;
  supabase?: SupabaseRegistryEnvironment;
};

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
  };
}

function createRegistryClient(environment?: SupabaseRegistryEnvironment) {
  const config = environment || getSupabaseRegistryEnvironment();

  return createClient(config.url, config.anonKey, {
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

  if (!syncSecret) {
    throw new Error(
      "Missing required registry configuration: REGISTRY_SYNC_SECRET",
    );
  }

  const supabase = createRegistryClient(supabaseEnvironment);
  const syncId = randomUUID();

  const rows = records.map((record) => ({
    source_record_id: record.id,
    display_name: record.name,
    registration_type: record.type || null,
    registration_number: record.registrationNumber,
    registration_number_key: normalizeRegistrationNumber(
      record.registrationNumber,
    ),
    registration_year: record.registrationYear,
  }));

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

    const { data: activatedCount, error: activationError } = await supabase.rpc(
      "activate_airtable_registry_sync",
      {
        p_sync_id: syncId,
        p_expected_count: rows.length,
        p_secret: syncSecret,
      },
    );

    if (activationError) {
      throw new Error(
        `Unable to activate registry index: ${activationError.code}`,
      );
    }

    return {
      recordCount: Number(activatedCount || rows.length),
      durationMs: Date.now() - startedAt,
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
      name: row.nurse_name,
      type: row.registration_type || "Not recorded",
      registrationNumber: row.registration_number,
      registrationYear: row.registration_year,
    })),
    total: Number(rows[0]?.total_count || 0),
  };
}
