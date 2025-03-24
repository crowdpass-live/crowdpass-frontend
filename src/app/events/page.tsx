"use client";

import EventHero from "@/components/events/EventHero";
import ExploreEvents from "@/components/events/ExploreEvents";
import SpolightEvent from "@/components/events/SpolightEvent";
import React from "react";

type Props = {};

const Page = (props: Props) => {
  return (
    <>
      <EventHero />
      <ExploreEvents />
    </>
  );
};

export default Page;
