"use client"; 

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

const Custom404 = () => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-[#14141A] to-[#14141A]/80 flex flex-col items-center justify-center px-4">
      <motion.div
        className="text-center max-w-xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Logo */}
        <Link href="/" className="inline-block mb-10">
          <img
            src="https://res.cloudinary.com/dnohqlmjc/image/upload/v1742633487/crowdpass_logo_a2f8bq.png"
            alt="CrowdPass Logo"
            width={180}
            height={40}
            className="mx-auto"
          />
        </Link>

        {/* Error Code */}
        <div className="relative mb-6">
          <motion.h1 
            className="text-[120px] md:text-[180px] font-bold text-primary opacity-10 leading-none"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            404
          </motion.h1>
          <motion.div 
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <h2 className="text-2xl md:text-4xl text-white font-medium raleway">Page Not Found</h2>
          </motion.div>
        </div>

        {/* Message */}
        <motion.p 
          className="text-lg text-gray-300 mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          The page you're looking for doesn't exist or has been moved.
        </motion.p>

        {/* Action Buttons */}
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <Link
            href="/"
            className="bg-primary text-light-black py-3 px-6 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors"
          >
            <ArrowLeft size={18} />
            Return Home
          </Link>
        </motion.div>
      </motion.div>

      {/* Decorative Elements */}
      <motion.div 
        className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <div className="absolute top-20 left-20 w-32 h-32 rounded-full bg-primary blur-[100px]"></div>
        <div className="absolute bottom-20 right-20 w-32 h-32 rounded-full bg-primary blur-[100px]"></div>
      </motion.div>
    </div>
  );
};

export default Custom404;