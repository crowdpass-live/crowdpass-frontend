"use client";

import EventDetails from "@/components/events/EventDetails";
import MyEventTab from "@/components/my-event/MyEventTab";
import useGetEventById from "@/hooks/read-hooks/useGetEventById";
import { MapPin, Users, ScanLine } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import HashLoader from "react-spinners/HashLoader";
import { Button } from "@/components/ui/button";
import { Doughnut } from "react-chartjs-2";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import useCheckIn from "@/hooks/write-hooks/useCheckIn";
import useGetEventAttendance from "@/hooks/read-hooks/useGetEventAttendance";
import useGetAvailableTicket from "@/hooks/read-hooks/useGetAvailableTicket";

const page = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const detailsTabs = ["Event Details", "Check-in"];
  const params = useParams<{ id: string }>();
  const eventDetails = useGetEventById(Number(params.id));
  const checkUserIn = useCheckIn();
  const [checkInEmail, setCheckInEmail] = useState("");

  const { data: attendance } = useGetEventAttendance(Number(params.id));
  const { data: available } = useGetAvailableTicket(Number(params.id));

  const { isLoading: loading }: any = eventDetails;
  const { event }: any = eventDetails;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setCheckInEmail(e.target.value);
  };

  const handleCheckIn = () => {
    checkUserIn(Number(params.id), checkInEmail as `0x${string}`);
  };

  Chart.register(CategoryScale);

  // Safe data conversion with proper fallbacks
  const safeAttendance = attendance ? Number(attendance) : 0;
  const safeAvailable = available ? Number(available) : 0;
  const notCheckedIn = Math.max(0, safeAvailable - safeAttendance);

  const DoughnutData = {
    labels: ["Checked In", "Not Checked In"],
    datasets: [
      {
        label: "Attendance Stats",
        data: [safeAttendance, notCheckedIn],
        backgroundColor: ["#FF6932", "#5B5959"],
        borderColor: ["#FF6932", "#5B5959"],
        borderWidth: 0,
        borderRadius: 8,
        offset: 2,
      },
    ],
  };

  const TicketDoughnutData = {
    labels: ["Sold", "Available"],
    datasets: [
      {
        label: "Ticket Stats",
        data: [safeAttendance, safeAvailable],
        backgroundColor: ["#B0B0B4", "#5B5959"],
        borderColor: ["#B0B0B4", "#5B5959"],
        borderWidth: 0,
        borderRadius: 8,
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

  // Event Details Component
  const EventDetailsComponent = () => (
    <>
      <hr className="text-white" />
      <h1 className="raleway text-2xl md:text-4xl text-white font-semibold my-4">
        Description
      </h1>
      <hr className="text-white" />
      <div
        className="prose prose-invert max-w-full text-white my-6 md:basis-4/6"
        dangerouslySetInnerHTML={{
          __html: event?.description || '',
        }}
      />
      <hr className="text-white" />
      <div className="flex flex-col md:flex-row gap-10">
        <div className="flex flex-col lg:w-[384px] my-6">
          <h1 className="text-3xl text-white raleway mb-2 font-semibold">
            Location
          </h1>
          <Image
            src={
              "https://res.cloudinary.com/dnohqlmjc/image/upload/v1742633489/MapImage_jgeu3d.png"
            }
            alt="map"
            objectFit="fill"
            width={450}
            height={247}
          />
          <div className="bg-[#14141A66] font-semibold rounded-md p-2 my-4 flex items-center justify-start text-white gap-4 w-full">
            <div className="bg-[#14141A] p-2 rounded-xl">
              <MapPin size={30} color="#FF6932" />
            </div>
            {event?.attributes?.[3]?.value || "Location not specified"}
          </div>
        </div>
        <div className="lg:w-[600px] lg:mt-8">
          <MyEventTab />
        </div>
      </div>
    </>
  );

  // Check-in Component
  const CheckinComponent = () => (
    <div className="space-y-6 pb-10">
      <div className="border border-deep-blue p-4 md:p-6 rounded-lg">
        <h1 className="text-white text-lg mb-4 raleway font-semibold">
          Attendee Check-in
        </h1>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex flex-col sm:flex-row gap-3 w-full">
            <input
              type="text"
              placeholder="Search email address"
              className="raleway w-full bg-transparent rounded-lg text-white border border-white py-2 px-4 focus:border-primary focus:outline-none"
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
          <div className="border border-deep-blue p-2 rounded-lg flex justify-center items-center hover:border-primary transition-colors cursor-pointer">
            <ScanLine size={24} className="text-white" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Attendance Stats */}
        <div className="bg-[#14141A] rounded-xl p-6 flex flex-col items-center border border-deep-blue">
          <h1 className="text-white text-xl raleway font-medium mb-4">
            Attendance Stats
          </h1>
          <div className="w-32 h-32 sm:w-40 sm:h-40 relative">
            <Doughnut data={DoughnutData} options={DoughnutOptions} />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl text-white font-bold">
                  {safeAvailable > 0 ? ((safeAttendance / safeAvailable) * 100).toFixed(0) : 0}%
                </div>
                <div className="text-xs text-white/60">Checked In</div>
              </div>
            </div>
          </div>
          <div className="flex gap-4 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary"></div>
              <span className="text-sm text-white/80">Checked In</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#5B5959]"></div>
              <span className="text-sm text-white/80">Pending</span>
            </div>
          </div>
        </div>

        {/* Ticket Stats */}
        <div className="bg-[#14141A] rounded-xl p-6 flex flex-col items-center border border-deep-blue">
          <h1 className="text-white text-xl raleway font-medium mb-4">
            Ticket Stats
          </h1>
          <div className="w-32 h-32 sm:w-40 sm:h-40 relative">
            <Doughnut data={TicketDoughnutData} options={DoughnutOptions} />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl text-white font-bold">
                  {safeAttendance + safeAvailable}
                </div>
                <div className="text-xs text-white/60">Total</div>
              </div>
            </div>
          </div>
          <div className="flex gap-4 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#B0B0B4]"></div>
              <span className="text-sm text-white/80">Sold</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#5B5959]"></div>
              <span className="text-sm text-white/80">Available</span>
            </div>
          </div>
        </div>

        {/* Numbers Summary */}
        <div className="flex flex-col gap-3">
          <div className="bg-[#14141A] rounded-xl w-full p-4 sm:p-5 flex flex-col items-center justify-center border border-deep-blue">
            <p className="text-xs sm:text-sm text-white/80 text-center">
              Total Registrations
            </p>
            <h1 className="text-2xl sm:text-3xl text-white font-medium">
              {safeAttendance + safeAvailable}
            </h1>
          </div>
          <div className="bg-[#14141A] rounded-xl w-full p-4 sm:p-5 flex flex-col items-center justify-center border border-deep-blue">
            <p className="text-xs sm:text-sm text-white/80 text-center">
              Total Check-ins
            </p>
            <h1 className="text-2xl sm:text-3xl text-primary font-medium">
              {safeAttendance}
            </h1>
          </div>
          <div className="bg-[#14141A] rounded-xl w-full p-4 sm:p-5 flex flex-col items-center justify-center border border-deep-blue">
            <p className="text-xs sm:text-sm text-white/80 text-center">
              Available Tickets
            </p>
            <h1 className="text-2xl sm:text-3xl text-white font-medium">
              {safeAvailable}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );

  // Active Component Renderer
  const ActiveComponent = () => {
    switch (tabIndex) {
      case 0:
        return <EventDetailsComponent />;
      case 1:
        return <CheckinComponent />;
      default:
        return <EventDetailsComponent />;
    }
  };

  return (
    <div>
      {loading && (
        <div className="fixed inset-0 z-50 flex flex-col gap-10 items-center justify-center bg-black bg-opacity-50">
          <HashLoader
            color={"#FF6932"}
            loading={loading}
            size={100}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
          <div className="text-white text-2xl">Fetching Event Details...</div>
        </div>
      )}
      
      <EventDetails eventDetails={eventDetails} id={params.id} />
      
      <div className="bg-deep-blue max-w-[1280px] pt-28 -mt-16 mb-4">
        <div className="mx-4 lg:mx-28">
          {/* Tab Navigation */}
          <div className="flex flex-col md:flex-row justify-end mb-6">
            
            <ul className="flex justify-between underline underline-offset-4 gap-4">
              {detailsTabs.map((tab, index) => (
                <li
                  key={index}
                  className={`cursor-pointer ${
                    tabIndex === index
                      ? "text-primary underline underline-offset-4"
                      : "text-white/50"
                  }`}
                  onClick={() => setTabIndex(index)}
                >
                  {tab}
                </li>
              ))}
            </ul>
          </div>

          <ActiveComponent />
        </div>
      </div>
    </div>
  );
};

export default page;