import { Button } from "@/components/ui/button";
import React from "react";

const EventBasic = ({setActiveStep}:any) => {
  return (
    <div className="w-[655px] h-full flex flex-col gap-8">
      <div className="flex w-full h-[210px] bg-add-image justify-center items-center">
        <img
          src="/assets/add-icon-image.png"
          alt="create-event"
        />
      </div>
      <div className="flex flex-col gap-4 w-full">
        <h1 className="raleway font-semibold text-xl text-white">Event Name</h1>
        <input
          type="text"
          name="eventName"
          id="eventName"
          className="w-full bg-transparent border-white/70 text-white/70 rounded-lg h-14"
        />
      </div>
      <div className="flex gap-10 w-full">
        <div className="flex flex-col gap-4 w-[50%]">
          <h1 className="raleway font-semibold text-xl text-white">
            Event Organizer
          </h1>
          <input
            type="text"
            name="eventOrganizer"
            id="eventOrganizer"
            className="w-full bg-transparent border-white/70 text-white/70 rounded-lg h-14"
          />
        </div>
        <div className="flex flex-col gap-4 w-[50%]">
          <h1 className="raleway font-semibold text-xl text-white">
            Event Duration
          </h1>
          <input
            type="text"
            name="eventDuration"
            id="eventDuration"
            className="w-full bg-transparent border-white/70 text-white/70 rounded-lg h-14"
          />
        </div>
      </div>
      <div className="flex flex-col gap-4 w-full">
        <h1 className="raleway font-semibold text-xl text-white">
          Event Description
        </h1>
        <textarea
          name="eventDescription"
          id="eventDescription"
          className="w-full bg-transparent border-white/70 text-white/70 rounded-lg h-28"
        />
      </div>
      <div className="flex justify-end">
        <Button className="bg-primary raleway text-light-black hover:bg-primary hover:text-deep-blue px-10 py-7 text-xl mt-4 font-semibold" onClick={()=>setActiveStep(1)}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default EventBasic;
