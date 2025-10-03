import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // لو الروت يبدأ بـ /en أو /ar خلاص
  if (pathname.startsWith('/en') || pathname.startsWith('/ar')) {
    return NextResponse.next();
  }

  // غير كده اعمل redirect للغة افتراضية
  const defaultLang = 'ar';
  const url = req.nextUrl.clone();
  url.pathname = `/${defaultLang}${pathname}`;
  return NextResponse.redirect(url);
}

// مسار الميدلوير
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
