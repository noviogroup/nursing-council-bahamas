import type { ReactNode } from 'react';
import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'Submit a Complaint',
  description: 'Submit a complaint concerning an individual nurse, midwife, applicant, or licensee to the Nursing Council.',
  path: '/complaints/new',
  noIndex: true,
});

export default function NewComplaintLayout({ children }: { children: ReactNode }) {
  return children;
}
