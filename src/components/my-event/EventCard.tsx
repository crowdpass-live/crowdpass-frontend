"use client";

import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import Countdown, { zeroPad } from "react-countdown";
import Link from "next/link";
import { epochToDatetime } from "datetime-epoch-conversion";
import { Card } from "../ui/card";

type Props = {};

// Renderer callback with condition
const renderer = ({
  days,
  hours,
  minutes,
  seconds,
}: {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  completed: boolean;
}) => {
  // Render a countdown
  return (
    <div className="flex text-white raleway gap-1">
      <div className="flex flex-col items-center gap-0">
        <p className="text-2xl md:text-4xl font-semibold">{zeroPad(days)}:</p>
        <p className="text-[10px] md:text-xs">Days</p>
      </div>
      <div className="flex flex-col items-center gap-0">
        <p className="text-2xl md:text-4xl font-semibold">{zeroPad(hours)}:</p>
        <p className="text-[10px] md:text-xs">Hours</p>
      </div>

      <div className="flex flex-col items-center gap-0">
        <p className="text-2xl md:text-4xl font-semibold">{zeroPad(minutes)}:</p>
        <p className="text-[10px] md:text-xs">Mins</p>
      </div>

      <div className="flex flex-col items-center gap-0">
        <p className="text-2xl md:text-4xl font-semibold">{zeroPad(seconds)}</p>
        <p className="text-[10px] md:text-xs">Secs</p>
      </div>
    </div>
  );
};

const MyEventCard = ({ eachEvent }: any) => {
  const { eventId, eventImage, eventName, eventStartDate, eventLocation } =
    eachEvent;

  return (
    <Card className="flex max-w-[628px] flex-col md:flex-row flex-grow md:h-48 bg-deep-blue rounded-r-lg rounded-tl-lg md:pr-5 border-0">
      <img
        src={eventImage}
        alt="event-image"
        width={202}
        className="rounded-tl-lg w-full h-40 md:w-48 md:h-full"
      />
      <div className="flex gap-4 flex-col pl-4 md:pl-8 py-4 justify-between w-full">
        <Countdown date={Number(eventStartDate)} renderer={renderer} />
        <div className="flex flex-col">
          <Link
            href={`/my-events/${eventId}`}
            className="text-2xl font-normal text-white hover:underline hover:text-primary"
          >
            {eventName}
          </Link>
          <p className="text-xs text-white">9:00AM - 5:00PM</p>
        </div>
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center">
            <FaLocationDot color="#fff" />
            <p className="text-xs text-white">{eventLocation}</p>
          </div>
          <div></div>
        </div>
      </div>
    </Card>
  );
};

export default MyEventCard;
