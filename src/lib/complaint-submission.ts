import type { ComplaintFormData } from "./complaints";

export function isExistingUpload(error: unknown) {
  if (!error || typeof error !== 'object') return false;
  const value = error as { statusCode?: unknown; status?: unknown; code?: unknown };
  return [value.statusCode, value.status, value.code].some(code => ['409', 'ResourceAlreadyExists'].includes(String(code)));
}

export type ComplaintReceipt = {
  complaint_id: string;
  reference_number: string;
  submitted_at: string;
  receipt_email_status?: "queued" | "sent" | "failed" | "not_queued";
};
export type UploadRecord = {
  storagePath: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
};

/** Holds one immutable submission attempt. Upload retries never create another case. */
export class ComplaintSubmission {
  receipt: ComplaintReceipt | null = null;
  started = false;
  private payload: ComplaintFormData | null = null;
  private pending = false;
  private uploads = new Map<
    File,
    { record: UploadRecord; uploaded: boolean; registered: boolean }
  >();
  constructor(
    readonly requestId: string,
    readonly replaySafe: boolean,
  ) {}

  async submit(
    payload: ComplaintFormData,
    create: (
      payload: ComplaintFormData,
      requestId: string,
    ) => Promise<ComplaintReceipt>,
  ) {
    if (this.receipt) return this.receipt;
    if (this.pending) throw new Error("Submission is already in progress.");
    if (this.started && !this.replaySafe)
      throw new Error(
        "Check whether the Council received your complaint before submitting again.",
      );
    this.payload ??= structuredClone(payload);
    this.started = true;
    this.pending = true;
    try {
      const receipt = await create(this.payload, this.requestId);
      if (!receipt?.reference_number || !receipt.complaint_id)
        throw new Error("The submission response could not be confirmed.");
      this.receipt = receipt;
      return receipt;
    } finally {
      this.pending = false;
    }
  }

  async attach(
    files: File[],
    upload: (file: File, record: UploadRecord) => Promise<void>,
    register: (record: UploadRecord) => Promise<void>,
  ) {
    if (!this.receipt)
      throw new Error(
        "A confirmed complaint is required before attaching documents.",
      );
    for (const file of files) {
      let state = this.uploads.get(file);
      if (!state) {
        state = {
          record: {
            storagePath: `incoming/${this.receipt.reference_number}/${crypto.randomUUID()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "-")}`,
            fileName: file.name,
            fileSize: file.size,
            mimeType: file.type,
          },
          uploaded: false,
          registered: false,
        };
        this.uploads.set(file, state);
      }
      if (!state.uploaded) {
        await upload(file, state.record);
        state.uploaded = true;
      }
      if (!state.registered) {
        await register(state.record);
        state.registered = true;
      }
    }
  }
}
