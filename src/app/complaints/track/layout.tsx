import type { ReactNode } from 'react';
import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'Track a Complaint',
  description: 'Use a complaint reference number and contact email to view public complaint progress.',
  path: '/complaints/track',
  noIndex: true,
});

export default function TrackComplaintLayout({ children }: { children: ReactNode }) {
  return children;
}
