import { NextApiRequest, NextApiResponse } from "next";
import Event from "../../models/eventModel";
import { connectDB } from "@/app/lib/db";
import { NextResponse } from "next/server";

const baseJsonUrl = process.env.NEXT_PUBLIC_BASE_JSON_URL;

export async function POST(request: Request) {
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

    const jsonLink = `${baseJsonUrl}api/events/${event._id}`;

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
