import React from "react";
import { motion } from "framer-motion";
import { CalendarIcon, BellIcon } from "lucide-react";
import { Button } from "../ui/button";

type Props = {};

const MarketplaceComingSoon = (props: Props) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.5,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <motion.div
      className="w-full bg-deep-blue/30 backdrop-blur-sm py-12 px-4 mt-10 mb-16 rounded-lg"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="max-w-4xl mx-auto text-center" variants={itemVariants}>
        <motion.div
          className="inline-flex items-center justify-center gap-2 bg-primary/20 text-primary px-4 py-2 rounded-full mb-6"
          variants={itemVariants}
        >
          <CalendarIcon size={16} />
          <span className="text-sm font-medium">Coming Soon</span>
        </motion.div>
        
        <motion.h2
          className="text-3xl md:text-4xl font-medium text-white raleway mb-6"
          variants={itemVariants}
        >
          Our Marketplace is Under Construction
        </motion.h2>
        
        <motion.p
          className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto"
          variants={itemVariants}
        >
          We're putting the finishing touches on our ticket marketplace where you'll be able to buy and sell with confidence. Get notified when we launch!
        </motion.p>
        
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          variants={itemVariants}
        >
          <div className="relative w-full sm:w-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="py-3 px-4 rounded-lg bg-white/10 border border-gray-600 text-white w-full sm:w-72 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          
          <Button className="bg-primary raleway text-light-black hover:bg-primary/90 flex items-center gap-2 py-6">
            <BellIcon size={18} />
            Notify Me
          </Button>
        </motion.div>
        
        <motion.p
          className="text-sm text-gray-400 mt-4"
          variants={itemVariants}
        >
          Be the first to access our marketplace when it launches.
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default MarketplaceComingSoon;