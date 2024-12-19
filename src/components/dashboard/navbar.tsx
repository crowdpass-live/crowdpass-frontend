"use client"

import { User, UserCircle } from "lucide-react";
import React from "react";
import { BiSolidMessageDetail } from "react-icons/bi";
import { FaBell } from "react-icons/fa";
import { IoFilter } from "react-icons/io5";
import { Button } from "../ui/button";
import { useAccount, useBalance } from "@starknet-react/core";

const Navbar = () => {
  const { address } = useAccount();
  const { data } = useBalance({
    address: address,
  });

  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex gap-6">
        <input
          type="text"
          placeholder="Search"
          className="p-2 h-11 w-80 text-white bg-transparent border-2 rounded-lg"
        />
        <div className="p-2.5 bg-primary rounded-full">
          <IoFilter size={25} className="text-light-black" />
        </div>
      </div>
      <div className="flex gap-4 items-center">
        <Button className="flex items-center gap-4 p-6 bg-transparent hover:bg-light-black">
          <p className="text-white font-medium text-lg">{data?.value}ETH</p>
          <UserCircle color="#FF6932" size={25}/>
          <p className="text-white font-medium text-lg">{`0x${address?.split('x')[1].slice(0, 4)}...${address?.slice(-4)}`}</p>
        </Button>
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
