import { NextResponse, type NextRequest } from "next/server";

const SESSION_COOKIE_NAME = "jg_session";
const LOGIN_PATH = "/resident-portal/login";

export function proxy(request: NextRequest) {
  const hasSessionCookie = request.cookies.has(SESSION_COOKIE_NAME);
  if (hasSessionCookie) {
    return NextResponse.next();
  }

  const loginUrl = new URL(LOGIN_PATH, request.url);
  const requestedPath = `${request.nextUrl.pathname}${request.nextUrl.search}`;
  loginUrl.searchParams.set("next", requestedPath);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/resident-portal/dashboard/:path*"],
};
