"use client";

import MyEventCard from "@/components/my-event/EventCard";
import SuggestionsSection from "@/components/my-event/SuggestionsSection";
import { StarknetContext } from "@/contexts/UserContext";
import useGetUserEvents from "@/hooks/read-hooks/useGetUserEvent";
import React, { useContext, useState } from "react";
import HashLoader from "react-spinners/HashLoader";
import { Tab, TabList, Tabs } from "react-tabs";

type Props = {};

const page = (props: Props) => {
  const {address, isLoading} = useContext(StarknetContext)
  const [tabIndex, setTabIndex] = useState(0);
  const detailsTabs = ["Upcoming", "Past", "Bookmarked"];
  const { userEvents } = useGetUserEvents(address as `0x${string}`)
  return (
    <div className="mb-10">
       {isLoading && (
        <div className="fixed inset-0 z-50 flex flex-col gap-10 items-center justify-center bg-black bg-opacity-50">
          <HashLoader
              color={"#FF6932"}
              loading={isLoading}
              size={100}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          <div className="text-white text-2xl">Fetching Event Details...</div>
        </div>
      )}
      <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
        <div className="flex flex-col md:flex-row items-center justify-end">
          <TabList className={"flex items-center justify-evenly gap-6 my-6"}>
            {detailsTabs.map((eachTab, index) => (
              <Tab
                key={index}
                className={"text-white font-semibold raleway text-lg"}
                selectedClassName="bg-primary raleway py-2 px-4 font-semibold text-[#14141A] rounded-sm"
              >
                {eachTab}
              </Tab>
            ))}
          </TabList>
        </div>
        <div className="flex flex-wrap justify-start gap-5 items-center">
        {userEvents.length > 0 ? (
              userEvents.map((eachEvent: any, index: any) => (
                <MyEventCard eachEvent={eachEvent} key={index} />
              ))
            ) : (
              <p className="text-white">No events to show</p>
            )}
        </div>
      </Tabs>
      <SuggestionsSection />
    </div>
  );
};

export default page;
