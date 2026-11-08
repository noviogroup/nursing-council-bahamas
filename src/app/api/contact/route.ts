import { createContactHandler } from '@/lib/contactInquiryServer';

export const runtime = 'nodejs';
export const POST = createContactHandler();
