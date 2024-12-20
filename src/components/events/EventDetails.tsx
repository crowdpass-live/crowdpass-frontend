import { Bookmark, Calendar, Share2 } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { epochToDatetime } from "datetime-epoch-conversion";

type Props = {};

const EventDetails = ({ eventDetails }: any) => {
  const {
    eventName,
    eventStartDate,
    numberOfTickets,
    paid,
    workshops,
    speakers,
    sponsors,
    eventImage,
  }: any = eventDetails;

  const response = epochToDatetime(`${eventStartDate}`);
  return (
    <div className="flex flex-col md:flex-row mx-4 lg:mx-28 gap-4 lg:gap-10">
      <Image
        src={eventImage}
        alt="event-image"
        width={384}
        height={467}
        className="rounded-3xl w-full md:w-96"
      />
      <div className="flex flex-col gap-4 lg:gap-6">
        <div>
          <p className="text-primary">{paid ? "PAID" : "FREE"}</p>
          <h1 className="raleway text-2xl md:text-4xl text-white font-semibold">
            {eventName}
          </h1>
        </div>
        <div className="bg-[#CBCACF66] flex gap-2 rounded-lg py-2 px-3">
          <div className="bg-[#14141A] p-2 rounded-xl">
            <Calendar size={30} color="#FF6932" />
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-white">
              {response.day} {response.month}, {response.year}
            </p>
            <p className="text-white text-sm">{response.time}</p>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-4">
            <div className="flex items-center justify-center">
              <Image
                src={"/assets/attendee1.png"}
                alt="attendee1"
                width={50}
                height={50}
                className="w-8 h-8 md:w-[50px] md:h-[50px]"
              />
              <Image
                src={"/assets/attendee2.png"}
                alt="attendee2"
                width={50}
                height={50}
                className="-ml-3 w-8 h-8 md:w-[50px] md:h-[50px]"
              />
              <Image
                src={"/assets/attendee3.png"}
                alt="attendee3"
                width={50}
                height={50}
                className="-ml-3 w-8 h-8 md:w-[50px] md:h-[50px]"
              />
              <Image
                src={"/assets/attendee4.png"}
                alt="attendee4"
                width={50}
                height={50}
                className="-ml-3 w-8 h-8 md:w-[50px] md:h-[50px]"
              />
              <Image
                src={"/assets/attendee5.png"}
                alt="attendee5"
                width={50}
                height={50}
                className="-ml-3 w-8 h-8 md:w-[50px] md:h-[50px]"
              />
              <p className="text-primary flex justify-center items-center text-sm p-2 bg-white rounded-full -ml-3 border-2 border-primary">
                {numberOfTickets - 5}+
              </p>
            </div>
            <div className="flex flex-col">
              <p className="font-semibold text-white">Participant</p>
              <p className="font-medium text-sm text-white">Across the globe</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <h1 className="text-white text-sm md:text-base font-medium">
              {speakers.length}+ Speakers
            </h1>
            <Image
              src={"/assets/oui_dot.png"}
              alt="dot"
              width={18}
              height={18}
            />
            <h1 className="text-white text-sm md:text-base  font-medium">
              {sponsors.length}+ Sponsors
            </h1>
            <Image
              src={"/assets/oui_dot.png"}
              alt="dot"
              width={18}
              height={18}
            />
            <h1 className="text-white text-sm md:text-base font-medium">
              {workshops.length}+ Workshops
            </h1>
          </div>
        </div>
        <div className="flex justify-end gap-8 items-center">
          <div className="pt-4 flex gap-4">
            <Share2 size={40} fill="#ffffff" color="#ffffff" />
            <Bookmark size={40} fill="#ffffff" color="#ffffff" />
          </div>
          <Button className="bg-primary raleway text-light-black hover:bg-primary hover:text-deep-blue w-60 py-6 text-xl mt-4 flex justify-center items-center">
            Register
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
