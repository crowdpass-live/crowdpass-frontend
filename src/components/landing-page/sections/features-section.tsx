import React from 'react';
import { motion } from 'framer-motion'; 
import FeaturesCard from '../features-card';
import { FaPeopleLine, FaAward, FaIdCard } from "react-icons/fa6";
import { IoMdAnalytics } from "react-icons/io";
import { IoShieldCheckmark } from "react-icons/io5";

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

const FeaturesSection = () => {
  const featuresData = [
    {
      icon: <FaPeopleLine className='w-12 h-12 text-primary' />,
      title: "Event Management",
      description: "We help you streamline your event planning process with our intuitive event management tools. Create, manage, and promote your events with ease.",
    },
    {
      icon: <IoMdAnalytics className='w-12 h-12 text-primary' />,
      title: "Real Time Analytics",
      description: "Get real-time insights into your event's performance with our analytics dashboard. Track attendance, engagement, and revenue in real-time.",
    },
    {
      icon: <FaAward className='w-12 h-12 text-primary' />,
      title: "SPOK Integration",
      description: "Enhance your event experience with our SPOK (Starknet Proof-of-Kudos) integration. Reward attendees for their participation and create a unique experience.",
    },
    {
      icon: <IoShieldCheckmark className='w-12 h-12 text-primary' />,
      title: "Security",
      description: "Ensure the security and integrity of your event data with our robust security measures. Protect your attendees' information and prevent unauthorized access.",
    },
    {
      icon: <FaIdCard className='w-12 h-12 text-primary' />,
      title: "Decentralized Identity",
      description: "Empower your attendees with decentralized identity management. Allow them to control their own data and identity, while ensuring a seamless event experience.",
    },
  ];

  const cards = featuresData.map(({ icon, title, description }, index) => {
    return (
      <motion.div
        key={index}
        variants={itemVariants} 
      >
        <FeaturesCard icon={icon} title={title} description={description} />
      </motion.div>
    );
  });

  return (
    <motion.div
      className='flex flex-col justify-center items-center'
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false }} 
      variants={containerVariants}
    >
      <div className='flex flex-col justify-center items-center max-w-[1280px]'>
        <motion.h1
          className='text-white text-4xl lg:text-5xl font-medium pt-16 pb-20 raleway'
          variants={itemVariants} 
        >
          Our Features
        </motion.h1>
        <motion.div
          className='flex w-[95%] md:w-full justify-center items-center flex-wrap gap-3'
          variants={containerVariants} 
        >
          {cards}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default FeaturesSection;