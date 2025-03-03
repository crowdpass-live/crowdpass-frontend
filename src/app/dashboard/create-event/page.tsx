"use client";

import React, { useState } from "react";
import CustomStepper from "@/components/create-event/CustomStepper";
import EventBasic from "@/components/dashboard/create-event-tabs/EventBasic";
import EventDetails from "@/components/dashboard/create-event-tabs/EventDetails";
import TicketingOptions from "@/components/dashboard/create-event-tabs/TicketingOptions";
import Review from "@/components/dashboard/create-event-tabs/Review";

const page = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [eventData, setEventData] = useState({
    eventName: "",
    eventOrganizer: "",
    eventUri: "",
    eventDescription: "",
    eventImage: null as File | null, 
    eventLocation: "",
    ticketQuantity: "",
   

  });
  const ActiveStepComponent = ({setActiveStep}:any) => {
    switch (activeStep) {
      case 0:
        return <EventBasic setActiveStep={setActiveStep} eventData={eventData} setEventData={setEventData}/>;
      case 1:
        return <EventDetails setActiveStep={setActiveStep} eventData={eventData} setEventData={setEventData}/>;
      case 2:
        return <TicketingOptions setActiveStep={setActiveStep} eventData={eventData} setEventData={setEventData}/>;
      case 3:
        return <Review setActiveStep={setActiveStep} eventData={eventData} setEventData={setEventData}/>;
      default:
        return <EventBasic setActiveStep={setActiveStep} eventData={eventData} setEventData={setEventData}/>;
    }
  };

  return (
    <>
      <h1 className="raleway font-medium text-4xl mb-6 text-white">
        Create Events
      </h1>
      <div className="bg-[#14141A] rounded-xl w-full p-10 flex  gap-10 justify-evenly">
        <CustomStepper activeStep={activeStep}/>
        <ActiveStepComponent setActiveStep={setActiveStep} />
      </div>
    </>
  );
};

export default page;
