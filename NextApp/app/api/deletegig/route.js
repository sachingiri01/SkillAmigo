     
import { NextResponse } from "next/server";
import pool from "../db";
 import { getServerSession } from "next-auth";
    import { authOptions } from '../auth/[...nextauth]/route';

export async function DELETE(req) {
  const { searchParams } = new URL(req.url);
  const gigId = searchParams.get("id");

  if (!gigId) return NextResponse.json({ error: "Missing gig ID" }, { status: 400 });

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

    await pool.query("DELETE FROM gigs WHERE gig_id = $1", [gigId]);
    return NextResponse.json({ message: "Gig deleted successfully" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to delete gig" }, { status: 500 });
  }
}
