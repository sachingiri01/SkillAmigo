import { NextResponse } from "next/server";
import pool from "../db";
import { getServerSession } from "next-auth";
import { authOptions } from '../auth/[...nextauth]/route';

export async function GET() {
  try {
    // ✅ Get session user
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ msg: "Not authenticated" }, { status: 401 });
    }

    const userId = session.user.id; // assuming NextAuth sets `id` in token

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
    const spentRes = await pool.query(
      `SELECT COALESCE(SUM(amount),0) AS spent
       FROM transactions
       WHERE user_id = $1 AND type = 'purchase'`,
      [userId]
    );
    const spent = parseFloat(spentRes.rows[0].spent);

    // --------------------
    // Total Gained (seller from purchases)
    // --------------------
    const gainedRes = await pool.query(
      `SELECT COALESCE(SUM(amount),0) AS gained
       FROM transactions
       WHERE seller_id = $1 AND type = 'purchase'`,
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

    return NextResponse.json({
      user: {
        name: user.name,
        meritCredits: user.merit_credits,
        balance: user.balance,
      },
      stat: {
        spent,
        gained,
        rank,
      },
    });
  } catch (error) {
    console.error("Error fetching user overview:", error);
    return NextResponse.json({ error: "Failed to fetch user overview" }, { status: 500 });
  }
}
