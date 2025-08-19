import pool from "../../../db";
import { NextResponse } from "next/server";

// GET /api/users/:user_id/gigs → all gigs for that user
export async function GET(req, { params }) {
  try {
    const { user_id } = params;

    const result = await pool.query(
      "SELECT * FROM gigs WHERE seller_id = $1",
      [user_id]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ message: "No gigs found for this user" }, { status: 404 });
    }

    return NextResponse.json(result.rows, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
