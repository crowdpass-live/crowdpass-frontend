"use client";

import React from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { epochToDatetime } from "datetime-epoch-conversion";
import Link from "next/link";
import {feltToString}from '@/helpers/helper';

const EventCard = (event: any) => {
 

  console.log(event)


  return (
    <Card className="w-full max-w-96 border-0 py-4  border-muted rounded-2xl shadow-2xl bg-deep-blue">
      <Button className="bg-light-black text-white italic p-4 mb-2">{feltToString(event?.event.category)}</Button>
      <img
        src={`https://gateway.pinata.cloud/ipfs/${event?.event.image.toString()}`}
        alt="Event Image"
        className="object-cover w-full h-44"
      />
      <Link href={`/dashboard/explore-events/${event?.event.id}`}>
        <h2 className="text-white font-semibold px-6 py-2">{event?.event.name.toString()}</h2>
      </Link>
      <p className="text-white text-xs px-6">
      {event?.event.description.toString()}
      </p>
    </Card>
  );
};

export default EventCard;
