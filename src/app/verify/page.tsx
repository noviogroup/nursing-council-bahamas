import { redirect } from 'next/navigation';
import { portalPath } from '@/lib/portal';

export default function VerifyRedirectPage() {
  redirect(portalPath('/verify'));
}
