import type { Config } from "@netlify/functions";
import {
  syncRegistryIndex,
  type RegistrySyncEnvironment,
} from "../../src/lib/registryIndex";

function requiredEnvironmentVariable(name: string) {
  const value = Netlify.env.get(name)?.trim();
  if (!value) throw new Error(`Missing required registry configuration: ${name}`);
  return value;
}

function getEnvironment(): RegistrySyncEnvironment {
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
    },
  };
}

export default async () => {
  try {
    const result = await syncRegistryIndex(getEnvironment());
    console.log(
      `Registry index synchronized: ${result.recordCount} records in ${result.durationMs}ms.`,
    );
    return new Response("Registry index synchronized.", { status: 200 });
  } catch (error) {
    console.error(
      error instanceof Error ? error.message : "Registry synchronization failed.",
    );
    return new Response("Registry synchronization failed.", { status: 500 });
  }
};

export const config: Config = {
  schedule: "@daily",
};
