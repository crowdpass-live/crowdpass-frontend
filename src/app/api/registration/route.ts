import { NextRequest, NextResponse } from "next/server";
import Registration from "../../models/registrationModel";
import Event from "../../models/eventModel";
import { connectDB } from "@/app/lib/db";

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const {
      eventName,
      eventId,
      role,
      name,
      email,
      xhandle,
      agreeToNewsletter,
    } = await request.json();

    // Input validation
    if (!eventName || !eventId || !role || !name || !email) {
      return NextResponse.json(
        { message: "Missing required fields: eventName, eventId, role, name, and email are required" },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: "Invalid email format" },
        { status: 400 }
      );
    }

    // Check if event exists using the event ID (more reliable)
    const event = await Event.findById(eventId);
    if (!event) {
      return NextResponse.json(
        { message: "Event not found" },
        { status: 404 }
      );
    }

    // Verify that the event name matches the ID (for data integrity)
    if (event.name !== eventName) {
      return NextResponse.json(
        { message: "Event name and ID mismatch" },
        { status: 400 }
      );
    }

    // Check if user is already registered for this event
    const existingRegistration = await Registration.findOne({
      eventId,
      email,
    });

    if (existingRegistration) {
      return NextResponse.json(
        { message: "User is already registered for this event" },
        { status: 409 }
      );
    }

    // Create the registration in the database
    const registration = await Registration.create({
      eventId,
      eventName,
      role,
      name,
      email,
      xhandle: xhandle || null,
      agreeToNewsletter: agreeToNewsletter || false,
      registrationDate: new Date(),
    });

    // Return success response
    return NextResponse.json(
      {
        message: "Registration successful",
        registrationId: registration._id,
        eventId: registration.eventId,
        eventName: registration.eventName,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error creating registration:", error.message);
      return NextResponse.json(
        { message: "Failed to create registration" },
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