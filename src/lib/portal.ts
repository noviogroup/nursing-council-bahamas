const fallbackPortalUrl = 'https://portal.nursingcouncilbahamas.com';

export const portalBaseUrl =
  (process.env.NEXT_PUBLIC_PORTAL_URL || fallbackPortalUrl).replace(/\/$/, '');

export function portalPath(path: string) {
  return `${portalBaseUrl}${path.startsWith('/') ? path : `/${path}`}`;
}
