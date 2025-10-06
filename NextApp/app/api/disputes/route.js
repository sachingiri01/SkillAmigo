// app/api/disputes/route.js

import pool from '../db';
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from '../auth/[...nextauth]/route';

export async function POST(req) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

 const raised_by = session.user.id;
  const { booking_id, reason } = await req.json();

  if (!booking_id || !reason) {
    return NextResponse.json({ error: 'Missing booking_id or reason' }, { status: 400 });
  }

  try {
    // 1. Check if user is buyer or seller of the booking
    const bookingRes = await pool.query(
      'SELECT * FROM bookings WHERE booking_id = $1 AND (buyer_id = $2 OR seller_id = $2)',
      [booking_id, raised_by]
    );

    if (!bookingRes.rows[0]) {
      return NextResponse.json({ error: 'Unauthorized to dispute this booking' }, { status: 403 });
    }

    // 2. Insert into disputes table
    const disputeRes = await pool.query(
      `INSERT INTO disputes (booking_id, raised_by, reason)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [booking_id, raised_by, reason]
    );

    // 3. Update booking status to 'disputed'
    await pool.query(
      'UPDATE bookings SET status = $1 WHERE booking_id = $2',
      ['disputed', booking_id]
    );

    return NextResponse.json(disputeRes.rows[0]);
  } catch (error) {
    console.error('Error submitting dispute:', error);
    return NextResponse.json({ error: 'Failed to submit dispute' }, { status: 500 });
  }
}
