import pool from "../db";
import { NextResponse } from "next/server";

// GET /api/bookings → fetch all bookings
export async function GET() {
  try {
    const result = await pool.query("SELECT * FROM bookings ORDER BY created_at DESC");
    return NextResponse.json(result.rows, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
