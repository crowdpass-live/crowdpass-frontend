"use client";

import { dummyEvents } from "@/components/events/dummyData";
import TicketList from "@/components/marketplace/TicketList";
import { epochToDatetime } from "datetime-epoch-conversion";
import { MapPin } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import React from "react";
import { IoIosInformationCircle } from "react-icons/io";

type Props = {};

const page = (props: Props) => {
  const params = useParams<{ id: string }>();

  const eventDetails = dummyEvents.find(
    (event) => event.eventId === Number(params.id)
  );

  const { eventLocation, eventStartDate, eventName, eventImage }: any =
    eventDetails;

  const response = epochToDatetime(`${eventStartDate}`);

  function convertTime(time: string) {
    let hours = time.substring(0, 2);
    let minutes = time.substring(3, 5);
    let ampm = parseInt(hours) >= 12 ? "PM" : "AM";

    if (parseInt(hours) > 12) {
      hours = (parseInt(hours) - 12).toString();
    } else if (parseInt(hours) == 0) {
      hours = "12";
    }

    return hours + ":" + minutes + " " + ampm;
  }

  return (
    <div className="flex gap-4">
      <div className="hidden gap-6 flex-col w-1/3 md:flex">
        <Image src={eventImage} alt="dot" width={460} height={522} />
        <Image
          src={"https://res.cloudinary.com/dnohqlmjc/image/upload/v1742633489/MapImage_jgeu3d.png"}
          alt="dot"
          width={460}
          height={274}
        />
        <div className="bg-[#14141A66] font-semibold rounded-md p-2 my-4 flex items-center justify-start text-white gap-4 w-full">
          <div className="bg-[#14141A] p-2 rounded-xl">
            <MapPin size={30} color="#FF6932" />
          </div>
          {eventLocation}
        </div>
      </div>
      <div className="flex gap-6 flex-col md:w-2/3">
        <div className="font-semibold rounded-md p-2 my-4 flex flex-row items-start justify-between text-white w-full">
          <div className="flex flex-col gap-2">
            <h1 className="text-white text-4xl raleway font-semibold">
              {eventName}
            </h1>
            <div className="flex items-center gap-3">
              <p className="text-white text-base font-medium">
                {response.day} {response.month}, {response.year}
              </p>
              <Image
                src={"https://res.cloudinary.com/dnohqlmjc/image/upload/v1742633482/oui_dot_k90jke.png"}
                alt="dot"
                width={18}
                height={18}
              />
              <h1 className="text-white text-base font-medium">
                {convertTime(response.time)}
              </h1>
            </div>
          </div>
          <IoIosInformationCircle color="#FF6932" size={40} />
        </div>
        <TicketList />
        <TicketList />
        <TicketList />
        <TicketList />
      </div>
    </div>
  );
};

export default page;
