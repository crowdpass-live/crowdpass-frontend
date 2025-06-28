import { NextRequest, NextResponse } from "next/server";
import Event from "../../models/eventModel";
import { connectDB } from "@/app/lib/db";

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const {
      name,
      image,
      description,
      organizer_name,
      event_type,
      event_category,
      location,
      schedule,
    } = await request.json();

    // Input validation
    if (
      !name ||
      !image ||
      !description ||
      !organizer_name ||
      !event_type ||
      !event_category ||
      !location ||
      !schedule
    ) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create the event in the database
    const event = await Event.create({
      name,
      image,
      description,
      organizer_name,
      event_type,
      event_category,
      location,
      schedule,
    });

    // Generate the JSON link for the created event
    const jsonLink = `https://www.crowdpassevents.com/api/events/${event._id}`;

    // Return the response with the JSON link
    return NextResponse.json({ link: jsonLink }, { status: 201 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error creating event:", error.message);
      return NextResponse.json(
        { message: "Failed to create event" },
        { status: 500 }
      );
    } else {
      console.error("An unknown error occurred:", error);
      return NextResponse.json(
        { message: "An unknown error occurred" },
        { status: 500 }
      );
    }
  }
}