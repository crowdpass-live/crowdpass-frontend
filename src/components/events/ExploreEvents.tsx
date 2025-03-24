"use client";

import React, { useState } from "react";
import { Tab, TabList, Tabs } from "react-tabs";
import { tabs } from "./dummyData";
import EventCard from "./EventCard";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import { motion, AnimatePresence } from "framer-motion";
import FilterEvent from "./FilterEvent";
import useGetAllEvents from "@/hooks/read-hooks/useGetAllEvents";

type FilterState = {
  categories: string[];
  locations: string[];
  payments: string[];
  startDate: string;
  endDate: string;
  searchQuery: string;
};

const ExploreEvents = () => {
  const { events, isLoading } = useGetAllEvents();
  const [tabIndex, setTabIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Consolidated filter state
  const [filterState, setFilterState] = useState<FilterState>({
    categories: [],
    locations: [],
    payments: [],
    startDate: "",
    endDate: "",
    searchQuery: "",
  });

  // Filter events based on tab and filter parameters
  const filteredEvents = getFilteredEvents(events || [], tabIndex, filterState);

  // Paginate the filtered events
  const paginatedEvents = filteredEvents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
  };

  // Reset pagination to page 1 when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [filterState]);

  return (
    <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
       {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="text-white text-2xl">Fetching Events...</div>
        </div>
      )}
      <div className="flex flex-col md:flex-row items-center justify-between" id="explore">
        <motion.h1
          className="text-4xl font-semibold text-white raleway my-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.5 }}
        >
          Explore
        </motion.h1>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.5 }}
        >
          <TabList className={"flex items-center justify-evenly gap-6 my-2"}>
            {tabs.map((tab, index) => (
              <Tab
                key={index}
                className={"text-white font-semibold raleway text-lg"}
                selectedClassName="bg-primary raleway py-2 px-4 text-black rounded-sm"
              >
                {tab}
              </Tab>
            ))}
          </TabList>
        </motion.div>
      </div>

      <div className="flex gap-16 items-start justify-between">
        <FilterEvent filterState={filterState} setFilterState={setFilterState} />
        {/* Events Section */}
        <div className="flex flex-wrap gap-8 justify-between items-center w-full">
          <AnimatePresence>
            {paginatedEvents?.length > 0 ? (
              paginatedEvents?.map((eachEvent: any, index: number) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, amount: 0.5 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <EventCard eachEvent={eachEvent} />
                </motion.div>
              ))
            ) : (
              <p className="text-white">No events to show</p>
            )}
          </AnimatePresence>

        </div>
      </div>
      <div>


          {totalPages > 1 && (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.5 }}
            >
              <Pagination className="flex justify-end text-white my-4">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        if (currentPage > 1) handleChangePage(currentPage - 1);
                      }}
                    />
                  </PaginationItem>
                  {Array.from({ length: totalPages }, (_, index) => (
                    <PaginationItem key={index}>
                      <PaginationLink
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          handleChangePage(index + 1);
                        }}
                        aria-current={
                          currentPage === index + 1 ? "page" : undefined
                        }
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
                          handleChangePage(currentPage + 1);
                      }}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </motion.div>
          )}
          </div>
    </Tabs>
  );
};

const getFilteredEvents = (
  data: any[],
  tabIndex: number,
  filterState: FilterState
) => {
  let filteredData = data;

  // Tab-based filtering
  switch (tabIndex) {
    case 0:
      filteredData = data; 
      break;
    case 1:
      filteredData = data.filter(
        (event: any) => Number(event.start_date) > Date.now() / 1000
      ); 
      break;
    case 2:
      filteredData = data.filter(
        (event: any) => Number(event.end_date) <= Date.now() / 1000
      ); 
      break;
    default:
      filteredData = [];
  }

  // Filter by categories
  if (filterState.categories.length > 0) {
    filteredData = filteredData.filter((event: any) =>
      filterState.categories.includes(event.category)
    );
  }

  // Filter by locations
  if (filterState.locations.length > 0) {
    filteredData = filteredData.filter((event: any) =>
      filterState.locations.includes(event.location)
    );
  }

  // Filter by payment types
  if (filterState.payments.length > 0) {
    filteredData = filteredData.filter((event: any) =>
      filterState.payments.includes(event.payment_type)
    );
  }

  // Filter by date range
  if (filterState.startDate) {
    filteredData = filteredData.filter(
      (event: any) => event.start_date >= new Date(filterState.startDate).getTime() / 1000
    );
  }
  if (filterState.endDate) {
    filteredData = filteredData.filter(
      (event: any) => event.end_date <= new Date(filterState.endDate).getTime() / 1000
    );
  }

  // Filter by search query
  if (filterState.searchQuery) {
    filteredData = filteredData.filter((event: any) =>
      event.name.toLowerCase().includes(filterState.searchQuery.toLowerCase())
    );
  }

  return filteredData;
};

export default ExploreEvents;