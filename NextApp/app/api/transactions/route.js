// app/api/transactions/route.js
import pool from "../db";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
    import { authOptions } from '../auth/[...nextauth]/route';
// GET /api/transactions
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
    const query = `
      SELECT 
        t.transaction_id AS id,
        u.name AS user,
        s.name AS seller,
        t.amount,
        t.type,
        t.created_at::DATE AS date
      FROM transactions t
      LEFT JOIN users u ON t.user_id = u.user_id
      LEFT JOIN users s ON t.seller_id = s.user_id
      ORDER BY t.created_at DESC
      LIMIT 20;
    `;
    const result = await pool.query(query);
    return NextResponse.json({ success: true, transactions: result.rows });
  } catch (err) {
    console.error("Error fetching transactions:", err);
    return NextResponse.json({ success: false, error: "Failed to fetch transactions" }, { status: 500 });
  }
}
