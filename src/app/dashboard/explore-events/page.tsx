"use client";
import EventCard from "@/components/dashboard/event-card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import React from "react";
import { useReadContract } from '@starknet-react/core';
import eventAbi from '@/Abis/eventAbi.json'
import Preloader from "@/components/Preloader";

type Props = {};

const page = (props: Props) => {

  const contractAddr = '0x04da2dd996dc36097f2f5b663db1ffa75466d32036d7bbdbe6719f768bdc5b26';

  const { data } = useReadContract({
    functionName: "get_all_events",
    args: [],
    abi: eventAbi,
    address: contractAddr,
    watch: true,
  });

  return (
    <div>
        {data === undefined && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
          <Preloader />
        </div>
      )}
      <div className="flex justify-between items-center my-4">
        <h1 className="text-white font-bold text-3xl">Events</h1>
        <Button className="font-semibold flex gap-3 text-light-black text-base p-4" >Create Event <Plus color="#14141A" size={20}  className="font-bold"/></Button>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {data && data.length > 0 ? data.map((item : any, index: number) => (
          <EventCard event={item} key={index}/>
        )) : <h4>No events yets</h4> }
      </div>
      
      
    </div>
  );
};

export default page;
