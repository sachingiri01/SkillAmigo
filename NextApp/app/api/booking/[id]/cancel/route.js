// app/api/bookings/[id]/cancel/route.js
import pool from "../../../db";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../auth/[...nextauth]/route";

export async function PATCH(req, context) {
  const params = await context.params; // await here
  const bookingId = params.id;

  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;

    // Fetch booking
    const bookingRes = await pool.query(
      `SELECT buyer_id, seller_id, coins_paid, status 
       FROM bookings WHERE booking_id = $1`,
      [bookingId]
    );

    if (bookingRes.rowCount === 0) {
      return NextResponse.json({ error: "Booking not found" }, { status: 404 });
    }

    const { buyer_id, seller_id, coins_paid, status } = bookingRes.rows[0];

    if (status === "completed" || status === "cancelled") {
      return NextResponse.json(
        { error: "Cannot cancel completed or already cancelled booking" },
        { status: 400 }
      );
    }

    let refundAmount = coins_paid;
    let penaltyAmount = 0;
    let cancelBy = userId === seller_id ? "seller" : "buyer";

    if (cancelBy === "buyer" && status === "confirmed") {
      penaltyAmount = coins_paid * 0.1; // 10% penalty
      refundAmount = coins_paid - penaltyAmount;

      // Transfer penalty to seller
      await pool.query(
        `UPDATE users SET balance = balance + $1 WHERE user_id = $2`,
        [penaltyAmount, seller_id]
      );

      await pool.query(
        `INSERT INTO transactions (user_id, seller_id, type, amount)
         VALUES ($1, $2, 'refund', $3)`,
        [buyer_id, seller_id, penaltyAmount]
      );
    }

    // Refund buyer
    await pool.query(
      `UPDATE users SET balance = balance + $1 WHERE user_id = $2`,
      [refundAmount, buyer_id]
    );

    await pool.query(
      `INSERT INTO transactions (user_id, seller_id, type, amount)
       VALUES ($1, $2, 'refund', $3)`,
      [seller_id, buyer_id, refundAmount]
    );

    // Update booking status
    await pool.query(
      `UPDATE bookings SET status = 'cancelled', updated_at = NOW()
       WHERE booking_id = $1`,
      [bookingId]
    );

    return NextResponse.json(
      { success: true, message: "Booking cancelled successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Booking cancellation error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
