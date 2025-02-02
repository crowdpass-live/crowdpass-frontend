import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";

type Props = {};

const TicketList = (props: Props) => {
  return (
    <Card className="bg-deep-blue rounded-md p-5 flex flex-col raleway border-0">
      <div className="flex flex-col gap-2 md:flex-row justify-between md:items-center">
        <div className="flex gap-4 items-center">
          <Image
            src={"/assets/ticket-buy.png"}
            alt="dot"
            width={70}
            height={70}
            className="w-10 h-10 md:w-16 md:h-16"
          />
          <div className="flex flex-col  text-white">
            <h3 className="font-normal">Manoah_luka@gmail.com</h3>
            <h3 className="font-normal">0x0GHTN546390275ZA*******</h3>
          </div>
        </div>
        <div className="flex justify-between md:flex-col">
          <div className="flex items-center gap-2">
            <h1 className="text-white text-sm md:text-sm">1 Ticket</h1>
            <Image
              src={"/assets/oui_dot.png"}
              alt="dot"
              width={18}
              height={18}
            />
            <h1 className="text-white text-sm md:text-sm">
              sales Price: $10
            </h1>
          </div>
          <div className="flex justify-end">

          <Button className="bg-primary text-light-black px-5 py-4 md:px-8 md:py-6 font-bold">Buy</Button>
        </div>
          </div>
      </div>
    </Card>
  );
};

export default TicketList;
