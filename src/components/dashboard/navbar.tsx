"use client"

import React from "react";
import { BiSolidMessageDetail } from "react-icons/bi";
import { FaBell } from "react-icons/fa";
import ConnectedUser from "../ConnectedUser";

const Navbar = () => {

  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex gap-6">
      </div>
      <div className="flex gap-4 items-center">
       <ConnectedUser />
        <div className="p-2.5 bg-primary rounded-full">
          <BiSolidMessageDetail size={25} className="text-light-black" />
        </div>
        <div className="p-2.5 bg-primary rounded-full">
          <FaBell size={25} className="text-light-black " />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
