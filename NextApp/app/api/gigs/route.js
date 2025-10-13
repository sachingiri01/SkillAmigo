import pool from "../db";
import { NextResponse } from "next/server";
// app/api/gigs/route.js

import { getServerSession } from 'next-auth';
import { authOptions } from "../auth/[...nextauth]/route";

import cloudinary from "../cloudinary";




//this api fetch all gigs on platform

// GET /api/gigs → fetch all gigs
// export async function GET() {
//   try {
//     const result = await pool.query(`
//       SELECT 
//         g.gig_id AS id,
//         g.title,
//         g.description,
//         g.category,
//         g.avg_price,
//         g.rating,
//         g.picture,
//         g.availability,
//         u.name AS provider,
//         u.profile_picture ,
//         u.is_verified 
//       FROM gigs g
//       JOIN users u ON g.seller_id = u.user_id
//       ORDER BY g.created_at DESC
//     `);
  

//     // Map DB fields to card component structure
//     const gigs = result.rows.map(gig => ({
//       id: gig.id,
//       title: gig.title,
//       description: gig.description,
//       provider: gig.provider,
//       profile_picture: gig.profile_picture,
//       picture: gig.picture,
//       price: `₹${gig.avg_price}`,
//       priceType: "per project",
//       rating: gig.rating || 0,
//       reviews: 0, // Placeholder until review table exists
//       distance: "2.3 km", // Placeholder or compute from location
//       availability: gig.availability?.status || "Available now",
//       tags: gig.category ? [gig.category] : [],
//       is_verified: gig.is_verified || false
//     }));
//     console.log("row",gigs);
    

//     return NextResponse.json(gigs, { status: 200 });
//   } catch (error) {
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }



// GET /api/gigs → fetch all gigs
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    const result = await pool.query(`
      SELECT 
        g.gig_id AS id,
        g.title,
        g.seller_id,
        g.location,

        g.description,
        g.category,
        g.avg_price,
        g.rating,
        g.picture,
        g.availability,
        u.name AS provider,
        u.profile_picture,
        u.is_verified
      FROM gigs g
      JOIN users u ON g.seller_id = u.user_id
      ORDER BY g.created_at DESC
    `);

    let gigs = result.rows;

    // If user is logged in, fetch their active bookings
    let activeGigIds = new Set();
    if (userId) {
      const bookingRes = await pool.query(
        `
        SELECT gig_id
        FROM bookings
        WHERE buyer_id = $1
          AND status NOT IN ('completed', 'cancelled')
        `,
        [userId]
      );

      bookingRes.rows.forEach(row => activeGigIds.add(row.gig_id));
    }

    // Map DB fields to card component structure
    const mappedGigs = gigs.map(gig => ({
      id: gig.id,
      location:gig.location,
      title: gig.title,
      seller_id:gig.seller_id,
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
      is_verified: gig.is_verified || false,
      hasActiveBooking: activeGigIds.has(gig.id),
    }));

    return NextResponse.json(mappedGigs, { status: 200 });
  } catch (error) {
    console.error("Error fetching gigs:", error);
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





// export async function POST(req) {
//   try {
//     const session = await getServerSession(authOptions);
//     if (!session) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const sellerId = session.user.id;
//     const formData = await req.formData(); 
//     console.log("formdata",formData);// Accept multipart/form-data
//     const title = formData.get("title");
//     const minPrice = formData.get("minPrice");
//     const description = formData.get("description");
//     const category = formData.get("category");
//     const avgPrice = formData.get("maxPrice");
//     const location = formData.get("location");
//     const pictureFile = formData.get("thumbnail");
//     const pictureUrlField = formData.get("thumbnailUrl");

//     if (!title || !minPrice) {
//       return NextResponse.json(
//         { error: "Title and Min Price are required" },
//         { status: 400 }
//       );
//     }

//     let pictureUrl = pictureUrlField || null;;
//     if (pictureFile && typeof pictureFile === "object") {
//       const bytes = await pictureFile.arrayBuffer();
//       const buffer = Buffer.from(bytes);
//       const uploadResult = await uploadToCloudinary(buffer);
//       console.log("result by cloudenery",uploadResult)
//       pictureUrl = uploadResult.secure_url;
//     }

//     const result = await pool.query(
//       `INSERT INTO gigs (
//         seller_id, title, description, category,
//         min_price, avg_price, location, picture
//       ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
//       RETURNING gig_id, title, min_price`,
//       [
//         sellerId,
//         title,
//         description || null,
//         category || null,
//         minPrice,
//         avgPrice || null,
//         location || null,
//         pictureUrl,
//       ]
//     );









//     return NextResponse.json({ success: true, gig: result.rows[0] }, { status: 201 });
//   } catch (err) {
//     console.error("Error inserting gig:", err);
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//   }
// }



import { v4 as uuidv4 } from "uuid"; // optional, for gig_id

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // enrich session with token props
    const user = {
      id: session.user.id,
      phone: session.user.phone,
      merit_credits: session.user.merit_credits,
      is_verified: session.user.is_verified,
      profile_picture: session.user.profile_picture,
      image: session.user.profile_picture || null,
      bio: session.user.bio,
      balance: session.user.balance,
      role: session.user.role,
      name: session.user.name,
      email: session.user.email,
    };

    const formData = await req.formData();
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

    // handle picture upload
    let pictureUrl = pictureUrlField || null;
    if (pictureFile && typeof pictureFile === "object") {
      const bytes = await pictureFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const uploadResult = await uploadToCloudinary(buffer);
      console.log("result by cloudinary:", uploadResult);
      pictureUrl = uploadResult.secure_url;
    }

    // Step 1: Insert into Neon DB
    const result = await pool.query(
      `INSERT INTO gigs (
        seller_id, title, description, category,
        min_price, avg_price, location, picture
      ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
      RETURNING gig_id, title, min_price`,
      [
        user.id,
        title,
        description || null,
        category || null,
        minPrice,
        avgPrice || null,
        location || null,
        pictureUrl,
      ]
    );

    const insertedGig = result.rows[0];

    // Step 2: Structured payload for Django API
    const gigPayload = {
      gig_id: insertedGig.gig_id?.toString(),
      title,
      description: description || null,
      category: category || null,
      min_price: parseFloat(minPrice),
      avg_price: avgPrice ? parseFloat(avgPrice) : null,
      location: location || null,
      rating: 0, // default until reviews
      picture: pictureUrl,
      contact_info: {
        email: user.email,
        phone: user.phone,
      },
      user: {
        name: user.name,
        profile_picture: user.profile_picture,
        role: user.role,
        is_verified: user.is_verified,
      },
    };

    // Step 3: Forward to Django backend
    const response = await fetch("http://127.0.0.1:8000/upload-gig", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(gigPayload),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("Django API error:", errText);
      return NextResponse.json(
        { error: "Gig inserted in Neon but failed to upload to Django" },
        { status: 500 }
      );
    }

    const djangoData = await response.json();

    // Final response
    return NextResponse.json(
      { success: true, gig: result.rows[0],  django: djangoData  },
      { status: 201 }
    );

  } catch (err) {
    console.error("Error in POST /api/gigs:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}


export async function DELETE(req, { params }) {
  console.log("DELETE route hit with ID:", params.id);
  const { id: gigId } = params;

  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    

    const sellerId = session.user.id;
    console.log("saler",sellerId);
    
    

    // Check if gig belongs to seller
    const gigRes = await pool.query(
      `SELECT seller_id FROM gigs WHERE gig_id = $1`,
      [gigId]
    );
    if (gigRes.rowCount === 0 || gigRes.rows[0].seller_id !== sellerId) {
      return NextResponse.json({ error: "Gig not found or unauthorized" }, { status: 404 });
    }
    console.log("gig",gigRes.rows[0].seller_id)

    // Check bookings
    const bookingRes = await pool.query(
      `SELECT COUNT(*) AS active_bookings
       FROM bookings
       WHERE gig_id = $1 AND status NOT IN ('completed', 'cancelled')`,
      [gigId]
    );

    if (parseInt(bookingRes.rows[0].active_bookings) > 0) {
      return NextResponse.json(
        { error: "Cannot delete gig with pending or confirmed bookings" },
        { status: 400 }
      );
    }

    // Delete gig
     const response = await fetch("http://127.0.0.1:8000/delete-gig-pincone", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({id:gigId}),
    });
    if (!response.ok) {
          const errText = await response.text();
          console.error("Django API error:", errText);
          return NextResponse.json(
            { error: "Gig falied to delete from pincone try again later :(" },
            { status: 500 }
          );
        }
    
    await pool.query(`DELETE FROM gigs WHERE gig_id = $1`, [gigId]);

    return NextResponse.json({ success: true, message: "Gig deleted successfully" });
  } catch (error) {
    console.error("Delete gig error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
