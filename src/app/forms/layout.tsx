import type { ReactNode } from 'react';
import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'Forms & Applications',
  description: 'Find Nursing Council applications, Nurse 360 services, and Council assistance for registration, education, CPD, agencies, and UAPs.',
  path: '/forms',
});

export default function FormsLayout({ children }: { children: ReactNode }) {
  return children;
}
