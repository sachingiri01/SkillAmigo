// app/api/hello/route.js
import pool from "../db"; // Ensure this is the correct relative path

export async function GET(request) {
  try {
    // Test connection with a simple query
    const result = await pool.query('SELECT NOW()');

    return Response.json({
      message: 'Database connected successfully!',
      time: result.rows[0].now, // This shows the DB server time
    });
  } catch (error) {
    console.error('Database connection error:', error);
    return Response.json(
      {
        message: 'Failed to connect to the database.',
        error: error.message,
      },
      { status: 500 }
    );
  }
}
