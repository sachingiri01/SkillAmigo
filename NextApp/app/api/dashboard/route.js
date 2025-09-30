import pool from '../db';
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from '../auth/[...nextauth]/route';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    const client = await pool.connect();

    // 1️⃣ USER BASIC DETAILS + OVERALL STATS
    const userStatsQuery = `
      SELECT 
        (SELECT COUNT(*) FROM gigs WHERE seller_id = $1) AS total_gigs_created,
        (SELECT COUNT(*) FROM bookings WHERE buyer_id = $1) AS total_bookings_made,
        (SELECT COUNT(*) FROM bookings WHERE seller_id = $1) AS total_bookings_received,
        (SELECT COALESCE(SUM(amount), 0) FROM transactions WHERE user_id = $1 AND type = 'purchase') AS total_spent,
        (SELECT COALESCE(SUM(amount), 0) FROM transactions WHERE seller_id = $1 AND type IN ('earning','commission')) AS total_earned,
        (SELECT COALESCE(SUM(amount), 0) FROM transactions WHERE user_id = $1 AND type = 'withdrawal') AS total_withdrawn,
        (SELECT balance FROM users WHERE user_id = $1) AS current_balance,
        (SELECT merit_credits FROM users WHERE user_id = $1) AS merit_credits,
        (SELECT COUNT(*) FROM reviews WHERE user_id = $1) AS total_reviews_given,
        (SELECT COUNT(*) FROM reviews r JOIN gigs g ON r.gig_id = g.gig_id WHERE g.seller_id = $1) AS total_reviews_received,
        (SELECT COALESCE(AVG(r.rating), 0)::DECIMAL(3,2) FROM reviews r JOIN gigs g ON r.gig_id = g.gig_id WHERE g.seller_id = $1) AS avg_rating_received,
        (SELECT COUNT(*) FROM collaborations WHERE collaborator_id = $1 AND status = 'active') AS active_collaborations,
        (SELECT COUNT(*) FROM disputes WHERE raised_by = $1) AS total_disputes_raised,
        (SELECT COUNT(*) FROM disputes d JOIN bookings b ON d.booking_id = b.booking_id WHERE b.seller_id = $1 AND d.raised_by != $1) AS total_disputes_received,
        (SELECT EXTRACT(DAY FROM NOW() - created_at)::INT FROM users WHERE user_id = $1) AS account_age_days
    `;
    const userStatsRes = await client.query(userStatsQuery, [userId]);
    const userStats = userStatsRes.rows[0];

    // 2️⃣ MONTHLY TRANSACTION TRENDS (Last 12 Months)
    const monthlyTrendsQuery = `
      WITH months AS (
        SELECT date_trunc('month', d)::DATE AS month
        FROM generate_series(
          date_trunc('month', NOW() - INTERVAL '11 months'),
          date_trunc('month', NOW()),
          '1 month'::interval
        ) d
      )
      SELECT 
        m.month,
        COALESCE(SUM(CASE WHEN t.seller_id = $1 AND t.type IN ('earning','commission') THEN t.amount ELSE 0 END),0) AS earned,
        COALESCE(SUM(CASE WHEN t.user_id = $1 AND t.type = 'purchase' THEN t.amount ELSE 0 END),0) AS spent,
        COALESCE(SUM(CASE 
          WHEN t.seller_id = $1 AND t.type IN ('earning','commission') THEN t.amount 
          WHEN t.user_id = $1 AND t.type = 'purchase' THEN -t.amount ELSE 0 END),0) AS net_change
      FROM months m
      LEFT JOIN transactions t ON date_trunc('month', t.created_at) = m.month
      GROUP BY m.month
      ORDER BY m.month;
    `;
    const monthlyTrendsRes = await client.query(monthlyTrendsQuery, [userId]);

    // 3️⃣ BOOKING DISTRIBUTION
    const bookingDistQuery = `
      SELECT 
        s.status,
        COUNT(CASE WHEN b.buyer_id = $1 THEN 1 END) AS count_as_buyer,
        COUNT(CASE WHEN b.seller_id = $1 THEN 1 END) AS count_as_seller
      FROM (VALUES ('pending'), ('confirmed'), ('completed'), ('cancelled'), ('disputed')) AS s(status)
      LEFT JOIN bookings b ON b.status = s.status 
        AND (b.buyer_id = $1 OR b.seller_id = $1)
      GROUP BY s.status
      ORDER BY s.status;
    `;
    const bookingDistRes = await client.query(bookingDistQuery, [userId]);

    // 4️⃣ MERIT CREDITS HISTORY (Last 30 Days)
    const meritTrendQuery = `
      WITH daily_changes AS (
        SELECT DATE(mh.created_at) AS change_date, SUM(mh.change) AS daily_change
        FROM merit_history mh
        WHERE mh.user_id = $1 AND mh.created_at >= NOW() - INTERVAL '30 days'
        GROUP BY DATE(mh.created_at)
      ),
      date_series AS (
        SELECT generate_series(
          (NOW() - INTERVAL '30 days')::DATE,
          NOW()::DATE,
          '1 day'::interval
        )::DATE AS date
      )
      SELECT 
        ds.date,
        COALESCE(dc.daily_change, 0)::INT AS daily_change,
        (SELECT COALESCE(SUM(mh2.change), 0)::INT 
         FROM merit_history mh2 WHERE mh2.user_id = $1 AND DATE(mh2.created_at) <= ds.date) AS cumulative_credits
      FROM date_series ds
      LEFT JOIN daily_changes dc ON ds.date = dc.change_date
      ORDER BY ds.date;
    `;
    const meritTrendRes = await client.query(meritTrendQuery, [userId]);

    // 5️⃣ TOP GIGS (Limit 5)
    const topGigsQuery = `
      SELECT 
        g.gig_id,
        g.title,
        COUNT(DISTINCT b.booking_id) AS total_bookings,
        COALESCE(SUM(b.coins_paid), 0) AS total_revenue,
        COALESCE(AVG(r.rating), 0)::DECIMAL(3,2) AS avg_rating,
        COUNT(DISTINCT r.review_id) AS review_count
      FROM gigs g
      LEFT JOIN bookings b ON g.gig_id = b.gig_id AND b.status = 'completed'
      LEFT JOIN reviews r ON g.gig_id = r.gig_id
      WHERE g.seller_id = $1
      GROUP BY g.gig_id, g.title
      ORDER BY total_revenue DESC, total_bookings DESC
      LIMIT 5;
    `;
    const topGigsRes = await client.query(topGigsQuery, [userId]);

    // 6️⃣ RECENT ACTIVITY FEED (Limit 10)
    const recentActivityQuery = `
      (
        SELECT 'booking_made' AS activity_type, b.created_at AS activity_date,
               'Booked: ' || g.title AS description, b.coins_paid AS amount
        FROM bookings b JOIN gigs g ON b.gig_id = g.gig_id
        WHERE b.buyer_id = $1
      )
      UNION ALL
      (
        SELECT 'booking_received', b.created_at,
               'Received booking for: ' || g.title, b.coins_paid
        FROM bookings b JOIN gigs g ON b.gig_id = g.gig_id
        WHERE b.seller_id = $1
      )
      UNION ALL
      (
        SELECT 'transaction', t.created_at, 'Transaction: ' || t.type, t.amount
        FROM transactions t WHERE t.user_id = $1 OR t.seller_id = $1
      )
      UNION ALL
      (
        SELECT 'review_received', r.created_at,
               'Received ' || r.rating::TEXT || ' star review', NULL
        FROM reviews r JOIN gigs g ON r.gig_id = g.gig_id
        WHERE g.seller_id = $1
      )
      ORDER BY activity_date DESC LIMIT 10;
    `;
    const recentActivityRes = await client.query(recentActivityQuery, [userId]);

    client.release();

    // ✅ Combine All Results
    return NextResponse.json({
      success: true,
      user_id: userId,
      stats: userStats,
      monthly_trends: monthlyTrendsRes.rows,
      booking_distribution: bookingDistRes.rows,
      merit_history: meritTrendRes.rows,
      top_gigs: topGigsRes.rows,
      recent_activities: recentActivityRes.rows,
    });
  } catch (error) {
    console.error("❌ Error fetching user analytics:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
