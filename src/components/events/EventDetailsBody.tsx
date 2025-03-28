import { MapPin } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

const EventDetailsBody = ({ eventDetails }: any) => {
  const { event }: any = eventDetails;

  return (
    <>
      <hr className="text-white " />
      <h1 className="raleway text-2xl md:text-4xl text-white font-semibold my-4">
        Description
      </h1>
      <hr className="text-white" />
      <div className="flex flex-col md:flex-row gap-10">
        <div
          className="prose prose-invert max-w-full text-white my-6 md:basis-4/6"
          dangerouslySetInnerHTML={{
            __html: event?.eventDescription,
          }}
        />
        <div className="flex flex-col my-6 md:basis-2/6">
          <Image
            src={"/assets/MapImage.png"}
            alt="map"
            objectFit="fill"
            width={450}
            height={247}
            className="w-full"
          />
          <div className="bg-[#42424033] font-semibold rounded-md p-2 my-4 flex items-center justify-start text-white gap-4 w-full">
            <div className="bg-[#14141A] p-2 rounded-xl">
              <MapPin size={30} color="#FF6932" />
            </div>
            {event?.attributes[3].value}
          </div>
        </div>
      </div>
    </>
  );
};

export default EventDetailsBody;
