import { NextRequest, NextResponse } from 'next/server';
import { isPathAvailable, panelRedirects } from '@/lib/siteAvailability';

export function middleware(request: NextRequest) {
  if (isPathAvailable(request.nextUrl.pathname)) {
    return NextResponse.next();
  }

  const panel = panelRedirects[request.nextUrl.pathname.replace(/\/$/, '')];
  return NextResponse.redirect(new URL(panel ? `/#${panel}` : '/', request.url));
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|favicon.png|favicon.svg|nursing-council-logo.png|browserconfig.xml|robots.txt|sitemap.xml|assets|documents).*)'],
};
