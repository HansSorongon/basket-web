
import { NextResponse, NextRequest } from "next/server";

import { authenticate } from "./actions/actions";

export async function middleware(request: NextRequest) {

  const token = request.cookies.get('Auth')?.value

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  const isAuthenticated = await authenticate(token)

  console.log(isAuthenticated)

  if (isAuthenticated) {
    return NextResponse.next()
  }

  return NextResponse.redirect(new URL('/login', request.url))
}

export const config = {
  matcher: '/',
}
