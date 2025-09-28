import pool from '../db';
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from '../auth/[...nextauth]/route';

export async function GET(req) {
  try {
    // Get session/user from cookie
     const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ success: false, message: "Not authenticated" }, { status: 401 });
    }

    // If admin, return empty or all (optional)
    // if (session.user.role === "admin") {
    //   return NextResponse.json({ success: true, requests: [] });
    // }

    const userId = session.user.id;

    // Fetch coin requests for this user
    const query = `
      SELECT request_id, amount, status, created_at
      FROM coin_requests
      WHERE user_id = $1
      ORDER BY created_at DESC
    `;
    const { rows } = await pool.query(query, [userId]);

    return NextResponse.json({ success: true, requests: rows });
  } catch (err) {
    console.error("Error in get-coin-status:", err);
    return NextResponse.json(
      { success: false, message: "Failed to fetch coin status" },
      { status: 500 }
    );
  }
}
