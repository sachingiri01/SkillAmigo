import pool from '../db';
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from '../auth/[...nextauth]/route';

export async function GET(req) {
  try {
    // Get session info
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ msg: "Not authenticated" }, { status: 401 });
    }

    // Only admin can access
    if (session.user.role !== "admin") {
      return NextResponse.json({ msg: "Unauthorized" }, { status: 403 });
    }

    // fetch all coin requests with user info
    const query = `
      SELECT c.request_id AS id, c.amount, c.status, c.created_at AS requestDate,
             u.name, u.email, u.profile_picture
      FROM coin_requests c
      JOIN users u ON u.user_id = c.user_id
      ORDER BY c.created_at DESC
    `;

    const { rows } = await pool.query(query);

    const requests = rows.map((r) => ({
      id: r.id,
      amount: r.amount,
      status: r.status,
      requestDate: r.requestDate,
      user: {
        name: r.name,
        email: r.email,
        avatar: r.profile_picture
          ? r.profile_picture[0].toUpperCase()
          : r.name[0].toUpperCase(),
      },
      reason: "", // optional
    }));

    return NextResponse.json({ requests });
  } catch (err) {
    console.error("Error fetching coin requests:", err);
    return NextResponse.json({ error: "Failed to fetch coin requests" }, { status: 500 });
  }
}
