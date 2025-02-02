import React from "react";
import { Card, CardContent } from "../ui/card";
import { epochToDatetime } from "datetime-epoch-conversion";
import { CiShare1 } from "react-icons/ci";
import Link from "next/link";
import { IoTicketSharp } from "react-icons/io5";

type Props = {};

const MarketplaceCard = ({ eachEvent }: any) => {
  const { eventId, eventImage, eventName, eventStartDate, paid } =
    eachEvent;
  const response = epochToDatetime(`${eventStartDate}`);
  return (
    <Card className="bg-deep-blue rounded-xl w-full md:max-w-96 border-0">
      <img
        src={eventImage}
        alt="event"
        className="w-full h-[200px] object-cover rounded-t-xl"
      />
      <CardContent>
        <div className="py-3 flex justify-between items-start">
          <div className="flex flex-col">
            <p className="text-sm text-white">
              {response.day} {response.month}, {response.year}
            </p>
            <p className="text-lg text-white">{eventName}</p>
          </div>
          <p className="text-sm text-white">{paid ? "PAID" : "FREE"}</p>
        </div>
        <hr className="w-full bg-white mt-8" />
        <div className="mt-4 flex justify-between">
          <div className="flex gap-2 items-center">
            <div className="bg-[#14141A] rounded-full p-2">
              <IoTicketSharp color="#FF6932" size={16} />
            </div>
            <p className="text-lg text-white raleway font-semibold">
              10 Tickets
            </p>
          </div>
          <Link href={`/marketplace/${eventId}`} className="flex gap-2 items-center hover:text-primary">
            <p className="text-lg text-white raleway font-semibold hover:text-primary hover:underline">View</p>
            <CiShare1 color="#FFFFFF" size={20} />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketplaceCard;
