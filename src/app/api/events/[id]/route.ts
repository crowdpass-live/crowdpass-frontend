import { NextRequest, NextResponse } from "next/server";
import Event from "../../../models/eventModel";
import { connectDB } from "@/app/lib/db";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  try {
    await connectDB();

    const event = await Event.findById(id);
    if (!event) {
      return NextResponse.json(
        { message: "Event not found" },
        { status: 404 }
      );
    }

    const eventJson = {
      platform: "Crowdpass",
      name: event.name,
      image: `https://ipfs.io/ipfs/${event.image}`,
      description: event.description,
      external_url: "https://www.crowdpassevents.com/events/" + event._id,
      attributes: [
        {
          trait_type: "Organizer Name",
          value: event.organizer_name,
        },
        {
          trait_type: "Event Type",
          value: event.event_type,
        },
        {
          trait_type: "Event Category",
          value: event.event_category,
        },
        {
          trait_type: "Location",
          value: event.location,
        },
        
        {
          trait_type: "Schedule",
          value: event.schedule,
        },
      ],
    };

    return NextResponse.json(
       eventJson ,
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching event:", error);
    return NextResponse.json(
      { message: "Failed to fetch event" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  try {
    await connectDB();

    const body = await request.json();
    const {
      name,
      image,
      description,
      organizer_name,
      event_type,
      event_category,
      location,
      schedule,
    } = body;

    // Input validation
    if (!name || !description || !organizer_name) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      id,
      {
        name,
        image,
        description,
        organizer_name,
        event_type,
        event_category,
        location,
        schedule,
      },
      { new: true }
    );

    if (!updatedEvent) {
      return NextResponse.json(
        { message: "Event not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      updatedEvent ,
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating event:", error);
    return NextResponse.json(
      { message: "Failed to update event" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  try {
    await connectDB();

    const deletedEvent = await Event.findByIdAndDelete(id);

    if (!deletedEvent) {
      return NextResponse.json(
        { message: "Event not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Event deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting event:", error);
    return NextResponse.json(
      { message: "Failed to delete event" },
      { status: 500 }
    );
  }
}