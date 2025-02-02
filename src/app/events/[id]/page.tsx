"use client";

import { dummyEvents } from "@/components/events/dummyData";
import EventDetails from "@/components/events/EventDetails";
import EventDetailsBody from "@/components/events/EventDetailsBody";
import EventScheduleItem from "@/components/events/EventScheduleItem";
import EventTicketPrice from "@/components/events/EventTicktetPrice";
import EventWorkshopItem from "@/components/events/EventWorkshopItem";
import { MapPin } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";

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
