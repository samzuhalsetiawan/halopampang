import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/toko"];

export default function middleware(req: NextRequest) {
  if (protectedRoutes.includes(req.nextUrl.pathname)) {
    const absoluteURL = new URL("/toko/umkm", req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }
}