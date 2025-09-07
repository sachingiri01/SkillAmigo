
import { NextResponse } from "next/server";
import pool from "../db";


export async function GET() {
  try {
    
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
