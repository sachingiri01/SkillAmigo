import pool from '../db';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const buyerId = session.user.id;

    const { gigId, scheduledDate ,coin} = await req.json();
    // console.log("what is req",gigId);
    // return NextResponse.json({ success: true, message: 'Booking created' }, { status: 201 });
    const dateToUse = scheduledDate || new Date().toISOString();

    if (!gigId ) {
      return NextResponse.json({ message: 'gigId is required' }, { status: 400 });
    }
    if (!dateToUse) {
      return NextResponse.json({ message: 'scheduledDate is required' }, { status: 400 });
    }

    // Fetch seller_id from gigs table
    const gigResult = await pool.query('SELECT seller_id FROM gigs WHERE gig_id = $1', [gigId]);
    if (gigResult.rowCount === 0) {
      return NextResponse.json({ error: 'Gig not found' }, { status: 404 });
    }
    const sellerId = gigResult.rows[0].seller_id;

    // Insert booking
    await pool.query(
      `INSERT INTO bookings (buyer_id, gig_id, seller_id,scheduled_date,coins_paid, status) VALUES ($1, $2, $3, $4, $5, 'pending')`,
      [buyerId, gigId, sellerId,dateToUse,coin ]
    );

    return NextResponse.json({ success: true, message: 'Booking created' }, { status: 201 });
  } catch (error) {
    console.error('Booking error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
