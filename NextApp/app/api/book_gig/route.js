import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const taskData = await req.json(); // parse the JSON body
    console.log("Received request finally hit -> :", taskData);

    // Respond with JSON
    return NextResponse.json({
      message: "book_gig endpoint got hit successfully",
      task_data: taskData,
    });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
