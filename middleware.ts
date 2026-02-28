import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("auth_token")?.value;
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin") && !token) {
    const loginUrl = new URL("/login", request.url);
    const fullPath = `${pathname}${request.nextUrl.search}`;
    loginUrl.searchParams.set("redirect", fullPath);
    return NextResponse.redirect(loginUrl);
  }

  if (pathname.startsWith("/login") && token) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/login"],
};
