import React from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";

type Props = {};

const MarketplaceHero = (props: Props) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <motion.div
      className="flex justify-between items-center lg:my-10 flex-col-reverse lg:flex-row mx-4"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div
        className="flex flex-col items-center w-[90%] lg:w-full mx-auto lg:items-start lg:gap-2"
        variants={itemVariants}
      >
        <motion.div
          className="text-center lg:text-left font-medium text-sm text-primary"
          variants={itemVariants}
        >
          RESELL YOUR TICKETS. HELP SOMEONE ATTEND.
        </motion.div>
        <motion.h1
          className="font-medium text-center lg:text-left text-2xl md:text-4xl xl:text-6xl text-white raleway lg:pr-16"
          variants={itemVariants}
        >
          Resell with confidence, buy with trust — unlock new opportunities with
          <span className="text-primary"> CrowdPass</span>
        </motion.h1>
        {/* <motion.div variants={itemVariants}>
          <Button className="bg-primary raleway text-light-black hover:bg-primary hover:text-deep-blue w-60 py-6 text-xl mt-4">
            List Ticket
          </Button>
        </motion.div> */}
      </motion.div>
      <motion.div
        className="flex justify-center items-center m-3 gap-4 w-full lg:min-w-[50%]"
        variants={itemVariants}
      >
        <motion.img
          src="https://res.cloudinary.com/dnohqlmjc/image/upload/v1742633483/marketplace-hero_m3wkp8.png"
          alt="hero-image"
          className="md:flex"
          variants={itemVariants}
        />
      </motion.div>
    </motion.div>
  );
};

export default MarketplaceHero;