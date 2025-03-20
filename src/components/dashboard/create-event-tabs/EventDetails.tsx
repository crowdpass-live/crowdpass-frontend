import { Button } from "@/components/ui/button";
import React, { useState, useMemo } from "react";
import Autocomplete from "react-google-autocomplete";

const EventDetails = ({ setActiveStep, eventData, setEventData }: any) => {
  const googleApiKey = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

  const [localEventData, setLocalEventData] = useState({ ...eventData });

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
    
    setLocalEventData((prevData: any) => ({ 
      ...prevData, 
      [name]: value 
    }));
  };

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

  const handlePreviousClick = () => {
    setEventData(localEventData);
    setActiveStep(0);
  };

  return (
    <div className="w-[655px] h-full overflow-y-auto flex flex-col gap-8">
      <div className="flex flex-col gap-4 w-full">
        <h1 className="raleway font-semibold text-xl text-white">Event Location</h1>
        <input
          type="text"
          name="eventLocation"
          id="eventLocation"
          className="w-full bg-transparent border-white/70 text-white/70 rounded-lg h-10 md:h-14"
          value={localEventData.eventLocation || ""}
          onChange={handleInputChange}
        />
      </div>

      <div className="flex flex-col md:flex-row gap-10 w-full">
        <div className="flex flex-col gap-4 w-full md:w-[50%] text-white/70">
          <h1 className="raleway font-semibold text-xl text-white">Event Category</h1>
          <select
            name="eventCategory"
            id="eventCategory"
            className="w-full bg-transparent border-white/70 text-white/70 rounded-lg h-10 md:h-14"
            value={localEventData.eventCategory || ""}
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

        <div className="flex flex-col gap-4 w-full md:w-[50%]">
          <h1 className="raleway font-semibold text-xl text-white">Event Type</h1>
          <select
            name="eventType"
            id="eventType"
            className="w-full bg-transparent border-white/70 text-white/70 rounded-lg h-10 md:h-14"
            value={localEventData.eventType || ""}
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

      <div className="flex flex-col md:flex-row gap-10 w-full">
        <div className="flex flex-col gap-4 w-full md:w-[50%]">
          <h1 className="raleway font-semibold text-xl text-white">Start Date and Time</h1>
          <input
            type="datetime-local"
            name="eventStartDate"
            id="eventStartDate"
            className="w-full bg-transparent border-white/70 text-white/70 rounded-lg h-10 md:h-14"
            value={localEventData.eventStartDate || ""}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex flex-col gap-4 w-full md:w-[50%]">
          <h1 className="raleway font-semibold text-xl text-white">End Date and Time</h1>
          <input
            type="datetime-local"
            name="eventEndDate"
            id="eventEndDate"
            className="w-full bg-transparent border-white/70 text-white/70 rounded-lg h-10 md:h-14"
            value={localEventData.eventEndDate || ""}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="flex justify-end gap-5">
        <Button
          className="bg-primary raleway text-light-black hover:bg-primary hover:text-deep-blue px-10 py-7 text-xl mt-4 font-semibold"
          onClick={handlePreviousClick}
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