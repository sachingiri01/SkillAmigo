// pages/api/test-supabase.js
import { createClient } from "@supabase/supabase-js";

// Supabase environment variables (must be in .env.local)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  try {
    // Try fetching from a table (replace "users" with your table)
    const { data, error } = await supabase.from("users").select("*").limit(1);

    if (error) {
      return res.status(500).json({ status: "❌ Not Connected", error: error.message });
    }

    return res.status(200).json({
      status: "✅ Connected to Supabase!",
      sampleData: data,
    });
  } catch (err) {
    return res.status(500).json({ status: "❌ Not Connected", error: err.message });
  }
}
