import { Button } from "@/components/ui/button";
import React from "react";

const Review = ({setActiveStep}:any) => {
  return (
    <div className="w-[655px] h-full flex flex-col gap-4">
      <img
        src="/assets/add-image.png"
        alt="event image"
        className="w-full h-[210px] object-cover"
      />
      <div className="w-full">
        <hr className="text-white" />
        <h1 className="raleway text-2xl md:text-4xl text-white font-semibold my-4">
          Description
        </h1>
        <hr className="text-white" />
        <p className="text-white my-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique at
          omnis veniam sunt saepe illo explicabo quidem animi dolorem neque!
          Molestiae, voluptate dolore beatae animi rerum maiores quasi illum
          itaque aspernatur odio, dolorum nulla nihil! Quae praesentium ipsa
          exercitationem.
        </p>
      </div>
      <div className="w-full">
        <hr className="text-white " />
        <h1 className="raleway text-2xl md:text-4xl text-white font-semibold my-4">
          Ticket
        </h1>
        <hr className="text-white" />
        <div className="flex flex-col md:flex-row gap-3 justify-between my-6">
          <div className="border p-4 border-[#B0B0B4] flex flex-col gap-4 w-80 rounded-lg">
            <p className="bg-[#5B5959] w-full rounded-lg flex raleway text-lg justify-center items-center py-3 text-white">
              Summary
            </p>
            <div className="flex justify-between items-center">
              <p className="text-[#FFFAFA]">Available</p>
              <p className="text-[#FFFAFA]">1500</p>
            </div>
            <hr className="text-[#FFFAFA]" />
            <div className="flex justify-between items-center">
              <p className="text-[#FFFAFA]">Spok</p>
              <p className="text-[#FFFAFA]">0</p>
            </div>
            <hr className="text-[#FFFAFA]" />
            <div className="flex justify-between items-center">
              <p className="text-[#FFFAFA]">Duration</p>
              <p className="text-[#FFFAFA]">1 day</p>
            </div>
            <hr className="text-[#FFFAFA]" />

            <ul className="space-y-4">
              <li className="text-[#B0B0B4]">VIP - $5</li>
              <li className="text-[#B0B0B4]">Early Birds - $3</li>
              <li className="text-[#B0B0B4]">Regular - $2</li>
            </ul>
          </div>
          <div className="w-64 flex flex-col justify-between">
            <div className="flex flex-col gap-4">
              <img
                src="/assets/MapImage.png"
                alt="map image"
                className="w-full h-40 object-cover"
              />
              <p className="text-white">
                The Zone Tech Park, Gbagada. Lorem ipsum dolor sit amet,
                consectetur adipiscing elit.
              </p>
            </div>
            <p className="text-white"><span className="font-bold ">Organized By:</span> Starknet Africa</p>
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-5">
        <Button
          className="bg-primary raleway text-light-black hover:bg-primary hover:text-deep-blue px-10 py-7 text-xl mt-4 font-semibold"
          onClick={() => setActiveStep(2)}
        >
          Back
        </Button>
        <Button
          className="bg-primary raleway text-light-black hover:bg-primary hover:text-deep-blue px-10 py-7 text-xl mt-4 font-semibold"
          onClick={() => setActiveStep(2)}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default Review;
