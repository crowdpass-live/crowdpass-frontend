import { Button } from "@/components/ui/button";
import React from "react";

const EventDetails = ({ setActiveStep }: any) => {
  const categories = [
    "Sports",
    "Festivals",
    "Gaming",
    "Wellness",
    "Exhibition",
    "Travels",
    "Family",
    "Fundraisers",
    "Concerts",
    "Climate",
    "Theatre",
    "Technology",
    "Webinars",
    "Corperate",
    "Networking",
    "Education",
  ];
  const eventTypes = ["Online", "Offline"];

  return (
    <div className="w-[655px] h-full flex flex-col gap-8">
      <div className="flex flex-col gap-4 w-full">
        <h1 className="raleway font-semibold text-xl text-white">
          Event Location
        </h1>
        <input
          type="text"
          name="eventLocation"
          id="eventLocation"
          className="w-full bg-transparent border-white/70 text-white/70 rounded-lg h-14"
        />
        <a href="#" className="flex justify-end text-[#B0B0B4] underline">
          select from map
        </a>
      </div>
      <div className="flex gap-10 w-full">
        <div className="flex flex-col gap-4 w-[50%] text-white/70">
          <h1 className="raleway font-semibold text-xl text-white">
            Ticket Quantity
          </h1>
          <select name="eventCategory" id="eventCategory" className="bg-transparent rounded-lg">
            {categories.map((category) => (
              <option value={category} className="text-[#B0B0B4] m-2">
                {category}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-4 w-[50%] text-white/70">
          <h1 className="raleway font-semibold text-xl text-white">Event Type</h1>
          <select name="eventType" id="eventType" className="bg-transparent rounded-lg">
            {eventTypes.map((eventType) => (
              <option value={eventType} className="text-[#B0B0B4] m-2">
                {eventType}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex gap-10 w-full">
        <div className="flex flex-col gap-4 w-[50%] text-white/70">
          <h1 className="raleway font-semibold text-xl text-white">Start Date</h1>
          <input
            type="date"
            name="eventStartDate"
            id="eventStartDate"
            className="w-full bg-transparent border-white/70 rounded-lg"
          />
        </div>
        <div className="flex flex-col gap-4 w-[50%] text-white/70">
          <h1 className="raleway font-semibold text-xl text-white">End Date</h1>
          <input
            type="date"
            name="eventEndDate"
            id="eventEndDate"
            className="w-full bg-transparent border-white/70 rounded-lg"
          />
        </div>
      </div>
      <div className="flex gap-10 w-full">
        <div className="flex flex-col gap-4 w-[50%] text-white/70">
          <h1 className="raleway font-semibold text-xl text-white">Start Time</h1>
          <input
            type="time"
            name="eventStartTime"
            id="eventStartTime"
            className="w-full bg-transparent border-white/70 rounded-lg"
          />
        </div>
        <div className="flex flex-col gap-4 w-[50%] text-white/70">
          <h1 className="raleway font-semibold text-xl text-white">End Time</h1>
          <input
            type="time"
            name="eventEndTime"
            id="eventEndTime"
            className="w-full bg-transparent border-white/70 rounded-lg"
          />
        </div>
      </div>
      <div className="flex justify-end gap-5">
        <Button
          className="bg-primary raleway text-light-black hover:bg-primary hover:text-deep-blue px-10 py-7 text-xl mt-4 font-semibold"
          onClick={() => setActiveStep(0)}
        >
          Previous
        </Button>
        <Button
          className="bg-primary raleway text-light-black hover:bg-primary hover:text-deep-blue px-10 py-7 text-xl mt-4 font-semibold"
          onClick={() => setActiveStep(2)}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default EventDetails;
