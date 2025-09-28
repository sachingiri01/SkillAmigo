// // app/api/users/[id]/profile/route.js
// import pool from "../../db";
// import { NextResponse } from "next/server";
// import { getServerSession } from "next-auth";
// import { authOptions } from "../../auth/[...nextauth]/route";

// export async function GET(req, { params }) {
//   const { id } = params; // userId

//   try {
//     // ✅ Session check
//     const session = await getServerSession(authOptions);
//     if (!session) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

    

//     // Fetch user profile
//     const userRes = await pool.query(
//       `SELECT 
//         u.user_id,
//         u.name,
//         u.email,
//         u.phone,
//         u.profile_picture,
//         u.bio,
//         u.merit_credits,
//         u.is_verified,
//         u.role,
//         u.balance,
//         u.created_at,
//         u.updated_at
//       FROM users u
//       WHERE u.user_id = $1`,
//       [id]
//     );

//     if (userRes.rowCount === 0) {
//       return NextResponse.json({ error: "User not found" }, { status: 404 });
//     }

//     const user = userRes.rows[0];

//     // Fetch user gigs
//     const gigsRes = await pool.query(
//       `SELECT 
//         g.gig_id,
//         g.title,
//         g.description,
//         g.category,
//         g.min_price,
//         g.avg_price,
//         g.location,
//         g.rating,
//         g.picture,
//         g.created_at,
//         g.updated_at
//       FROM gigs g
//       WHERE g.seller_id = $1`,
//       [id]
//     );

//     // Fetch user bookings (as buyer or seller)
//     const bookingsRes = await pool.query(
//       `SELECT 
//         b.booking_id,
//         b.status,
//         b.booking_date,
//         b.scheduled_date,
//         b.coins_paid,
//         b.created_at,
//         b.updated_at,
//         -- Buyer info
//         buyer.user_id AS buyer_id,
//         buyer.name AS buyer_name,
//         buyer.profile_picture AS buyer_picture,
//         -- Seller info
//         seller.user_id AS seller_id,
//         seller.name AS seller_name,
//         seller.profile_picture AS seller_picture,
//         -- Gig info
//         g.gig_id,
//         g.title AS gig_title,
//         g.picture AS gig_picture
//       FROM bookings b
//       JOIN users buyer ON b.buyer_id = buyer.user_id
//       JOIN users seller ON b.seller_id = seller.user_id
//       JOIN gigs g ON b.gig_id = g.gig_id
//       WHERE b.buyer_id = $1 OR b.seller_id = $1
//       ORDER BY b.created_at DESC`,
//       [id]
//     );

//     return NextResponse.json(
//       {
//         user,
//         gigs: gigsRes.rows,
//         bookings: bookingsRes.rows,
//       },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error fetching user profile:", error);
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//   }
// }

// app/api/users/[id]/profile/route.js
import pool from "../../db";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function GET(req, { params }) {
  const { id } = params; // userId

  try {
    // ✅ Session check
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Fetch user profile
    const userRes = await pool.query(
      `SELECT 
        u.user_id,
        u.name,
        u.email,
        u.phone,
        u.profile_picture,
        u.bio,
        u.merit_credits,
        u.is_verified,
        u.role,
        u.balance,
        u.created_at,
        u.updated_at
      FROM users u
      WHERE u.user_id = $1`,
      [id]
    );

    if (userRes.rowCount === 0) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const user = userRes.rows[0];

    // Fetch user gigs
    const gigsRes = await pool.query(
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
        g.updated_at
      FROM gigs g
      WHERE g.seller_id = $1`,
      [id]
    );

    // Count active gigs (assuming all gigs are active, or add your own logic)
    const activeGigsCount = gigsRes.rows.length;

    // Fetch user bookings (as buyer or seller)
    const bookingsRes = await pool.query(
      `SELECT 
        b.booking_id,
        b.status,
        b.booking_date,
        b.scheduled_date,
        b.coins_paid,
        b.created_at,
        b.updated_at,
        -- Buyer info
        buyer.user_id AS buyer_id,
        buyer.name AS buyer_name,
        buyer.profile_picture AS buyer_picture,
        -- Seller info
        seller.user_id AS seller_id,
        seller.name AS seller_name,
        seller.profile_picture AS seller_picture,
        -- Gig info
        g.gig_id,
        g.title AS gig_title,
        g.picture AS gig_picture
      FROM bookings b
      JOIN users buyer ON b.buyer_id = buyer.user_id
      JOIN users seller ON b.seller_id = seller.user_id
      JOIN gigs g ON b.gig_id = g.gig_id
      WHERE b.buyer_id = $1 OR b.seller_id = $1
      ORDER BY b.created_at DESC`,
      [id]
    );

    // Calculate total bookings
    const totalBookings = bookingsRes.rows.length;

    // Calculate user rating (average of gig ratings)
    const avgRating = gigsRes.rows.length > 0 
      ? (gigsRes.rows.reduce((sum, gig) => sum + (gig.rating || 0), 0) / gigsRes.rows.length).toFixed(1)
      : 0;

    // Calculate member since year
    const memberSince = new Date(user.created_at).getFullYear().toString();

    // Enhanced user object with only needed fields
    const enhancedUser = {
      ...user,
      memberSince,
      // merits: usemerit_credits || 0,
      activeGigs: activeGigsCount,
      totalBookings,
      rating: parseFloat(avgRating) || 0
    };

    return NextResponse.json(
      {
        user: enhancedUser,
        gigs: gigsRes.rows,
        bookings: bookingsRes.rows,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}