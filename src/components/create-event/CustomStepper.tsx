"use client";

import { FaCircle } from "react-icons/fa";
import { RxDividerVertical } from "react-icons/rx";
import { RiCalendarEventFill } from "react-icons/ri";
import { TbListDetails } from "react-icons/tb";
import { BiSolidMessageEdit } from "react-icons/bi";
import { IoTicket } from "react-icons/io5";
import React from "react";

const CustomStepper = ({ activeStep }: any) => {
  return (
    <div className="hidden lg:flex flex-col lg:w-64 xl:w-80">
      <div>
        <div className="flex items-center gap-10 justify-between">
          <p className="text-white raleway text-xl">Event Basics</p>
          <div className="flex gap-4 items-center">
            <div className="bg-primary w-12 h-12 rounded-full flex justify-center items-center">
              <RiCalendarEventFill size={24} color={"#000000"} />
            </div>
            <FaCircle size={27} color={"#FF6932"} className="z-10" />
          </div>
        </div>
        <div className="flex justify-end -mr-9 -mt-8">
          <RxDividerVertical
            size={100}
            color={activeStep > 0 ? `#FF6932` : "#ffffff"}
            className="font-thin"
          />
        </div>
      </div>
      <div className="-mt-7">
        <div className="flex items-center gap-10 justify-between">
          <p className="text-white raleway text-xl">Event Details</p>
          <div className="flex gap-4 items-center">
            <div className={`${activeStep > 0 ? "bg-primary":"bg-transparent border border-white"} w-12 h-12 rounded-full flex justify-center items-center`}>
              <TbListDetails size={24} color={activeStep > 0 ? `#000000` : "#ffffff"} />
            </div>
            <FaCircle
              size={27}
              color={activeStep > 0 ? `#FF6932` : "#ffffff"}
              className="z-10"
            />
          </div>
        </div>
        <div className="flex justify-end -mr-9 -mt-8">
          <RxDividerVertical
            size={100}
            color={activeStep > 1 ? `#FF6932` : "#ffffff"}
          />
        </div>
      </div>
      <div className="-mt-7">
        <div className="flex items-center gap-10 justify-between">
          <p className="text-white raleway text-xl">Ticketing Options</p>
          <div className="flex gap-4 items-center">
          <div className={`${activeStep > 1 ? "bg-primary":"bg-transparent border border-white"} w-12 h-12 rounded-full flex justify-center items-center`}>
          <IoTicket size={24} color={activeStep > 1 ? `#000000` : "#ffffff"} />
            </div>
            <FaCircle
              size={27}
              color={activeStep > 1 ? `#FF6932` : "#ffffff"}
              className="z-10 -mt-1"
            />
          </div>
        </div>
        <div className="flex justify-end -mr-9 -mt-8">
          <RxDividerVertical
            size={100}
            color={activeStep > 2 ? `#FF6932` : "#ffffff"}
          />
        </div>
      </div>
      <div className="-mt-7">
        <div className="flex items-center gap-10 justify-between">
          <p className="text-white raleway text-xl">Review</p>
          <div className="flex gap-4 items-center">
          <div className={`${activeStep > 2 ? "bg-primary":"bg-transparent border border-white"} w-12 h-12 rounded-full flex justify-center items-center`}>
          <BiSolidMessageEdit size={24} color={activeStep > 2 ? `#000000` : "#ffffff"} />
            </div>
            <FaCircle
              size={27}
              color={activeStep > 2 ? `#FF6932` : "#ffffff"}
              className="z-10"
            />
          </div>
        </div>
        <div className="flex justify-end -mr-9 -mt-8">
          <RxDividerVertical
            size={100}
            color={activeStep > 3 ? `#FF6932` : "#ffffff"}
          />
        </div>
      </div>
    </div>
  );
};

export default CustomStepper;
