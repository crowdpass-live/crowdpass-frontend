"use client";

import React, { useContext } from "react";
import { motion } from "framer-motion";
import Header from "../header";
import { Button } from "../../ui/button";
import { UserContext } from "../../../app/layout";
import { handleRemoveOrganizer } from "@/components/AbiCalls";

const HeroSection = () => {
  const { contractAddr, account, setIsLoading }: any = useContext(UserContext);

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
      className="max-w-[1280px] mx-auto relative"
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
            <Button
              onClick={() => {
                handleRemoveOrganizer(contractAddr, account, setIsLoading);
              }}
              className="bg-primary raleway text-light-black hover:bg-primary hover:text-deep-blue w-60 py-6 text-xl mt-4"
            >
              Get Started
            </Button>
          </motion.div>
        </motion.div>
        <motion.div
          className="w-full flex gap-4 lg:min-w-[50%]"
          variants={itemVariants}
        >
          <motion.div className="flex gap-4 flex-col" variants={itemVariants}>
            <motion.img
              src="/assets/top-left.png"
              alt="hero-inage"
              className=" md:flex"
              variants={itemVariants}
            />
            <motion.img
              src="/assets/bottom-left.png"
              alt="hero-inage"
              className=" md:flex"
              variants={itemVariants}
            />
          </motion.div>
          <motion.div className="flex gap-4 flex-col" variants={itemVariants}>
            <motion.img
              src="/assets/hero-image.png"
              alt="hero-inage"
              className=" md:flex"
              variants={itemVariants}
            />
          </motion.div>
          <motion.div className="flex gap-4 flex-col" variants={itemVariants}>
            <motion.img
              src="/assets/bottom-left.png"
              alt="hero-inage"
              className=" md:flex rotate-180"
              variants={itemVariants}
            />
            <motion.img
              src="/assets/bottom-right.png"
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