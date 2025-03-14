import { Button } from "@/components/ui/button";
import React from "react";

const TicketingOptions = ({setActiveStep}:any) => {
  const isSpokAvailable = ["false", "true"];
  return (
    <div className="w-[655px] h-full flex flex-col gap-8">
      <div className="flex gap-10 w-full">
        <div className="flex flex-col gap-4 w-[50%] text-white/70">
          <h1 className="raleway font-medium text-xl text-white">
            Ticketing Quantity
          </h1>
          <input
            type="number"
            name="ticketQuantity"
            id="ticketQuantity"
            className="w-full bg-transparent border-white/70 rounded-lg"
          />
        </div>
        <div className="flex flex-col gap-4 w-[50%] text-white/70">
          <h1 className="raleway font-medium text-xl text-white">Ticket Price</h1>
          <input
            type="number"
            name="ticketPrice"
            id="ticketPrice"
            className="w-full bg-transparent border-white/70 rounded-lg"
          />
        </div> 
      </div>
      <div className="flex gap-10 w-full">
        <div className="flex flex-col gap-4 w-[50%] text-white/70">
          <h1 className="raleway font-medium text-xl text-white">
            Spok Availability
          </h1>
          <select name="eventCategory" id="eventCategory" className="bg-transparent rounded-lg">
            {isSpokAvailable.map((available) => (
              <option value={available} className="text-[#B0B0B4] m-2">
                {available}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-4 w-[50%] text-white/70">
          <h1 className="raleway font-medium text-xl text-white">SPOK Amount</h1>
          <input
            type="number"
            name="spokAmount"
            id="spokAmount"
            className="w-full bg-transparent border-white/70 rounded-lg"
          />
        </div>
      </div>
      <div className="flex justify-end gap-5">
        <Button
          className="bg-primary raleway text-light-black hover:bg-primary hover:text-deep-blue px-10 py-7 text-xl mt-4 font-semibold"
          onClick={() => setActiveStep(1)}
        >
          Previous
        </Button>
        <Button
          className="bg-primary raleway text-light-black hover:bg-primary hover:text-deep-blue px-10 py-7 text-xl mt-4 font-semibold"
          onClick={() => setActiveStep(3)}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default TicketingOptions;
