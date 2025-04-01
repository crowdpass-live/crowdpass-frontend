"use client";
import React from "react";
import MyEventTicket from "./Ticket";
import EventSpok from "./EventSpok";

const MyEventTab = ({ eventDetails }: any) => {
  return (
    <div className={"w-full mb-8"}>
      <MyEventTicket />
      <EventSpok />
    </div>
  );
};

export default MyEventTab;
