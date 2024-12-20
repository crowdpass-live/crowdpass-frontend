import React from "react";
import { Button } from "../ui/button";

type Props = {};

const EventHero = (props: Props) => {
  return (
    <div className="flex justify-between items-center lg:my-10">
      <div className="flex flex-col items-center w-[90%] lg:w-full mx-auto lg:items-start lg:gap-2">
        <div className="text-center lg:text-left font-medium text-sm text-primary">
          ELEVATE YOUR EXPERIENCE{" "}
        </div>
        <h1 className="font-medium text-center lg:text-left text-4xl lg:text-6xl text-white raleway lg:pr-16">
          Discover Events, Secure Tickets, and Join the Crowd — All in One{" "}
          <span className="text-primary">Place</span>.
        </h1>
        <Button className="bg-primary raleway text-light-black hover:bg-primary hover:text-deep-blue w-60 py-6 text-xl mt-4">
          Get Started
        </Button>
      </div>
      <div className="lg:flex gap-4 hidden lg:min-w-[50%]">
        <img
          src="/assets/event-hero.png"
          alt="hero-inage"
          className="hidden md:flex"
        />
      </div>
    </div>
  );
};

export default EventHero;