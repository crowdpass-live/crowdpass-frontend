import React from "react";
import EventCarousel from "../events/EventCarousel";

type Props = {};

const SuggestionsSection = (props: Props) => {
  return (
    <div>
      <h1 className="text-white text-4xl raleway font-semibold text-center my-10">
        Suggestions for You
      </h1>
      <div className="bg-[#14141A] p-3 py-10 w-full rounded-xl">
        <EventCarousel />
      </div>
    </div>
  );
};

export default SuggestionsSection;
