import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import pool from '../../../db'; // Your Neon DB helper

export async function PUT(req, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const userId = session.user.id;
  const gigId = params.id;
  const body = await req.json();

  const {
    title,
    description,
    category,
    min_price,
    avg_price,
    location,
    contact_info,
    availability,
    picture,
  } = body;

  try {
    const client = await pool.connect();

    // 1. Verify ownership
    const gigRes = await client.query(
      `SELECT 1 FROM gigs WHERE gig_id = $1 AND seller_id = $2`,
      [gigId, userId]
    );
    if (gigRes.rowCount === 0) {
      client.release();
      return NextResponse.json({ error: 'Gig not found or unauthorized' }, { status: 404 });
    }

    // 2. Check for incomplete bookings
    const bookingRes = await client.query(
      `SELECT COUNT(*) FROM bookings WHERE gig_id = $1 AND status != 'completed'`,
      [gigId]
    );
    const hasPendingBookings = parseInt(bookingRes.rows[0].count) > 0;
    if (hasPendingBookings) {
      client.release();
      return NextResponse.json({ error: 'Cannot edit gig with active/incomplete bookings' }, { status: 400 });
    }

    // 3. Update gig
    await client.query(
      `UPDATE gigs SET
        title = $1,
        description = $2,
        category = $3,
        min_price = $4,
        avg_price = $5,
        location = $6,
        contact_info = $7,
        availability = $8,
        picture = $9,
        updated_at = NOW()
       WHERE gig_id = $10 AND seller_id = $11`,
      [
        title,
        description,
        category,
        min_price,
        avg_price,
        location,
        contact_info,
        availability,
        picture,
        gigId,
        userId
      ]
    );

    client.release();
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(_, { params }) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const userId = session.user.id;
  const gigId = params.id;

  try {
    const client = await pool.connect();

    // 1. Verify ownership
    const gigRes = await client.query(
      `SELECT 1 FROM gigs WHERE gig_id = $1 AND seller_id = $2`,
      [gigId, userId]
    );
    if (gigRes.rowCount === 0) {
      client.release();
      return NextResponse.json({ error: 'Gig not found or unauthorized' }, { status: 404 });
    }

    // 2. Check for incomplete bookings
    const bookingRes = await client.query(
      `SELECT COUNT(*) FROM bookings WHERE gig_id = $1 AND status != 'completed'`,
      [gigId]
    );
    const hasPendingBookings = parseInt(bookingRes.rows[0].count) > 0;
    if (hasPendingBookings) {
      client.release();
      return NextResponse.json({ error: 'Cannot delete gig with active/incomplete bookings' }, { status: 400 });
    }

    // 3. Delete gig
    await client.query(
      `DELETE FROM gigs WHERE gig_id = $1 AND seller_id = $2`,
      [gigId, userId]
    );

    client.release();
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
