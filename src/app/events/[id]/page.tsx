"use client";

import { dummyEvents } from "@/components/events/dummyData";
import EventDetails from "@/components/events/EventDetails";
import EventScheduleItem from "@/components/events/EventScheduleItem";
import EventTicketPrice from "@/components/events/EventTicktetPrice";
import EventWorkshopItem from "@/components/events/EventWorkshopItem";
import { LocateFixed, LocateIcon, MapPin } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";

type Props = {};

const page = (props: Props) => {
  const [tabIndex, setTabIndex] = useState(0);
  const detailsTabs = ["Schedule", "Workshops", "Speakers"];
  const params = useParams<{ id: string }>();
  const eventDetails = dummyEvents.find(
    (event) => event.eventId === Number(params.id)
  );
  const {
    eventName,
    eventStartDate,
    eventLocation,
    description,
    numberOfTickets,
    paid,
    schedule,
    ticketsType,
    workshops,
    speakers,
    sponsors,
    eventImage,
  }: any = eventDetails;

  return (
    <div>
      <EventDetails eventDetails={eventDetails} />
      <div className="bg-[#CBCACF66] max-w-[1280px] pt-28 -mt-16">
        <div className="mx-4 lg:mx-28">
          <hr className="text-white " />
          <h1 className="raleway text-2xl md:text-4xl text-white font-semibold my-4">
            Description
          </h1>
          <hr className="text-white " />
          <p className="text-white my-6">{description}</p>
          <hr className="text-white " />

          <div className="flex flex-col md:flex-row gap-10">
            <div className="flex flex-col lg:w-[384px] my-6">
              <h1 className="text-3xl text-white raleway mb-2 font-semibold">
                Location
              </h1>
              <Image
                src={"/assets/MapImage.png"}
                alt="map"
                objectFit="fill"
                width={450}
                height={247}
              />
              <div className="bg-[#14141A66] font-semibold rounded-md p-2 my-4 flex items-center justify-start text-white gap-4 w-full">
                <div className="bg-[#14141A] p-2 rounded-xl">
                  <MapPin size={30} color="#FF6932" />
                </div>
                {eventLocation}
              </div>
              <div
                className={`${
                  paid ? "flex" : "hidden"
                }  mt-1 gap-3 flex-grow items-center justify-center flex-wrap`}
              >
                {ticketsType.map(
                  (
                    { type, price }: { type: string; price: number },
                    index: React.Key | null | undefined
                  ) => (
                    <EventTicketPrice
                      key={index}
                      price={price}
                      ticketType={type}
                    />
                  )
                )}
              </div>
            </div>
            <div className="lg:w-[600px] lg:mt-8">
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
                  } border border-principal p-4 rounded-md bg-subsidiary text-white`}
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
                    tabIndex === 2 ? "" : "hidden"
                  } border border-principal p-4 rounded-md bg-subsidiary text-white `}
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
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
