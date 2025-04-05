"use client";

import React, { useContext, useState } from "react";
import CustomStepper from "@/components/create-event/CustomStepper";
import EventBasic from "@/components/dashboard/create-event-tabs/EventBasic";
import EventDetails from "@/components/dashboard/create-event-tabs/EventDetails";
import TicketingOptions from "@/components/dashboard/create-event-tabs/TicketingOptions";
import Review from "@/components/dashboard/create-event-tabs/Review";
import useCreateEvent from "@/hooks/write-hooks/useCreateEvent";
import { StarknetContext } from "@/contexts/UserContext";

const page = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [eventData, setEventData] = useState({
    eventName: "",
    eventOrganizer: "",
    eventUri: "",
    eventDescription: "",
    eventImage: "",
    eventLocation: "",
    eventStartDate: "",
    eventEndDate: "",
    eventCategory: "",
    eventType: "",
    ticketQuantity: "",
    ticketPrice: "",
    eventAcronym: "",
    eventSchedule: [] as any[]
  });
  const createEvent = useCreateEvent();
  const { isLoading }: any = useContext(StarknetContext);

  const handleCreateEvent = async () => {
    const response = await createEvent(
      eventData.eventName,
      eventData.eventAcronym,
      eventData.eventUri,
      eventData.eventDescription,
      eventData.eventOrganizer,
      eventData.eventType,
      eventData.eventCategory,
      eventData.eventLocation,
      eventData.eventSchedule,
      eventData.eventStartDate,
      eventData.eventEndDate,
      Number(eventData.ticketQuantity),
      Number(eventData.ticketPrice),
    )
  };

  const ActiveStepComponent = ({ setActiveStep }: any) => {
    switch (activeStep) {
      case 0:
        return (
          <EventBasic
            setActiveStep={setActiveStep}
            eventData={eventData}
            setEventData={setEventData}
          />
        );
      case 1:
        return (
          <EventDetails
            setActiveStep={setActiveStep}
            eventData={eventData}
            setEventData={setEventData}
          />
        );
      case 2:
        return (
          <TicketingOptions
            setActiveStep={setActiveStep}
            eventData={eventData}
            setEventData={setEventData}
          />
        );
      case 3:
        return <Review setActiveStep={setActiveStep} eventData={eventData} handleCreateEvent={handleCreateEvent} />;
      default:
        return (
          <EventBasic
            setActiveStep={setActiveStep}
            eventData={eventData}
            setEventData={setEventData}
          />
        );
    }
  };

  return (
    <>
      <h1 className="raleway font-medium text-2xl md:text-4xl mb-3 md:mb-6 text-white">
        Create Events
      </h1>
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="text-white text-2xl">Creating your event...</div>
        </div>
      )}
      <div className="flex w-full justify-center">

      
      <div className="bg-[#14141A] rounded-xl w-full h-full p-6 md:p-10 flex gap-20">
        <CustomStepper activeStep={activeStep} />
        <ActiveStepComponent setActiveStep={setActiveStep} />
      </div>
      </div>
    </>
  );
};

export default page;