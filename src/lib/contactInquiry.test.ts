import assert from 'node:assert/strict';
import test from 'node:test';
import { councilServices } from './councilServices';
import { emptyInquiry, inquiryServices, validateInquiry } from './contactInquiry';
import { createContactHandler } from './contactInquiryServer';

const valid = {
  ...emptyInquiry, name: 'Test Enquirer', email: 'enquirer@example.com', subject: 'Service guidance', message: 'Please explain the next step for this service.',
};
const reference = '85d7b966-c73d-4d39-83de-4d85bc144e7b';
const request = (body: unknown) => new Request('http://localhost/api/contact', { method: 'POST', body: JSON.stringify(body), headers: { 'Content-Type': 'application/json' } });

test('keeps the complete sixteen-service inventory and real availability', () => {
  assert.equal(councilServices.length, 16);
  assert.equal(new Set(councilServices.map((service) => service.id)).size, 16);
  assert.match(councilServices.find((service) => service.id === 'good-standing')!.href, /\/nursing\/certificates$/);
  assert.equal(councilServices.filter((service) => service.availability === 'online').length, 5);
  for (const id of ['licence-renewal', 'provisional-temporary-licence', 'graduate-nurse-letter']) {
    assert.equal(councilServices.find((service) => service.id === id)!.availability, 'assisted');
  }
});

test('all assisted service links prefill a valid topic and preserve service context in the queue', () => {
  for (const service of inquiryServices) {
    const result = validateInquiry({ ...valid, topic: `service:${service.id}`, subject: 'An edited subject' });
    assert.ok(result.ok);
    if (result.ok) {
      assert.equal(result.value.inquiryType, service.inquiryType);
      assert.match(result.value.message, new RegExp(`^Service: ${service.title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\n\\n`));
      assert.ok(result.value.message.length <= 4000);
    }
  }
});

test('normalises safe contact details without silently truncating the message', () => {
  const result = validateInquiry({ ...valid, name: '  Test O’Name  ', email: ' ENQUIRER@EXAMPLE.COM ', message: '  First line\n\nSecond line  ' });
  assert.ok(result.ok);
  if (result.ok) assert.deepEqual(result.value, { name: "Test O'Name", email: 'enquirer@example.com', phone: '', inquiryType: 'general', subject: valid.subject, message: 'First line\n\nSecond line' });
  const tooLong = validateInquiry({ ...valid, message: 'x'.repeat(3801) });
  assert.equal(tooLong.ok, false);
  if (!tooLong.ok) assert.equal(tooLong.field, 'message');
});

test('rejects malformed fields and complaint, registry, or unknown service routing', () => {
  const cases = [
    { name: '<script>' }, { email: 'not-an-email' }, { phone: 'please call' },
    { topic: 'complaint' }, { topic: 'registry_missing' }, { topic: 'service:made-up' },
    { subject: 'Hi' }, { message: 'short' },
  ];
  for (const change of cases) assert.equal(validateInquiry({ ...valid, ...change }).ok, false);
});

test('returns the actual persisted reference and forwards validated context', async () => {
  let calls = 0;
  const handler = createContactHandler(async (inquiry) => {
    calls += 1;
    assert.equal(inquiry.inquiryType, 'documents');
    assert.match(inquiry.message, /^Service: Graduate Nurse Letter/);
    return { data: reference, error: null };
  });
  const response = await handler(request({ ...valid, topic: 'service:graduate-nurse-letter' }));
  assert.equal(response.status, 201);
  assert.equal(response.headers.get('cache-control'), 'no-store');
  assert.deepEqual(await response.json(), { ok: true, reference });
  assert.equal(calls, 1);
});

test('never claims success for malformed input, honeypot input, or oversized requests', async () => {
  let calls = 0;
  const handler = createContactHandler(async () => { calls += 1; return { data: reference, error: null }; });
  for (const body of [null, [], { ...valid, website: 'bot.example' }, { ...valid, email: 'bad' }]) {
    const response = await handler(request(body));
    assert.equal(response.status, 400);
    assert.equal((await response.json()).reference, undefined);
  }
  const oversized = await handler(request({ ...valid, message: 'x'.repeat(25000) }));
  assert.equal(oversized.status, 413);
  assert.equal(calls, 0);
});

test('missing or invalid RPC identifiers cannot produce a fabricated receipt', async () => {
  for (const data of [null, {}, { id: reference }, '', 'saved', 123]) {
    const response = await createContactHandler(async () => ({ data, error: null }))(request(valid));
    assert.equal(response.status, 502);
    const body = await response.json();
    assert.equal(body.reference, undefined);
    assert.match(body.error, /could not confirm/);
  }
});

test('rate limits and connection failures keep a truthful retry or follow-up response', async () => {
  const duplicate = await createContactHandler(async () => ({ data: null, error: { message: 'Duplicate inquiry received' } }))(request(valid));
  assert.equal(duplicate.status, 429);
  assert.equal((await duplicate.json()).reference, undefined);
  const failed = await createContactHandler(async () => { throw new Error('Connection closed'); })(request(valid));
  assert.equal(failed.status, 503);
  const body = await failed.json();
  assert.match(body.error, /could not confirm whether/);
  assert.equal(body.reference, undefined);
});


test('resolved Supabase transport errors are uncertain and never invite immediate replay', async () => {
  const response = await createContactHandler(async () => ({ data: null, error: { message: 'TypeError: Failed to fetch', code: '' }, status: 0 }))(request(valid));
  assert.equal(response.status, 503); const body = await response.json();
  assert.equal(body.uncertain, true); assert.match(body.error, /before sending it again/); assert.doesNotMatch(body.error, /Please try again/);
});
