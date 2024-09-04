// app/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function is called on every request
export function middleware(request: NextRequest) {
  const authRoutes = ["/login", "/sign-up"];

  const { pathname } = request.nextUrl;

  
  const token = request.cookies.get("jwt")?.value || '';
  if (!token && !authRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (token && authRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Continue with the request if no conditions match
  return NextResponse.next();
}

// Specify the paths where middleware should run

export const config = {
  // Skip all paths that should not be internationalized. This example skips the
  // folders "api", "_next" and all files with an extension (e.g. favicon.ico)
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
