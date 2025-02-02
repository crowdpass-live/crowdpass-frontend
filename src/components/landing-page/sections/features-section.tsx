import React from 'react'
import FeaturesCard from '../features-card'
import { FaPeopleLine, FaAward, FaIdCard } from "react-icons/fa6";
import { IoMdAnalytics } from "react-icons/io";
import { IoShieldCheckmark } from "react-icons/io5";


const FeaturesSection = () => {
    const featuresData = [
        {
            icon: <FaPeopleLine className='w-16 h-16 text-primary'/>,
            title: "Event Management",
            description: "We help you treamline your event planning process with our intuitive event management tools. Create, manage, and promote your events with ease."
        }, {
            icon: <IoMdAnalytics className='w-16 h-16 text-primary'/>,
            title: "Real Time Analytics",
            description: "Get real-time insights into your event's performance with our analytics dashboard. Track attendance, engagement, and revenue in real-time."
        }, {
            icon: <FaAward className='w-16 h-16 text-primary'/>            ,
            title: "SPOK Integration",
            description: "Enhance your event experience with our SPOK (Starknet Proof-of-Kudos) integration. Reward attendees for their participation and create a unique experience."
        }, {
            icon: <IoShieldCheckmark className='w-16 h-16 text-primary'/>,
            title: "Security",
            description: "Ensure the security and integrity of your event data with our robust security measures. Protect your attendees' information and prevent unauthorized access."
        }, {
            icon: <FaIdCard className='w-16 h-16 text-primary'/> ,
            title: "Decentralized Identity",
            description: "Empower your attendees with decentralized identity management. Allow them to control their own data and identity, while ensuring a seamless event experience."
        },
    ]

    const cards = featuresData.map(({ icon, title, description }, index) => {
        return (
            <FeaturesCard icon={icon} title={title} description={description} key={index} />
        )
    })
    return (
        <div className='flex flex-col justify-center items-center'>
            <div className='flex flex-col justify-center items-center max-w-[1280px]'>
            <h1 className='text-white text-4xl lg:text-6xl font-medium pt-16 pb-20 raleway'>Our Features</h1>
            <div className='flex justify-center items-center flex-wrap gap-6'>
                {cards}
            </div>
            </div>
        </div>
    )
}

export default FeaturesSection