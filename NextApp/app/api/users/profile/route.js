import pool from "../../db";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import cloudinary from "../../cloudinary";  // updated path and import

function uploadToCloudinary(buffer) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "profile_pictures" },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    stream.end(buffer);
  });
}

// export async function PUT(req) {
//   try {
//     const session = await getServerSession(authOptions);
//     if (!session) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }
    
//     const userId = session.user.id;
//     const formData = await req.formData();
//     console.log("formdata",formData);

//     const name = formData.get("name");
//     const phone = formData.get("phone");
//     const bio = formData.get("bio");
//     const role = formData.get("role");
//     const profilePictureFile = formData.get("profile_picture_file");

//     if (!name || !phone || !bio || !role) {
//       return NextResponse.json({ error: "All fields are required" }, { status: 400 });
//     }

//     let profile_picture = null;

//     if (
//       profilePictureFile &&
//       profilePictureFile instanceof File &&
//       profilePictureFile.size > 0
//     ) {
//       const arrayBuffer = await profilePictureFile.arrayBuffer();
//       const buffer = Buffer.from(arrayBuffer);

//       const uploadResult = await uploadToCloudinary(buffer);
//       profile_picture = uploadResult.secure_url;
//     }

//     const result = await pool.query(
//       `
//       UPDATE users SET
//         name = $1,
//         phone = $2,
//         bio = $3,
//         role = $4,
//         profile_picture = COALESCE($5, profile_picture)
//       WHERE user_id = $6
//       RETURNING name, phone, bio, role, profile_picture
//       `,
//       [name, phone, bio, role, profile_picture, userId]
//     );
//     console.log("check detail of data which sumitted",result)
   






//     return NextResponse.json({ success: true, user: result.rows[0] });
//   } catch (error) {
//     console.error("PUT /api/users/profile error:", error);
//     return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
//   }
// }


export async function PUT(req) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    const userId = session.user.id;
    const formData = await req.formData();

    const name = formData.get("name");
    const phone = formData.get("phone");
    const bio = formData.get("bio");
    const role = formData.get("role");
    const profilePictureFile = formData.get("profile_picture_file");

    if (!name || !phone || !bio || !role) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    let profile_picture = null;

    if (
      profilePictureFile &&
      profilePictureFile instanceof File &&
      profilePictureFile.size > 0
    ) {
      const arrayBuffer = await profilePictureFile.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const uploadResult = await uploadToCloudinary(buffer);
      profile_picture = uploadResult.secure_url;
    }

    // Update in Postgres
    const result = await pool.query(
      `
      UPDATE users SET
        name = $1,
        phone = $2,
        bio = $3,
        role = $4,
        profile_picture = COALESCE($5, profile_picture),
        updated_at = NOW()
      WHERE user_id = $6
      RETURNING user_id, name, email, phone, bio, role, profile_picture, merit_credits, is_verified, created_at, updated_at
      `,
      [name, phone, bio, role, profile_picture, userId]
    );

    const updatedUser = result.rows[0];
    // console.log("✅ Updated user in DB:", updatedUser);

    // 🔥 Call FastAPI /upload-user to sync with Pinecone
    try {
      const syncRes = await fetch(`${process.env.FASTAPI_URL}/upload-user`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedUser),
      });

      const syncData = await syncRes.json();
      // console.log("📤 Synced to Pinecone:", syncData);
    } catch (syncError) {
      console.error("⚠️ Failed to sync user to Pinecone:", syncError);
    }
   
    return NextResponse.json({ success: true, user: updatedUser });
  } catch (error) {
    console.error("PUT /api/users/profile error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}