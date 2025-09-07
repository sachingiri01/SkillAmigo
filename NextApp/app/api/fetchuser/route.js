import { NextResponse } from "next/server";
import pool from "../db";

export async function GET() {
  try {
    const usersResult = await pool.query(`
      SELECT
        user_id,
        name AS username,
        email,
        balance AS coins,
        created_at
      FROM users
      ORDER BY created_at DESC
    `);

    // Add status = 'Active'
    const users = usersResult.rows.map(user => ({
      ...user,
      status: 'Active',
      joinDate: new Date(user.created_at).toISOString().split('T')[0], // optional formatted date
    }));

    return NextResponse.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
