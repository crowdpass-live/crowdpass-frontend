import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
  } from "../ui/accordion";
  import React from "react";
  
  const HiwAccordion = () => {
    const HiwAccordionData = [
      {
        icon: "/assets/decentralized-identity.png",
        title: "Browse Events.",
        description:
          "Explore a wide range of events on the platform, filter by category, location, or date, and select the event that interests you.",
      },
      {
        icon: "/assets/wallet.png",
        title: "Connect Your Wallet.",
        description:
          "Complete your event profile with essential information, such as name, location, and date. Showcase your event to potential attendees.",
      },
      {
        icon: "/assets/real-time-analytics.png",
        title: "Purchase Your Ticket.",
        description:
          "Effortlessly manage event tickets, track sales, and monitor revenue in real-time. Get insights into your event's performance.",
      },
      {
        icon: "/assets/event-management.png",
        title: "Attend the Event.",
        description:
          "Foster meaningful connections with attendees through our community-building tools. Encourage engagement and create a loyal following.",
      },
    ];
    
    return (
      <Accordion type="single" collapsible className="mx-1 w-full md:min-w-[500px] lg:p-8 gap-6">
        {HiwAccordionData.map(({ icon, title, description }, index) => {
          return (
            <AccordionItem
              className={`rounded-md border-l-2 border-l-white bg-deep-blue border-b-deep-blue mb-6 px-4 w-full md:min-w-[500px]`}
              value={`item-${index + 1}`}
              key={index}
            >
              <AccordionTrigger>
                <div className="p-4 rounded-full flex gap-4 justify-center items-center">
                  <div className="bg-light-black p-2 lg:p-4 rounded-full">
                    <img src={icon} className="w-6 h-6 lg:w-8 lg:h-8" />
                  </div>
                  <p className="text-xl font-semibold raleway text-white">{title}</p>
                </div>
              </AccordionTrigger>
              <AccordionContent className="text-base text-white px-6">
                {description}
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    );
  };
  
  export default HiwAccordion;