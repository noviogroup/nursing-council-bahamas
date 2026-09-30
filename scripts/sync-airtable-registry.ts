import { loadEnvConfig } from "@next/env";
import { syncRegistryIndex } from "../src/lib/registryIndex";

loadEnvConfig(process.cwd());

async function main() {
  try {
    // Pass --force to rebuild even when Airtable has not changed.
    const result = await syncRegistryIndex({ force: process.argv.includes("--force") });
    console.log(
      result.skipped
        ? `Registry unchanged: ${result.recordCount} records, rebuild skipped (${result.durationMs}ms). Use --force to rebuild anyway.`
        : `Registry index synchronized: ${result.recordCount} records in ${result.durationMs}ms.`,
    );
  } catch (error) {
    console.error(
      error instanceof Error ? error.message : "Registry synchronization failed.",
    );
    process.exitCode = 1;
  }
}

void main();
