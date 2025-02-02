import React, { useState } from "react";
import { Tab, TabList, Tabs } from "react-tabs";
import { dummyEvents } from "./dummyData";
import EventCard from "./EventCard";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import { HiOutlineAdjustmentsHorizontal } from "react-icons/hi2";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";

type Props = {};

const ExploreEvents = (props: Props) => {
  const upcomingEvents = dummyEvents.filter(
    (event) => Number(event.eventEndDate) > Date.now() / 1000
  );

  const endedEvents = dummyEvents.filter(
    (event) => Number(event.eventEndDate) <= Date.now() / 1000
  );
  const [tabIndex, setTabIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(2);

  const itemsPerPage = 6;

  // Filter Parameters
  const detailsTabs = ["All Events", "Upcoming", "Ended"];

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

  const events =
    tabIndex === 0
      ? dummyEvents
      : tabIndex === 1
      ? upcomingEvents
      : endedEvents;

  const totalPages = Math.ceil(events.length / itemsPerPage);

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    setCurrentPage(page);
  };

  return (
    <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
      <div className="flex flex-col md:flex-row items-center justify-between ">
        <h1 className="text-4xl font-semibold text-white raleway my-6">
          Explore
        </h1>
        <TabList className={"flex items-center justify-evenly gap-6 my-2"}>
          {detailsTabs.map((eachTab, index) => (
            <Tab
              key={index}
              className={"text-white font-semibold raleway text-lg"}
              selectedClassName="bg-primary raleway py-2 px-4 text-black rounded-sm"
            >
              {eachTab}
            </Tab>
          ))}
        </TabList>
      </div>

      <div className="flex items-start justify-between">
        {/* Filter Section */}
        <div className="w-[45%] h-[1240px] bg-[#14141A] p-5 space-y-8 hidden rounded-md">
          {/* Search BAR */}
          <div className="border w-full rounded-md border-[#B0B0B4] flex gap-3 text-white justify-between items-center">
            <input
              type="text"
              placeholder="Search events by name"
              className="border-none bg-transparent rounded-lg text-[#B0B0B4] w-full"
            />
            <Button className="h-full text-[#14141A] bg-primary hover:text-deep-blue">
              <Search />
            </Button>
          </div>

          {/* Categories */}
          <div>
            <div className="flex w-full text-[#B0B0B4] items-center justify-center gap-2 mb-4">
              <h1 className="text-[#B0B0B4] raleway font-semibold">
                {" "}
                Categories
              </h1>
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

        {/* Events Section */}
        <div className="flex flex-wrap flex-grow gap-8 justify-center items-center w-full">
          {tabIndex === 0 &&
            (dummyEvents.length > 0 ? (
              dummyEvents.map((eachEvent: any, index: any) => (
                <EventCard eachEvent={eachEvent} key={index} />
              ))
            ) : (
              <p className="text-white">No events to show</p>
            ))}
          {tabIndex === 1 &&
            (upcomingEvents.length > 0 ? (
              upcomingEvents.map((eachEvent: any, index: any) => (
                <EventCard eachEvent={eachEvent} key={index} />
              ))
            ) : (
              <p className="text-white">No events to show</p>
            ))}
          {tabIndex === 2 &&
            (endedEvents.length > 0 ? (
              endedEvents.map((eachEvent: any, index: any) => (
                <EventCard eachEvent={eachEvent} key={index} />
              ))
            ) : (
              <p className="text-white">No events to show</p>
            ))}

          {dummyEvents.length > 0 && (
            <Pagination className="flex justify-end text-white">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage > 1) handleChangePage(e, currentPage - 1);
                    }}
                  />
                </PaginationItem>
                {Array.from({ length: totalPages }, (_, index) => (
                  <PaginationItem key={index}>
                    <PaginationLink
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handleChangePage(e, index + 1);
                      }}
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage < totalPages)
                        handleChangePage(e, currentPage + 1);
                    }}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </div>
      </div>
    </Tabs>
  );
};

export default ExploreEvents;
