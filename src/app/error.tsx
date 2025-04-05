"use client"; 

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { RefreshCw, Home } from "lucide-react";

const Custom500 = ({ error, reset }: any) => {
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

        <div className="relative mb-8">
          <motion.div
            className="w-24 h-24 bg-primary/10 rounded-full mx-auto flex items-center justify-center"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <svg className="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </motion.div>
        </div>

        <motion.h1
          className="text-2xl md:text-3xl font-medium text-white mb-4 raleway"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          Something went wrong
        </motion.h1>

        <motion.p
          className="text-lg text-gray-300 mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          We're sorry, but our server encountered an unexpected error.
          {error && (
            <span className="block mt-2 text-sm text-gray-400">
              Error: {error.message || "Unknown error"}
            </span>
          )}
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          {reset && (
            <button
              onClick={() => reset()}
              className="bg-primary text-light-black py-3 px-6 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors"
            >
              <RefreshCw size={18} />
              Try Again
            </button>
          )}
          {!reset && (
            <button
              onClick={() => window.location.reload()}
              className="bg-primary text-light-black py-3 px-6 rounded-lg font-medium flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors"
            >
              <RefreshCw size={18} />
              Refresh Page
            </button>
          )}
          <Link
            href="/"
            className="bg-transparent text-white py-3 px-6 rounded-lg font-medium border border-gray-600 hover:bg-deep-blue/30 transition-colors flex items-center justify-center gap-2"
          >
            <Home size={18} />
            Back to Home
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <div className="absolute top-20 right-20 w-32 h-32 rounded-full bg-primary blur-[100px]"></div>
        <div className="absolute bottom-20 left-20 w-32 h-32 rounded-full bg-primary blur-[100px]"></div>
      </motion.div>
    </div>
  );
};

export default Custom500;