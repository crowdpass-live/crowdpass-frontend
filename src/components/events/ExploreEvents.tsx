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
import HashLoader from "react-spinners/HashLoader";
import { getFilteredEvents } from "./getFilteredEvent";
import NoEventsMessage from "./NoEventMessage";

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

  //filter state
  const [filterState, setFilterState] = useState<FilterState>({
    categories: [],
    locations: [],
    payments: [],
    startDate: "",
    endDate: "",
    searchQuery: "",
  });

  const filteredEvents = getFilteredEvents(events || [], tabIndex, filterState);

  const paginatedEvents = filteredEvents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
  };

  React.useEffect(() => {
    setCurrentPage(1);
  }, [filterState]);

  return (
    <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
      {isLoading && (
        <div className="fixed inset-0 z-50 flex flex-col gap-10 items-center justify-center bg-black bg-opacity-50">
          <HashLoader
            color={"#FF6932"}
            loading={isLoading}
            size={100}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
          <div className="text-white text-2xl">Fetching Events...</div>
        </div>
      )}
      <div
        className="flex flex-col md:flex-row items-center justify-between"
        id="explore"
      >
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
        <FilterEvent
          filterState={filterState}
          setFilterState={setFilterState}
        />
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
                  className="w-full md:w-[48%]"
                >
                  <EventCard eachEvent={eachEvent} />
                </motion.div>
              ))
            ) : (
              <NoEventsMessage
                message={`No ${tabs[
                  tabIndex
                ].toLowerCase()} events to show`}
                actionText="create your own event"
                actionLink="/dashboard/create-event"
              />
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

export default ExploreEvents;
