import { NextResponse } from "next/server";
import pool from "../db";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const buyerId = session.user.id;

    const result = await pool.query(
  `SELECT 
      b.booking_id, 
      b.status, 
      b.booking_date, 
      b.coins_paid,
      b.scheduled_date,
      g.gig_id, 
      g.title, 
      g.picture, 
      g.category, 
      g.min_price, 
      g.avg_price,
      s.name AS seller_name,
      s.email AS seller_email  -- or any other seller fields you want
    FROM bookings b
    JOIN gigs g ON b.gig_id = g.gig_id
    JOIN users s ON g.seller_id = s.user_id
    WHERE b.buyer_id = $1
    ORDER BY b.created_at DESC`,
  [buyerId]
);


    return NextResponse.json(result.rows, { status: 200 });
  } catch (error) {
    console.error("Error fetching user booked gigs:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
