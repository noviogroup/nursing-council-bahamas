export type FollowupRequest = {
  request_id: string;
  reference_number: string;
  public_message: string;
  due_at: string | null;
  expires_at: string;
  response_received_at: string | null;
  receipt_id: string | null;
};

export type FollowupReceipt = {
  receipt_id: string | null;
  reference_number: string;
  received_at: string;
  attachment_count?: number;
  receipt_email_status?: string;
};

export type FollowupPayload = Readonly<{
  requestId: string;
  message: string;
  attachmentIds: readonly string[];
}>;

function dateValue(value: unknown): string | null {
  return typeof value === 'string' && !Number.isNaN(Date.parse(value)) ? value : null;
}

function nonemptyText(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

export function readFollowupRequest(value: unknown): FollowupRequest | null {
  if (!value || typeof value !== 'object') return null;
  const row = value as Record<string, unknown>;
  const expiresAt = dateValue(row.expires_at);
  if (!nonemptyText(row.request_id) || !nonemptyText(row.reference_number) || !nonemptyText(row.public_message) || !expiresAt) return null;
  const responseReceivedAt = dateValue(row.response_received_at);
  if ((row.response_received_at != null && !responseReceivedAt) || (nonemptyText(row.receipt_id) && !responseReceivedAt)) return null;
  if (row.due_at != null && !dateValue(row.due_at)) return null;
  return {
    request_id: row.request_id,
    reference_number: row.reference_number,
    public_message: row.public_message,
    due_at: dateValue(row.due_at),
    expires_at: expiresAt,
    response_received_at: responseReceivedAt,
    receipt_id: nonemptyText(row.receipt_id) ? row.receipt_id : null,
  };
}

export function readFollowupReceipt(value: unknown): FollowupReceipt | null {
  if (!value || typeof value !== 'object') return null;
  const row = value as Record<string, unknown>;
  const receivedAt = dateValue(row.received_at);
  if (!nonemptyText(row.receipt_id) || !nonemptyText(row.reference_number) || !receivedAt) return null;
  return {
    receipt_id: row.receipt_id,
    reference_number: row.reference_number,
    received_at: receivedAt,
    attachment_count: typeof row.attachment_count === 'number' && Number.isInteger(row.attachment_count) && row.attachment_count >= 0 ? row.attachment_count : undefined,
    receipt_email_status: nonemptyText(row.receipt_email_status) ? row.receipt_email_status : undefined,
  };
}

// Once the recording request is attempted, retries must retain its exact body
// and identity, including when the first response was lost after recording.
export function prepareFollowupPayload(existing: FollowupPayload | null, requestId: string, message: string, attachmentIds: string[]): FollowupPayload {
  if (existing) return existing;
  return Object.freeze({ requestId, message: message.trim(), attachmentIds: Object.freeze([...attachmentIds]) });
}

export function pendingFollowupUploads<T extends { uploadId: string; attachmentId?: string }>(items: T[]): T[] {
  return items.filter((item) => !item.attachmentId);
}

const fileTypes: Record<string, string> = {
  pdf: 'application/pdf',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  png: 'image/png',
  doc: 'application/msword',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
};

export function followupFileType(name: string, browserType: string): string | null {
  const extension = name.split('.').pop()?.toLowerCase() || '';
  const expected = Object.hasOwn(fileTypes, extension) ? fileTypes[extension] : null;
  return expected && (!browserType || browserType === expected) ? expected : null;
}

export function followupRpcStatus(status: number, code?: string) {
  return code && /^PT\d{3}$/.test(code) ? Number(code.slice(2)) : status;
}
