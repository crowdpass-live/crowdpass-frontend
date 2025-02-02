import React from 'react'
import HiwAccordion from '../landing-page/hiw-accordion'
import {  FaWallet } from "react-icons/fa";
import { IoTicket } from "react-icons/io5";
import { BsCalendarEvent } from "react-icons/bs";
import { IoMdAnalytics } from 'react-icons/io';
import { TbAdjustmentsSearch } from "react-icons/tb";


type Props = {}

const HowItWorks = (props: Props) => {
    const HiwAccordionData = [
        {
        icon: <FaWallet className="w-8 h-8 text-primary"/>,
        title: "Connect Wallet",
          description:
            "Securely connect your crypto wallet to get started. Your wallet serves as your gateway to creating and managing events on the blockchain.",
        },
        {
          icon: <IoTicket className="w-8 h-8 text-primary"/>,
          title: "Create your Event",
          description:
            "Complete your event profile with essential information, such as name, location, and date. Showcase your event to potential attendees.",
        },
        {
          icon: <IoMdAnalytics className='w-8 h-8 text-primary'/>,
          title: "Track Attendee Activity",
          description:
            "Effortlessly manage event tickets, track sales, and monitor revenue in real-time. Get insights into your event's performance.",
        },
        {
          icon: <TbAdjustmentsSearch className="w-8 h-8 text-primary"/>,
          title: "Manage and Analyze",
          description:
            "Foster meaningful connections with attendees through our community-building tools. Encourage engagement and create a loyal following.",
        },
      ];
  return (
    <div className='flex flex-col justify-center items-center'>
        <div className='flex flex-col justify-center items-center max-w-[1280px]'>
            <h1 className='text-white text-4xl lg:text-6xl font-nedium py-4 raleway lg:pt-12 lg:pb-12'>How it works</h1>
            <div className='flex justify-center items-center gap-12'>
                <img src="/assets/hiw-create.png" alt="image-1" className='hidden lg:flex md:w-[500px] md:h-[500px] xl:h-[620px] xl:w-[620px]' />
                <HiwAccordion HiwAccordionData={HiwAccordionData} />
            </div>
        </div>
    </div>
)
}

export default HowItWorks