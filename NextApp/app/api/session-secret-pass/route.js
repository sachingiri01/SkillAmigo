import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import crypto from "crypto";

const SECRET = process.env.SESSION_SECRET;

function encrypt(data) {
  const cipher = crypto.createCipher("aes-256-ctr", SECRET);
  let encrypted = cipher.update(JSON.stringify(data), "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
}

export async function GET(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  console.log("any",token);
  
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const encrypted = encrypt(token);
  return NextResponse.json({ session: encrypted });
}
