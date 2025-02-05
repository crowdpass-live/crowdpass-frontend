import React from "react";
import { Button } from "../ui/button";

type Props = {};

const MarketplaceHero = (props: Props) => {
  return (
    <div className="flex justify-between items-center lg:my-10 flex-col-reverse lg:flex-row mx-4">
      <div className="flex flex-col items-center w-[90%] lg:w-full mx-auto lg:items-start lg:gap-2">
        <div className="text-center lg:text-left font-medium text-sm text-primary">
          RESELL YOUR TICKETS. HELP SOMEONE ATTEND.
        </div>
        <h1 className="font-medium text-center lg:text-left text-2xl md:text-4xl xl:text-6xl text-white raleway lg:pr-16">
          Resell with confidence, buy with trust — unlock new opportunities with
          <span className="text-primary"> CrowdPass</span> 
        </h1>
        <Button className="bg-primary raleway text-light-black hover:bg-primary hover:text-deep-blue w-60 py-6 text-xl mt-4">
          List Ticket
        </Button>
      </div>
      <div className="flex justify-center items-center m-3 gap-4 w-full lg:min-w-[50%]">
        <img
          src="/assets/marketplace-hero.png"
          alt="hero-image"
          className="md:flex"
        />
      </div>
    </div>
  );
};

export default MarketplaceHero;
