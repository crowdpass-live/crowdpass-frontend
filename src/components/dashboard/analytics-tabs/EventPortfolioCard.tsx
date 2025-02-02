import { Card } from "@/components/ui/card";
import { epochToDatetime } from "datetime-epoch-conversion";
import Link from "next/link";
import React from "react";
import { CiShare1 } from "react-icons/ci";

const EventPortfolioCard = ({ eachEvent }: any) => {

  const { eventId, eventImage, eventName, eventStartDate, paid } = eachEvent;

  const response = epochToDatetime(`${eventStartDate}`);

  return (
    <Card className="bg-deep-blue rounded-xl w-80 border-0">
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
        <div className="flex justify-end items-center py-2">
          <Link
            href={`/dashboard/analytics/${eventId}`}
            className="text-white hover:underline hover:text-primary px-3 text-right raleway font-light flex items-center gap-2"
          >
            VIEW DETAILS <CiShare1 size={18} color="#ffffff" />
          </Link>
        </div>
      </div>
    </Card>
  );
};

export default EventPortfolioCard;
