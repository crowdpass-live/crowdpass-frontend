"use client";

import { dummyEvents } from "@/components/events/dummyData";
import EventDetails from "@/components/events/EventDetails";
import EventTicketPrice from "@/components/events/EventTicktetPrice";
import MyEventTab from "@/components/my-event/MyEventTab";
import useGetEventById from "@/hooks/read-hooks/useGetEventById";
import { MapPin } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import React from "react";
import HashLoader from "react-spinners/HashLoader";

const page = () => {
  const params = useParams<{ id: string }>();
  const eventDetails = useGetEventById(Number(params.id));

  const { isLoading: loading }: any = eventDetails
  const { event }: any = eventDetails;

  return (
    <div>
       {loading && (
        <div className="fixed inset-0 z-50 flex flex-col gap-10 items-center justify-center bg-black bg-opacity-50">
          <HashLoader
              color={"#FF6932"}
              loading={loading}
              size={100}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          <div className="text-white text-2xl">Fetching Event Details...</div>
        </div>
      )}
      <EventDetails eventDetails={eventDetails} id={params.id} />
      <div className="bg-[#CBCACF66] max-w-[1280px] pt-40 -mt-32 mb-10">
        <div className="mx-4 lg:mx-28">
          <hr className="text-white " />
          <h1 className="raleway text-2xl md:text-4xl text-white font-semibold my-4">
            Description
          </h1>
          <hr className="text-white" />
          <div
            className="prose prose-invert max-w-full text-white my-6 md:basis-4/6"
            dangerouslySetInnerHTML={{
              __html: event?.description,
            }}
          />{" "}
          <hr className="text-white" />
          <div className="flex flex-col md:flex-row gap-10">
            <div className="flex flex-col lg:w-[384px] my-6">
              <h1 className="text-3xl text-white raleway mb-2 font-semibold">
                Location
              </h1>
              <Image
                src={
                  "https://res.cloudinary.com/dnohqlmjc/image/upload/v1742633489/MapImage_jgeu3d.png"
                }
                alt="map"
                objectFit="fill"
                width={450}
                height={247}
              />
              <div className="bg-[#14141A66] font-semibold rounded-md p-2 my-4 flex items-center justify-start text-white gap-4 w-full">
                <div className="bg-[#14141A] p-2 rounded-xl">
                  <MapPin size={30} color="#FF6932" />
                </div>
                {event?.attributes[3].value || "Location not specified"}
                </div>
            </div>
            <div className="lg:w-[600px] lg:mt-8">
              <MyEventTab />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
