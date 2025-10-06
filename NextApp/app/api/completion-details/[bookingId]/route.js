// app/api/completion-details/[bookingId]/route.js
import pool from '../../db';
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from '../../auth/[...nextauth]/route';

export async function GET(req, { params }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

const userId = session.user.id;

  const { bookingId } = params;

  try {
    const booking = await pool.query(
      'SELECT * FROM bookings WHERE booking_id = $1 AND (buyer_id = $2 OR seller_id = $2)',
      [bookingId, userId]
    );

    if (!booking.rows[0]) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const completion = await pool.query(
      'SELECT * FROM completion_details WHERE booking_id = $1',
      [bookingId]
    );

    if (!completion.rows[0]) {
      return NextResponse.json({ error: 'Completion details not found' }, { status: 404 });
    }

    return NextResponse.json(completion.rows[0]);
  } catch (error) {
    console.error('Error fetching completion details:', error);
    return NextResponse.json({ error: 'Failed to fetch completion details' }, { status: 500 });
  }
}
