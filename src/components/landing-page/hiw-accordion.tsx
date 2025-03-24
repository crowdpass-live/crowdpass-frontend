import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../ui/accordion";
import React from "react";

interface HiwAccordionItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface HiwAccordionProps {
  HiwAccordionData: HiwAccordionItem[];
}

const HiwAccordion = ({ HiwAccordionData }: HiwAccordionProps) => {
  return (
    <Accordion
      type="single"
      collapsible
      className="mx-1 w-full md:min-w-[500px] lg:p-8 gap-6"
    >
      {HiwAccordionData.map(({ icon, title, description }, index) => {
        return (
          <AccordionItem
            className={`rounded-md border-l-2 border-l-white bg-deep-blue border-b-deep-blue mb-6 px-4 w-full md:min-w-[500px]`}
            value={`item-${index + 1}`}
            key={index}
          >
            <AccordionTrigger>
              <div className="p-4 rounded-full flex gap-4 justify-center items-center h-16">
                <div className="bg-light-black p-2 lg:p-4 rounded-full">
                  {icon}
                </div>
                <p className="text-xl font-semibold raleway text-white">
                  {title}
                </p>
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
