import { epochToDatetime } from "datetime-epoch-conversion";
import Link from "next/link";
import React from "react";
import { Card } from "../ui/card";

const EventCard = ({ eachEvent }: any) => {
  const {
    id,
    name,
    start_date,
    description,
    ticket_price,
    image
  } = eachEvent;
  console.log(eachEvent)
  const response = epochToDatetime(`${start_date}`);

  return (
    <Card className="bg-deep-blue rounded-xl w-full flex-grow border-0">
      <img
        src={image}
        alt="event"
        className="w-full h-[200px] object-cover rounded-t-xl"
      />
      <div className="p-3">
        <div className="p-3 flex justify-between items-start">
          <div className="flex flex-col">
            <p className="text-sm text-white">
              {response.day} {response.month}, {response.year}
            </p>
            <p className="text-lg text-white line-clamp-1">{name}</p>
          </div>
          <p className={`text-sm ${Number(ticket_price) > 0  ? "text-primary" :"text-white"}`}>{Number(ticket_price) > 0  ? "PAID" : "FREE"}</p>
        </div>
        <div
          className="text-sm p-3 prose prose-invert max-w-full text-white line-clamp-2"
          dangerouslySetInnerHTML={{
            __html: description,
          }}
        />
        <div className="flex justify-end items-center py-2">
          <Link
            href={`/events/${id}`}
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
