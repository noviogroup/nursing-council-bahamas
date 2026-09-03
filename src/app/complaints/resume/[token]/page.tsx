import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { portalPath } from '@/lib/portal';

export const metadata: Metadata = { title: 'Resume Complaint Draft', robots: { index: false, follow: false } };

export default async function ResumeComplaintPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  redirect(portalPath(`/complaints/resume/${encodeURIComponent(token)}`));
}
