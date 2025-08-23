import pool from "../db";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";


// GET /api/gigs → fetch all gigs
export async function GET() {
  try {
    const result = await pool.query(`
      SELECT 
        g.gig_id AS id,
        g.title,
        g.description,
        g.category,
        g.min_price,
        g.rating,
        g.picture AS image,
        g.availability,
        u.name AS provider,
        u.profile_picture AS providerPhoto,
        u.is_verified AS isVerified
      FROM gigs g
      JOIN users u ON g.seller_id = u.user_id
      ORDER BY g.created_at DESC
    `);
    console.log(result)

    // Map DB fields to card component structure
    const gigs = result.rows.map(gig => ({
      id: gig.id,
      title: gig.title,
      description: gig.description,
      provider: gig.provider,
      providerPhoto: gig.providerphoto,
      image: gig.image,
      price: `₹${gig.min_price}`,
      priceType: "per project",
      rating: gig.rating || 0,
      reviews: 0, // Placeholder until review table exists
      distance: "2.3 km", // Placeholder or compute from location
      availability: gig.availability?.status || "Available now",
      tags: gig.category ? [gig.category] : [],
      isVerified: gig.isVerified || false
    }));
    console.log("row",gigs);
    

    return NextResponse.json(gigs, { status: 200 });
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
