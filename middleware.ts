import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // const pathname = request.nextUrl.pathname;

  // console.log('HELLO IT IS ME', pathname);

  // const hasLang = /^\/(en|ru)(\/|$)/.test(pathname); 

  // // Если языка нет, добавляем дефолтный язык
  // if (!hasLang) {
  //   const url = request.nextUrl.clone();
  //   url.pathname = `/en${pathname}`; // Замените на /ru, если требуется
  //   return NextResponse.redirect(url);
  // }

  return NextResponse.next();
}

export const config = {
    matcher: ['/((?!api|_next|favicon.ico|static).*)'],
};