import { redirect } from 'next/navigation';
import { portalPath } from '@/lib/portal';

export default function ComplaintTrackPage() {
  redirect(portalPath('/complaints/track'));
}
