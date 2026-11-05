import assert from "node:assert/strict";
import test from "node:test";
import { formatPersonName } from "./formatName";

test("displays filed last-first names as first middle last", () => {
  assert.equal(formatPersonName("IMANA, CECEEL KEMEEL"), "Ceceel Kemeel Imana");
  assert.equal(
    formatPersonName("BOWLEG, PATRICE JENNIFRED (KING)"),
    "Patrice Jennifred Bowleg (King)",
  );
});

test("keeps first-middle-last names in order", () => {
  assert.equal(formatPersonName("UKI UDUAK ITORO"), "Uki Uduak Itoro");
});
