"use client";

import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import Countdown, { zeroPad } from "react-countdown";
import Link from "next/link";
import { Card } from "../ui/card";
import { epochToDatetime } from "datetime-epoch-conversion";

type Props = {};

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
        <p className="text-2xl md:text-4xl font-semibold">
          {zeroPad(minutes)}:
        </p>
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
  const { id, image, name, start_date, attributes } = eachEvent;
  const response = epochToDatetime(`${Number(start_date)}`);

  console.log(start_date);

  return (
    <Card className="flex max-w-[628px] flex-col md:flex-row flex-grow md:h-48 bg-deep-blue rounded-r-lg rounded-tl-lg md:pr-5 border-0">
      <img
        src={image}
        alt="event-image"
        width={202}
        className="rounded-tl-lg w-full h-40 md:w-48 md:h-full"
      />
      <div className="flex gap-4 flex-col pl-4 md:pl-8 py-4 justify-between w-full">
        <Countdown date={Number(start_date) * 1000} renderer={renderer} />
        <div className="flex flex-col">
          <Link
            href={`/my-events/${id}`}
            className="text-2xl font-normal text-white hover:underline hover:text-primary"
          >
            {name}
          </Link>
          <p className="text-xs text-white">
            {" "}
            {response.day} {response.month}, {response.year}
          </p>
        </div>
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center">
            <FaLocationDot color="#fff" />
            {/* <p className="text-xs text-white"> {attributes[3].value || "Location not specified"}</p> */}
          </div>
          <div></div>
        </div>
      </div>
    </Card>
  );
};

export default MyEventCard;
