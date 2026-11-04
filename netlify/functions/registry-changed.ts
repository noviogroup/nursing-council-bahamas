import { createHash, timingSafeEqual } from "node:crypto";
import { markRegistryChanged } from "../../src/lib/registryIndex";

function requiredEnvironmentVariable(name: string) {
  const value = Netlify.env.get(name)?.trim();
  if (!value) throw new Error(`Missing required registry configuration: ${name}`);
  return value;
}

function sameToken(given: string, expected: string) {
  const a = createHash("sha256").update(given).digest();
  const b = createHash("sha256").update(expected).digest();
  return timingSafeEqual(a, b);
}

/**
 * Airtable automations POST here when a register row is created or one of
 * its register fields changes. It only flags the register; the scheduled
 * sync-registry run reads Airtable once the edits have settled, so a batch of
 * new nurses costs one sync. Header: x-registry-change-token.
 */
export default async (request: Request) => {
  if (request.method !== "POST") {
    return new Response("Method not allowed.", { status: 405, headers: { Allow: "POST" } });
  }

  try {
    const expected = requiredEnvironmentVariable("REGISTRY_CHANGE_TOKEN");
    const given = request.headers.get("x-registry-change-token")?.trim() ?? "";
    if (!given || !sameToken(given, expected)) {
      return new Response("Not authorised.", { status: 401 });
    }

    await markRegistryChanged({
      url: requiredEnvironmentVariable("NEXT_PUBLIC_SUPABASE_URL"),
      anonKey: requiredEnvironmentVariable("NEXT_PUBLIC_SUPABASE_ANON_KEY"),
      syncSecret: requiredEnvironmentVariable("REGISTRY_SYNC_SECRET"),
      serviceRoleKey: requiredEnvironmentVariable("SUPABASE_SERVICE_ROLE_KEY"),
    });
    return new Response("Register change noted.", { status: 202 });
  } catch (error) {
    console.error(error instanceof Error ? error.message : "Registry change could not be noted.");
    return new Response("Register change could not be noted.", { status: 503 });
  }
};
