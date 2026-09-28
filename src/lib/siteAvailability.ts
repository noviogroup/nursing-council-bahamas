// Staged public launch: until PUBLIC_SITE_LIVE=true, only the landing page (with its
// information panels) and the complaint pages are reachable. Everything else redirects
// to the landing page and is dropped from site navigation.
export const publicSiteLive = process.env.PUBLIC_SITE_LIVE === 'true';

// Complaints are held back until the Council finalises categories and the complaints SOP.
// Flip to true to publish the complaint pages and the landing-page complaints panel.
export const complaintsPublic = false;

export const approvedPublicPaths = [
  // The complaint form is a full page; the other approved content opens in landing-page panels.
  ...(complaintsPublic ? ['/complaints'] : []),
  // Supporting pages: the complaint form collects personal data, so its privacy notice must be reachable.
  '/privacy',
  '/terms',
  '/accessibility',
];

// Approved content that lives in a landing-page panel while the site is staged.
// Old links to the full pages land on the matching panel instead of a dead end.
export const panelRedirects: Record<string, string> = {
  '/registry': 'registry',
  '/about': 'about',
  '/legal-ethics': 'legal',
  '/nursing-agencies': 'agencies',
  '/education-training': 'programmes',
};

// Paths that are never gated: the landing page, staff portal redirects, and API routes.
const alwaysAvailablePrefixes = ['/portal', '/api'];

function matchesPrefix(pathname: string, prefix: string) {
  return pathname === prefix || pathname.startsWith(`${prefix}/`);
}

export function isPathAvailable(pathname: string) {
  if (publicSiteLive || pathname === '/') return true;
  return [...approvedPublicPaths, ...alwaysAvailablePrefixes].some((prefix) => matchesPrefix(pathname, prefix));
}

// For navigation links: external URLs (portal, mail, phone) are treated as unavailable while
// the site is staged, because the Council asked for unfinished digital services to stay hidden.
export function isLinkAvailable(href: string) {
  if (publicSiteLive) return true;
  if (!href.startsWith('/')) return false;
  const pathname = href.split(/[?#]/)[0];
  return isPathAvailable(pathname);
}
