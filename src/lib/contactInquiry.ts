import { councilServices, type CouncilService } from './councilServices';

export const inquiryServices: Pick<CouncilService, 'id' | 'title' | 'inquiryType' | 'availability' | 'action' | 'href'>[] = [
  ...councilServices,
  { id: 'agency-status', title: 'Nursing agency status', inquiryType: 'agency', availability: 'assisted', action: 'Ask about an agency’s status', href: '/nursing-agencies' },
  { id: 'uap-training', title: 'UAP training', inquiryType: 'education_registration', availability: 'assisted', action: 'Ask about UAP training', href: '/uaps' },
  { id: 'uap-cpd', title: 'UAP continuing professional development', inquiryType: 'education_registration', availability: 'assisted', action: 'Ask about UAP CPD', href: '/uaps' },
];

export function findInquiryService(id: string) {
  return inquiryServices.find((service) => service.id === id);
}

export const inquiryTopics = [
  { value: 'general', label: 'General information' },
  { value: 'registration', label: 'Registration or enrollment' },
  { value: 'renewal', label: 'Licence renewal' },
  { value: 'education_registration', label: 'Education or CPD' },
  { value: 'committee', label: 'Council or committee information' },
  { value: 'agency', label: 'Nursing agency licensing' },
  { value: 'verification', label: 'Document verification' },
  { value: 'technical_support', label: 'Website or Nurse 360 support' },
  { value: 'other', label: 'Other enquiry' },
] as const;

export type InquiryField = 'name' | 'email' | 'phone' | 'topic' | 'subject' | 'message';
export type InquiryInput = Record<InquiryField, string> & { website: string };
export type ValidatedInquiry = {
  name: string; email: string; phone: string; inquiryType: string; subject: string; message: string;
};

export const emptyInquiry: InquiryInput = { name: '', email: '', phone: '', topic: 'general', subject: '', message: '', website: '' };

const NAME_PATTERN = /^[\p{L}\p{N}' .,-]+$/u;
const EMAIL_PATTERN = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
const PHONE_PATTERN = /^[0-9+() -]+$/;

export function validateInquiry(input: unknown):
  | { ok: true; value: ValidatedInquiry }
  | { ok: false; error: string; field?: InquiryField } {
  if (!input || typeof input !== 'object' || Array.isArray(input)) {
    return { ok: false, error: 'Check your message and try again.' };
  }
  const body = input as Record<string, unknown>;
  const text = (key: string) => typeof body[key] === 'string' ? body[key].trim() : '';
  if (text('website')) return { ok: false, error: 'We could not accept this submission. Please contact the Council for help.' };
  const name = text('name').replace(/[’‘`]/g, "'").replace(/\s+/g, ' ');
  const email = text('email').toLowerCase();
  const phone = text('phone');
  const topic = text('topic');
  const subject = text('subject');
  const message = text('message');
  const service = topic.startsWith('service:') ? findInquiryService(topic.slice(8)) : undefined;
  const generalTopic = inquiryTopics.find((item) => item.value === topic);
  if (name.length < 2 || name.length > 120 || !NAME_PATTERN.test(name)) {
    return { ok: false, error: 'Enter your full name, using 2–120 letters, numbers, spaces, apostrophes, commas, full stops or hyphens.', field: 'name' };
  }
  if (email.length > 254 || !EMAIL_PATTERN.test(email)) {
    return { ok: false, error: 'Enter an email address, like name@example.com.', field: 'email' };
  }
  if (phone && (phone.length > 40 || !PHONE_PATTERN.test(phone))) {
    return { ok: false, error: 'Enter a phone number using up to 40 numbers, spaces, +, ( ), or -.', field: 'phone' };
  }
  if (!service && !generalTopic) {
    return { ok: false, error: 'Choose what you need help with.', field: 'topic' };
  }
  if (subject.length < 3 || subject.length > 160) {
    return { ok: false, error: 'Enter a subject between 3 and 160 characters.', field: 'subject' };
  }
  if (message.length < 10 || message.length > 3800) {
    return { ok: false, error: 'Enter a message between 10 and 3,800 characters.', field: 'message' };
  }
  return {
    ok: true,
    value: {
      name, email, phone, inquiryType: service?.inquiryType ?? generalTopic!.value, subject,
      // Preserve the chosen service in the staff queue, even if the user edits the subject.
      message: service ? `Service: ${service.title}\n\n${message}` : message,
    },
  };
}

export function isInquiryReference(value: unknown): value is string {
  return typeof value === 'string' && /^[a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12}$/i.test(value);
}
