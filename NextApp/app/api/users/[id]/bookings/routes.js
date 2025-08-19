import pool from "../../../db";
import { NextResponse } from "next/server";

// GET /api/users/:user_id/bookings
export async function GET(req, { params }) {
  try {
    const { user_id } = params;
    const result = await pool.query(
      "SELECT * FROM bookings WHERE user_id = $1 ORDER BY created_at DESC",
      [user_id]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ message: "No bookings found for this user" }, { status: 404 });
    }

    return NextResponse.json(result.rows, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
