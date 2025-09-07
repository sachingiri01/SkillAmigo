// app/api/overview/route.js
import { NextResponse } from "next/server";
import pool from "../db";

// Helper for percentage change
function calcChange(current, previous) {
  if (previous === 0) return current > 0 ? 100 : 0;
  return ((current - previous) / previous) * 100;
}

export async function GET() {
  try {
    // --------------------
    // Total Users
    // --------------------
    const usersNow = await pool.query(`
      SELECT COUNT(*) AS count
      FROM users
      WHERE date_trunc('month', created_at) = date_trunc('month', now())
    `);
    const usersPrev = await pool.query(`
      SELECT COUNT(*) AS count
      FROM users
      WHERE date_trunc('month', created_at) = date_trunc('month', now() - interval '1 month')
    `);
    const totalUsersResult = await pool.query(`SELECT COUNT(*) AS total FROM users`);
    const totalUsers = parseInt(totalUsersResult.rows[0].total, 10);
    const usersChange = calcChange(
      parseInt(usersNow.rows[0].count, 10),
      parseInt(usersPrev.rows[0].count, 10)
    );

    // --------------------
    // Total Gigs
    // --------------------
    const gigsNow = await pool.query(`
      SELECT COUNT(*) AS count
      FROM gigs
      WHERE date_trunc('month', created_at) = date_trunc('month', now())
    `);
    const gigsPrev = await pool.query(`
      SELECT COUNT(*) AS count
      FROM gigs
      WHERE date_trunc('month', created_at) = date_trunc('month', now() - interval '1 month')
    `);
    const totalGigsResult = await pool.query(`SELECT COUNT(*) AS total FROM gigs`);
    const totalGigs = parseInt(totalGigsResult.rows[0].total, 10);
    const gigsChange = calcChange(
      parseInt(gigsNow.rows[0].count, 10),
      parseInt(gigsPrev.rows[0].count, 10)
    );

    // --------------------
    // Coins in Circulation (sum of all balances)
    // --------------------
    const coinsNow = await pool.query(`
      SELECT COALESCE(SUM(balance), 0) AS coins
      FROM users
      WHERE date_trunc('month', created_at) = date_trunc('month', now())
    `);
    const coinsPrev = await pool.query(`
      SELECT COALESCE(SUM(balance), 0) AS coins
      FROM users
      WHERE date_trunc('month', created_at) = date_trunc('month', now() - interval '1 month')
    `);
    const coinsTotal = await pool.query(`SELECT COALESCE(SUM(balance), 0) AS coins FROM users`);
    const coins = parseFloat(coinsTotal.rows[0].coins);
    const coinsChange = calcChange(
      parseFloat(coinsNow.rows[0].coins),
      parseFloat(coinsPrev.rows[0].coins)
    );

    // --------------------
    // Revenue = balance of official account
    // --------------------
    const revenueResult = await pool.query(
      `SELECT COALESCE(balance, 0) AS revenue 
       FROM users WHERE email = $1`,
      ["skillamigo.official@gmail.com"]
    );
    const revenue = parseFloat(revenueResult.rows[0]?.revenue || 0);
    // For revenue change → compare month-over-month balance difference (optional)
    // Here I’ll just keep it static 0%
    const revenueChange = 0;

    return NextResponse.json({
      totalUsers,
      usersChange,
      totalGigs,
      gigsChange,
      coins,
      coinsChange,
      revenue,
      revenueChange,
      
    });
  } catch (error) {
    console.error("Error fetching overview metrics:", error);
    return NextResponse.json({ error: "Failed to fetch overview metrics" }, { status: 500 });
  }
}
