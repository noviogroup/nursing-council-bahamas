import {
  complaintCategories,
  defaultComplaintFormData,
  respondentTypes,
  type ComplaintFormData,
} from "./complaints";

export const intakeSteps = [
  "Your concern",
  "What happened",
  "Your details",
  "Evidence",
  "Review and submit",
];
// Public wording changes; the existing case classification stays intact.
export const concernGroups = [
  {
    label: "Care, safety or conduct",
    codes: ["patient_safety", "nurse_conduct"],
  },
  {
    label: "Registration or licensing",
    codes: ["registration_issue", "licensing_concern"],
  },
  { label: "Education or training", codes: ["education_provider_issue"] },
  {
    label: "Workplace or communication",
    codes: ["facility_context", "workplace_concern", "communication_issue"],
  },
  { label: "Something else or not sure", codes: ["other"] },
];
export const publicCategoryLabels: Record<string, string> = {
  patient_safety: "Patient care or safety",
  nurse_conduct: "Professional conduct",
  registration_issue: "Registration",
  licensing_concern: "Licensing",
  education_provider_issue: "Education or training provider",
  facility_context: "An incident at a facility",
  workplace_concern: "A workplace concern",
  communication_issue: "Communication",
  other: "Other or not sure",
};
export const acknowledgements = [
  [
    "accurate",
    "I confirm that the information provided is true and accurate to the best of my knowledge.",
  ],
  [
    "contact",
    "I understand that the Nursing Council may contact me for additional information.",
  ],
  [
    "review",
    "I understand that this complaint may be reviewed by authorized Council staff, supervisors, and relevant committee members.",
  ],
  [
    "truthful",
    "I understand that knowingly submitting false or misleading information may affect the handling of this complaint.",
  ],
  [
    "consent",
    "I agree that the Nursing Council may use the information submitted to assess, investigate, refer, or close this matter in accordance with its regulatory responsibilities.",
  ],
] as const;

export type IntakeError = { field: string; message: string; step: number };
export const validComplaintEmail = (value: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
export function validateIntake(
  data: ComplaintFormData,
  step?: number,
): IntakeError[] {
  const errors: IntakeError[] = [];
  const require = (
    field: string,
    value: string,
    message: string,
    stage: number,
  ) => {
    if (!value.trim()) errors.push({ field, message, step: stage });
  };
  if (!complaintCategories.some((c) => c.code === data.category))
    errors.push({
      field: "category",
      message:
        "Choose the concern that best fits, or select Other or not sure.",
      step: 0,
    });
  if (!respondentTypes.some((t) => t.value === data.respondent.type))
    errors.push({
      field: "respondent-type",
      message: "Choose who the complaint is about.",
      step: 0,
    });
  require("respondent-name", data.respondent
    .name, "Enter the name of the person the complaint is about.", 0);
  require("incident-summary", data.incident
    .summary, "Add a short summary of what happened.", 1);
  require("incident-description", data.incident
    .description, "Describe what happened.", 1);
  if (
    data.incident.date &&
    (!/^\d{4}-\d{2}-\d{2}$/.test(data.incident.date) ||
      !Number.isFinite(Date.parse(data.incident.date)) ||
      new Date(data.incident.date).toISOString().slice(0, 10) !== data.incident.date ||
      data.incident.date > new Date().toLocaleDateString("en-CA"))
  )
    errors.push({
      field: "incident-date",
      message: "Enter a valid incident date that is today or earlier.",
      step: 1,
    });
  require("complainant-name", data.complainant
    .name, "Enter your full name.", 2);
  if (!validComplaintEmail(data.complainant.email))
    errors.push({
      field: "complainant-email",
      message: "Enter a valid email address, such as name@example.com.",
      step: 2,
    });
  require("complainant-phone", data.complainant
    .phone, "Enter a phone number where the Council can contact you.", 2);
  for (const [key] of acknowledgements)
    if (!data.acknowledgement[key])
      errors.push({
        field: `acknowledgement-${key}`,
        message: "Confirm each acknowledgement before submitting.",
        step: 4,
      });
  return step === undefined
    ? errors
    : errors.filter((error) => error.step === step);
}

function knownFields<T extends Record<string, string | boolean>>(defaults: T, value: unknown): T {
  const incoming = value && typeof value === 'object' ? value as Record<string, unknown> : {};
  return Object.fromEntries(Object.entries(defaults).map(([key, fallback]) => [key, typeof incoming[key] === typeof fallback ? incoming[key] : fallback])) as T;
}
export function normalizeComplaintDraft(value: unknown): ComplaintFormData {
  const incoming = value && typeof value === 'object' ? value as Partial<ComplaintFormData> : {};
  return {
    complainant: knownFields(defaultComplaintFormData.complainant, incoming.complainant),
    respondent: knownFields(defaultComplaintFormData.respondent, incoming.respondent),
    category: typeof incoming.category === 'string' ? incoming.category : '',
    incident: knownFields(defaultComplaintFormData.incident, incoming.incident),
    priorAction: knownFields(defaultComplaintFormData.priorAction, incoming.priorAction),
    acknowledgement: knownFields(defaultComplaintFormData.acknowledgement, incoming.acknowledgement),
  };
}

export function complaintPayload(data: ComplaintFormData) {
  return {
    ...data,
    complainant: { ...data.complainant, email: data.complainant.email.trim() },
    // Keep hidden earlier-step answers in the editor, but do not submit them when unchecked.
    priorAction: data.priorAction.taken
      ? data.priorAction
      : { taken: false, details: "", response: "", referenceNumbers: "" },
  };
}
