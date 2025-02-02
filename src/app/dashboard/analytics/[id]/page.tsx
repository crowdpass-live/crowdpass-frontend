"use client";

import AnalyticsEventDetails from "@/components/dashboard/analytics-tabs/AnalyticsEventDetails";
import EventCheckin from "@/components/dashboard/analytics-tabs/EventCheckin";
import { dummyEvents } from "@/components/events/dummyData";
import EventDetailsBody from "@/components/events/EventDetailsBody";
import { useParams } from "next/navigation";
import React, { useState } from "react";

type Props = {};

const page = (props: Props) => {
  const [tabIndex, setTabIndex] = useState(0);
  const detailsTabs = ["Details", "Analytics", "Checkin"];
  const params = useParams<{ id: string }>();
  const eventDetails = dummyEvents.find(
    (event) => event.eventId === Number(params.id)
  );
  const ActiveComponent = () => {
    switch (tabIndex) {
      case 0:
        return (
          <>
            <AnalyticsEventDetails eventDetails={eventDetails} />
            <EventDetailsBody eventDetails={eventDetails} />
          </>
        );
      // case 1:
      //   return <EventPortfolio setActiveComponent={setActiveComponent} />;
      case 2:
        return <EventCheckin  />;
      default:
        return (
        <>
          <AnalyticsEventDetails eventDetails={eventDetails} />
          <EventDetailsBody eventDetails={eventDetails} />
        </>
        )
    }
  };
  return (
    <div className="bg-[#14141A] rounded-xl w-full p-10 flex flex-col gap-3">
      <div className="flex flex-col md:flex-row justify-between">
        <h1 className="text-white text-xl raleway font-medium">
          Event Portfolio
        </h1>
        <ul className="flex justify-between underline underline-offset-4 gap-4">
          {detailsTabs.map((tab, index) => (
            <li
              key={index}
              className={`cursor-pointer ${
                tabIndex === index
                  ? "text-primary underline underline-offset-4"
                  : "text-white/50"
              }`}
              onClick={() => setTabIndex(index)}
            >
              {tab}
            </li>
          ))}
        </ul>
      </div>
      <ActiveComponent />
    </div>
  );
};

export default page;
