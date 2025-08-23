"use client";

import React from "react";
import EventCarousel from "./EventCarousel";
import { motion } from "framer-motion"; 

type Props = {};

const SpolightEvent = (props: Props) => {
  const headingVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut", delay: 0.3 } },
  };

  return (
    <div>
      <motion.h1
        className="text-white text-4xl raleway font-semibold text-center my-10"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.5 }}
        // variants={headingVariants}
      >
        Spotlight Events
      </motion.h1>

      <motion.div
        className="bg-[#14141A] p-3 py-10 w-full rounded-xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.5 }}
        // variants={containerVariants}
      >
        <EventCarousel />
      </motion.div>
    </div>
  );
};

export default SpolightEvent;