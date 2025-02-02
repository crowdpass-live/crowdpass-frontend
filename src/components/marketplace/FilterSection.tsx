import React from "react";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import { Button } from "../ui/button";


type Props = {};

const FilterSection = (props: Props) => {
    const categories = [
        "Sports",
        "Festivals",
        "Gaming",
        "Wellness",
        "Exhibition",
        "Travels",
        "Family",
        "Fundraisers",
        "Concerts",
        "Climate",
        "Theatre",
        "Technology",
        "Webinars",
        "Corperate",
        "Networking",
        "Education",
      ];
    
      const Payments = ["Paid", "Free"];
    
      const Locations = ["Remote", "In-Person"];
    
      const Dates = ["from", "to"];
  return (
    <div>
      {/* Categories */}
      <div>
        <div className="flex w-full text-[#B0B0B4] items-center justify-center gap-2 mb-4">
          <h1 className="text-[#B0B0B4] raleway font-semibold"> Categories</h1>
          <hr className="border-white/50 w-full " />
        </div>
        <div className="flex flex-wrap">
          <div className="grid grid-cols-2 gap-x-12 gap-y-2">
            {categories.map((category, index) => (
              <div className="flex items-center" key={index}>
                <input
                  type="checkbox"
                  name={category}
                  id={category}
                  className="appearance-none  checked:bg-primary indeterminate:bg-gray-300 "
                />
                <label htmlFor={category} className="text-[#B0B0B4] ml-2">
                  {category}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Filter by Dates */}
      <div>
        <div className="flex w-full text-[#B0B0B4] items-center justify-center gap-2 mb-4">
          <h1 className="text-[#B0B0B4] raleway font-semibold">Date</h1>
          <hr className="border-white/50 w-full " />
        </div>
        <div className="flex flex-wrap">
          <div className="flex gap-2">
            <div className="flex gap-2">
              {Dates.map((date, index) => (
                <div className="flex items-center" key={index}>
                  <input
                    type="date"
                    name={date}
                    id={date}
                    placeholder="from"
                    className="w-36 bg-transparent text-[#B0B0B4] rounded-md border-2"
                  />
                </div>
              ))}
            </div>
            <Button className="text-[#14141A] bg-primary hover:text-deep-blue h-full">
              <HiOutlineAdjustmentsHorizontal size={25} />
            </Button>
          </div>
        </div>
      </div>
      {/* Filter by location */}
      <div>
        <div className="flex w-full text-[#B0B0B4] items-center justify-center gap-2 mb-4">
          <h1 className="text-[#B0B0B4] raleway font-semibold">Location</h1>
          <hr className="border-white/50 w-full " />
        </div>
        <div className="flex flex-wrap">
          <div className="grid grid-cols-2 gap-x-12 gap-y-2">
            {Locations.map((location, index) => (
              <div className="flex items-center" key={index}>
                <input
                  type="checkbox"
                  name={location}
                  id={location}
                  className="appearance-none  checked:bg-primary indeterminate:bg-gray-300 "
                />
                <label htmlFor={location} className="text-[#B0B0B4] ml-2">
                  {location}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Filter by Payment Type */}
      <div>
        <div className="flex w-full text-[#B0B0B4] items-center justify-center gap-2 mb-4">
          <h1 className="text-[#B0B0B4] raleway font-semibold">Payment</h1>
          <hr className="border-white/50 w-full " />
        </div>
        <div className="flex flex-wrap">
          <div className="grid grid-cols-2 gap-x-12 gap-y-2">
            {Payments.map((payment, index) => (
              <div className="flex items-center" key={index}>
                <input
                  type="checkbox"
                  name={payment}
                  id={payment}
                  className="appearance-none  checked:bg-primary indeterminate:bg-gray-300 "
                />
                <label htmlFor={payment} className="text-[#B0B0B4] ml-2">
                  {payment}
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSection;
