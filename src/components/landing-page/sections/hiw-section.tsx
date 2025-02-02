import React from 'react'
import HiwAccordion from '../hiw-accordion'
import { FaCompass, FaWallet } from "react-icons/fa";
import { IoTicket } from "react-icons/io5";
import { BsCalendarEvent } from "react-icons/bs";

const HiwSection = () => {
    const HiwAccordionData = [
        {
          icon: <FaCompass className="w-8 h-8 text-primary"/>,
          title: "Browse Events.",
          description:
            "Explore a wide range of events on the platform, filter by category, location, or date, and select the event that interests you.",
        },
        {
          icon: <FaWallet className="w-8 h-8 text-primary"/>,
          title: "Connect Your Wallet.",
          description:
            "Complete your event profile with essential information, such as name, location, and date. Showcase your event to potential attendees.",
        },
        {
          icon: <IoTicket className="w-8 h-8 text-primary"/>,
          title: "Purchase Your Ticket.",
          description:
            "Effortlessly manage event tickets, track sales, and monitor revenue in real-time. Get insights into your event's performance.",
        },
        {
          icon: <BsCalendarEvent className="w-8 h-8 text-primary"/>,
          title: "Attend the Event.",
          description:
            "Foster meaningful connections with attendees through our community-building tools. Encourage engagement and create a loyal following.",
        },
      ];
    return (
        <div className='flex flex-col justify-center items-center'>
            <div className='flex flex-col justify-center items-center max-w-[1280px]'>
                <h1 className='text-white text-4xl lg:text-6xl font-nedium py-4 raleway lg:pt-16 lg:pb-20'>How it works</h1>
                <div className='flex justify-center items-center gap-12'>
                    <img src="/assets/hiw-image-one.png" alt="image-1" className='hidden lg:flex md:w-[500px] md:h-[500px] xl:h-[620px] xl:w-[620px]' />
                    <HiwAccordion HiwAccordionData={HiwAccordionData}/>
                </div>
            </div>
        </div>
    )
}

export default HiwSection