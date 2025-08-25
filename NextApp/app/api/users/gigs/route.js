import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

import pool from "../../db";

export async function GET(req) {
  

  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user_id = session.user.id;
    const result = await pool.query(
  `
  SELECT 
      g.gig_id, g.title, g.description, g.category, g.min_price, g.avg_price,
      g.location, g.picture, g.rating, g.created_at AS gig_created_at,
      s.user_id AS seller_id, s.name AS seller_name, s.email AS seller_email,
      s.profile_picture AS seller_picture,
      b.booking_id, b.status AS booking_status, b.booking_date, b.scheduled_date, b.coins_paid,
      u.user_id AS buyer_id, u.name AS buyer_name, u.email AS buyer_email, u.profile_picture AS buyer_picture,
      (
        SELECT COUNT(DISTINCT b2.buyer_id)
        FROM bookings b2
        WHERE b2.gig_id = g.gig_id
      ) AS buyer_count
  FROM gigs g
  JOIN users s ON g.seller_id = s.user_id
  LEFT JOIN bookings b ON g.gig_id = b.gig_id
  LEFT JOIN users u ON b.buyer_id = u.user_id
  WHERE g.seller_id = $1
  ORDER BY g.created_at DESC;
  `,
  [user_id]
);


    return NextResponse.json(result.rows);
  } catch (err) {
    console.error("Error fetching user gigs:", err);
    return NextResponse.json(
      { error: "Failed to fetch user gigs" },
      { status: 500 }
    );
  }
}
