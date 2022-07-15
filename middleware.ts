// <root>/middleware.js
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import verify from "jsonwebtoken/verify";

export function middleware(request: NextRequest) {
  //check only the endpoints of this path if are authenticated in order to proceed
  if (request.nextUrl.pathname.startsWith("/api/auth/")) {
    NextResponse.next();

    // return NextResponse.rewrite(new URL("/", request.url));
    // This logic is only applied to /dashboard
  }
}
