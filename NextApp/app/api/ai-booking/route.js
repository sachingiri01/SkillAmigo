

// app/api/bookings/route.js
import pool from '../db';
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from '../auth/[...nextauth]/route';

export async function POST(req) {
  try {
    const { gigId, scheduledDate, coin,user_id } = await req.json();
    const dateToUse = scheduledDate || new Date().toISOString();
    console.log("got hit : ",user_id);
    // Validate input
    if (!gigId || !coin || !user_id) {
      return NextResponse.json({ message: "gigId ,coin and user_id are required" }, { status: 400 });
    }

    // Check user balance
    const userBalanceRes = await pool.query(
      `SELECT balance FROM users WHERE user_id = $1`,
      [user_id]
    );
    if (userBalanceRes.rows[0].balance < coin) {
      return NextResponse.json({ message: "Insufficient balance" }, { status: 400 });
    }

    // Prevent duplicate active booking
    const duplicateBooking = await pool.query(
      `SELECT booking_id FROM bookings 
       WHERE buyer_id = $1 AND gig_id = $2 AND status IN ('pending','confirmed')`,
      [user_id, gigId]
    );
    if (duplicateBooking.rowCount > 0) {
      return NextResponse.json(
        { message: "You already have an active booking for this gig" },
        { status: 400 }
      );
    }

    // Fetch seller_id
    const gigRes = await pool.query(
      `SELECT seller_id FROM gigs WHERE gig_id = $1`,
      [gigId]
    );
    if (gigRes.rowCount === 0) {
      return NextResponse.json({ message: "Gig not found" }, { status: 404 });
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const sellerId = gigRes.rows[0].seller_id;

    // Insert booking
    await pool.query(
      `INSERT INTO bookings (buyer_id, gig_id, seller_id, scheduled_date, coins_paid, status)
       VALUES ($1, $2, $3, $4, $5, 'pending')`,
      [user_id, gigId, sellerId, dateToUse, coin]
    );

    return NextResponse.json(
      { success: true, message: "Booking created" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Booking creation error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
// hhh

