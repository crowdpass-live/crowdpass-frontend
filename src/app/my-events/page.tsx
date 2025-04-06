"use client";

import { getFilteredEvents } from "@/components/events/getFilteredEvent";
import NoEventsMessage from "@/components/events/NoEventMessage";
import MyEventCard from "@/components/my-event/EventCard";
import SuggestionsSection from "@/components/my-event/SuggestionsSection";
import { StarknetContext } from "@/contexts/UserContext";
import useGetUserEvents from "@/hooks/read-hooks/useGetUserEvent";
import React, { useContext, useState } from "react";
import HashLoader from "react-spinners/HashLoader";
import { Tab, TabList, Tabs } from "react-tabs";

type FilterState = {
  categories: string[];
  locations: string[];
  payments: string[];
  startDate: string;
  endDate: string;
  searchQuery: string;
};

const page = () => {
  const { address, isLoading } = useContext(StarknetContext);
  const [tabIndex, setTabIndex] = useState(0);
  const detailsTabs = ["Upcoming", "Ongoing", "Past"];
  const { userEvents } = useGetUserEvents(address as `0x${string}`);
  //filter state
  const [filterState, setFilterState] = useState<FilterState>({
    categories: [],
    locations: [],
    payments: [],
    startDate: "",
    endDate: "",
    searchQuery: "",
  });
  const filteredEvents = getFilteredEvents(
    userEvents || [],
    tabIndex,
    filterState
  );

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
          <div className="text-white text-2xl">Fetching your event tickets</div>
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
          {filteredEvents.length > 0 ? (
            filteredEvents.map((eachEvent: any, index: any) => (
              <MyEventCard eachEvent={eachEvent} key={index} />
            ))
          ) : (
            <NoEventsMessage
              message={`No ${detailsTabs[
                tabIndex
              ].toLowerCase()} event ticket to show`}
              actionText="check out available events"
              actionLink="/events"
              ticket
            />
          )}
        </div>
      </Tabs>
      <SuggestionsSection />
    </div>
  );
};

export default page;
