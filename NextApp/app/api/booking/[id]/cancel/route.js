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
    let adminFee = 0;
    let sellerfee = 0;
    let cancelBy = userId === seller_id ? "seller" : "buyer";
    const admin_id = "42f1519e-c88f-4ed7-8675-51b6f5d94d5b"

    if (cancelBy === "buyer" && status === "confirmed") {

      adminFee = coins_paid * 0.02;   // 2% to admin
      sellerfee = coins_paid * 0.08;
      refundAmount = coins_paid - (adminFee + sellerfee)


      // Transfer penalty to seller
      await pool.query(
        `UPDATE users SET balance = balance + $1 WHERE user_id = $2`,
        [sellerfee, seller_id]
      );

      await pool.query(
        `INSERT INTO transactions (user_id, seller_id, type, amount)
         VALUES ($1, $2, 'earning', $3)`,
        [buyer_id, seller_id, sellerfee]
      );
      await pool.query(
        `UPDATE users SET balance = balance + $1 WHERE user_id = $2`,
        [adminFee, admin_id]
      );
      await pool.query(
        `INSERT INTO transactions (user_id, seller_id, type, amount)
     VALUES ($1, $2, 'commission', $3)`,
        [buyer_id, admin_id, adminFee]
      );
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
    }


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
