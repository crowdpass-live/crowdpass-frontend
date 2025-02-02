"use client";

import React from "react";
import CustomStepper from "@/components/create-event/CustomStepper";
import EventBasic from "@/components/dashboard/create-event-tabs/EventBasic";
import EventDetails from "@/components/dashboard/create-event-tabs/EventDetails";
import TicketingOptions from "@/components/dashboard/create-event-tabs/TicketingOptions";
import Review from "@/components/dashboard/create-event-tabs/Review";

const page = () => {
  const [activeStep, setActiveStep] = React.useState(0);

  const ActiveStepComponent = ({setActiveStep}:any) => {
    switch (activeStep) {
      case 0:
        return <EventBasic setActiveStep={setActiveStep}/>;
      case 1:
        return <EventDetails setActiveStep={setActiveStep}/>;
      case 2:
        return <TicketingOptions setActiveStep={setActiveStep}/>;
      case 3:
        return <Review setActiveStep={setActiveStep}/>;
      default:
        return <EventBasic setActiveStep={setActiveStep}/>;
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
