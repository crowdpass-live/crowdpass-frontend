"use client";

import React from "react";
import Header from "../header";
import { Button } from "../../ui/button";
import Link from "next/link";

const HeroSection = () => {
  return (
    <div className="max-w-[1280px] mx-auto relative">
      <Header />
      <div className="flex justify-between items-center lg:my-20">
        <div className="flex flex-col items-center w-[85%] lg:w-full mx-auto lg:items-start lg:gap-2">
          <div className="text-center lg:text-left font-medium text-sm text-primary">
            REINVENT YOUR EVENTS{" "}
          </div>
          <h1 className="font-medium text-center lg:text-left text-4xl lg:text-6xl text-white raleway">
            Secure Tickets, Seamless Access — Anytime, Anywhere with{" "}
            <span className="text-primary">CrowdPass</span>
          </h1>
          <Button className="bg-primary raleway text-light-black hover:bg-primary hover:text-deep-blue w-60 py-6 text-xl mt-4">
            Get Started
          </Button>
        </div>
        <div className="lg:flex gap-4 hidden lg:min-w-[50%]">
          <div className="flex gap-4 flex-col">
            <img
              src="/assets/top-left.png"
              alt="hero-inage"
              className="hidden md:flex"
            />
            <img
              src="/assets/bottom-left.png"
              alt="hero-inage"
              className="hidden md:flex"
            />
          </div>
          <div className="flex gap-4 flex-col">
            <img
              src="/assets/hero-image.png"
              alt="hero-inage"
              className="hidden md:flex"
            />
          </div>
          <div className="flex gap-4 flex-col">
            <img
              src="/assets/bottom-left.png"
              alt="hero-inage"
              className="hidden md:flex rotate-180"
            />
            <img
              src="/assets/bottom-right.png"
              alt="hero-inage"
              className="hidden md:flex"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
