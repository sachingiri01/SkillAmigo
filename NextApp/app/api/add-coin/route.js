import pool from '../db';
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from '../auth/[...nextauth]/route';

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }
   
    
    const { amount } = await req.json();

    // ✅ Basic validation
    if (!amount || isNaN(amount) || amount <= 0) {
      return NextResponse.json({ success: false, message: "Invalid amount" });
    }

    const { id: user_id, role } = session.user;

    // ✅ If Admin, skip coin requests
    if (role === "admin") {
      return NextResponse.json({
        success: true,
        message: "Admin does not require coin requests",
      });
    }

    // ✅ Insert coin request
    const query = `
      INSERT INTO coin_requests (user_id, amount, status)
      VALUES ($1, $2, 'pending')
      RETURNING request_id, amount, status, created_at
    `;
    const values = [user_id, amount];
    const { rows } = await pool.query(query, values);

    return NextResponse.json({
      success: true,
      message: "Coin request submitted successfully",
      request: rows[0],
    });
  } catch (err) {
    console.error("Error in add-coin:", err);
    return NextResponse.json(
      { success: false, message: "Failed to submit coin request" },
      { status: 500 }
    );
  }
}
