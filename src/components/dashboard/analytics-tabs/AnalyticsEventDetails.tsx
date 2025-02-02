import { Button } from '@/components/ui/button';
import { epochToDatetime } from 'datetime-epoch-conversion';
import { Calendar } from 'lucide-react';
import Image from 'next/image'
import React from 'react'

type Props = {}

const AnalyticsEventDetails = ({eventDetails}:any) => {
    const {
        eventName,
        eventStartDate,
        numberOfTickets,
        paid,
        workshops,
        speakers,
        sponsors,
        eventImage,
      }: any = eventDetails;
    
      const response = epochToDatetime(`${eventStartDate}`);
    
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
    <div className="flex flex-col md:flex-row gap-4">
      <Image
        src={eventImage}
        alt="event-image"
        width={240}
        height={240}
        className="rounded-3xl w-full md:w-96 object-center object-cover"
      />
      <div className="flex flex-col gap-4 lg:w-full lg:gap-3">
        <div>
          <p className="text-primary">{paid ? "PAID" : "FREE"}</p>
          <h1 className="raleway text-xl text-white font-semibold">
            {eventName}
          </h1>
        </div>
        <div className="bg-[#CBCACF66] w-60 md:w-80 flex gap-2 rounded-lg py-2 px-3">
          <div className="bg-[#14141A] p-2 rounded-xl">
            <Calendar size={20} color="#FF6932" />
          </div>
          <div className="flex flex-col ">
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
                width={30}
                height={30}
                className="w-8 h-8 md:w-[30px] md:h-[30px]"
              />
              <Image
                src={"/assets/attendee2.png"}
                alt="attendee2"
                width={30}
                height={30}
                className="-ml-3 w-8 h-8 md:w-[30px] md:h-[30px]"
              />
              <Image
                src={"/assets/attendee3.png"}
                alt="attendee3"
                width={30}
                height={30}
                className="-ml-3 w-8 h-8 md:w-[30px] md:h-[30px]"
              />
              <Image
                src={"/assets/attendee4.png"}
                alt="attendee4"
                width={30}
                height={30}
                className="-ml-3 w-8 h-8 md:w-[30px] md:h-[30px]"
              />
              <Image
                src={"/assets/attendee5.png"}
                alt="attendee5"
                width={30}
                height={30}
                className="-ml-3 w-8 h-8 md:w-[30px] md:h-[30px]"
              />
              <p className="text-primary flex justify-center items-center text-xs p-1 bg-white rounded-full -ml-3 border-2 border-primary">
                {numberOfTickets - 5}+
              </p>
            </div>
            <div className="flex flex-col">
              <p className="font-semibold text-white">Participant</p>
              <p className="font-medium text-sm text-white">Across the globe</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <h1 className="text-white text-xs md:text-base font-medium">
              {speakers.length}+ Speakers
            </h1>
            <Image
              src={"/assets/oui_dot.png"}
              alt="dot"
              width={18}
              height={18}
            />
            <h1 className="text-white text-xs md:text-base  font-medium">
              {sponsors.length}+ Sponsors
            </h1>
            <Image
              src={"/assets/oui_dot.png"}
              alt="dot"
              width={18}
              height={18}
            />
            <h1 className="text-white text-xs md:text-base font-medium">
              {workshops.length}+ Workshops
            </h1>
          </div>
        </div>
      </div>
      <div className='flex gap-4'>
        <Button className="bg-primary raleway text-light-black hover:border-deep-blue hover:bg-transparent hover:text-deep-blue">
          Edit Event   
        </Button>
        <Button className="bg-primary raleway text-light-black hover:border-deep-blue hover:bg-transparent hover:text-deep-blue">
          Cancel Event   
        </Button>
      </div>
    </div>
  )
}

export default AnalyticsEventDetails