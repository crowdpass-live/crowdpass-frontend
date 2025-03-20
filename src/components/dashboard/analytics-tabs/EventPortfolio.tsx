import React, { useContext } from "react";
import EventPortfolioCard from "./EventPortfolioCard";
import useGetAllEvents from "@/hooks/read-hooks/useGetAllEvents";
import { StarknetContext } from "@/contexts/UserContext";
import { num } from "starknet";


const EventPortfolio = () => {
  const {address} = useContext(StarknetContext)

  const { events } = useGetAllEvents();

  function normalizeHex(hexString: string) {
    hexString = hexString.startsWith('0x') ? hexString.slice(2) : hexString;
    hexString = hexString.replace(/^0+/, '');
    return `0x${hexString}`;
  }

  const myEvents = events.filter(event =>
    normalizeHex(num.toHex(event.organizer)) === normalizeHex(address as string)
    )


  return (
    <div>
      <div className="bg-[#14141A] rounded-xl w-full p-10 flex flex-col gap-3">
        <h1 className="text-white text-xl raleway font-medium">
          Event Portfolio
        </h1>
        <div className="flex justify-center flex-flow flex-wrap flex-grow gap-6">
          {myEvents.map((eachEvent: any, index: any) => (
            <EventPortfolioCard eachEvent={eachEvent} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventPortfolio;
