import { NextResponse } from "next/server";
import pool from "../db";

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("id");

    if (!userId)
      return NextResponse.json({ error: "Missing user_id" }, { status: 400 });

    await pool.query("DELETE FROM users WHERE user_id = $1", [userId]);
    return NextResponse.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("Delete user error:", err);
    return NextResponse.json({ error: "Failed to delete user" }, { status: 500 });
  }
}
