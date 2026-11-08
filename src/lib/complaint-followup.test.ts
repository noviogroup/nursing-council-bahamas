import assert from 'node:assert/strict';
import test from 'node:test';
import {
  followupFileType,
  followupRpcStatus,
  pendingFollowupUploads,
  prepareFollowupPayload,
  readFollowupReceipt,
  readFollowupRequest,
} from './complaint-followup';

const request = {
  request_id: '085982ad-aa26-48b5-8a45-385fab2e1cc6',
  reference_number: 'NC-TEST-00001',
  public_message: 'Please provide the requested supporting information.',
  due_at: null,
  expires_at: '2026-11-10T15:00:00Z',
  response_received_at: null,
  receipt_id: null,
};

test('an incomplete request never becomes a response form', () => {
  for (const invalid of [null, [], {}, { ...request, request_id: '' }, { ...request, reference_number: null }, { ...request, public_message: ' ' }, { ...request, expires_at: 'unknown' }, { ...request, due_at: 'unknown' }, { ...request, response_received_at: 'unknown' }, { ...request, receipt_id: 'receipt-with-missing-time' }]) {
    assert.equal(readFollowupRequest(invalid), null);
  }
  assert.deepEqual(readFollowupRequest(request), request);
});

test('a used link retains its actual recorded time and receipt', () => {
  const used = { ...request, response_received_at: '2026-11-09T12:15:00Z', receipt_id: 'test-receipt' };
  assert.deepEqual(readFollowupRequest(used), used);
});

test('a response is only confirmed with a reference, receipt and valid recorded time', () => {
  const receipt = { receipt_id: 'test-receipt', reference_number: 'NC-TEST-00001', received_at: '2026-11-09T12:15:00Z', attachment_count: 2, receipt_email_status: 'failed' };
  assert.deepEqual(readFollowupReceipt(receipt), receipt);
  assert.equal(readFollowupReceipt({ ...receipt, receipt_id: null }), null);
  assert.equal(readFollowupReceipt({ ...receipt, received_at: 'invalid' }), null);
  assert.equal(readFollowupReceipt({ ...receipt, attachment_count: -1 })?.attachment_count, undefined);
  assert.equal(readFollowupReceipt({ ...receipt, receipt_email_status: null })?.receipt_email_status, undefined);
});

test('uncertain recording retries reuse the exact immutable response and identity', () => {
  const selectedIds = ['document-one', 'document-two'];
  const first = prepareFollowupPayload(null, 'stable-request-id', '  My response.  ', selectedIds);
  selectedIds.push('later-document');
  const retry = prepareFollowupPayload(first, 'different-id', 'Accidentally edited response.', ['changed-document']);
  assert.equal(retry, first);
  assert.deepEqual(retry, { requestId: 'stable-request-id', message: 'My response.', attachmentIds: ['document-one', 'document-two'] });
  assert.equal(Object.isFrozen(first), true);
  assert.equal(Object.isFrozen(first.attachmentIds), true);
});

test('partial upload recovery only retries files without confirmed attachment IDs', () => {
  const first = { uploadId: 'stable-file-one', attachmentId: 'received-file-one' };
  const failed = { uploadId: 'stable-file-two' };
  const pending = { uploadId: 'stable-file-three' };
  assert.deepEqual(pendingFollowupUploads([first, failed, pending]), [failed, pending]);
  assert.equal(pendingFollowupUploads([first, failed])[0], failed);
});

test('supported document extensions and MIME types must agree', () => {
  assert.equal(followupFileType('evidence.PDF', 'application/pdf'), 'application/pdf');
  assert.equal(followupFileType('evidence.docx', ''), 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
  assert.equal(followupFileType('evidence.png', 'application/pdf'), null);
  assert.equal(followupFileType('evidence.exe', ''), null);
  assert.equal(followupFileType('constructor', ''), null);
});

test('RPC capability failures preserve their explicit HTTP semantics', () => {
  assert.equal(followupRpcStatus(400, 'PT404'), 404);
  assert.equal(followupRpcStatus(400, 'PT409'), 409);
  assert.equal(followupRpcStatus(400, 'PT503'), 503);
  assert.equal(followupRpcStatus(400, 'P0001'), 400);
});
