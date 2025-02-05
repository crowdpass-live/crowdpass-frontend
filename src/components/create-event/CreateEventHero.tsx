import React from "react";
import { Button } from "../ui/button";

type Props = {};

const CreateEventHero = (props: Props) => {
  return (
    <div className="flex justify-between items-center lg:my-10 flex-col-reverse lg:flex-row mx-4">
      <div className="flex flex-col items-center w-[90%] lg:w-full mx-auto lg:items-start lg:gap-2">
        <div className="text-center lg:text-left font-medium text-sm text-primary">
          BRING YOUR VISION TO LIFE{" "}
        </div>
        <h1 className="font-medium text-center lg:text-left text-2xl md:text-3xl xl:text-5xl  text-white raleway lg:pr-16">
          Organize with ease, connect effortlessly — start your event journey
          with <span className="text-primary">CrowdPass</span>.
        </h1>
        <Button className="bg-primary raleway text-light-black hover:bg-primary hover:text-deep-blue w-60 py-6 text-xl mt-4">
          Connect Wallet
        </Button>
      </div>
      <div className="lg:flex gap-4 w-full m-4 lg:min-w-[50%]">
        <video autoPlay>
          <source src="/assets/hero-video.mp4" type="video/mp4" className="w-full h-full"/>
        </video>
      </div>
    </div>
  );
};

export default CreateEventHero;
