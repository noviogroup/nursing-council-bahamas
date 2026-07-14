const fallbackPortalUrl =
  process.env.NODE_ENV === 'development'
    ? 'http://127.0.0.1:3002'
    : 'https://portal.nursingcouncilbahamas.com';

export const portalBaseUrl =
  (process.env.NEXT_PUBLIC_PORTAL_URL || fallbackPortalUrl).replace(/\/$/, '');

export function portalPath(path: string) {
  return `${portalBaseUrl}${path.startsWith('/') ? path : `/${path}`}`;
}
