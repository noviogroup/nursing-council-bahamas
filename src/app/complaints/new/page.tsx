import { redirect } from 'next/navigation';
import { portalPath } from '@/lib/portal';

export default function NewComplaintPage() {
  redirect(portalPath('/complaints/new'));
}
