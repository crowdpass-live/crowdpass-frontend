import { Button } from "@/components/ui/button";
import React, { useState } from "react";

const TicketingOptions = ({ setActiveStep, eventData, setEventData }: any) => {
  const [localEventData, setLocalEventData] = useState({ ...eventData });
  
  const isSpokAvailable = ["false", "true"];
  
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    
    // Only update local state during typing
    setLocalEventData((prevData: any) => ({ 
      ...prevData, 
      [name]: value 
    }));
  };
  
  const handleNextClick = () => {
    // Only update parent state when moving to the next step
    setEventData(localEventData);
    setActiveStep(3);
  };

  const handlePreviousClick = () => {
    // Update parent state before going back
    setEventData(localEventData);
    setActiveStep(1);
  };
  
  return (
    <div className="w-[655px] h-full flex flex-col gap-8">
      <div className="flex flex-col md:flex-row gap-10 w-full">
        <div className="flex flex-col gap-4 w-full md:w-[50%] text-white/70">
          <h1 className="raleway font-medium text-xl text-white">
            Ticketing Quantity
          </h1>
          <input
            type="number"
            name="ticketQuantity"
            id="ticketQuantity"
            className="w-full bg-transparent border-white/70 text-white/70 rounded-lg h-10 md:h-14"
            value={localEventData.ticketQuantity || ""}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex flex-col gap-4 w-full md:w-[50%] text-white/70">
          <h1 className="raleway font-medium text-xl text-white">Ticket Price</h1>
          <input
            type="number"
            name="ticketPrice"
            id="ticketPrice"
            className="w-full bg-transparent border-white/70 text-white/70 rounded-lg h-10 md:h-14"
            value={localEventData.ticketPrice || ""}
            onChange={handleInputChange}
          />
        </div> 
      </div>
      <div className="flex flex-col md:flex-row gap-10 w-full">
        <div className="flex flex-col gap-4 w-full md:w-[50%] text-white/70">
          <h1 className="raleway font-medium text-xl text-white">
            Spok Availability
          </h1>
          <select 
            name="spokAvailability" 
            id="spokAvailability" 
            className="w-full bg-transparent border-white/70 text-white/70 rounded-lg h-10 md:h-14"
            value={localEventData.spokAvailability || "false"}
            onChange={handleInputChange}
          >
            {isSpokAvailable.map((available) => (
              <option key={available} value={available} className="text-[#B0B0B4] m-2">
                {available}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-4 w-full md:w-[50%] text-white/70">
          <h1 className="raleway font-medium text-xl text-white">SPOK Amount</h1>
          <input
            type="number"
            name="spokAmount"
            id="spokAmount"
            className="w-full bg-transparent border-white/70 text-white/70 rounded-lg h-10 md:h-14"
            value={localEventData.spokAmount || ""}
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
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default TicketingOptions;