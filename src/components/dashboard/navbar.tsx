"use client";
import React from "react";
import { BiSolidMessageDetail } from "react-icons/bi";
import { FaBars } from "react-icons/fa";
import dynamic from "next/dynamic";

const ConnectedUser = dynamic(() => import("../ConnectedUser"), {
  ssr: false,
});

const Navbar = ({ toggleSidebar }: any) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex gap-6">
         <img
            alt={"logo"}
            src="https://res.cloudinary.com/dnohqlmjc/image/upload/v1742633487/crowdpass_logo_a2f8bq.png"
            className="w-44 h-8 hidden sm:block lg:hidden"
          />
        <img
            src="https://res.cloudinary.com/dnohqlmjc/image/upload/v1742633483/logo-mobile_bewfoo.png"
            className="h-6 w-10 sm:hidden"
            alt={"mobile-logo"}
          />
      </div>
      <div className="flex gap-4 items-center">
        <ConnectedUser />
        <div className="lg:hidden p-2.5 bg-primary rounded-full">
<button 
          onClick={toggleSidebar}
          className="lg:hidden text-white p-1 focus:outline-none"
        >
          <FaBars className="text-xl" />
        </button>        </div>
      </div>
    </div>
  );
};

export default Navbar;