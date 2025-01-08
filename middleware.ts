import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const hasLang = /^\/(en|ru)(\/|$)/.test(pathname);

  if (!hasLang) {
    const url = request.nextUrl.clone();
    url.pathname = `/en${pathname}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next|favicon.ico|static).*)'],
};