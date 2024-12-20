import { epochToDatetime } from "datetime-epoch-conversion";
import Link from "next/link";
import React from "react";

const EventCard = ({ eachEvent }: any) => {
  const {
    eventId,
    eventImage,
    eventName,
    eventStartDate,
    eventLocation,
    description,
    paid,
    schedule,
    ticketsType,
    workshops,
    speakers,
  } = eachEvent;
  const response = epochToDatetime(`${eventStartDate}`);

  return (
    <div className="bg-[#5B5959] rounded-xl max-w-96">
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
          <p className="text-sm text-white">{paid ? "PAID" : "FREE"}</p>
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
    </div>
  );
};

export default EventCard;
