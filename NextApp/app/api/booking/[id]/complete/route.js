// app/api/bookings/[id]/complete/route.js
import pool from "../../../db";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/route";

export async function PATCH(req, context) {
     const params  = await context.params;  // await the context to get params
     const bookingId = params.id;

  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const sellerId = session.user.id;
    
    // Fetch booking details
    const bookingRes = await pool.query(
      `SELECT buyer_id, seller_id, coins_paid, status 
       FROM bookings WHERE booking_id = $1`,
      [bookingId]
    );

    if (bookingRes.rowCount === 0) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    const { buyer_id, seller_id, coins_paid, status } = bookingRes.rows[0];
    console.log("Session user ID:", sellerId);
    console.log("Booking seller ID:", seller_id);

    if (buyer_id!== sellerId) {
      return NextResponse.json({ error: "Unauthorized to complete booking" }, { status: 403 });
    }

    if (status !== "confirmed") {
      return NextResponse.json({ error: "Booking is not in confirmed state" }, { status: 400 });
    }

    // Calculate admin fee (2%)
    const adminFee = coins_paid * 0.02;
    const sellerAmount = coins_paid - adminFee;

    // Transfer funds to seller
    await pool.query(
      `UPDATE users SET balance = balance + $1 WHERE user_id = $2`,
      [sellerAmount, seller_id]
    );

    // Log seller credit transaction
    await pool.query(
      `INSERT INTO transactions (user_id, seller_id, type, amount)
       VALUES ($1, $2, 'purchase', $3)`,
      [buyer_id, seller_id, sellerAmount]
    );

    // Optionally, log admin commission
    await pool.query(
      `INSERT INTO transactions (user_id, seller_id, type, amount)
       VALUES ($1, NULL, 'purchase', $2)`,
      ['42f1519e-c88f-4ed7-8675-51b6f5d94d5b', adminFee] // Use a real admin user_id in production
    );

    // Update booking status
    await pool.query(
      `UPDATE bookings SET status = 'completed', updated_at = NOW() WHERE booking_id = $1`,
      [bookingId]
    );

    return NextResponse.json(
      { success: true, message: "Booking completed and payment transferred" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Booking completion error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
