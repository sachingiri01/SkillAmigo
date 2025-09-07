// app/api/transactions/overview/route.js
import pool from "../../db";
import { NextResponse } from "next/server";

// GET /api/transactions/overview
export async function GET() {
  try {
    const totalTx = await pool.query(`SELECT COUNT(*)::INT AS total FROM transactions;`);

    const coinsPurchased = await pool.query(`
      SELECT COALESCE(SUM(amount),0)::NUMERIC AS purchased
      FROM transactions
      WHERE type = 'purchase';
    `);

    const coinsWithdrawn = await pool.query(`
      SELECT COALESCE(SUM(amount),0)::NUMERIC AS withdrawn
      FROM transactions
      WHERE type = 'withdrawal';
    `);

    return NextResponse.json({
      success: true,
      overview: {
        total_transactions: totalTx.rows[0].total,
        coins_purchased: coinsPurchased.rows[0].purchased,
        coins_withdrawn: coinsWithdrawn.rows[0].withdrawn,
      },
    });
  } catch (err) {
    console.error("Error fetching overview:", err);
    return NextResponse.json({ success: false, error: "Failed to fetch overview" }, { status: 500 });
  }
}
