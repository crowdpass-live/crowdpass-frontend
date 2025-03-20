import React, { useState } from "react";
import EventDay from "./EventDay";
import { Button } from "@/components/ui/button";
import { LuScanLine } from "react-icons/lu";
import { Doughnut } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import useCheckIn from "@/hooks/write-hooks/useCheckIn";
import { useParams } from "next/navigation";

type Props = {};

const EventCheckin = (props: Props) => {
  const params = useParams<{ id: string }>();
  const checkUserIn = useCheckIn()
  const [checkInEmail, setCheckInEmail] = useState("")

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setCheckInEmail(e.target.value)
  };

  const handleCheckIn = ()=>{
    checkUserIn(Number(params.id), checkInEmail as `0x${string}`)
  }

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
    maintainAspectRatio: false,
    cutout: "75%",
    circumference: 360,
    rotation: -90,
    aspectRatio: 1,
  };

  return (
    <>
      <EventDay />
      <div className="border border-deep-blue p-6 rounded-lg">
        <h1 className="text-white text-lg mb-4 raleway font-semibold">
          Attendee Checkin{" "}
        </h1>
        <div className="flex w-full gap-4">
          <div className="flex flex-col md:flex-row gap-4 w-full">
            <input
              type="text"
              placeholder="Search email address"
              className="raleway w-full bg-transparent border border-deep-blue rounded-lg text-deep-blue py-2 px-8"
              value={checkInEmail}
              onChange={handleInputChange}
            />
            <Button className="bg-primary raleway text-light-black hover:border-deep-blue hover:bg-transparent hover:text-deep-blue h-full" onClick={handleCheckIn}>
              Search
            </Button>
          </div>
          <div className="border border-deep-blue p-2 rounded-lg">
            <LuScanLine size={30} color="#ffffff" />
          </div>
        </div>
      </div>
      <div className="flex flex-grow w-full gap-4">
        <div className="bg-[#14141A] w-2/5 rounded-xl p-10 flex justify-start gap-10 flex-col border border-deep-blue">
          <h1 className="text-white text-xl raleway font-medium">
            Ticket stats
          </h1>
          <div className="flex items-center gap-2 w-full">
            <Doughnut
              data={DoughnutData}
              options={DoughnutOptions}
              style={{ width: "170px", height: "170px" }}
            />
          </div>
        </div>
        <div className="bg-[#14141A] w-2/5 rounded-xl p-10 flex justify-start gap-10 flex-col border border-deep-blue">
          <h1 className="text-white text-xl raleway font-medium">
            User stats
          </h1>
          <div className="flex items-center gap-2 w-full">
            <Doughnut
              data={DoughnutData}
              options={DoughnutOptions}
              style={{ width: "170px", height: "170px" }}
            />
          </div>
        </div>
        <div className="flex flex-col gap-4 w-1/5">
          <div className="bg-[#14141A] rounded-xl w-full p-5 flex flex-col items-center justify-center border border-deep-blue">
            <p className="text-xs xl:text-sm text-white/80 text-center">Total Registrations</p>
            <h1 className="text-3xl text-white font-medium">1800</h1>
          </div>
          <div className="bg-[#14141A] rounded-xl w-full p-5 flex flex-col items-center justify-center border border-deep-blue">
            <p className="text-xs xl:text-sm text-white/80 text-center">Total Checkins</p>
            <h1 className="text-3xl text-white font-medium">1222</h1>
          </div>
          <div className="bg-[#14141A] rounded-xl w-full p-5 flex flex-col items-center justify-center border border-deep-blue">
            <p className="text-xs xl:text-sm text-white/80 text-center">Available Tickets</p>
            <h1 className="text-3xl text-white font-medium">200</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventCheckin;
