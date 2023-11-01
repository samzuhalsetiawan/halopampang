import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/toko", "/profile", "/register"];

export default function middleware(req: NextRequest) {
  if (protectedRoutes.includes(req.nextUrl.pathname)) {
    if (req.nextUrl.pathname === "/toko") {
      const absoluteURL = new URL("/toko/umkm", req.nextUrl.origin);
      return NextResponse.redirect(absoluteURL.toString());
    }
    else if (req.nextUrl.pathname === "/profile") {
      const absoluteURL = new URL("/profile/main", req.nextUrl.origin);
      return  NextResponse.redirect(absoluteURL.toString());
    }
    else if (req.nextUrl.pathname === "/register") {
      const absoluteURL = new URL("/login", req.nextUrl.origin);
      return  NextResponse.redirect(absoluteURL.toString());
    }
  }
}