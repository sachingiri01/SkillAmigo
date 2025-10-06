// app/api/completion-details/route.js
import pool from '../db';
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from '../auth/[...nextauth]/route';

export async function POST(req) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const seller_id = session.user.id;
  const body = await req.json();
  const { booking_id, work_description, work_images, completion_notes } = body;

  try {
    // Validate booking ownership and status: only 'confirmed' allowed
    const bookingQuery = await pool.query(
      'SELECT * FROM bookings WHERE booking_id = $1 AND seller_id = $2 AND status = $3',
      [booking_id, seller_id, 'confirmed']
    );

    if (!bookingQuery.rows[0]) {
      return NextResponse.json({
        error: 'Cannot submit completion. Booking is either not confirmed or not owned by you.'
      }, { status: 403 });
    }

    // Insert or update completion details
    const result = await pool.query(
      `INSERT INTO completion_details 
        (booking_id, seller_id, work_description, work_images, completion_notes)
       VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT (booking_id) DO UPDATE
       SET work_description = $3, work_images = $4, completion_notes = $5
       RETURNING *`,
      [booking_id, seller_id, work_description, work_images, completion_notes]
    );

    return NextResponse.json(result.rows[0]);
  } catch (error) {
    console.error('Error submitting completion details:', error);
    return NextResponse.json({ error: 'Failed to submit completion details' }, { status: 500 });
  }
}
