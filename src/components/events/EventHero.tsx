"use client";

import React from "react";
import { Button } from "../ui/button";
import { motion } from "framer-motion";
import Link from "next/link";

type Props = {};

const EventHero = (props: Props) => {
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 1, ease: "easeOut" } },
  };

  return (
    <div className="flex justify-between items-center lg:my-10 flex-col-reverse lg:flex-row mx-4">
      <motion.div
        className="flex flex-col items-center w-[90%] lg:w-full mx-auto lg:items-start lg:gap-2"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={textVariants}
      >
        <motion.div
          className="text-center lg:text-left font-medium text-sm text-primary"
          variants={textVariants}
        >
          ELEVATE YOUR EXPERIENCE
        </motion.div>
        <motion.h1
          className="font-medium text-center lg:text-left text-2xl md:text-4xl xl:text-6xl text-white raleway lg:pr-16"
          variants={textVariants}
        >
          Discover Events, Secure Tickets, and Join the Crowd — All in One{" "}
          <span className="text-primary">Place</span>.
        </motion.h1>
        <motion.div variants={textVariants}>
          <Link href={"#explore"}>
          <Button className="bg-primary raleway text-light-black hover:bg-primary hover:text-deep-blue w-60 py-6 text-xl mt-4">
            Get Started
          </Button>
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        className="flex items-center justify-center m-3 gap-4 w-full lg:min-w-[50%]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={imageVariants}
      >
        <motion.img
          src="https://res.cloudinary.com/dnohqlmjc/image/upload/v1742633485/event-hero_a3esfv.png"
          alt="hero-image"
          className="md:flex"
          variants={imageVariants}
        />
      </motion.div>
    </div>
  );
};

export default EventHero;