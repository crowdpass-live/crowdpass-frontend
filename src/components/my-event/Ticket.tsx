import React from "react";
import QRCode from "react-qr-code";

type Props = {};

const MyEventTicket = (props: Props) => {
  return (
    <div className="w-full px-10 md:h-72 md:bg-ticketImage bg-black md:bg-transparent rounded-3xl md:bg-cover flex flex-col md:flex-row justify-center items-center py-2">
      <div className="md:w-72 md:-rotate-90 flex flex-col justify-center">
        <div className="flex justify-end mt-6 md:mt-0">
          <p className="bg-primary text-black raleway p-2 rounded-full ">$50</p>
        </div>
        <div className="flex flex-col gap-2 justify-center items-center">
          <p className="text-white raleway text-5xl font-medium">VIP</p>
          <p className="text-primary">(VIP - TIX19028999)</p>
        </div>
        <hr className="h-1 w-64 border-primary mt-6" />
      </div>
      <div className="flex justify-center items-center bg-white my-6 rounded-md md:mr-12 w-full md:w-64 md:h-52 px-4">
        <QRCode value="sogobanwo@gmail.com" className="p-6" />
      </div>
    </div>
  );
};

export default MyEventTicket;