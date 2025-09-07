// app/api/transactions/route.js
import pool from "../db";
import { NextResponse } from "next/server";

// GET /api/transactions
export async function GET() {
  try {
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
