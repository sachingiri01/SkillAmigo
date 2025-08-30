// app/api/bookings/[id]/confirm/route.js
import pool from "../../../db";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/route";

export async function PATCH(req, context) {
  const params  = await context.params;
   const bookingId = params.id;

  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const sellerId = session.user.id;

    // Fetch booking
    const bookingRes = await pool.query(
      `SELECT buyer_id, coins_paid, status 
       FROM bookings 
       WHERE booking_id = $1 AND seller_id = $2`,
      [bookingId, sellerId]
    );

    if (bookingRes.rowCount === 0) {
      return NextResponse.json(
        { error: "Booking not found or unauthorized" },
        { status: 404 }
      );
    }

    const { buyer_id, coins_paid, status } = bookingRes.rows[0];

    if (status !== "pending") {
      return NextResponse.json(
        { error: "Booking cannot be confirmed" },
        { status: 400 }
      );
    }

    // Deduct coins from buyer
    const updateRes = await pool.query(
      `UPDATE users 
       SET balance = balance - $1
       WHERE user_id = $2 AND balance >= $1
       RETURNING balance`,
      [coins_paid, buyer_id]
    );

    if (updateRes.rowCount === 0) {
      return NextResponse.json(
        { error: "Insufficient balance for buyer" },
        { status: 400 }
      );
    }

    // Update booking status
    await pool.query(
      `UPDATE bookings SET status = 'confirmed', updated_at = NOW()
       WHERE booking_id = $1`,
      [bookingId]
    );

    // Log transaction
    await pool.query(
      `INSERT INTO transactions (user_id, seller_id, type, amount)
       VALUES ($1, $2, 'purchase', $3)`,
      [buyer_id, sellerId, coins_paid]
    );

    return NextResponse.json(
      { success: true, message: "Booking confirmed and amount held" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Booking confirmation error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
