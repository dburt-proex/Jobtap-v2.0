import { NextRequest, NextResponse } from "next/server";

const COOKIE_NAME = "jobtap-session";

export function middleware(request: NextRequest) {
  const sessionCookie = request.cookies.get(COOKIE_NAME);

  if (!sessionCookie) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
