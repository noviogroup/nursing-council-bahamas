const fallbackPortalUrl = 'https://nursing-council-portal.netlify.app';

export const portalBaseUrl =
  (process.env.NEXT_PUBLIC_PORTAL_URL || fallbackPortalUrl).replace(/\/$/, '');

export function portalPath(path: string) {
  return `${portalBaseUrl}${path.startsWith('/') ? path : `/${path}`}`;
}
