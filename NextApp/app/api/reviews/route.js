import pool from "../db";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req) {
  try {
    // ✅ Get session
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user_id = session.user.id; 
    const body = await req.json();
    const { gig_id, rating, review_text, image } = body;

    // ✅ Validate input
    if (!gig_id || !rating) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // ✅ Insert review
    const query = `
      INSERT INTO reviews (user_id, gig_id, rating, review_text, image)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;

    const values = [user_id, gig_id, rating, review_text || null, image || null];
    const result = await pool.query(query, values);

    return NextResponse.json({
      message: "Review submitted successfully",
      review: result.rows[0],
    });
  } catch (error) {
    console.error("Error submitting review:", error);
    return NextResponse.json(
      { error: "Failed to submit review" },
      { status: 500 }
    );
  }
}
