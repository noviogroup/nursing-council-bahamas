import { loadEnvConfig } from "@next/env";
import { syncRegistryIndex } from "../src/lib/registryIndex";

loadEnvConfig(process.cwd());

async function main() {
  try {
    const result = await syncRegistryIndex();
    console.log(
      `Registry index synchronized: ${result.recordCount} records in ${result.durationMs}ms.`,
    );
  } catch (error) {
    console.error(
      error instanceof Error ? error.message : "Registry synchronization failed.",
    );
    process.exitCode = 1;
  }
}

void main();
