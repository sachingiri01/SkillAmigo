import pool from '../db';
import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

export async function GET(req) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const url = new URL(req.url);
  const gigId = url.searchParams.get('gigId');

  if (!gigId) {
    return NextResponse.json({ error: 'Missing gigId' }, { status: 400 });
  }

  try {
    const queryText = `
      SELECT COUNT(*) 
      FROM bookings 
      WHERE buyer_id = $1 AND gig_id = $2 
        AND status IN ('confirmed', 'pending')
      LIMIT 1
    `;

    const { rows } = await pool.query(queryText, [session.user.id, gigId]);

    if (rows.length === 0 || rows[0].count === '0') {
      return NextResponse.json({ booked: false, status: null });
    }

    return NextResponse.json({ booked: true, status: rows[0].count });
  } catch (error) {
    console.error('DB error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
