import { NextRequest, NextResponse } from "next/server";
import Registration from "../../models/registrationModel";
import Event from "../../models/eventModel";
import { connectDB } from "@/app/lib/db";
import { sendRegistrationEmail } from "@/app/lib/sendRegistrationEmail";

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
      eventStartDate,
      id,
      address
    } = await request.json();

    if (!eventName || !eventId || !role || !name || !email) {
      return NextResponse.json(
        { message: "Missing required fields: eventName, eventId, role, name, and email are required" },
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

    if (event.name !== eventName) {
      return NextResponse.json(
        { message: "Event name and ID mismatch" },
        { status: 400 }
      );
    }

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

    const registration = await Registration.create({
      eventId,
      eventName,
      role,
      name,
      email,
      address,
      xhandle: xhandle || null,
      agreeToNewsletter: agreeToNewsletter || false,
      registrationDate: new Date(),
    });

    // Send confirmation email
    try {
      await sendRegistrationEmail({
        email,
        name,
        eventName,
        eventStartDate,
        id
      });
    } catch (emailError) {
      console.error("Failed to send confirmation email:", emailError);
    }

    return NextResponse.json(
      {
        message: "Registration successful",
        registrationId: registration._id,
        eventId: registration.eventId,
        eventName: registration.eventName,
        address: registration.address
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
