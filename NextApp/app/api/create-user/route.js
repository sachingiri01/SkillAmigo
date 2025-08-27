import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

export async function POST(req) {
  try {
    const { name, email, phone, bio, profile_picture } = await req.json();

    if (!name || !email) {
      return new Response(JSON.stringify({ error: "Name and Email are required" }), {
        status: 400,
      });
    }

    const client = await pool.connect();

    const result = await client.query(
      `INSERT INTO users (name, email, phone, bio, profile_picture)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING user_id`,
      [name, email, phone || null, bio || null, profile_picture || null]
    );

    client.release();

    return new Response(JSON.stringify({ success: true, userId: result.rows[0].id }), {
      status: 201,
    });
  } catch (err) {
    console.error("create-user error:", err);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
  }
}
