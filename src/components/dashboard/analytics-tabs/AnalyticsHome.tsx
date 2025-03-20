import React from "react";
import { CiShare1 } from "react-icons/ci";
import { FaSquare } from "react-icons/fa6";
import { IoIosPeople } from "react-icons/io";
import { MdCelebration } from "react-icons/md";
import { TbMessageCircleUser } from "react-icons/tb";
import Chart from "chart.js/auto";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { CategoryScale } from "chart.js";

Chart.register(CategoryScale);
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

// const data = {
//   labels: [
//     "Jan",
//     "Feb",
//     "Mar",
//     "Apr",
//     "May",
//     "June",
//     "July",
//     "Aug",
//     "Sept",
//     "Oct",
//     "Nov",
//     "Dec",
//   ],
//   datasets: [
//     {
//       label: "A dataset",
//       data: [10, 20, 50],
//       backgroundColor: "rgba(255, 99, 132, 1)",
//     },
//   ],
// };

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
        <ResponsiveContainer width="100%" height="100%">
        <ScatterChart
        >
          <XAxis type="number" dataKey="x" name="stature" unit="cm" />
          <YAxis type="number" dataKey="y" name="weight" unit="kg" />
          <Tooltip cursor={{ strokeDasharray: '3 3' }} />
          <Scatter name="A school" data={data} fill="#8884d8" />
        </ScatterChart>
      </ResponsiveContainer>
        </div>
        <div className="bg-[#14141A] rounded-xl w-2/5 px-5 py-3 flex justify-start gap-10 flex-col ">
          <h1 className="text-white text-3xl raleway font-medium">
            Event stats
          </h1>
          <div className="flex items-center gap-2 w-full mx-8">
            <PieChart width={300} height={400} className="w-full h-full flex items-center justify-center">
              <Pie
                className="w-full h-full"
                data={DoughnutData.data}
                cx={120}
                cy={200}
                innerRadius={100}
                outerRadius={120}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {DoughnutData.data.map((entry: any, index: number) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      DoughnutData.datasets[0].backgroundColor[
                        index % DoughnutData.datasets[0].backgroundColor.length
                      ]
                    }
                  />
                ))}
              </Pie>
            </PieChart>

            <PieChart width={300} height={400} className="w-full h-full flex items-center justify-center">
              <Pie
                className="w-full h-full"
                data={DoughnutData.data}
                cx={120}
                cy={200}
                innerRadius={100}
                outerRadius={120}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {DoughnutData.data.map((entry: any, index: number) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      DoughnutData.datasets[0].backgroundColor[
                        index % DoughnutData.datasets[0].backgroundColor.length
                      ]
                    }
                  />
                ))}
              </Pie>
            </PieChart>
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
