import React, { useState } from "react";
import EventDay from "./EventDay";
import { Button } from "@/components/ui/button";
import { LuScanLine } from "react-icons/lu";
import { Doughnut } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import useCheckIn from "@/hooks/write-hooks/useCheckIn";
import { useParams } from "next/navigation";
import useGetEventAttendance from "@/hooks/read-hooks/useGetEventAttendance";
import useGetAvailableTicket from "@/hooks/read-hooks/useGetAvailableTicket";

type Props = {
  id: number;
};

const EventCheckin = (props: Props) => {
  const params = useParams<{ id: string }>();
  const checkUserIn = useCheckIn();
  const [checkInEmail, setCheckInEmail] = useState("");

  const { data: attendance } = useGetEventAttendance(Number(params.id));
  const { data: available } = useGetAvailableTicket(Number(params.id));

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setCheckInEmail(e.target.value);
  };

  const handleCheckIn = () => {
    checkUserIn(props.id, checkInEmail as `0x${string}`);
  };

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
    maintainAspectRatio: false,
    cutout: "75%",
    circumference: 360,
    rotation: -90,
    aspectRatio: 1,
  };

  return (
    <>
      <EventDay />
      <div className="border border-deep-blue p-4 md:p-6 rounded-lg mb-4">
        <h1 className="text-white text-lg mb-4 raleway font-semibold">
          Attendee Checkin
        </h1>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <input
              type="text"
              placeholder="Search email address"
              className="raleway w-full bg-transparent border border-deep-blue rounded-lg text-white py-2 px-4"
              value={checkInEmail}
              onChange={handleInputChange}
            />
            <Button
              className="bg-primary raleway text-light-black hover:border-deep-blue hover:bg-transparent hover:text-deep-blue h-full"
              onClick={handleCheckIn}
            >
              Search
            </Button>
          </div>
          <div className="border border-deep-blue p-2 rounded-lg flex justify-center items-center">
            <LuScanLine size={24} className="text-white" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Ticket Stats */}
        <div className="bg-[#14141A] rounded-xl p-6 flex flex-col items-center border border-deep-blue">
          <h1 className="text-white text-xl raleway font-medium mb-4">
            Ticket Stats
          </h1>
          <div className="w-32 h-32 sm:w-40 sm:h-40">
            <Doughnut data={DoughnutData} options={DoughnutOptions} />
          </div>
        </div>

        {/* User Stats */}
        <div className="bg-[#14141A] rounded-xl p-6 flex flex-col items-center border border-deep-blue">
          <h1 className="text-white text-xl raleway font-medium mb-4">
            User Stats
          </h1>
          <div className="w-32 h-32 sm:w-40 sm:h-40">
            <Doughnut data={DoughnutData} options={DoughnutOptions} />
          </div>
        </div>

        {/* Numbers Summary */}
        <div className="flex flex-col gap-3">
          <div className="bg-[#14141A] rounded-xl w-full p-4 sm:p-5 flex flex-col items-center justify-center border border-deep-blue">
            <p className="text-xs sm:text-sm text-white/80 text-center">
              Total Registrations
            </p>
            <h1 className="text-2xl sm:text-3xl text-white font-medium">0</h1>
          </div>
          <div className="bg-[#14141A] rounded-xl w-full p-4 sm:p-5 flex flex-col items-center justify-center border border-deep-blue">
            <p className="text-xs sm:text-sm text-white/80 text-center">
              Total Checkins
            </p>
            <h1 className="text-2xl sm:text-3xl text-white font-medium">
              {Number(attendance)}
            </h1>
          </div>
          <div className="bg-[#14141A] rounded-xl w-full p-4 sm:p-5 flex flex-col items-center justify-center border border-deep-blue">
            <p className="text-xs sm:text-sm text-white/80 text-center">
              Available Tickets
            </p>
            <h1 className="text-2xl sm:text-3xl text-white font-medium">
              {Number(available)}
            </h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventCheckin;
