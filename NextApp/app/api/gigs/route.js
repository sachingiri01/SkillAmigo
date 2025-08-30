import pool from "../db";
import { NextResponse } from "next/server";
// app/api/gigs/route.js

import { getServerSession } from 'next-auth';
import { authOptions } from "../auth/[...nextauth]/route";

import cloudinary from "../cloudinary";




//this api fetch all gigs on platform

// GET /api/gigs → fetch all gigs
export async function GET() {
  try {
    const result = await pool.query(`
      SELECT 
        g.gig_id AS id,
        g.title,
        g.description,
        g.category,
        g.avg_price,
        g.rating,
        g.picture,
        g.availability,
        u.name AS provider,
        u.profile_picture ,
        u.is_verified 
      FROM gigs g
      JOIN users u ON g.seller_id = u.user_id
      ORDER BY g.created_at DESC
    `);
  

    // Map DB fields to card component structure
    const gigs = result.rows.map(gig => ({
      id: gig.id,
      title: gig.title,
      description: gig.description,
      provider: gig.provider,
      profile_picture: gig.profile_picture,
      picture: gig.picture,
      price: `₹${gig.avg_price}`,
      priceType: "per project",
      rating: gig.rating || 0,
      reviews: 0, // Placeholder until review table exists
      distance: "2.3 km", // Placeholder or compute from location
      availability: gig.availability?.status || "Available now",
      tags: gig.category ? [gig.category] : [],
      is_verified: gig.is_verified || false
    }));
    console.log("row",gigs);
    

    return NextResponse.json(gigs, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


function uploadToCloudinary(buffer) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "gigs" },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    stream.end(buffer);
  });
}





export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const sellerId = session.user.id;
    const formData = await req.formData(); 
    console.log("formdata",formData);// Accept multipart/form-data
    const title = formData.get("title");
    const minPrice = formData.get("minPrice");
    const description = formData.get("description");
    const category = formData.get("category");
    const avgPrice = formData.get("maxPrice");
    const location = formData.get("location");
    const pictureFile = formData.get("thumbnail");
    const pictureUrlField = formData.get("thumbnailUrl");

    if (!title || !minPrice) {
      return NextResponse.json(
        { error: "Title and Min Price are required" },
        { status: 400 }
      );
    }

    let pictureUrl = pictureUrlField || null;;
    if (pictureFile && typeof pictureFile === "object") {
      const bytes = await pictureFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const uploadResult = await uploadToCloudinary(buffer);
      console.log("result by cloudenery",uploadResult)
      pictureUrl = uploadResult.secure_url;
    }

    const result = await pool.query(
      `INSERT INTO gigs (
        seller_id, title, description, category,
        min_price, avg_price, location, picture
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
      RETURNING gig_id, title, min_price`,
      [
        sellerId,
        title,
        description || null,
        category || null,
        minPrice,
        avgPrice || null,
        location || null,
        pictureUrl,
      ]
    );

    return NextResponse.json({ success: true, gig: result.rows[0] }, { status: 201 });
  } catch (err) {
    console.error("Error inserting gig:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
