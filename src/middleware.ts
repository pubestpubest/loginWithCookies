import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function middleware(req: any) {
  const token = req.cookies.get("token")?.value;
  if (!token) return NextResponse.redirect(new URL("/login", req.URL));
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = decodedToken;
  } catch (error) {
    return NextResponse.redirect(new URL("/login", req.URL));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/admin"],
};
