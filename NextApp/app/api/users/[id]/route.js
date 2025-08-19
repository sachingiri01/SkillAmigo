import pool from "../../db";
import { NextResponse } from "next/server";

// GET /api/users/:id
export async function GET(req, { params }) {
  try {
    const result = await pool.query(
      "SELECT * FROM users WHERE user_id = $1",
      [params.id] // from folder [id]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(result.rows[0], { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}




