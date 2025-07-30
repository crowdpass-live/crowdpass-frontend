import React, { useState } from "react";
import { Button } from "../ui/button";
import { categories, locations, payments } from "./dummyData";
import { Search, Filter, X } from "lucide-react";

const FilterEvent = ({ filterState, setFilterState }: any) => {
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const handleCategoryChange = (category: string) => {
    setFilterState((prev: { categories: string[]; }) => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter((c: string) => c !== category) 
        : [...prev.categories, category], 
    }));
  };

  const handleLocationChange = (location: string) => {
    setFilterState((prev: { locations: string[]; }) => ({
      ...prev,
      locations: prev.locations.includes(location)
        ? prev.locations.filter((l: string) => l !== location) 
        : [...prev.locations, location], 
    }));
  };

  const handlePaymentChange = (payment: string) => {
    setFilterState((prev: { payments: string[]; }) => ({
      ...prev,
      payments: prev.payments.includes(payment)
        ? prev.payments.filter((p: string) => p !== payment) 
        : [...prev.payments, payment], 
    }));
  };

  const handleDateChange = (type: "start" | "end", value: string) => {
    setFilterState((prev: any) => ({
      ...prev,
      [type === "start" ? "startDate" : "endDate"]: value,
    }));
  };

  const handleSearchChange = (query: string) => {
    setFilterState((prev: any) => ({
      ...prev,
      searchQuery: query,
    }));
  };

  const FilterContent = () => (
    <div className="flex flex-col w-full h-auto pb-10 bg-[#14141A] p-5 space-y-8 rounded-2xl mb-4">
      {/* Search BAR */}
      <div className="border w-full rounded-md border-[#B0B0B4] flex gap-3 text-white justify-between items-center">
        <input
          type="text"
          placeholder="Search events by name"
          value={filterState.searchQuery}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="border-none bg-transparent rounded-lg text-[#B0B0B4] w-full"
        />
        <Button className="h-full text-[#14141A] bg-primary hover:text-deep-blue">
          <Search />
        </Button>
      </div>

      {/* Categories */}
      <div>
        <div className="flex w-full text-[#B0B0B4] items-center justify-center gap-2 mb-4">
          <h1 className="text-[#B0B0B4] raleway font-semibold">Categories</h1>
          <hr className="border-white/50 w-full" />
        </div>
        <div className="flex flex-wrap">
          <div className="grid grid-cols-2 gap-x-12 gap-y-2">
            {categories.map((category, index) => (
              <div className="flex items-center" key={index}>
                <input
                  type="checkbox"
                  name={category}
                  id={category}
                  checked={filterState.categories.includes(category)}
                  onChange={() => handleCategoryChange(category)}
                  className="appearance-none checked:bg-primary indeterminate:bg-gray-300"
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
          <hr className="border-white/50 w-full" />
        </div>
        <div className="flex flex-wrap">
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="date"
              name="startDate"
              id="startDate"
              value={filterState.startDate}
              onChange={(e) => handleDateChange("start", e.target.value)}
              className="w-full sm:w-40 bg-transparent text-[#B0B0B4] rounded-md border-2"
            />
            <input
              type="date"
              name="endDate"
              id="endDate"
              value={filterState.endDate}
              onChange={(e) => handleDateChange("end", e.target.value)}
              className="w-full sm:w-40 bg-transparent text-[#B0B0B4] rounded-md border-2"
            />
          </div>
        </div>
      </div>

      {/* Filter by Location */}
      <div>
        <div className="flex w-full text-[#B0B0B4] items-center justify-center gap-2 mb-4">
          <h1 className="text-[#B0B0B4] raleway font-semibold">Location</h1>
          <hr className="border-white/50 w-full" />
        </div>
        <div className="flex flex-wrap">
          <div className="grid grid-cols-2 gap-x-12 gap-y-2">
            {locations.map((location, index) => (
              <div className="flex items-center" key={index}>
                <input
                  type="checkbox"
                  name={location}
                  id={location}
                  checked={filterState.locations.includes(location)}
                  onChange={() => handleLocationChange(location)}
                  className="appearance-none checked:bg-primary indeterminate:bg-gray-300"
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
          <hr className="border-white/50 w-full" />
        </div>
        <div className="flex flex-wrap">
          <div className="grid grid-cols-2 gap-x-12 gap-y-2">
            {payments.map((payment, index) => (
              <div className="flex items-center" key={index}>
                <input
                  type="checkbox"
                  name={payment}
                  id={payment}
                  checked={filterState.payments.includes(payment)}
                  onChange={() => handlePaymentChange(payment)}
                  className="appearance-none checked:bg-primary indeterminate:bg-gray-300"
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

  return (
    <>
      {/* Desktop Filter - Always visible on large screens */}
      <div className="hidden lg:flex flex-col w-[40%] h-auto pb-10 bg-[#14141A] p-5 space-y-8 rounded-2xl mb-4">
        <FilterContent />
      </div>

      {/* Mobile Filter Overlay */}
      {isMobileFilterOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/50 z-40" onClick={() => setIsMobileFilterOpen(false)}>
          <div 
            className="absolute bottom-0 w-full bg-[#14141A] rounded-t-2xl p-4 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <FilterContent />
          </div>
        </div>
      )}
    </>
  );
};

export default FilterEvent;