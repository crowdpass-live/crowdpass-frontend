"use client";

import { dummyEvents } from "@/components/events/dummyData";
import MyEventCard from "@/components/my-event/EventCard";
import SuggestionsSection from "@/components/my-event/SuggestionsSection";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { Tab, TabList, Tabs } from "react-tabs";

type Props = {};

const page = (props: Props) => {
  const [tabIndex, setTabIndex] = useState(0);
  const detailsTabs = ["Upcoming", "Past", "Bookmarked"];

  return (
    <div className="mb-10">
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
        {dummyEvents.length > 0 ? (
              dummyEvents.map((eachEvent: any, index: any) => (
                <MyEventCard eachEvent={eachEvent} key={index} />
              ))
            ) : (
              <p className="text-white">No events to show</p>
            )}
        </div>
        <div className="flex justify-center items-center">
          <Button className="bg-primary raleway text-light-black hover:bg-primary hover:text-deep-blue w-60 py-6 text-xl mt-4">
            Load More...
          </Button>
        </div>
      </Tabs>
      <SuggestionsSection />
    </div>
  );
};

export default page;
