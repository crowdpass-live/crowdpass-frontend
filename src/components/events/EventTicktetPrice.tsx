import React from "react";

const EventTicketPrice = ({
  price,
  ticketType,
}: {
  price: number;
  ticketType: string;
}) => {
  return (
    <div className="bg-[#14141A66] border border-principal py-5  text-white flex items-center  rounded-2xl justify-center min-w-44 flex-col gap-2">
      <p className="text-sm text-white italic text-right">{ticketType}</p>
      <h1 className="text-white font-semibold text-4xl">${price}</h1>
    </div>
  );
};

export default EventTicketPrice;