import type { Config } from "@netlify/functions";
import {
  claimRegistrySync,
  markRegistryChanged,
  syncRegistryIndex,
  type RegistrySyncEnvironment,
} from "../../src/lib/registryIndex";

function requiredEnvironmentVariable(name: string) {
  const value = Netlify.env.get(name)?.trim();
  if (!value) throw new Error(`Missing required registry configuration: ${name}`);
  return value;
}

function getEnvironment(): Required<Pick<RegistrySyncEnvironment, "airtable" | "supabase">> {
  return {
    airtable: {
      token: requiredEnvironmentVariable("AIRTABLE_TOKEN"),
      baseId: requiredEnvironmentVariable("AIRTABLE_BASE_ID"),
      oldTableId: requiredEnvironmentVariable("AIRTABLE_OLD_NURSES_TABLE_ID"),
      oldViewId: requiredEnvironmentVariable("AIRTABLE_OLD_NURSES_VIEW_ID"),
      newTableId: requiredEnvironmentVariable("AIRTABLE_NEW_NURSES_TABLE_ID"),
      newViewId: requiredEnvironmentVariable("AIRTABLE_NEW_NURSES_VIEW_ID"),
    },
    supabase: {
      url: requiredEnvironmentVariable("NEXT_PUBLIC_SUPABASE_URL"),
      anonKey: requiredEnvironmentVariable("NEXT_PUBLIC_SUPABASE_ANON_KEY"),
      syncSecret: requiredEnvironmentVariable("REGISTRY_SYNC_SECRET"),
      serviceRoleKey: requiredEnvironmentVariable("SUPABASE_SERVICE_ROLE_KEY"),
    },
  };
}

/**
 * Runs every five minutes but reads Airtable only when it is due: Airtable
 * reported a change (see registry-changed) that has settled for two minutes,
 * or the last full read is a day old, which also catches deleted rows.
 */
export default async () => {
  let reason: Awaited<ReturnType<typeof claimRegistrySync>> = null;
  try {
    const environment = getEnvironment();
    reason = await claimRegistrySync(environment.supabase);

    // Before the change flag exists in the database, keep an hourly full read.
    if (reason === "unavailable" && new Date().getUTCMinutes() >= 5) reason = null;
    if (!reason) {
      console.log("Registry: no changes reported, Airtable not read.");
      return new Response("No register changes.", { status: 200 });
    }

    const result = await syncRegistryIndex(environment);
    console.log(
      result.skipped
        ? `Registry unchanged (${reason}): ${result.recordCount} records, rebuild skipped (${result.durationMs}ms).`
        : `Registry index synchronized (${reason}): ${result.recordCount} records in ${result.durationMs}ms.`,
    );
    return new Response("Registry index synchronized.", { status: 200 });
  } catch (error) {
    console.error(
      error instanceof Error ? error.message : "Registry synchronization failed.",
    );
    // Put a claimed change back so the next run tries again.
    if (reason === "change") {
      await markRegistryChanged(getEnvironment().supabase).catch(() => undefined);
    }
    return new Response("Registry synchronization failed.", { status: 500 });
  }
};

export const config: Config = {
  schedule: "*/5 * * * *",
};
