import { NextRequest, NextResponse } from "next/server";
import Registration from "../../models/registrationModel";
import Event from "../../models/eventModel";
import CheckIn from "../../models/checkInModel";
import { connectDB } from "@/app/lib/db";

// --- GET: Fetch checked-in users for an event ---
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const eventId = searchParams.get("eventId");

    if (!eventId) {
      return NextResponse.json(
        { message: "eventId parameter is required" },
        { status: 400 }
      );
    }

    const event = await Event.findById(eventId);
    if (!event) {
      return NextResponse.json(
        { message: "Event not found" },
        { status: 404 }
      );
    }

    const checkIns = await CheckIn.find({ eventId })
      .sort({ checkInDate: -1 })
      .populate("registrationId", "name email role") // pull basic details from Registration
      .select("-__v");

    return NextResponse.json(
      {
        message: "Checked-in users retrieved successfully",
        eventId,
        eventName: event.name,
        total: checkIns.length,
        data: checkIns,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error fetching check-ins:", error.message);
      return NextResponse.json(
        { message: "Failed to fetch check-ins" },
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

// --- POST: Check a user in ---
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const { eventId, email } = await request.json();

    if (!eventId || !email) {
      return NextResponse.json(
        { message: "Missing required fields: eventId and email are required" },
        { status: 400 }
      );
    }

    // Make sure the event exists
    const event = await Event.findById(eventId);
    if (!event) {
      return NextResponse.json(
        { message: "Event not found" },
        { status: 404 }
      );
    }

    // Make sure the user is registered
    const registration = await Registration.findOne({ eventId, email });
    if (!registration) {
      return NextResponse.json(
        { message: "No registration found for this email and event" },
        { status: 404 }
      );
    }

    // Check if already checked in
    const existingCheckIn = await CheckIn.findOne({
      eventId,
      registrationId: registration._id,
    });

    if (existingCheckIn) {
      return NextResponse.json(
        {
          message: "User already checked in",
          checkInDate: existingCheckIn.checkInDate,
        },
        { status: 409 }
      );
    }

    // Create a check-in record
    const checkIn = await CheckIn.create({
      eventId,
      registrationId: registration._id,
      email: registration.email,
    });

    return NextResponse.json(
      {
        message: "Check-in successful",
        checkInId: checkIn._id,
        registrationId: registration._id,
        name: registration.name,
        email: registration.email,
        eventId: registration.eventId,
        checkInDate: checkIn.checkInDate,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error checking in:", error.message);
      return NextResponse.json(
        { message: "Failed to check in" },
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
