import React, { useState } from "react";
import { Tab, TabList, Tabs } from "react-tabs";
import { dummyEvents } from "../events/dummyData";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import MarketplaceCard from "./MarketplaceCard";
type Props = {};

const ExploreMarketplace = (props: Props) => {
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
  const detailsTabs = ["All Tickets", "My Tickets"];

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
    <div>
      <h1 className="text-white text-4xl raleway font-semibold text-center my-10">
        Explore Marketplace
      </h1>
      <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
        <div className="flex flex-col md:flex-row items-center justify-end ">
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
          </div>
          {/* Events Section */}
          <div className="flex flex-wrap flex-grow gap-8 justify-start items-center w-full">
            {tabIndex === 0 &&
              (dummyEvents.length > 0 ? (
                dummyEvents.map((eachEvent: any, index: any) => (
                  <MarketplaceCard eachEvent={eachEvent} key={index} />
                ))
              ) : (
                <p className="text-white">No events to show</p>
              ))}
            {tabIndex === 1 &&
              (upcomingEvents.length > 0 ? (
                upcomingEvents.map((eachEvent: any, index: any) => (
                  <MarketplaceCard eachEvent={eachEvent} key={index} />
                ))
              ) : (
                <p className="text-white">No events to show</p>
              ))}
            {tabIndex === 2 &&
              (endedEvents.length > 0 ? (
                endedEvents.map((eachEvent: any, index: any) => (
                  <MarketplaceCard eachEvent={eachEvent} key={index} />
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
                        if (currentPage > 1)
                          handleChangePage(e, currentPage - 1);
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
    </div>
  );
};

export default ExploreMarketplace;
