import pool from "../../../db";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/route";

export async function GET(req, { params }) {
  const { id: gigId } = params;

  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const sellerId = session.user.id;

    // Verify gig ownership
    const gigRes = await pool.query(
      `SELECT seller_id FROM gigs WHERE gig_id = $1`,
      [gigId]
    );

    if (gigRes.rowCount === 0 || gigRes.rows[0].seller_id !== sellerId) {
      return NextResponse.json({ error: "Gig not found or unauthorized" }, { status: 404 });
    }

    // Fetch buyers who booked this gig
    const buyersRes = await pool.query(
      `SELECT DISTINCT u.user_id, u.name, u.profile_picture
       FROM bookings b
       JOIN users u ON b.buyer_id = u.user_id
       WHERE b.gig_id = $1
         AND b.status IN ('confirmed', 'completed', 'pending')`, // You can adjust statuses as needed
      [gigId]
    );

    return NextResponse.json(buyersRes.rows);
  } catch (error) {
    console.error("Error fetching buyers:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
