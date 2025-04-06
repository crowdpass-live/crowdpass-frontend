import React, { use, useContext } from "react";
import EventPortfolioCard from "./EventPortfolioCard";
import useGetAllEvents from "@/hooks/read-hooks/useGetAllEvents";
import { StarknetContext } from "@/contexts/UserContext";
import { num } from "starknet";
import HashLoader from "react-spinners/HashLoader";
import { useRouter } from "next/navigation";

const EventPortfolio = () => {
  const { address } = useContext(StarknetContext);

  const { events, isLoading } = useGetAllEvents();

  const navigate = useRouter();

  function normalizeHex(hexString: string) {
    hexString = hexString.startsWith("0x") ? hexString.slice(2) : hexString;
    hexString = hexString.replace(/^0+/, "");
    return `0x${hexString}`;
  }

  const myEvents = events.filter(
    (event) =>
      normalizeHex(num.toHex(event.organizer)) ===
      normalizeHex(address as string)
  );

  return (
    <div>
      <div className="bg-[#14141A] rounded-xl w-full p-10 flex flex-col gap-3">
        <h1 className="text-white text-xl raleway font-medium">
          Event Portfolio
        </h1>
        {isLoading && (
          <div className="fixed inset-0 z-50 flex flex-col gap-10 items-center justify-center bg-black bg-opacity-50">
            <HashLoader
              color={"#FF6932"}
              loading={isLoading}
              size={100}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
            <div className="text-white text-2xl">Fetching Events...</div>
          </div>
        )}
        {!isLoading && myEvents.length < 1 ? (
          <div className="w-full py-12 flex flex-col items-center justify-center text-center">
            <div className="text-gray-400 text-lg mb-4">
              You haven't created any events yet
            </div>
            <div className="text-gray-500 mb-6">
              When you create events, they will appear here in your portfolio
            </div>
            <button className="bg-[#FF6932] hover:bg-[#e05a28] text-white py-2 px-6 rounded-lg transition-colors" onClick={() => {navigate.push("/create-event")}}>
              Create Event
            </button>
          </div>
        ) : (
          <div className="flex justify-start flex-flow flex-wrap flex-grow gap-6">
            {myEvents.map((eachEvent: any, index: any) => (
              <EventPortfolioCard eachEvent={eachEvent} key={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EventPortfolio;