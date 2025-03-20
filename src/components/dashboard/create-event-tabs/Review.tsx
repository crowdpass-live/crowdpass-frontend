import { Button } from "@/components/ui/button";
import { datetimeToEpochTime } from "datetime-epoch-conversion";
import React from "react";

const Review = ({setActiveStep, eventData, handleCreateEvent}:any) => {
  
  const durationMilliseconds = (datetimeToEpochTime(eventData?.eventEndDate) - datetimeToEpochTime(eventData?.eventStartDate)) * 1000;

  const durationDays = Math.floor(durationMilliseconds / (1000 * 60 * 60 * 24)) ;

  const durationHours = Math.floor((durationMilliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))

  return (
    <div className="w-full md:w-[655px] h-full overflow-y-auto flex flex-col gap-8">
      <img
        src={URL.createObjectURL(eventData?.eventImage)}
        alt="event image"
        className="w-full h-[210px] object-cover"
      />
      <div className="w-full">
        <hr className="text-white" />
        <h1 className="raleway text-2xl md:text-4xl text-white font-semibold my-4">
          Description
        </h1>
        <hr className="text-white" />
        <p className="text-white my-4">
        {eventData?.eventDescription}
        </p>
      </div>
      <div className="w-full">
        <hr className="text-white " />
        <h1 className="raleway text-2xl md:text-4xl text-white font-semibold my-4">
          Ticket
        </h1>
        <hr className="text-white" />
        <div className="flex flex-col md:flex-row gap-6 md:gap-3 justify-between my-6">
          <div className="border p-4 border-[#B0B0B4] flex flex-col gap-4 w-full md:w-80 rounded-lg">
            <p className="bg-[#5B5959] w-full rounded-lg flex raleway text-lg justify-center items-center py-3 text-white">
              Summary
            </p>
            <div className="flex justify-between items-center">
              <p className="text-[#FFFAFA]">Number of Tickets</p>
              <p className="text-[#FFFAFA]">{eventData?.ticketQuantity}</p>
            </div>
            <hr className="text-[#FFFAFA]" />
            <div className="flex justify-between items-center">
              <p className="text-[#FFFAFA]">Spok</p>
              <p className="text-[#FFFAFA]">0</p>
            </div>
            <hr className="text-[#FFFAFA]" />
            <div className="flex justify-between items-center">
              <p className="text-[#FFFAFA]">Duration</p>
              <p className="text-[#FFFAFA]">{durationDays >= 1 ? `${durationDays} days and ${durationHours} hours` : `${durationHours} hours`}</p>
            </div>
            <hr className="text-[#FFFAFA]" />

            <ul className="space-y-4">
              <li className="text-[#B0B0B4]">Price - {eventData?.ticketPrice} Strk</li>
            </ul>
          </div>
          <div className="w-full md:w-64 flex flex-col justify-between">
            <div className="flex flex-col gap-4">
              <img
                src="/assets/MapImage.png"
                alt="map image"
                className="w-full h-40 object-cover"
              />
              <p className="text-white">
              {eventData?.eventLocation}
              </p>
            </div>
            <p className="text-white"><span className="font-bold ">Organized By:</span> {eventData?.eventOrganizer}</p>
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-5">
        <Button
          className="bg-primary raleway text-light-black hover:bg-primary hover:text-deep-blue px-10 py-7 text-xl mt-4 font-semibold"
          onClick={() => setActiveStep(2)}
        >
          Back
        </Button>
        <Button
          className="bg-primary raleway text-light-black hover:bg-primary hover:text-deep-blue px-10 py-7 text-xl mt-4 font-semibold"
          onClick={() => {
            handleCreateEvent()
          }}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default Review;
