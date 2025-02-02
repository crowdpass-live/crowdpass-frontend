import React from "react";
import { Doughnut, Scatter } from "react-chartjs-2";
import { CiShare1 } from "react-icons/ci";
import { FaSquare } from "react-icons/fa6";
import { IoIosPeople } from "react-icons/io";
import { MdCelebration } from "react-icons/md";
import { TbMessageCircleUser } from "react-icons/tb";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";

Chart.register(CategoryScale);
const DoughnutData = {
  labels: ["Paid", "Free"],
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

const DoughnutOptions = {
  plugins: {
    legend: {
      display: false,
    },
  },
  layout: {
    padding: 0,
  },
  maintainAspectRatio: true,
  cutout: "75%",
  circumference: 360,
  rotation: -90,
  aspectRatio: 1,
};

const data = {
  labels: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ],
  datasets: [
    {
      label: "A dataset",
      data: [10, 20, 50],
      backgroundColor: "rgba(255, 99, 132, 1)",
    },
  ],
};

type Props = {};

const AnalyticsHome = ({
  setActiveComponent,
}: {
  setActiveComponent: (component: number) => void;
}) => {
  return (
    <div className=" flex flex-col gap-4">
      <div className="flex flex-col w-full md:flex-row gap-4">
        <div className="bg-[#14141A] rounded-xl w-2/5 px-5 py-3 flex flex-col gap-4">
          <h1 className="text-base xl:text-2xl text-white font-semibold raleway">
            Daily Ticket Count
          </h1>
          <div className="bg-[#5B5959] h-3 rounded-3xl w-full">
            <div className="bg-primary h-full rounded-3xl w-[calc(20/200*100%)]"></div>
          </div>
          <div className=" flex justify-between items-center">
            <p className="text-white text-sm font-thin">Sold: 20 Tickets</p>
            <p className="text-white text-sm font-thin">Revenue: $100</p>
            <p className="text-white text-sm font-thin">180 left</p>
          </div>
        </div>
        <div className="bg-[#14141A] rounded-xl w-1/5 px-5 py-3 flex flex-col justify-between">
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
        <div className="bg-[#14141A] rounded-xl w-1/5 px-5 py-3 flex flex-col items-center justify-center">
          <p className="text-sm text-white/80">Ticket Revenue</p>
          <h1 className="text-3xl text-white font-semibold">$4000</h1>
        </div>
        <div className="bg-[#14141A] rounded-xl w-1/5 px-5 py-3 flex flex-col items-center justify-center">
          <p className="text-sm text-white/80">Total Attendees</p>
          <h1 className="text-3xl text-white font-semibold">452</h1>
        </div>
      </div>
      <div className="flex flex-col w-full md:flex-row gap-4">
        <div className="bg-[#14141A] rounded-xl w-3/5 px-5 py-3 ">
          <Scatter data={data} />
        </div>
        <div className="bg-[#14141A] rounded-xl w-2/5 px-5 py-3 flex justify-start gap-10 flex-col ">
          <h1 className="text-white text-3xl raleway font-medium">
            Event stats
          </h1>
          <div className="flex items-center gap-2 w-full">
            <div className="w-1/2 flex items-start justify-center">
              <Doughnut
                data={DoughnutData}
                options={DoughnutOptions}
                className="w-full h-full"
              />
            </div>
            <div className="w-1/2 flex items-start justify-center">
              <Doughnut
                data={DoughnutData}
                options={DoughnutOptions}
                className="w-full h-full "
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full md:flex-row gap-4">
      <div className="bg-[#14141A] rounded-xl w-3/5 px-5 py-3 flex flex-col gap-4">
      <div className="flex gap-4 items-center">
            <h1 className="text-white text-2xl raleway font-medium">
              SPOK History
            </h1>
            <div className="flex justify-center items-center p-2 border border-white border-dashed rounded-full mb-1">
              <MdCelebration size={16} color="#ffffff" />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between gap-10">
              <div className="flex gap-4 w-2/5 items-center">
                <FaSquare size={16} color="#FF6932" />
                <p className="text-white text-sm font-thin">Available: 300</p>
              </div>
              <div className="bg-[#5B5959] h-4 rounded-3xl w-full">
                <div className="bg-primary h-full rounded-3xl w-[calc(300/400*100%)]"></div>
              </div>
            </div>
            <div className="flex items-center justify-between gap-10">
              <div className="flex gap-4 w-2/5 items-center">
                <FaSquare size={16} color="#FFFFFF" />
                <p className="text-white text-sm font-thin">Minted: 100</p>
              </div>
              <div className="bg-[#5B5959] h-4 rounded-3xl w-full">
                <div className="bg-white h-full rounded-3xl w-[calc(100/400*100%)]"></div>
              </div>
            </div>
            <div className="flex items-center justify-between gap-10">
              <div className="flex gap-4 w-2/5 items-center">
                <FaSquare size={16} color="#5B5959" />
                <p className="text-white text-sm font-thin">Total: 400</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[#14141A] rounded-xl w-1/5 px-5 py-3  flex flex-col items-center justify-center">
          <div className="flex justify-center items-center p-3 border border-white border-dashed rounded-full mb-1">
            <IoIosPeople size={30} color="#ffffff" />
          </div>
          <p className="text-sm text-white/80">Delegates</p>
          <h1 className="text-white text-3xl">100</h1>
        </div>
        <div className="bg-[#14141A] rounded-xl w-1/5 px-5 py-3 flex flex-col items-center justify-center">
          <div className="flex justify-center items-center p-3 border border-white border-dashed rounded-full mb-1">
            <TbMessageCircleUser size={30} color="#ffffff" />
          </div>
          <p className="text-sm text-white/80">Feedbacks</p>
          <h1 className="text-white text-3xl">20</h1>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsHome;
