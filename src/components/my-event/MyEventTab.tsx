"use client";
import React, { useState } from 'react'
import { Tab, TabList, TabPanel, Tabs } from 'react-tabs';
import EventScheduleItem from '../events/EventScheduleItem';
import MyEventTicket from './Ticket';
import EventWorkshopItem from '../events/EventWorkshopItem';
import EventSpok from './EventSpok';


const MyEventTab = ({eventDetails}:any) => {
const [tabIndex, setTabIndex] = useState(1);
const detailsTabs = ["Schedule","Tickets", "Workshops", "Speakers"];
const {
    schedule,
    workshops,
    speakers,
  }: any = eventDetails;
  return (
    <Tabs
    selectedIndex={tabIndex}
    onSelect={(index) => setTabIndex(index)}
    className={"w-full mb-8"}
  >
    <TabList
      className={
        "border-[#F5F5F5] border rounded-md flex justify-between text-white mb-6 "
      }
    >
      {detailsTabs.map((eachTab, index) => (
        <Tab
          key={index}
          className={"flex items-center p-2 px-4 md:p-3 md:px-10 "}
          selectedClassName="bg-primary text-black rounded-md"
        >
          {eachTab}
        </Tab>
      ))}
    </TabList>

    <TabPanel
      className={`${
        tabIndex === 0 ? "" : "hidden"
      } p-2 text-white`}
    >
      {schedule.map(
        (
          eachSchedule: {
            time: string;
            title: string;
            description: string;
          },
          index: React.Key | null | undefined
        ) => (
          <EventScheduleItem
            scheduleItem={eachSchedule}
            key={index}
          />
        )
      )}
    </TabPanel>
    <TabPanel
      className={`${
        tabIndex === 1 ? "" : "hidden"
      } rounded-md text-white`}
    >
    <MyEventTicket />
    <EventSpok />
    </TabPanel>
    <TabPanel
      className={`${
        tabIndex === 2 ? "" : "hidden"
      } border border-principal p-4 rounded-md text-white`}
    >
      {workshops.map(
        (
          eachWorkshop: {
            name: string;
            description: string;
          },
          index: React.Key | null | undefined
        ) => (
          <EventWorkshopItem
            workshopItem={eachWorkshop}
            itemNo={index}
            key={index}
          />
        )
      )}
    </TabPanel>
    <TabPanel
      className={`${
        tabIndex === 3 ? "" : "hidden"
      } border border-principal p-4 rounded-md text-white `}
    >
      <div className="flex flex-wrap gap-3">
        {speakers.map(
          (
            {
              name,
              img,
              description,
            }: { name: string; img: string; description: string },
            index: React.Key | null | undefined
          ) => (
            <div
              key={index}
              className="flex flex-col justify-center items-center gap-1 flex-grow"
            >
              <img
                src={img}
                alt={name}
                width={100}
                height={100}
              />
              <h1 className="font-semibold text-white text-lg">
                {name}
              </h1>
              <p className="font-sm text-white">{description}</p>
            </div>
          )
        )}
      </div>
    </TabPanel>
  </Tabs>  )
}

export default MyEventTab