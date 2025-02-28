"use client";

import { dummyEvents } from "@/components/events/dummyData";
import EventDetails from "@/components/events/EventDetails";
import EventDetailsBody from "@/components/events/EventDetailsBody";
import { useParams } from "next/navigation";
import React from "react";

type Props = {};

const page = (props: Props) => {
  const params = useParams<{ id: string }>();
  const eventDetails = dummyEvents.find(
    (event) => event.eventId === Number(params.id)
  );

  return (
    <div>
      <EventDetails eventDetails={eventDetails} />
      <div className="bg-deep-blue max-w-[1280px] pt-28 -mt-16">
        <div className="mx-4 lg:mx-28">
          <EventDetailsBody eventDetails={eventDetails} />
        </div>
      </div>
    </div>
  );
};

export default page;