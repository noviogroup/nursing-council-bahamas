import assert from "node:assert/strict";
import test from "node:test";
import {
  loadRegistryFromAirtable,
  parseRegistrationYearFromNumber,
} from "./airtableRegistry";

test("derives a four-digit licence year from the first two number digits", () => {
  assert.equal(parseRegistrationYearFromNumber("RM 07-0873"), 2007);
  assert.equal(parseRegistrationYearFromNumber("RN 21-1234"), 2021);
  assert.equal(parseRegistrationYearFromNumber("RM 94-0746"), 1994);
  assert.equal(parseRegistrationYearFromNumber("RM 99032"), null);
});

test("records marked do not publish stay out of public registry search", async () => {
  const originalFetch = globalThis.fetch;

  globalThis.fetch = async (input) => {
    const url = String(input);

    if (url.includes("old-table")) {
      return Response.json({
        records: [
          {
            id: "recWkWVF0ZRbQoeA9",
            fields: {
              "Full Name (as filed)": "CHRISTOPHER O UCLON",
              Category: "RM",
              "Licence No. (as filed)": "RM 99032",
              "Licence Year (derived)": 1999,
              Notes: "Licence number unresolved. Do not publish.",
            },
          },
          {
            id: "recnoteHncPgg0oXY",
            fields: {
              "Full Name (as filed)": "APPROVED, REGISTRY RECORD",
              Category: "RM",
              "Licence No. (as filed)": "RM 94-0746",
              Notes: "Reviewer approved.",
            },
          },
        ],
      });
    }

    return Response.json({ records: [] });
  };

  try {
    const records = await loadRegistryFromAirtable({
      token: "test-token",
      baseId: "test-base",
      oldTableId: "old-table",
      oldViewId: "old-view",
      newTableId: "new-table",
      newViewId: "new-view",
    });

    assert.deepEqual(records, [
      {
        id: "recnoteHncPgg0oXY",
        name: "APPROVED, REGISTRY RECORD",
        type: "RM",
        registrationNumber: "RM 94-0746",
        registrationYear: 1994,
      },
    ]);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
