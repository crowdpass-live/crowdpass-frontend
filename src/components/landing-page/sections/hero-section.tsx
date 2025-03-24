"use client";

import React from "react";
import { motion } from "framer-motion";
import Header from "../header";
import { Button } from "../../ui/button";
import Link from "next/link";

const HeroSection = () => {

  // Define animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.4,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="max-w-[1280px] mx-auto relative px-2"
      initial="hidden"
      animate="visible"
      whileInView="visible"
      viewport={{ once: false }}
      variants={containerVariants}
    >
      <Header />
      <motion.div
        className="flex flex-col-reverse gap-4 md:flex-row justify-between items-center lg:my-20 mx-4"
        variants={containerVariants}
      >
        <motion.div
          className="flex flex-col items-center w-[85%] lg:w-full mx-auto md:items-start lg:gap-2"
          variants={itemVariants}
        >
          <motion.div
            className="text-center lg:text-left font-medium text-sm text-primary"
            variants={itemVariants}
          >
            REINVENT YOUR EVENTS{" "}
          </motion.div>
          <motion.h1
            className="font-medium text-center md:text-left text-2xl md:text-4xl xl:text-6xl  text-white raleway"
            variants={itemVariants}
          >
            Secure Tickets, Seamless Access — Anytime, Anywhere with{" "}
            <span className="text-primary">CrowdPass</span>
          </motion.h1>
          <motion.div variants={itemVariants}>
            <Link href={"/events"}>
              <Button className="bg-primary raleway text-light-black hover:bg-primary hover:text-deep-blue w-60 py-6 text-xl mt-4">
                Get Started
              </Button>
            </Link>
          </motion.div>
        </motion.div>
        <motion.div
          className="w-full flex gap-4 lg:min-w-[50%]"
          variants={itemVariants}
        >
          <motion.div className="flex gap-4 flex-col" variants={itemVariants}>
            <motion.img
              src="https://res.cloudinary.com/dnohqlmjc/image/upload/v1742633481/top-left_xrlwwf.png"
              alt="hero-inage"
              className=" md:flex"
              variants={itemVariants}
            />
            <motion.img
              src="https://res.cloudinary.com/dnohqlmjc/image/upload/v1742633487/bottom-left_dz7dtu.png"
              alt="hero-inage"
              className=" md:flex"
              variants={itemVariants}
            />
          </motion.div>
          <motion.div className="flex gap-4 flex-col" variants={itemVariants}>
            <motion.img
              src="https://res.cloudinary.com/dnohqlmjc/image/upload/v1742633484/hero-image_dgd01t.png"
              alt="hero-inage"
              className=" md:flex"
              variants={itemVariants}
            />
          </motion.div>
          <motion.div className="flex gap-4 flex-col" variants={itemVariants}>
            <motion.img
              src="https://res.cloudinary.com/dnohqlmjc/image/upload/v1742633487/bottom-left_dz7dtu.png"
              alt="hero-inage"
              className=" md:flex rotate-180"
              variants={itemVariants}
            />
            <motion.img
              src="https://res.cloudinary.com/dnohqlmjc/image/upload/v1742633487/bottom-right_karh2x.png"
              alt="hero-inage"
              className=" md:flex"
              variants={itemVariants}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default HeroSection;
