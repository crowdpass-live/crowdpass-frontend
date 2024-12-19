import React from "react";
import { Button } from "../ui/button";
import { BsSendFill } from "react-icons/bs";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="bg-deep-blue flex flex-col justify-center items-center py-14 mt-10">
      <div className="flex flex-col max-w-[1280px] xl:w-[1280px] gap-8">
        <div className="flex gap-6 w-full justify-between items-start">
          <div className="flex flex-col gap-3 w-[430px]">
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
                className="border-none bg-deep-blue text-white"
              />
              <Button className="text-primary bg-light-black hover:text-deep-blue">
                <BsSendFill />
              </Button>
            </div>
          </div>
          <div className="flex gap-10">
            <div className="flex flex-col gap-6">
              <h1 className="font-bold text-xl  text-white">Quick Links</h1>
              <div className="flex flex-col gap-6">
                <Link href="#" className="text-white hover:underline">
                  Home
                </Link>
                <Link href="#" className="text-white hover:underline">
                  About
                </Link>
                <Link href="#" className="text-white hover:underline">
                  Contact
                </Link>
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <h1 className="font-bold text-xl text-white">Quick Links</h1>
              <div className="flex flex-col gap-6">
                <Link href="#" className="text-white hover:underline">
                  Get Started
                </Link>
                <Link href="#" className="text-white hover:underline">
                  Term & Conditions
                </Link>
                <Link href="#" className="text-white hover:underline">
                  Privacy policy
                </Link>
              </div>
            </div>
            <div className="flex flex-col gap-6">
              <h1 className="font-bold text-xl text-white">Quick Links</h1>
              <div className="flex flex-col gap-6">
                <Link href="#" className="text-white hover:underline">
                  Create event
                </Link>
                <Link href="#" className="text-white hover:underline">
                  Explore events
                </Link>
                <Link href="#" className="text-white hover:underline">
                  Get SPOK
                </Link>
                <Link href="#" className="text-white hover:underline">
                  Attend Event
                </Link>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="flex gap-6 w-full justify-between items-center">
          <div className="flex gap-2">
            <img src="/assets/copyright.png" alt="copyright" />
            <p className="text-lg text-white">All Rights Reserved, CrowdPass 2024.</p>
          </div>
          <div className="flex gap-3">
            <img src="/assets/facebook-icon.png" alt="facebook-icon" />
            <img src="/assets/instagram-icon.png" alt="instagram-icon" />
            <img src="/assets/youtube-icon.png" alt="youtube-icon" />
            <img src="/assets/x-icon.png" alt="x-icon" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;