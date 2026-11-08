import { test } from "node:test";
import assert from "node:assert/strict";
import { defaultComplaintFormData, complaintCategories } from "./complaints";
import {
  complaintPayload,
  concernGroups,
  normalizeComplaintDraft,
  validateIntake,
} from "./complaint-intake";
import {
  ComplaintSubmission,
  type ComplaintReceipt,
} from "./complaint-submission";

const receipt: ComplaintReceipt = {
  complaint_id: "case-test",
  reference_number: "TEST-0001",
  submitted_at: "2026-11-08T12:00:00Z",
};
const data = () => ({
  ...structuredClone(defaultComplaintFormData),
  category: "patient_safety",
  respondent: {
    ...defaultComplaintFormData.respondent,
    name: "Example Respondent",
    type: "nurse",
  },
  complainant: {
    ...defaultComplaintFormData.complainant,
    name: "Example Person",
    email: "example@example.test",
    phone: "5550100",
  },
  incident: {
    ...defaultComplaintFormData.incident,
    summary: "Test only",
    description: "A synthetic test complaint.",
  },
  acknowledgement: {
    accurate: true,
    contact: true,
    review: true,
    truthful: true,
    consent: true,
  },
});

test("every existing case category is mapped once without changing identifiers", () => {
  const codes = concernGroups.flatMap((group) => group.codes);
  assert.equal(new Set(codes).size, codes.length);
  assert.deepEqual(
    [...codes].sort(),
    complaintCategories.map((category) => category.code).sort(),
  );
});
test("final validation catches missing earlier-stage answers and invalid email despite review navigation", () => {
  const draft = data();
  draft.complainant.email = "not-an-email";
  draft.respondent.name = "  ";
  draft.incident.summary = "";
  assert.deepEqual(
    validateIntake(draft).map((error) => [error.field, error.step]),
    [
      ["respondent-name", 0],
      ["incident-summary", 1],
      ["complainant-email", 2],
    ],
  );
  assert.equal(validateIntake(data()).length, 0);
});
test("optional evidence can be skipped and inactive earlier-action answers are excluded without erasing the draft", () => {
  const draft = data();
  draft.priorAction.details = "Unsaved earlier answer";
  assert.equal(validateIntake(draft, 3).length, 0);
  assert.equal(complaintPayload(draft).priorAction.details, "");
  assert.equal(draft.priorAction.details, "Unsaved earlier answer");
  draft.priorAction.taken = true;
  assert.equal(
    complaintPayload(draft).priorAction.details,
    "Unsaved earlier answer",
  );
});
test("older draft sections merge with defaults without losing narrative or existing classification", () => {
  const restored = normalizeComplaintDraft({
    category: "facility_context",
    incident: { description: "Existing narrative" },
  });
  assert.equal(restored.category, "facility_context");
  assert.equal(restored.incident.description, "Existing narrative");
  assert.equal(restored.complainant.email, "");
  assert.equal(restored.acknowledgement.consent, false);
});
test("a lost legacy response never permits another create request", async () => {
  const session = new ComplaintSubmission("request-legacy", false);
  let calls = 0;
  const create = async () => {
    calls++;
    throw new Error("Lost connection");
  };
  await assert.rejects(session.submit(data(), create));
  await assert.rejects(session.submit(data(), create), /Check whether/);
  assert.equal(calls, 1);
});
test("v2 retries preserve the same key and original payload after unknown outcome", async () => {
  const session = new ComplaintSubmission("request-v2", true);
  const original = data();
  let calls = 0;
  const create = async (payload: typeof original, id: string) => {
    calls++;
    assert.equal(id, "request-v2");
    assert.equal(payload.incident.summary, "Test only");
    if (calls === 1) throw new Error("Response lost");
    return receipt;
  };
  await assert.rejects(session.submit(original, create));
  original.incident.summary = "Changed after request";
  assert.deepEqual(await session.submit(original, create), receipt);
  await session.submit(original, create);
  assert.equal(calls, 2);
});
test("a simultaneous submit does not send a second request", async () => {
  const session = new ComplaintSubmission("request-busy", true);
  let complete!: (value: ComplaintReceipt) => void;
  const first = session.submit(
    data(),
    () =>
      new Promise((resolve) => {
        complete = resolve;
      }),
  );
  await assert.rejects(
    session.submit(data(), async () => receipt),
    /already in progress/,
  );
  complete(receipt);
  await first;
});
test("upload/registration recovery keeps the case and file paths, and skips already attached files", async () => {
  const session = new ComplaintSubmission("request-files", true);
  let creates = 0;
  await session.submit(data(), async () => {
    creates++;
    return receipt;
  });
  const files = [
    new File(["first"], "one.pdf", { type: "application/pdf" }),
    new File(["second"], "two.pdf", { type: "application/pdf" }),
  ];
  const uploads: string[] = [];
  const registrations: string[] = [];
  let fail = true;
  const upload = async (_file: File, record: { storagePath: string }) => {
    uploads.push(record.storagePath);
  };
  const register = async (record: { storagePath: string }) => {
    registrations.push(record.storagePath);
    if (record.storagePath.endsWith("two.pdf") && fail) {
      fail = false;
      throw new Error("Connection lost");
    }
  };
  await assert.rejects(session.attach(files, upload, register));
  await session.submit(data(), async () => {
    creates++;
    return receipt;
  });
  await session.attach(files, upload, register);
  assert.equal(creates, 1);
  assert.equal(uploads.length, 2);
  assert.equal(registrations.length, 3);
  assert.equal(registrations[1], registrations[2]);
});


test('invalid dates and malformed saved values fail safely', () => {
  const draft = data(); draft.incident.date = '2026-02-31';
  assert.equal(validateIntake(draft, 1)[0].field, 'incident-date');
  const restored = normalizeComplaintDraft({ complainant: { name: null }, incident: { summary: 123, ongoing: 'yes' }, respondent: null, category: 4 });
  assert.equal(restored.complainant.name, ''); assert.equal(restored.incident.summary, ''); assert.equal(restored.incident.ongoing, false);
  assert.doesNotThrow(() => validateIntake(restored));
});
