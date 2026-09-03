import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { portalPath } from '@/lib/portal';

export const metadata: Metadata = { title: 'Complaint Submitted', robots: { index: false, follow: false } };

export default async function ComplaintSubmittedPage({ params }: { params: Promise<{ referenceId: string }> }) {
  const { referenceId } = await params;
  redirect(portalPath(`/complaints/submitted/${encodeURIComponent(referenceId)}`));
}
