import { NextResponse, type NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const session = request.cookies.get('session')?.value;
  const { pathname } = request.nextUrl;

  const isPublicPath = pathname === '/driver/login';

  if (pathname.startsWith('/driver/dashboard') || pathname.startsWith('/admin')) {
    if (!session) {
      return NextResponse.redirect(new URL('/driver/login', request.url));
    }

    const [role] = session.split(':');

    if (pathname.startsWith('/driver/dashboard') && role !== 'driver') {
      return NextResponse.redirect(new URL('/driver/login', request.url));
    }
    
    if (pathname.startsWith('/admin') && role !== 'admin') {
      return NextResponse.redirect(new URL('/driver/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/driver/dashboard/:path*', '/admin/:path*'],
};
