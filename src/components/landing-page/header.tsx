import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const Header = () => {

  return (
    <div className="rounded-3xl bg-deep-blue flex justify-between items-center py-2 px-4 lg:py-5 lg:px-10 w-full my-6 top-0 sticky overflow-hidden">
     <Link href={"/"}><img src="/assets/crowdpass_logo.png" height={30} width={150} className="w-24 h-6 lg:h-[30px] lg:w-[150px]" /></Link> 
        <a href="/events" className="text-white font-semibold text-md lg:text-2xl raleway hover:underline hover:text-primary">Events</a>
        <Button
          className="bg-primary text-light-black text-sm lg:text-xl raleway hover:bg-primary hover:text-deep-blue lg:ml-4 lg:py-6 lg:px-8"
        >
          Create Event
        </Button>
    </div>
  );
};

export default Header;