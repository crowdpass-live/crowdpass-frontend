"use client";

import React from "react";
import Header from "../header";
import { Button } from "../../ui/button";
import Link from "next/link";

const HeroSection = () => {
  return (
    <div className="max-w-[1280px] mx-auto">
      <Header />
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-8">
          <h1 className="font-medium text-6xl text-white">Reinvent your Events</h1>
          <h1 className="font-medium text-6xl text-white">
            with <span className="text-primary italic">CrowdPass</span>
          </h1>
          <div className="font-medium text-xl text-white pr-20">
            CrowdPass helps you transform your event into an unforgettable
            experience. With seamless attendee management, secure ticketing, and
            enhanced engagement tools,
          </div>
          <Button className="bg-primary text-light-black hover:bg-primary hover:text-deep-blue w-60 py-6 text-xl">
            Get Started
          </Button>
        </div>
        <img src="/assets/hero-image.png" alt="hero-inage" />
      </div>
    </div>
  );
};

export default HeroSection;
