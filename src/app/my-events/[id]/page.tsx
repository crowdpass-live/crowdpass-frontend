"use client";

import { dummyEvents } from "@/components/events/dummyData";
import EventDetails from "@/components/events/EventDetails";
import EventTicketPrice from "@/components/events/EventTicktetPrice";
import MyEventTab from "@/components/my-event/MyEventTab";
import { MapPin } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import React from "react";


const page = () => {
  const params = useParams<{ id: string }>();
  const eventDetails = dummyEvents.find(
    (event) => event.eventId === Number(params.id)
  );
  const { eventLocation, description, paid, ticketsType }: any = eventDetails;

  return (
    <div>
      <EventDetails eventDetails={eventDetails} />
      <div className="bg-[#CBCACF66] max-w-[1280px] pt-28 -mt-16">
        <div className="mx-4 lg:mx-28">
          <hr className="text-white " />
          <h1 className="raleway text-2xl md:text-4xl text-white font-semibold my-4">
            Description
          </h1>
          <hr className="text-white" />
          <p className="text-white my-6">{description}</p>
          <hr className="text-white" />

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
              <MyEventTab eventDetails={eventDetails} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
