import React from "react";
import { Button } from "../ui/button";
import { BsSendFill } from "react-icons/bs";

import Link from "next/link";

const Footer = () => {
  return (
    <div className="bg-deep-blue flex flex-col justify-center items-center py-10 mt-10 rounded-md raleway">
      <div className="flex flex-col max-w-[1280px] xl:w-[1280px] gap-8 lg:px-6">
        <div className="flex flex-col lg:flex-row gap-6 w-full justify-between items-start">
          <div className="flex flex-col mx-4 gap-3 lg:w-[430px]">
            <img src="/assets/crowdpass_logo.png" height={48} width={300} />
            <p className="text-white pt-3">
              Welcome to CrowdPass, your ultimate event management platform. We
              empower event organizers to create, manage, and promote their
              events with ease.
            </p>
            <div className="p-2 border rounded-md border-white flex gap-3 text-white justify-between items-center">
              <input
                type="text"
                placeholder="Enter email to subsribe to our newsletter"
                className="border-none bg-deep-blue text-white w-full"
              />
              <Button className="text-primary bg-light-black hover:text-deep-blue">
                <BsSendFill />
              </Button>
            </div>
          </div>
          <div className="grid lg:grid-cols-3 gap-evenly w-full mx-4 gap-3 md:gap-x-20 lg:w-2/5  lg:gap-10">
            <div className="flex flex-col gap-2 my-2 md:gap-6">
              <h1 className="font-medium text-xl  text-white">Quick Links</h1>
              <div className="flex flex-col gap-2 md:gap-6">
                <Link href="#" className="text-white hover:underline hover:text-primary">
                  Home
                </Link>
                <Link href="#" className="text-white hover:underline hover:text-primary">
                  About
                </Link>
                <Link href="#" className="text-white hover:underline hover:text-primary">
                  Contact
                </Link>
              </div>
            </div>
            <div className="flex flex-col gap-2 my-2 md:gap-6">
              <h1 className="font-medium text-xl text-white">Quick Links</h1>
              <div className="flex flex-col gap-2 md:gap-6">
                <Link href="#" className="text-white hover:underline hover:text-primary">
                  Get Started
                </Link>
                <Link href="#" className="text-white hover:underline hover:text-primary">
                  Term & Conditions
                </Link>
                <Link href="#" className="text-white hover:underline hover:text-primary">
                  Privacy policy
                </Link>
              </div>
            </div>
            <div className="flex flex-col gap-2 my-2 md:gap-6">
              <h1 className="font-medium text-xl text-white">Quick Links</h1>
              <div className="flex flex-col gap-2 md:gap-6">
                <Link href="#" className="text-white hover:underline hover:text-primary">
                  Create event
                </Link>
                <Link href="#" className="text-white hover:underline hover:text-primary">
                  Get SPOK
                </Link>
                <Link href="#" className="text-white hover:underline hover:text-primary">
                  Attend Event
                </Link>
              </div>
            </div>
          </div>
        </div>
        <hr className="w-full" />
        <div className="flex flex-col-reverse md:flex-row gap-2 md:gap-6 w-full justify-between items-center px-4 ">
          <div className="flex gap-2">
            <img src="/assets/copyright.png" alt="copyright" />
            <p className="text-lg text-white">
              All Rights Reserved, CrowdPass 2024.
            </p>
          </div>
          <div className="flex gap-3">
            <img src="/assets/facebook-icon.png" alt="facebook-icon" />
            <Link href={"https://www.instagram.com/hostitevents/"} target="_blank">
              <img src="/assets/instagram-icon.png" alt="instagram-icon" />
            </Link>
            <img src="/assets/youtube-icon.png" alt="youtube-icon" />
            <Link href={"https://x.com/hostit_events"} target="_blank">
              <img src="/assets/x-icon.png" alt="x-icon" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
