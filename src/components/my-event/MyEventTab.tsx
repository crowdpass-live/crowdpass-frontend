"use client";
import React from "react";
import MyEventTicket from "./Ticket";
// import EventSpok from "./EventSpok";

const MyEventTab = ({ ticket_price }: any) => {
  return (
    <div className={"w-full mb-8"}>
      <MyEventTicket ticket_price={ticket_price} />
      {/* <EventSpok /> */}
    </div>
  );
};

export default MyEventTab;
