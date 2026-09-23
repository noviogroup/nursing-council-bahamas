import { NextRequest, NextResponse } from 'next/server';

const publicSiteLive = process.env.PUBLIC_SITE_LIVE === 'true';

export function middleware(request: NextRequest) {
  if (publicSiteLive) {
    return NextResponse.next();
  }

  const { pathname } = request.nextUrl;
  const isAvailableDuringBuild =
    pathname === '/' ||
    pathname.startsWith('/portal') ||
    pathname.startsWith('/api');

  if (isAvailableDuringBuild) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL('/', request.url));
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|favicon.png|favicon.svg|nursing-council-logo.png|browserconfig.xml|robots.txt|sitemap.xml|assets|documents).*)'],
};
