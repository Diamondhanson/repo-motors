import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ADMIN_LOGIN_PATH = "/admin/login";
const ADMIN_PATH_PREFIX = "/admin";

function isAdminRoute(pathname: string): boolean {
  return pathname === ADMIN_PATH_PREFIX || pathname.startsWith(`${ADMIN_PATH_PREFIX}/`);
}

function isLoginRoute(pathname: string): boolean {
  return pathname === ADMIN_LOGIN_PATH;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!isAdminRoute(pathname)) {
    return NextResponse.next();
  }

  if (isLoginRoute(pathname)) {
    const adminSession = request.cookies.get("admin_session")?.value;
    if (adminSession === "1") {
      return NextResponse.redirect(new URL(ADMIN_PATH_PREFIX, request.url));
    }
    return NextResponse.next();
  }

  const adminSession = request.cookies.get("admin_session")?.value;
  if (!adminSession || adminSession !== "1") {
    const loginUrl = new URL(ADMIN_LOGIN_PATH, request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
