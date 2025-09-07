import { NextResponse } from "next/server";
import pool from "../db";

export async function GET() {
  try {
    const result = await pool.query(`
      SELECT 
        g.gig_id,
        g.title,
        g.category,
        g.min_price AS price,
        g.rating,
        g.created_at,
        u.name AS seller
      FROM gigs g
      JOIN users u ON g.seller_id = u.user_id
      ORDER BY g.created_at DESC
    `);

    // Map rows and add computed fields
    const gigs = result.rows.map(gig => ({
      id: gig.gig_id,
      title: gig.title,
      seller: gig.seller,
      category: gig.category,
      price: parseFloat(gig.price),
      status: 'Active', // default status for frontend
      rating: parseFloat(gig.rating || 0),
      createdDate: new Date(gig.created_at).toISOString().split('T')[0], // formatted date
    }));

    return NextResponse.json(gigs);
  } catch (error) {
    console.error("Error fetching gigs:", error);
    return NextResponse.json(
      { error: "Failed to fetch gigs" },
      { status: 500 }
    );
  }
}
