"use client";

import React from "react";
import Header from "../header";
import { Button } from "../../ui/button";
import Link from "next/link";
import { useAccount, useConnect } from "@starknet-react/core"



const HeroSection = () => {
  return (
    <div className="max-w-[1280px] mx-auto relative">
      <Header />
      <div className="flex flex-col-reverse gap-4 md:flex-row justify-between items-center lg:my-20 mx-4">
        <div className="flex flex-col items-center w-[85%] lg:w-full mx-auto md:items-start lg:gap-2">
          <div className="text-center lg:text-left font-medium text-sm text-primary">
            REINVENT YOUR EVENTS{" "}
          </div>
          <h1 className="font-medium text-center md:text-left text-2xl md:text-4xl xl:text-6xl  text-white raleway">
            Secure Tickets, Seamless Access — Anytime, Anywhere with{" "}
            <span className="text-primary">CrowdPass</span>
          </h1>
          <Link href="/events">
          <Button className="bg-primary raleway text-light-black hover:bg-primary hover:text-deep-blue w-60 py-6 text-xl mt-4">
            Get Started
          </Button>
          </Link>
        </div>
        <div className="w-full flex gap-4 lg:min-w-[50%]">
          <div className="flex gap-4 flex-col">
            <img
              src="/assets/top-left.png"
              alt="hero-inage"
              className=" md:flex"
            />
            <img
              src="/assets/bottom-left.png"
              alt="hero-inage"
              className=" md:flex"
            />
          </div>
          <div className="flex gap-4 flex-col">
            <img
              src="/assets/hero-image.png"
              alt="hero-inage"
              className=" md:flex"
            />
          </div>
          <div className="flex gap-4 flex-col">
            <img
              src="/assets/bottom-left.png"
              alt="hero-inage"
              className=" md:flex rotate-180"
            />
            <img
              src="/assets/bottom-right.png"
              alt="hero-inage"
              className=" md:flex"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
