import { epochToDatetime } from "datetime-epoch-conversion";
import Link from "next/link";
import React from "react";
import { Card } from "../ui/card";

const EventCard = ({ eachEvent }: any) => {
  const {
    eventId,
    eventImage,
    eventName,
    start_date,
    description,
    ticket_price
  } = eachEvent;
  const response = epochToDatetime(`${start_date}`);

  return (
    <Card className="bg-deep-blue rounded-xl md:w-96 w-full flex-grow border-0">
      <img
        src={eventImage}
        alt="event"
        className="w-full h-[200px] object-cover rounded-t-xl"
      />
      <div className="p-3">
        <div className="p-3 flex justify-between items-start">
          <div className="flex flex-col">
            <p className="text-sm text-white">
              {response.day} {response.month}, {response.year}
            </p>
            <p className="text-lg text-white">{eventName}</p>
          </div>
          <p className="text-sm text-white">{Number(ticket_price) > 0  ? "PAID" : "FREE"}</p>
        </div>
        <p className="line-clamp-2 text-sm text-white px-3">{description}</p>
        <div className="flex justify-end items-center py-2">
          <Link
            href={`/events/${eventId}`}
            className="text-white hover:underline hover:text-primary px-3 text-right"
          >
            VIEW DETAILS...
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default EventCard;
