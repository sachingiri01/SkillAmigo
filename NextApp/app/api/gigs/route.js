import pool from "../db";
import { NextResponse } from "next/server";

// GET /api/gigs → fetch all gigs
export async function GET() {
  try {
    const result = await pool.query("SELECT * FROM gigs ORDER BY created_at DESC");
    return NextResponse.json(result.rows, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST /api/gigs
export async function POST(request) {
  try {
    const body = await request.json();
    const { seller_id, title, description, category, min_price, avg_price, location, picture } = body;

    if (!seller_id || !title || !description) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const query = `
      INSERT INTO gigs 
      (seller_id, title, description, category, min_price, avg_price, location, picture) 
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
      RETURNING *;
    `;

    const values = [seller_id, title, description, category, min_price, avg_price, location, picture];
    const { rows } = await pool.query(query, values);

    return NextResponse.json(rows[0], { status: 201 });
  } catch (err) {
    console.error("Error creating gig:", err);
    return NextResponse.json({ error: "Failed to create gig" }, { status: 500 });
  }
}
