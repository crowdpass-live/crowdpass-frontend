import React from "react";
import { dummyEvents } from "@/components/events/dummyData";
import EventPortfolioCard from "./EventPortfolioCard";

const EventPortfolio = ({ setActiveStep }: any) => {
  return (
    <div>
      <div className="bg-[#14141A] rounded-xl w-full p-10 flex flex-col gap-3">
        <h1 className="text-white text-xl raleway font-medium">
          Event Portfolio
        </h1>
        <div className="flex justify-center flex-flow flex-wrap flex-grow gap-6">
          {dummyEvents.map((eachEvent: any, index: any) => (
            <EventPortfolioCard eachEvent={eachEvent} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventPortfolio;
