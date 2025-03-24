import React from 'react';
import { motion } from 'framer-motion'; 
import HiwAccordion from '../hiw-accordion';
import { FaCompass, FaWallet } from "react-icons/fa";
import { IoTicket } from "react-icons/io5";
import { BsCalendarEvent } from "react-icons/bs";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3, 
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 }, 
  visible: { opacity: 1, y: 0 }, 
};

const HiwSection = () => {
  const HiwAccordionData = [
    {
      icon: <FaCompass className="w-5 h-5 text-primary" />,
      title: "Browse Events.",
      description:
        "Explore a wide range of events on the platform, filter by category, location, or date, and select the event that interests you.",
    },
    {
      icon: <FaWallet className="w-5 h-5 text-primary" />,
      title: "Connect Your Wallet.",
      description:
        "Complete your event profile with essential information, such as name, location, and date. Showcase your event to potential attendees.",
    },
    {
      icon: <IoTicket className="w-5 h-5 text-primary" />,
      title: "Purchase Your Ticket.",
      description:
        "Effortlessly manage event tickets, track sales, and monitor revenue in real-time. Get insights into your event's performance.",
    },
    {
      icon: <BsCalendarEvent className="w-5 h-5 text-primary" />,
      title: "Attend the Event.",
      description:
        "Foster meaningful connections with attendees through our community-building tools. Encourage engagement and create a loyal following.",
    },
  ];

  return (
    <motion.div
      className='flex flex-col justify-center items-center px-2'
      initial="hidden"
      whileInView="visible" 
      viewport={{ once: false, amount: 0.2 }} 
      variants={containerVariants}
    >
      <div className='flex flex-col justify-center items-center max-w-[1280px]'>
        <motion.h1
          className='text-white text-4xl lg:text-5xl font-medium pt-16 pb-20 raleway'
          variants={itemVariants} 
        >
          How it works
        </motion.h1>
        <motion.div
          className='flex justify-center items-center gap-12'
          variants={containerVariants}
        >
          <motion.img
            src="https://res.cloudinary.com/dnohqlmjc/image/upload/v1742633484/hiw-image-one_qy2xsg.png"
            alt="image-1"
            className='hidden lg:flex md:w-[500px] md:h-[500px] xl:h-[620px] xl:w-[620px]'
            variants={itemVariants} 
          />
          <motion.div variants={itemVariants}> 
            <HiwAccordion HiwAccordionData={HiwAccordionData} />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HiwSection;