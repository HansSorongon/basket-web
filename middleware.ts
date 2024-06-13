
import { NextResponse, NextRequest } from "next/server";

import { authenticate } from "./actions/actions";

const PUBLIC_FILE = /\.(.*)$/;

export async function middleware(request: NextRequest) {

  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith("/_next") || // exclude Next.js internals
    pathname.startsWith("/static") || // exclude static files
    PUBLIC_FILE.test(pathname) // exclude all files in the public folder
  )
    return NextResponse.next();

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

export const config = {}
