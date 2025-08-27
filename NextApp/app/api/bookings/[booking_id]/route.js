import pool from "../../db";
import { NextResponse } from "next/server";

// GET /api/bookings/:booking_id
export async function GET(req, { params }) {
  try {
    const { booking_id } = params;  // matches folder name [booking_id]

    const result = await pool.query(
      "SELECT * FROM bookings WHERE booking_id = $1",
      [booking_id]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { message: "Booking not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(result.rows[0], { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
