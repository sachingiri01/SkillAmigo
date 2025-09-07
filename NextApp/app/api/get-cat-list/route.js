
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route"; // adjust path
import pool from "../db";

export async function GET(req) {
  try {
    // ✅ Session check

    // Fetch distinct categories from gigs table
    const result = await pool.query(
      `SELECT DISTINCT category FROM gigs WHERE category IS NOT NULL`
    );

    const categories = result.rows.map(row => row.category);

    return NextResponse.json({ success: true, message:categories });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}
