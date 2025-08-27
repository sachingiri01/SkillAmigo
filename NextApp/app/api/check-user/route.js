// app/api/check-user/route.js
import pool from "../db";

export async function POST(req) {
  try {
    const { email } = await req.json();

    if (!email) {
      return new Response(
        JSON.stringify({ error: "Email is required" }),
        { status: 400 }
      );
    }

    const result = await pool.query(
      "SELECT user_id FROM users WHERE email = $1 LIMIT 1",
      [email]
    );

    const exists = result.rowCount > 0;

    return new Response(
      JSON.stringify({ exists }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500 }
    );
  }
}
