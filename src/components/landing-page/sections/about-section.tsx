import React from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { Button } from "../../ui/button";
import Link from "next/link";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.5,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const AboutSection = () => {
  return (
    <motion.div
      className="flex justify-center items-center py-12"
      initial="hidden"
      animate="visible"
      whileInView="visible"
      viewport={{ once: false }}
      variants={containerVariants}
    >
      {/* Left Images */}
      <motion.div
        className="md:flex flex-col -mr-10 hidden"
        variants={itemVariants}
      >
        <motion.img
          src="/assets/about-image-podcast.jpg"
          alt="podcast-image"
          className="w-96 h-64 rounded-t-2xl"
          variants={itemVariants}
        />
        <motion.img
          src="/assets/about-image-concert.jpg"
          alt="concert-image"
          className="w-96 h-64 rounded-b-2xl"
          variants={itemVariants}
        />
      </motion.div>

      {/* Card Section */}
      <motion.div variants={itemVariants} className="z-50 flex justify-center">
        <Card className="w-[95%] md:w-[470px] gap-12 py-6 md:py-14  bg-deep-blue px-2 md:px-6 border-deep-blue rounded-2xl">
          <CardHeader>
            <CardTitle className="text-white text-4xl raleway font-medium">
              About Us
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-12">
            <motion.p className="text-white text-base" variants={itemVariants}>
              Welcome to CrowdPass, your premier event ticketing and management
              solution. Our platform is designed to help event organizers
              create, manage, and promote their events with ease.
            </motion.p>
            <motion.p className="text-white text-base" variants={itemVariants}>
              At CrowdPass, we believe that events have the power to bring
              people together and create lasting memories. That's why we're
              dedicated to providing a seamless and secure ticketing experience
              for attendees, while also offering a range of tools and resources
              to help event organizers succeed.
            </motion.p>
          </CardContent>
          <CardFooter className="w-full">
            <motion.div variants={itemVariants} className="w-full">
              <Link href={"/events"}>
                <Button className="bg-primary text-light-black text-lg w-full py-6 font-medium">
                  Explore
                </Button>
              </Link>
            </motion.div>
          </CardFooter>
        </Card>
      </motion.div>

      {/* Right Images */}
      <motion.div
        className="md:flex flex-col -ml-10 hidden z-40" // Add z-40 here
        variants={itemVariants}
      >
        <motion.img
          src="/assets/about-image-get-together.jpg"
          alt="get-together-image"
          className="w-96 h-64 rounded-t-2xl"
          variants={itemVariants}
        />
        <motion.img
          src="/assets/about-image-dinner.jpg"
          alt="dinner-image"
          className="w-96 h-64 rounded-b-2xl"
          variants={itemVariants}
        />
      </motion.div>
    </motion.div>
  );
};

export default AboutSection;
