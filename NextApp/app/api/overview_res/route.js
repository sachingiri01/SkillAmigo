
import { NextResponse } from "next/server";
import pool from "../db";
import { getServerSession } from "next-auth";
import { authOptions } from '../auth/[...nextauth]/route';

export async function GET() {
  try {
    // Get session info
        const session = await getServerSession(authOptions);
        if (!session) {
          return NextResponse.json({ msg: "Not authenticated" }, { status: 401 });
        }
    
        // Only admin can access
        if (session.user.role !== "admin") {
          return NextResponse.json({ msg: "Unauthorized" }, { status: 403 });
        }

 const topEarnersResult = await pool.query(`
      SELECT name AS username, balance AS coins
      FROM users
      ORDER BY balance DESC
      LIMIT 3
    `);

    // 3 Most recent users
    const recentUsersResult = await pool.query(`
      SELECT name AS username, created_at
      FROM users
      ORDER BY created_at DESC
      LIMIT 3
    `);
    
    return NextResponse.json({
   
      topEarners: topEarnersResult.rows||[],
      recentUsers: recentUsersResult.rows||[],
    });
  } catch (error) {
    console.error("Error fetching overview metrics:", error);
    return NextResponse.json({ error: "Failed to fetch overview metrics" }, { status: 500 });
  }
}
