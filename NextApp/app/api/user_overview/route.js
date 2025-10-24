

import { NextResponse } from "next/server";
import pool from "../db";
import { getServerSession } from "next-auth";
import { authOptions } from '../auth/[...nextauth]/route';

export async function GET() {
  try {
    // Get session user
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ msg: "Not authenticated" }, { status: 401 });
    }
    const userId = session.user.id;

    // --------------------
    // User Info (credits + balance)
    // --------------------
    const userRes = await pool.query(
      `SELECT user_id, name, merit_credits, balance
        FROM users WHERE user_id = $1`,
      [userId]
    );
    if (userRes.rows.length === 0) {
      return NextResponse.json({ msg: "User not found" }, { status: 404 });
    }
    const user = userRes.rows[0];

    // --------------------
    // Total Spent (buyer purchases)
    // --------------------
    const spentRes = await pool.query(`
  SELECT COALESCE(SUM(t.amount), 0) AS spent
  FROM transactions t
  WHERE t.user_id = $1
    AND t.type = 'purchase'
    AND EXISTS (
      SELECT 1
      FROM bookings b
      WHERE b.buyer_id = t.user_id
        AND b.seller_id = t.seller_id
        AND b.status = 'completed'
    );
`, [userId]);

const spent = parseFloat(spentRes.rows[0].spent);



    // --------------------
    // Total Gained (seller from  earnings)
    // --------------------
    const gainedRes = await pool.query(
      `SELECT COALESCE(SUM(amount),0) AS gained
      FROM transactions
      WHERE seller_id = $1 AND type = 'earning'`,
      [userId]
    );
    const gained = parseFloat(gainedRes.rows[0].gained);

    // --------------------
    // Leaderboard Rank (based on balance)
    // --------------------
    const rankRes = await pool.query(
      `SELECT rank FROM (
         SELECT user_id, RANK() OVER (ORDER BY balance DESC)
         FROM users
       ) r WHERE user_id = $1`,
      [userId]
    );
    const rank = rankRes.rows[0]?.rank || null;

    // --------------------
    // Monthly Transaction Data (Last 6 months)
    // --------------------
    // Monthly Transaction Data (Last 6 months)
    //     // --------------------
    const monthlyRes = await pool.query(
      `SELECT 
         TO_CHAR(created_at, 'Mon') AS month,
         SUM(CASE WHEN user_id = $1 AND type = 'purchase' THEN amount ELSE 0 END) AS spent,
         SUM(CASE WHEN seller_id = $1 AND type = 'purchase' THEN amount ELSE 0 END) AS gained
       FROM transactions
       WHERE (user_id = $1 OR seller_id = $1)
         AND created_at >= NOW() - INTERVAL '6 months'
       GROUP BY TO_CHAR(created_at, 'Mon'), DATE_TRUNC('month', created_at)
       ORDER BY DATE_TRUNC('month', created_at) ASC
       LIMIT 6`,
      [userId]
    );

    const monthlyData = monthlyRes.rows.map(row => ({
      month: row.month,
      spent: parseFloat(row.spent),
      gained: parseFloat(row.gained)
    }));

    // If no data, provide dummy structure
    if (monthlyData.length === 0) {
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
      monthlyData.push(...months.map(month => ({ month, spent: 0, gained: 0 })));
    }
    const bookingStatsRes = await pool.query(
      `SELECT 
         status,
         COUNT(*) as count
       FROM bookings
       WHERE buyer_id = $1 OR seller_id = $1
       GROUP BY status`,
      [userId]
    );

    const bookingStats = {
      pending: 0,
      confirmed: 0,
      completed: 0,
      cancelled: 0
    };

    bookingStatsRes.rows.forEach(row => {
      if (row.status in bookingStats) {
        bookingStats[row.status] = parseInt(row.count);
      }
    });

    // --------------------
    // Category-wise Spending (Top 5)
    // --------------------
    const categoryRes = await pool.query(
      `SELECT 
         g.category,
         COUNT(DISTINCT b.booking_id) as count,
         COALESCE(SUM(b.coins_paid), 0) as amount
       FROM bookings b
       JOIN gigs g ON b.gig_id = g.gig_id
       WHERE b.buyer_id = $1
       GROUP BY g.category
       ORDER BY amount DESC
       LIMIT 5`,
      [userId]
    );

    const categoryBreakdown = categoryRes.rows.map(row => ({
      category: row.category || 'Uncategorized',
      count: parseInt(row.count),
      amount: parseFloat(row.amount)
    }));

    // --------------------
    // Merit Credits History (Last 6 months)
    // --------------------
    const meritTrendRes = await pool.query(
      `WITH months AS (
         SELECT 
           TO_CHAR(DATE_TRUNC('month', NOW() - interval '1 month' * generate_series(5, 0)), 'Mon') AS month,
           DATE_TRUNC('month', NOW() - interval '1 month' * generate_series(5, 0)) AS month_date
       ),
       running_total AS (
         SELECT 
           DATE_TRUNC('month', mh.created_at) as month_date,
           SUM(SUM(mh.change)) OVER (ORDER BY DATE_TRUNC('month', mh.created_at)) as credits
         FROM merit_history mh
         WHERE mh.user_id = $1
         GROUP BY DATE_TRUNC('month', mh.created_at)
       )
       SELECT 
         m.month,
         COALESCE(MAX(rt.credits), 
           COALESCE(
             (SELECT SUM(change) FROM merit_history WHERE user_id = $1 AND created_at < m.month_date),
             0
           )
         ) as credits
       FROM months m
       LEFT JOIN running_total rt ON rt.month_date = m.month_date
       GROUP BY m.month, m.month_date
       ORDER BY m.month_date ASC`,
      [userId]
    );

    const meritTrend = meritTrendRes.rows.map(row => ({
      month: row.month,
      credits: parseInt(row.credits)
    }));

    // If no merit history, use current credits
    if (meritTrend.every(m => m.credits === 0)) {
      const currentCredits = user.merit_credits;
      meritTrend.forEach((m, i) => {
        m.credits = Math.round(currentCredits * ((i + 1) / meritTrend.length));
      });
    }

    return NextResponse.json({
      user: {
        name: user.name,
        meritCredits: user.merit_credits,
        balance: parseFloat(user.balance),
      },
      stat: {
        spent,
        gained,
        rank,
      },
      monthlyData,
      bookingStats,
      categoryBreakdown,
      meritTrend
    });

  } catch (error) {
    console.error("Error fetching user overview:", error);
    return NextResponse.json({ error: "Failed to fetch user overview" }, { status: 500 });
  }
}