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

type Props = {};

const EventAnalytics = (props: Props) => {
  const DoughnutData = {
    data: [
      { name: "Paid", value: 12 },
      { name: "Free", value: 19 },
    ],
    datasets: [
      {
        label: "Event Stats",
        data: [12, 19],
        backgroundColor: ["#B0B0B4", "#5B5959"],
        borderColor: ["#B0B0B4", "#5B5959"],
        borderWidth: 0,
        borderRadius: 100,
        offset: 2,
      },
    ],
  };

  const data = [
    { x: 100, y: 200, z: 200 },
    { x: 120, y: 100, z: 260 },
    { x: 170, y: 300, z: 400 },
    { x: 140, y: 250, z: 280 },
    { x: 150, y: 400, z: 500 },
    { x: 110, y: 280, z: 200 },
  ];

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
            <div className="bg-primary h-full rounded-3xl w-[10%]"></div>
          </div>
          <div className="flex justify-between items-center mt-2">
            <p className="text-white text-sm font-thin">Sold: 20 Tickets</p>
            <p className="text-white text-sm font-thin">Revenue: $100</p>
            <p className="text-white text-sm font-thin">180 left</p>
          </div>
        </div>

        <div className="bg-transparent border border-[#5B5959] rounded-xl flex-1 p-4 flex flex-col items-center justify-center">
          <p className="text-sm text-[#5B5959]">Ticket Revenue</p>
          <h1 className="text-3xl text-white font-semibold">$4000</h1>
        </div>
        <div className="bg-transparent border border-[#5B5959] rounded-xl flex-1 p-4 flex flex-col items-center justify-center">
          <p className="text-sm text-[#5B5959]">Total Attendees</p>
          <h1 className="text-3xl text-white font-semibold">452</h1>
        </div>
        <div className="bg-transparent border border-[#5B5959] rounded-xl flex-1 p-4 flex flex-col justify-between">
          <div className="flex justify-between items-center">
            <p className="text-white text-sm font-thin">Free: 1</p>
            <p className="text-white text-sm font-thin">Paid: 1</p>
          </div>
          <div className="flex flex-col justify-center items-center">
            <p className="text-white text-sm font-thin">Events</p>
            <h1 className="text-3xl text-white font-semibold">2</h1>
          </div>
          <div
            className="flex gap-2 items-center hover:cursor-pointer hover:text-primary"
            onClick={() => setActiveComponent(1)}
          >
            <p className="text-white text-xs font-thin">Sold: 20 Tickets</p>
            <CiShare1 size={18} color="#ffffff" />
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="bg-transparent border border-[#5B5959] rounded-xl flex-1 p-4">
          <ResponsiveContainer width="100%" height={400}>
            <ScatterChart>
              <XAxis type="number" dataKey="x" name="stature" unit="cm" />
              <YAxis type="number" dataKey="y" name="weight" unit="kg" />
              <Tooltip cursor={{ strokeDasharray: "3 3" }} />
              <Scatter name="A school" data={data} fill="#8884d8" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-transparent border border-[#5B5959] rounded-xl flex-1 p-4 flex flex-col justify-start gap-10">
          <h1 className="text-white text-3xl raleway font-medium">
            User Stats
          </h1>
          <div className="flex justify-center">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={DoughnutData.data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {DoughnutData.data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        DoughnutData.datasets[0].backgroundColor[
                          index %
                            DoughnutData.datasets[0].backgroundColor.length
                        ]
                      }
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="bg-transparent border border-[#5B5959] rounded-xl flex-1 p-4 flex flex-col justify-start gap-10">
          <h1 className="text-white text-3xl raleway font-medium">
            User Stats
          </h1>
          <div className="flex justify-center">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={DoughnutData.data}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {DoughnutData.data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        DoughnutData.datasets[0].backgroundColor[
                          index %
                            DoughnutData.datasets[0].backgroundColor.length
                        ]
                      }
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="bg-transparent border border-[#5B5959] rounded-xl flex-1 p-4">
          <ResponsiveContainer width="100%" height={400}>
            <ScatterChart>
              <XAxis type="number" dataKey="x" name="stature" unit="cm" />
              <YAxis type="number" dataKey="y" name="weight" unit="kg" />
              <Tooltip cursor={{ strokeDasharray: "3 3" }} />
              <Scatter name="A school" data={data} fill="#8884d8" />
            </ScatterChart>
          </ResponsiveContainer>
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
              <h1 className="text-white text-3xl">20</h1>
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
