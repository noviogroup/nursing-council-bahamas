import type { ReactNode } from 'react';
import { createPageMetadata } from '@/lib/seo';

export const metadata = createPageMetadata({
  title: 'Forms and Documents',
  description: 'Browse Nursing Council forms and document placeholders by registration, education, agency, verification, and complaint category.',
  path: '/forms',
});

export default function FormsLayout({ children }: { children: ReactNode }) {
  return children;
}
