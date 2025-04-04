import React from "react";
import EventDay from "./EventDay";
import { CiShare1 } from "react-icons/ci";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { TbMessageCircleUser } from "react-icons/tb";
import AnalyticsReview from "./AnalyticsReview";

type Props = {
  eventDetails: any;
};

const EventAnalytics = (props: Props) => {
  const { event } = props.eventDetails  

  function setActiveComponent(arg0: number): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="flex flex-col gap-6">
      <EventDay />
      <div className="flex flex-col md:flex-row gap-4">
        <div className="bg-transparent border border-[#5B5959] rounded-xl flex-1 p-4">
          <h1 className="text-base xl:text-2xl text-white font-semibold raleway">
            Daily Ticket Count
          </h1>
          <div className="bg-[#5B5959] h-3 rounded-3xl w-full mt-2">
            <div className="bg-primary h-full rounded-3xl w-[0%]"></div>
          </div>
          <div className="flex justify-between items-center mt-2">
            <p className="text-white text-sm font-thin">Sold: 0 Tickets</p>
            <p className="text-white text-sm font-thin">Revenue: $0</p>
            <p className="text-white text-sm font-thin">{Number(event.total_tickets)} left</p>
          </div>
        </div>

        <div className="bg-transparent border border-[#5B5959] rounded-xl flex-1 p-4 flex flex-col items-center justify-center">
          <p className="text-sm text-[#5B5959]">Ticket Revenue</p>
          <h1 className="text-3xl text-white font-semibold">$0</h1>
        </div>
        <div className="bg-transparent border border-[#5B5959] rounded-xl flex-1 p-4 flex flex-col items-center justify-center">
          <p className="text-sm text-[#5B5959]">Total Attendees</p>
          <h1 className="text-3xl text-white font-semibold">0</h1>
        </div>
        <div className="bg-transparent border border-[#5B5959] rounded-xl flex-1 p-4 flex flex-col items-center justify-center">
          <p className="text-sm text-[#5B5959]">Delegate</p>
          <h1 className="text-3xl text-white font-semibold">0</h1>
        </div>
      </div>
      <div>
        <hr className="text-white " />
        <h1 className="raleway text-2xl md:text-4xl text-white font-semibold my-4">
          Reviews
        </h1>
        <hr className="text-white" />
        <div className="flex flex-col md:flex-row gap-10 my-6">
          <div className="flex flex-col gap-4 w-4/5">
            <AnalyticsReview />
          </div>
          <div className="flex flex-col gap-4 w-1/5">
            <div className="bg-transparent border border-[#5B5959] rounded-xl flex-1 p-4 flex flex-col items-center justify-center">
              <div className="flex justify-center items-center p-3 border border-white border-dashed rounded-full mb-1">
                <TbMessageCircleUser size={30} color="#ffffff" />
              </div>
              <p className="text-sm text-[#5B5959]">Feedbacks</p>
              <h1 className="text-white text-3xl">0</h1>
            </div>
            <div className="bg-transparent border border-[#5B5959] rounded-xl flex-1 p-4 flex flex-col items-center justify-center">
              <p className="text-sm text-[#5B5959]">Refunds</p>
              <h1 className="text-white text-3xl">0</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventAnalytics;
