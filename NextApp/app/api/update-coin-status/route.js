// import pool from '../db';
// import { NextResponse } from "next/server";
// import { getServerSession } from "next-auth";
// import { authOptions } from '../auth/[...nextauth]/route';

// export async function POST(req) {
//   try {
//     const session = await getServerSession(authOptions);

//     if (!session) {
//       return NextResponse.json({ success: false, message: "Not authenticated" }, { status: 401 });
//     }

//     if (session.user.role !== "admin") {
//       return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 403 });
//     }

//     const body = await req.json();
//     const { requestId, status } = body;

//     let dbStatus;
// if (status === "rejected") dbStatus = "cancelled";
// else if (status === "approved") dbStatus = "approved";
// else {
//   return NextResponse.json({ success: false, message: "Invalid request" }, { status: 400 });
// }

//     const allowedStatuses = ["approved", "cancelled"];
//     if (!requestId || !allowedStatuses.includes(dbStatus)) {
//       return NextResponse.json({ success: false, message: "Invalid request" }, { status: 400 });
//     }

//     const query = `
//       UPDATE coin_requests
//       SET status = $1,
//           updated_at = now()
//       WHERE request_id = $2
//       RETURNING *
//     `;
//     const values = [dbStatus, requestId];

//     const { rows } = await pool.query(query, values);

//     if (rows.length === 0) {
//       return NextResponse.json({ success: false, message: "Request not found" }, { status: 404 });
//     }

//     return NextResponse.json({
//       success: true,
//       message: `Coin request ${dbStatus} successfully`,
//       request: rows[0],
//     });
//   } catch (err) {
//     console.error("Error updating coin request:", err);
//     return NextResponse.json({ success: false, message: "Failed to update coin request" }, { status: 500 });
//   }
// }

import pool from '../db';
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from '../auth/[...nextauth]/route';

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ success: false, message: "Not authenticated" }, { status: 401 });
    }

    if (session.user.role !== "admin") {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 403 });
    }

    const body = await req.json();
    const { requestId, status } = body;

    // Map frontend status to DB enum
    let dbStatus;
    if (status === "rejected") dbStatus = "cancelled";
    else if (status === "approved") dbStatus = "approved";
    else {
      return NextResponse.json({ success: false, message: "Invalid request" }, { status: 400 });
    }

    const allowedStatuses = ["approved", "cancelled"];
    if (!requestId || !allowedStatuses.includes(dbStatus)) {
      return NextResponse.json({ success: false, message: "Invalid request" }, { status: 400 });
    }

    // Start a transaction
    const client = await pool.connect();
    try {
      await client.query("BEGIN");

      // Update the coin_requests table
      const queryRequest = `
        UPDATE coin_requests
        SET status = $1,
            updated_at = now()
        WHERE request_id = $2
        RETURNING *
      `;
      const { rows } = await client.query(queryRequest, [dbStatus, requestId]);

      if (rows.length === 0) {
        await client.query("ROLLBACK");
        return NextResponse.json({ success: false, message: "Request not found" }, { status: 404 });
      }

      const request = rows[0];

      // If approved, update user's balance
      if (dbStatus === "approved") {
        const queryUser = `
          UPDATE users
          SET balance = balance + $1,
              updated_at = now()
          WHERE user_id = $2
          RETURNING *
        `;
        await client.query(queryUser, [request.amount, request.user_id]);
      }

      await client.query("COMMIT");

      return NextResponse.json({
        success: true,
        message: `Coin request ${dbStatus} successfully`,
        request,
      });
    } catch (err) {
      await client.query("ROLLBACK");
      console.error("Transaction error:", err);
      return NextResponse.json({ success: false, message: "Failed to update coin request" }, { status: 500 });
    } finally {
      client.release();
    }

  } catch (err) {
    console.error("Error updating coin request:", err);
    return NextResponse.json({ success: false, message: "Failed to update coin request" }, { status: 500 });
  }
}
