"use client";

import EventHero from "@/components/events/EventHero";
import ExploreEvents from "@/components/events/ExploreEvents";
import React from "react";

type Props = {};

const Page = (props: Props) => {
  return (
    <div className="mb-10">
      <EventHero />
      <ExploreEvents />
    </div>
  );
};

export default Page;
