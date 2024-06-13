
import { NextResponse, NextRequest } from "next/server";

import { authenticate } from "./actions/actions";


export async function middleware(request: NextRequest) {

  const { pathname } = request.nextUrl;

  if (pathname == '/login' || pathname == '/register') {
    return NextResponse.next()
  }

  const token = request.cookies.get('Auth')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const isAuthenticated = await authenticate(token);

  if (isAuthenticated) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL('/login', request.url));
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)']
}
