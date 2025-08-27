import pool from "../../db";
import { NextResponse } from "next/server";

// GET /api/gigs/:gig_id → fetch single gig
export async function GET(req, { params }) {
  try {
    const { gig_id } = params; // matches folder name [gig_id]

    const result = await pool.query(
      "SELECT * FROM gigs WHERE gig_id = $1",
      [gig_id]
    );

    if (result.rows.length === 0) {
      return NextResponse.json(
        { message: "Gig not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(result.rows[0], { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
