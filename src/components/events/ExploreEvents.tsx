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
import { useEvents } from "../AbiCalls";
import FilterEvent from "./FilterEvent";



const ExploreEvents = () => {
  const { data, isError, isLoading, error } = useEvents();
  const [tabIndex, setTabIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 6;

  const filteredEvents = getFilteredEvents(data, tabIndex);
  console.log(data)

  const totalPages = Math.ceil(filteredEvents?.length / itemsPerPage);

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
  };

  const headingVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const tabListVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut", delay: 0.3 },
    },
  };

  const eventCardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const paginationVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <Tabs selectedIndex={tabIndex} onSelect={(index) => setTabIndex(index)}>
      <div className="flex flex-col md:flex-row items-center justify-between" id="explore">
        <motion.h1
          className="text-4xl font-semibold text-white raleway my-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.5 }}
          variants={headingVariants}
        >
          Explore
        </motion.h1>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.5 }}
          variants={tabListVariants}
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

      <div className="flex items-start justify-between">
        <FilterEvent />
        {/* Events Section */}
        <div className="flex flex-wrap gap-8 justify-center items-center w-full">
          <AnimatePresence >
            {filteredEvents?.length > 0 ? (
              filteredEvents.map((eachEvent: any, index: any) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, amount: 0.5 }}
                  variants={eventCardVariants}
                  transition={{ delay: index * 0.1 }}
                >
                  <EventCard eachEvent={eachEvent} />
                </motion.div>
              ))
            ) : (
              <p className="text-white">No events to show</p>
            )}
          </AnimatePresence>

          {totalPages > 1 && (
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.5 }}
              variants={paginationVariants}
            >
              <Pagination className="flex justify-end text-white">
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
      </div>
    </Tabs>
  );
};

const getFilteredEvents = (data: any, tabIndex: number) => {
  switch (tabIndex) {
    case 0:
      return data;
    case 1:
      return data.filter(
        (event: any) => Number(event.start_date) > Date.now() / 1000
      );
    case 2:
      return data.filter(
        (event: any) => Number(event.end_date) <= Date.now() / 1000
      );
    default:
      return [];
  }
};

export default ExploreEvents;
