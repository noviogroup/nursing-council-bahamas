import { redirect } from 'next/navigation';
import { portalPath } from '@/lib/portal';

export function redirectToLicensingPortal(path: string): never {
  redirect(portalPath(path));
}
