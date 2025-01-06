"use client";

import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { usePathname } from 'next/navigation';



const Header = () => {
  const pathname = usePathname();

  return (
    <div className="rounded-3xl bg-deep-blue flex justify-between items-center py-2 px-4 lg:py-5 lg:px-10 w-full my-6 top-0 sticky overflow-hidden">
      <Link href={"/"}>
        <img
          src="/assets/crowdpass_logo.png"
          className="w-60 h-10 hidden md:block"
        />
        <img src="/assets/logo-mobile.png" className="h-6 w-12 md:hidden" />
      </Link>
      <div className="flex gap-8">
        <a
          href="/events"
          className={`text-white font-semibold text-md lg:text-2xl raleway hover:underline  hover:underline-offset-8 hover:decoration-primary ${pathname === '/events' ? 'underline-offset-8 decoration-primary underline' : ''}`}
        >
          Events
        </a>
        <a
          href="/marketplace"
          className={`text-white font-semibold text-md lg:text-2xl raleway hover:underline  hover:underline-offset-8 hover:decoration-primary ${pathname === '/marketplace' ? 'underline-offset-8 decoration-primary underline' : ''}`}
        >
          Marketplace
        </a>
      </div>
      <Button className="bg-primary text-light-black font-semibold text-sm lg:text-xl raleway hover:bg-primary hover:text-deep-blue lg:ml-4 lg:py-6 lg:px-6">
        Create Event
      </Button>
    </div>
  );
};

export default Header;
