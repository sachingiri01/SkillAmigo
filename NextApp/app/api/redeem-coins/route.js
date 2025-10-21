import pool from '../db'; // adjust relative path as needed
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

export async function POST(request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response(
      JSON.stringify({ error: 'Unauthorized' }),
      { status: 401, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const userId = session.user.id;

  const body = await request.json();
  const amount = body.amount;

  if (typeof amount !== 'number' || amount <= 0) {
    return new Response(
      JSON.stringify({ error: 'Invalid amount' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const { rows } = await client.query(
      'SELECT balance FROM users WHERE user_id = $1 FOR UPDATE',
      [userId]
    );

    if (rows.length === 0) {
      await client.query('ROLLBACK');
      return new Response(
        JSON.stringify({ error: 'User not found' }),
        { status: 404, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const currentBalance = parseFloat(rows[0].balance);

    if (amount > currentBalance) {
      await client.query('ROLLBACK');
      return new Response(
        JSON.stringify({ error: 'Insufficient balance' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const newBalance = currentBalance - amount;

    await client.query(
      'UPDATE users SET balance = $1, updated_at = NOW() WHERE user_id = $2',
      [newBalance, userId]
    );

    await client.query('COMMIT');

    return new Response(
      JSON.stringify({ newBalance }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    await client.query('ROLLBACK');
    console.error('Redeem coins error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  } finally {
    client.release();
  }
}
