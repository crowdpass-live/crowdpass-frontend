import { Bookmark, Calendar, Share2 } from "lucide-react";
import Image from "next/image";
import React, { useContext } from "react";
import { Button } from "../ui/button";
import { epochToDatetime } from "datetime-epoch-conversion";
import { handlePurchaseFreeEventTicket } from "../AbiCalls";
import { UserContext } from "@/app/layout";


const EventDetails = ({ eventDetails, id }: any) => {
  const { contractAddr, account, setIsLoading }: any = useContext(UserContext);

  const { data }: any = eventDetails


  const imgBase =  process.env.NEXT_PUBLIC_BASE_IMG_URL as string || "0x0";

  const response = epochToDatetime(`${Number(data?.start_date)}`);

  function convertTime(time: string) {
    let hours = time.substring(0, 2);
    let minutes = time.substring(3, 5);
    let ampm = parseInt(hours) >= 12 ? "PM" : "AM";

    if (parseInt(hours) > 12) {
      hours = (parseInt(hours) - 12).toString();
    } else if (parseInt(hours) == 0) {
      hours = "12";
    }

    return hours + ":" + minutes + " " + ampm;
  }
  
  return (
    <div className="flex flex-col md:flex-row mx-4 lg:mx-28 gap-4 lg:gap-10">
      <Image
        src={`${imgBase}${data?.uri}`}
        alt="event-image"
        width={384}
        height={467}
        className="rounded-3xl w-full md:w-96 object-center object-cover"
      />
      <div className="flex flex-col gap-4 lg:w-full lg:gap-6">
        <div>
          <p className="text-primary">
            {Number(data?.ticket_price) > 0
              ? Number(data?.ticket_price)
              : "FREE"}
          </p>
          <h1 className="raleway text-2xl md:text-4xl text-white font-semibold">
            {data?.name}
          </h1>
        </div>
        <div className="bg-[#CBCACF66] flex gap-2 rounded-lg lg:max-w-80 py-2 px-3">
          <div className="bg-[#14141A] p-2 rounded-xl">
            <Calendar size={30} color="#FF6932" />
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-white">
              {response.day} {response.month}, {response.year}
            </p>
            <p className="text-white text-sm">{convertTime(response.time)}</p>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-4">
            <div className="flex items-center justify-center">
              <Image
                src={"/assets/attendee1.png"}
                alt="attendee1"
                width={50}
                height={50}
                className="w-8 h-8 md:w-[50px] md:h-[50px]"
              />
              <Image
                src={"/assets/attendee2.png"}
                alt="attendee2"
                width={50}
                height={50}
                className="-ml-3 w-8 h-8 md:w-[50px] md:h-[50px]"
              />
              <Image
                src={"/assets/attendee3.png"}
                alt="attendee3"
                width={50}
                height={50}
                className="-ml-3 w-8 h-8 md:w-[50px] md:h-[50px]"
              />
              <Image
                src={"/assets/attendee4.png"}
                alt="attendee4"
                width={50}
                height={50}
                className="-ml-3 w-8 h-8 md:w-[50px] md:h-[50px]"
              />
              <Image
                src={"/assets/attendee5.png"}
                alt="attendee5"
                width={50}
                height={50}
                className="-ml-3 w-8 h-8 md:w-[50px] md:h-[50px]"
              />
              <p className="text-primary flex justify-center items-center text-sm p-2 bg-white rounded-full -ml-3 border-2 border-primary">
                {Number(data?.total_tickets) - 5}+
              </p>
            </div>
            <div className="flex flex-col">
              <p className="font-semibold text-white">Participant</p>
              <p className="font-medium text-sm text-white">Across the globe</p>
            </div>
          </div>
          {/* <div className="flex items-center gap-3">
            <h1 className="text-white text-sm md:text-base font-medium">
              {speakers.length}+ Speakers
            </h1>
            <Image
              src={"/assets/oui_dot.png"}
              alt="dot"
              width={18}
              height={18}
            />
            <h1 className="text-white text-sm md:text-base  font-medium">
              {sponsors.length}+ Sponsors
            </h1>
            <Image
              src={"/assets/oui_dot.png"}
              alt="dot"
              width={18}
              height={18}
            />
            <h1 className="text-white text-sm md:text-base font-medium">
              {workshops.length}+ Workshops
            </h1>
          </div> */}
        </div>
        <div className="flex justify-end lg:w-full gap-8 items-center">
          <div className="pt-4 flex gap-4">
            <Share2 size={40} fill="#ffffff" color="#ffffff" />
            <Bookmark size={40} fill="#ffffff" color="#ffffff" />
          </div>
          {Number(data?.ticket_price) > 0 ?
          <Button className="bg-primary raleway text-light-black hover:bg-primary hover:text-deep-blue w-60 py-6 text-xl mt-4 flex justify-center items-center">
            Register
          </Button> :  <Button className="bg-primary raleway text-light-black hover:bg-primary hover:text-deep-blue w-60 py-6 text-xl mt-4 flex justify-center items-center" onClick={()=>{handlePurchaseFreeEventTicket(contractAddr, account, setIsLoading, id)}}>
            Register
          </Button> }
        </div>
      </div>
    </div>
  );
};

export default EventDetails;
