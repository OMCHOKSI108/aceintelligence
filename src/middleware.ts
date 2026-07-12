import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("auth-token")?.value;
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/careers/admin") || pathname.startsWith("/careers/profile")) {
    if (!token) {
      const loginUrl = new URL("/careers/login", req.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/careers/admin/:path*", "/careers/profile/:path*"],
};
