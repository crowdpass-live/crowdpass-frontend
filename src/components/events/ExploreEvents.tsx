import React, { useState } from "react";
import { Tab, TabList, Tabs } from "react-tabs";
import { dummyEvents } from "./dummyData";
import EventCard from "./EventCard";
import { Button } from "../ui/button";

type Props = {};

const ExploreEvents = (props: Props) => {
  const upcomingEvents = dummyEvents.filter(
    (event) => Number(event.eventEndDate) > (Date.now() / 1000)
  );

  const endedEvents = dummyEvents.filter(
    (event) => Number(event.eventEndDate) <= (Date.now() / 1000)
  );

  const [offset, setOffset] = useState(3);

  const [displayEvents, setDisplayedEvents] = useState<any>(
    dummyEvents.slice(0, 3)
  );

  const [displayUpcomingEvents, setDisplayUpcomingEvents] = useState<any>(
    upcomingEvents.slice(0, 3)
  );

  const [displayEndedEvents, setDisplayEndedEvents] = useState<any>(
    endedEvents.slice(0, 3)
  );

  const [tabIndex, setTabIndex] = useState(0);

  const detailsTabs = ["All Events", "Upcoming", "Ended"];

  const loadMoreEvents = () => {
    let nextEvents: any = [];

    switch (tabIndex) {
      case 0:
        nextEvents = dummyEvents.slice(offset, offset + 3);
        setDisplayedEvents([...displayEvents, ...nextEvents]);
        break;

      case 1:
        nextEvents = upcomingEvents.slice(offset, offset + 3);
        setDisplayUpcomingEvents([...displayUpcomingEvents, ...nextEvents]);
        break;

      case 2:
        nextEvents = endedEvents.slice(offset, offset + 3);
        setDisplayEndedEvents([...displayEndedEvents, ...nextEvents]);
        break;

      default:
        nextEvents = [];
        break;
    }

    setOffset(offset + 3);
  };

  return (
    <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
      <div className="flex flex-col md:flex-row items-center justify-between ">
        <h1 className="text-4xl font-semibold text-white raleway my-6">
          Explore
        </h1>
        <TabList className={"flex items-center justify-evenly gap-6 my-2"}>
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

      <div className="flex flex-wrap flex-grow gap-10 justify-center items-center w-full">
        {tabIndex === 0 && (
          displayEvents.length > 0 ? (
            displayEvents.map((eachEvent: any, index: any) => (
              <EventCard eachEvent={eachEvent} key={index} />
            ))
          ) : (
            <p className="text-white">No events to show</p>
          )
        )}
        {tabIndex === 1 && (
          displayUpcomingEvents.length > 0 ? (
            displayUpcomingEvents.map((eachEvent: any, index: any) => (
              <EventCard eachEvent={eachEvent} key={index} />
            ))
          ) : (
            <p className="text-white">No events to show</p>
          )
        )}
        {tabIndex === 2 && (
          displayEndedEvents.length > 0 ? (
            displayEndedEvents.map((eachEvent: any, index: any) => (
              <EventCard eachEvent={eachEvent} key={index} />
            ))
          ) : (
            <p className="text-white">No events to show</p>
          )
        )}
      </div>

      <div className="w-full flex justify-center items-center">
        <Button
          className="bg-primary raleway text-light-black hover:bg-primary hover:text-deep-blue w-60 py-6 text-xl mt-4 flex justify-center items-center"
          onClick={loadMoreEvents}
        >
          Load More...
        </Button>
      </div>
    </Tabs>
  );
};

export default ExploreEvents;
