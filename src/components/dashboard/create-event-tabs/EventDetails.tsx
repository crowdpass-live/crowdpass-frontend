import { Button } from "@/components/ui/button";
import React, { useState, useMemo, useEffect } from "react";
import { datetimeToEpochTime } from "datetime-epoch-conversion";

const EventDetails = ({ setActiveStep, eventData, setEventData }: any) => {
  const [localEventData, setLocalEventData] = useState({ ...eventData });
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);

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
    "Corporate",
    "Networking",
    "Education",
  ];
  const eventTypes = ["Online", "Offline"];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    let processedValue = value;

    // Convert datetime to epoch if applicable
    // if (name === "eventStartDate" || name === "eventEndDate") {
    //   processedValue = datetimeToEpochTime(value).toString();
    // }

    setLocalEventData((prevData: any) => ({ ...prevData, [name]: processedValue }));
    if (typingTimeout) clearTimeout(typingTimeout);
    const timeout = setTimeout(() => {
      setEventData((prevData: any) => ({ ...prevData, [name]: processedValue }));
    }, 2000);
    setTypingTimeout(timeout);
  };

  useEffect(() => {
    setLocalEventData(eventData);
  }, [eventData]);

  const isFormValid = useMemo(() => {
    return (
      localEventData.eventLocation?.trim() !== "" &&
      localEventData.eventCategory?.trim() !== "" &&
      localEventData.eventType?.trim() !== "" &&
      localEventData.eventStartDate?.trim() !== "" &&
      localEventData.eventEndDate?.trim() !== ""
    );
  }, [localEventData]);

  const handleNextClick = () => {
    setEventData(localEventData);
    setActiveStep(2);
  };

  return (
    <div className="w-[655px] h-full flex flex-col gap-8">
      <div className="flex flex-col gap-4 w-full">
        <h1 className="raleway font-semibold text-xl text-white">Event Location</h1>
        <input
          type="text"
          name="eventLocation"
          id="eventLocation"
          className="w-full bg-transparent border-white/70 text-white/70 rounded-lg h-14"
          value={localEventData.eventLocation}
          onChange={handleInputChange}
        />
        <a href="#" className="flex justify-end text-[#B0B0B4] underline">
          select from map
        </a>
      </div>

      <div className="flex gap-10 w-full">
        <div className="flex flex-col gap-4 w-[50%] text-white/70">
          <h1 className="raleway font-semibold text-xl text-white">Event Category</h1>
          <select
            name="eventCategory"
            id="eventCategory"
            className="bg-transparent rounded-lg"
            value={localEventData.eventCategory}
            onChange={handleInputChange}
          >
            <option value="" disabled>Select Category</option>
            {categories.map((category) => (
              <option key={category} value={category} className="text-[#B0B0B4] m-2">
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-4 w-[50%] text-white/70">
          <h1 className="raleway font-semibold text-xl text-white">Event Type</h1>
          <select
            name="eventType"
            id="eventType"
            className="bg-transparent rounded-lg"
            value={localEventData.eventType}
            onChange={handleInputChange}
          >
            <option value="" disabled>Select Type</option>
            {eventTypes.map((eventType) => (
              <option key={eventType} value={eventType} className="text-[#B0B0B4] m-2">
                {eventType}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex gap-10 w-full">
        <div className="flex flex-col gap-4 w-[50%] text-white/70">
          <h1 className="raleway font-semibold text-xl text-white">Start Date and Time</h1>
          <input
            type="datetime-local"
            name="eventStartDate"
            id="eventStartDate"
            className="w-full bg-transparent border-white/70 rounded-lg"
            value={localEventData.eventStartDate}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex flex-col gap-4 w-[50%] text-white/70">
          <h1 className="raleway font-semibold text-xl text-white">End Date and Time</h1>
          <input
            type="datetime-local"
            name="eventEndDate"
            id="eventEndDate"
            className="w-full bg-transparent border-white/70 rounded-lg"
            value={localEventData.eventEndDate}
            onChange={handleInputChange}
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
          onClick={handleNextClick}
          disabled={!isFormValid}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default EventDetails;
