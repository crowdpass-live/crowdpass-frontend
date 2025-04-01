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
        <button 
          onClick={toggleSidebar}
          className="lg:hidden text-white p-2 focus:outline-none"
        >
          <FaBars className="text-xl" />
        </button>
      </div>
      <div className="flex gap-4 items-center">
        <ConnectedUser />
        <div className="p-2.5 bg-primary rounded-full">
          <BiSolidMessageDetail className="text-light-black md:text-2xl" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;