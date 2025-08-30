import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route"; // adjust path
import pool from "../db";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const sellerId = session.user.id;

    // PostgreSQL with `pg` should use $1, $2...
    const result = await pool.query(
      `
      SELECT 
        b.booking_id,
        b.status,
        b.booking_date,
        b.scheduled_date,
        b.coins_paid,
        g.title,
        g.category,
        u.name AS client
      FROM bookings b
      INNER JOIN gigs g ON b.gig_id = g.gig_id
      INNER JOIN users u ON b.buyer_id = u.user_id
      WHERE b.seller_id = $1
      ORDER BY b.booking_date DESC
      `,
      [sellerId]
    );

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return NextResponse.json({ error: "Failed to fetch bookings" }, { status: 500 });
  }
}
