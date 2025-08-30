// import pool from '../db';
// import { NextResponse } from 'next/server';
// import { getServerSession } from 'next-auth';
// import { authOptions } from '../auth/[...nextauth]/route';

// export async function POST(req) {
//   try {
//     const session = await getServerSession(authOptions);
//     if (!session) {
//       return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
//     }

//     const buyerId = session.user.id;

//     const { gigId, scheduledDate ,coin} = await req.json();
//     console.log("what is req",req);
//     const dateToUse = scheduledDate || new Date().toISOString();

//     if (!gigId ) {
//       return NextResponse.json({ error: 'gigId is required' }, { status: 400 });
//     }
//     if (!dateToUse) {
//       return NextResponse.json({ error: 'scheduledDate is required' }, { status: 400 });
//     }

//     // Fetch seller_id from gigs table
//     const gigResult = await pool.query('SELECT seller_id FROM gigs WHERE gig_id = $1', [gigId]);
//     if (gigResult.rowCount === 0) {
//       return NextResponse.json({ error: 'Gig not found' }, { status: 404 });
//     }
//     const sellerId = gigResult.rows[0].seller_id;

//     // Insert booking
//     await pool.query(
//       `INSERT INTO bookings (buyer_id, gig_id, seller_id,scheduled_date,coins_paid, status) VALUES ($1, $2, $3, $4, $5, 'pending')`,
//       [buyerId, gigId, sellerId,dateToUse,coin ]
//     );

//     return NextResponse.json({ success: true, message: 'Booking created' }, { status: 201 });
//   } catch (error) {
//     console.error('Booking error:', error);
//     return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
//   }
// }




// agent api needed 



// import pool from '../db';
// import { NextResponse } from 'next/server';
// import { getServerSession } from 'next-auth';
// import { authOptions } from '../auth/[...nextauth]/route';

// export async function POST(req) {
//   try {
//     const session = await getServerSession(authOptions);
//     if (!session) {
//       return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
//     }

//     const buyerId = session.user.id;

//     const { gigId, scheduledDate ,coin} = await req.json();
//     // console.log("what is req",gigId);
//     // return NextResponse.json({ success: true, message: 'Booking created' }, { status: 201 });
//     const dateToUse = scheduledDate || new Date().toISOString();

//     if (!gigId ) {
//       return NextResponse.json({ message: 'gigId is required' }, { status: 400 });
//     }
//     if (!dateToUse) {
//       return NextResponse.json({ message: 'scheduledDate is required' }, { status: 400 });
//     }

//     // Fetch seller_id from gigs table
//     const gigResult = await pool.query('SELECT seller_id FROM gigs WHERE gig_id = $1', [gigId]);
//     if (gigResult.rowCount === 0) {
//       return NextResponse.json({ error: 'Gig not found' }, { status: 404 });
//     }
//     const sellerId = gigResult.rows[0].seller_id;

//     // Insert booking
//     await pool.query(
//       `INSERT INTO bookings (buyer_id, gig_id, seller_id,scheduled_date,coins_paid, status) VALUES ($1, $2, $3, $4, $5, 'pending')`,
//       [buyerId, gigId, sellerId,dateToUse,coin ]
//     );

//     return NextResponse.json({ success: true, message: 'Booking created' }, { status: 201 });
//   } catch (error) {
//     console.error('Booking error:', error);
//     return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
//   }
// }


//new api//




// app/api/bookings/route.js
import pool from '../db';
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from '../auth/[...nextauth]/route';

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const buyerId = session.user.id;
    const { gigId, scheduledDate, coin } = await req.json();
    const dateToUse = scheduledDate || new Date().toISOString();

    // Validate input
    if (!gigId || !coin) {
      return NextResponse.json({ error: "gigId and coin are required" }, { status: 400 });
    }

    // Check user balance
    const userBalanceRes = await pool.query(
      `SELECT balance FROM users WHERE user_id = $1`,
      [buyerId]
    );
    if (userBalanceRes.rows[0].balance < coin) {
      return NextResponse.json({ error: "Insufficient balance" }, { status: 400 });
    }

    // Prevent duplicate active booking
    const duplicateBooking = await pool.query(
      `SELECT booking_id FROM bookings 
       WHERE buyer_id = $1 AND gig_id = $2 AND status IN ('pending','confirmed')`,
      [buyerId, gigId]
    );
    if (duplicateBooking.rowCount > 0) {
      return NextResponse.json(
        { error: "You already have an active booking for this gig" },
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
      [buyerId, gigId, sellerId, dateToUse, coin]
    );

    return NextResponse.json(
      { success: true, message: "Booking created" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Booking creation error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
// hhh

