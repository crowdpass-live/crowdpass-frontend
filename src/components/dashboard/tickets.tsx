"use client"

import React, { useState } from "react";
import QRCode from "react-qr-code";
import { TbLoaderQuarter } from "react-icons/tb";
import { epochToDatetime } from "datetime-epoch-conversion";
import Link from "next/link";

const Ticket = () => {
  const data = [
    {
      eventId: "1",
      eventName: "Test Event",
      description: "This is a test event",
      eventAddress: "12, jinadu street, lagos",
      startTime: "1727114000",
      endTime: "1727119000",
      isCancelled: true,
    },
  ];

  const [tickets, setTickets] = useState({ loading: false, data: [] });
  return (
    <>
      {tickets.loading ? (
        <section className="w-full h-full fixed top-0 left-0 flex justify-center items-center layoutBg overflow-hidden z-[99999]">
          <h2 className="text-deep-blue font-barlow text-lg md:text-xl flex items-center gap-1">
            <TbLoaderQuarter className="animate-spin text-4xl mr-3" />
            fetching Events...
          </h2>
        </section>
      ) : (
        <div className="flex flex-row gap-6 flex-wrap w-full">
          {tickets.data.length === 0 ? (
            data.map((items) => {
              const {
                eventId,
                eventName,
                description,
                eventAddress,
                startTime,
                isCancelled,
              } = items;
              const startDateTime = epochToDatetime(startTime);
              return (
                <div className="bg-white mt-4  rounded-lg p-8 px-12 shadow-2xl max-w-md">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="text-center">
                      <h2 className="text-2xl font-bold">{eventName}</h2>
                      <p className="text-gray-500 dark:text-gray-400">{`${startDateTime.dateTime}`}</p>
                      <p className="text-gray-500 dark:text-gray-400">
                        {eventAddress}
                      </p>
                    </div>
                    <div className="w-full max-w-[200px]">
                      <QRCode
                        size={200}
                        bgColor="transparent"
                        fgColor="black"
                        value={description}
                      />
                    </div>
                    <div className="text-center flex flex-col gap-3">
                      <Link
                        className="text-gray-500 dark:text-gray-400 text-sm"
                        href={`/all-events/${eventId}`}
                      >
                        View event details
                      </Link>
                      {isCancelled ? (
                        <p>
                          Status:{" "}
                          <span className="text-red-500">Event Cancelled</span>
                        </p>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            tickets.data.map((items: { eventId: any; eventName: any; description: any; eventAddress: any; startTime: any; endTime: any; isCancelled: any; }) => {
              const {
                eventId,
                eventName,
                description,
                eventAddress,
                startTime,
                endTime,
                isCancelled,
              } = items;
              const startDateTime = epochToDatetime(startTime);
              return (
                <div className="bg-white mt-4  rounded-lg p-8 px-12 shadow-2xl max-w-md">
                  <div className="flex flex-col items-center space-y-4">
                    <div className="text-center">
                      <h2 className="text-2xl font-bold">{eventName}</h2>
                      <p className="text-gray-500 dark:text-gray-400">{`${startDateTime.dateTime}`}</p>
                      <p className="text-gray-500 dark:text-gray-400">
                        {eventAddress}
                      </p>
                    </div>
                    <div className="w-full max-w-[200px]">
                      <QRCode
                        size={200}
                        bgColor="transparent"
                        fgColor="black"
                        value={description}
                      />
                    </div>
                    <div className="text-center flex flex-col gap-3">
                      <Link
                        className="text-gray-500 dark:text-gray-400 text-sm"
                        href={`/all-events/${eventId}`}
                      >
                        View event details
                      </Link>
                      {isCancelled ? (
                        <p>
                          Status:{" "}
                          <span className="text-red-500">Event Cancelled</span>
                        </p>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}
    </>
  );
};

export default Ticket;