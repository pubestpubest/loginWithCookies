import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  const { username, password } = await req.json();
  if (username === "admin" && password === "admin") {
    const token = jwt.sign({ role: "admin" }, process.env.NODE_ENV!, {
      expiresIn: "1h",
    });
    const response = NextResponse.json({ message: "Logged in" });
    response.cookies.set("token", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });
    return response;
  }
  return NextResponse.json({ message: "Invalid redentials" }, { status: 401 });
}
