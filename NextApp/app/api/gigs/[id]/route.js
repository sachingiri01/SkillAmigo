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
