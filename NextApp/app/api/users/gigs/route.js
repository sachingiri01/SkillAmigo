//this api fecth users gig only//

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
        g.gig_id,
        g.title,
        g.description,
        g.category,
        g.min_price,
        g.avg_price,
        g.location,
        g.contact_info,
        g.availability,
        g.rating,
        g.picture,
        g.created_at,
        g.updated_at,
        COALESCE(b_stats.buyer_count, 0) AS buyer_count
      FROM gigs g
      LEFT JOIN (
        SELECT 
          gig_id,
          COUNT(DISTINCT buyer_id) AS buyer_count
        FROM bookings
        GROUP BY gig_id
      ) b_stats ON g.gig_id = b_stats.gig_id
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
