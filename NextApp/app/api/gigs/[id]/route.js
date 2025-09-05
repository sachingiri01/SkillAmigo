// app/api/gigs/[id]/route.js

//this for deleting user own gig//
import pool from "../../db";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function DELETE(req, { params }) {
  console.log("DELETE route hit with ID:", params.id);
  const { id: gigId } = params;

  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    

    const sellerId = session.user.id;
    console.log("saler",sellerId);
    
    

    // Check if gig belongs to seller
    const gigRes = await pool.query(
      `SELECT seller_id FROM gigs WHERE gig_id = $1`,
      [gigId]
    );
    if (gigRes.rowCount === 0 || gigRes.rows[0].seller_id !== sellerId) {
      return NextResponse.json({ error: "Gig not found or unauthorized" }, { status: 404 });
    }
    console.log("gig",gigRes.rows[0].seller_id)

    // Check bookings
    const bookingRes = await pool.query(
      `SELECT COUNT(*) AS active_bookings
       FROM bookings
       WHERE gig_id = $1 AND status NOT IN ('completed', 'cancelled')`,
      [gigId]
    );

    if (parseInt(bookingRes.rows[0].active_bookings) > 0) {
      return NextResponse.json(
        { error: "Cannot delete gig with pending or confirmed bookings" },
        { status: 400 }
      );
    }

    // Delete gig
    await pool.query(`DELETE FROM gigs WHERE gig_id = $1`, [gigId]);

    return NextResponse.json({ success: true, message: "Gig deleted successfully" });
  } catch (error) {
    console.error("Delete gig error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}


// app/api/gigs/[id]/route.js


export async function GET(req, { params }) {
  const { id: gigId } = params;
  

  try {
    // Fetch gig with seller info
    const gigRes = await pool.query(
      `SELECT 
        g.gig_id,
        g.title,
        g.description,
        g.category,
        g.min_price,
        g.avg_price,
        g.location,
        g.rating,
        g.picture,
        g.created_at,
        g.updated_at,
        g.availability,
        g.contact_info,
        -- Seller details
        u.user_id AS seller_id,
        u.name AS seller_name,
        u.email AS seller_email,
        u.profile_picture AS seller_picture,
        u.bio AS seller_bio,
        u.merit_credits AS seller_merit,
        u.is_verified AS seller_verified
      FROM gigs g
      JOIN users u ON g.seller_id = u.user_id
      WHERE g.gig_id = $1`,
      [gigId]
    );
    console.log("bsck",gigRes);

    if (gigRes.rowCount === 0) {
      return NextResponse.json({ error: "Gig not found" }, { status: 404 });
    }

    const gig = gigRes.rows[0];

    return NextResponse.json({ gig }, { status: 200 });
  } catch (error) {
    console.error("Error fetching gig:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

