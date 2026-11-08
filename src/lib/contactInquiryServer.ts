import { createClient } from '@supabase/supabase-js';
import { isInquiryReference, validateInquiry, type ValidatedInquiry } from './contactInquiry';

type RpcResult = { data: unknown; error: { message: string; code?: string } | null; status?: number };
type SubmitInquiry = (inquiry: ValidatedInquiry) => Promise<RpcResult>;

function respond(body: object, status = 200) {
  return Response.json(body, { status, headers: { 'Cache-Control': 'no-store' } });
}

export async function recordPublicInquiry(inquiry: ValidatedInquiry): Promise<RpcResult> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) throw new Error('Inquiry service unavailable');
  const supabase = createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false, detectSessionInUrl: false },
  });
  return await supabase.rpc('submit_public_inquiry', {
    p_name: inquiry.name,
    p_email: inquiry.email,
    p_phone: inquiry.phone,
    p_inquiry_type: inquiry.inquiryType,
    p_subject: inquiry.subject,
    p_message: inquiry.message,
  });
}

// Dependency injection lets tests exercise the HTTP contract without a live submission.
export function createContactHandler(submit: SubmitInquiry = recordPublicInquiry) {
  return async function POST(request: Request) {
    let input: unknown;
    try {
      if (Number(request.headers.get('content-length') || 0) > 24000) {
        return respond({ error: 'Your message is too long. Please shorten it and try again.' }, 413);
      }
      const raw = await request.text();
      if (raw.length > 24000) return respond({ error: 'Your message is too long. Please shorten it and try again.' }, 413);
      input = JSON.parse(raw);
    } catch {
      return respond({ error: 'Check your message and try again.' }, 400);
    }
    const validation = validateInquiry(input);
    if (!validation.ok) return respond({ error: validation.error, field: validation.field }, 400);

    try {
      const { data, error, status } = await submit(validation.value);
      if (error) {
        if (status === 0 || (!error.code && !/duplicate|rate limit|limit exceeded|wait/i.test(error.message))) {
          return respond({ uncertain: true, error: 'We could not confirm whether your enquiry was recorded. Keep a copy and contact the Council before sending it again.' }, 503);
        }
        if (/wait|rate limit|limit exceeded|duplicate/i.test(error.message)) {
          return respond({ error: 'Recent or repeated enquiries are being limited. Please wait before sending another, or contact the Council if you need help. This response does not confirm a new enquiry.' }, 429);
        }
        return respond({ error: 'We could not record your enquiry. Your message is still here. Please try again or contact the Council.' }, 502);
      }
      // Never generate a receipt locally or assume a successful insert from an empty response.
      if (!isInquiryReference(data)) {
        return respond({ uncertain: true, error: 'We could not confirm your enquiry reference. Keep a copy of your message and contact the Council before sending it again.' }, 502);
      }
      return respond({ ok: true, reference: data }, 201);
    } catch {
      // Connection failure can happen after an insert. Do not promise that nothing was recorded.
      return respond({ uncertain: true, error: 'We could not confirm whether your enquiry was recorded. Your message is still here. Keep a copy and contact the Council before sending it again.' }, 503);
    }
  };
}
