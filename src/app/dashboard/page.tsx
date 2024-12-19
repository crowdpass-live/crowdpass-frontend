"use client";

import DashboardAnalytics from '@/components/dashboard/dashboard-analytics';
import EventTabs from '@/components/dashboard/events-tabs';
import RecentActivities from '@/components/dashboard/recent-activities';
import { useAccount, useReadContract } from '@starknet-react/core';
import React, { useMemo } from 'react';
import { TbLoaderQuarter } from 'react-icons/tb';
import eventAbi from "../../Abis/eventAbi.json";

type Props = {};

const Page = (props: Props) => {
  const contractAddr = '0x04da2dd996dc36097f2f5b663db1ffa75466d32036d7bbdbe6719f768bdc5b26';

  const { data: eventCount, isLoading: eventCountLoading } = useReadContract({
    functionName: "get_event_count",
    args: [],
    abi: eventAbi,
    address: contractAddr,
    watch: false,
  });

  const { data: allEvents, isLoading: allEventsLoading } = useReadContract({
    functionName: "get_all_events",
    args: [],
    abi: eventAbi,
    address: contractAddr,
    watch: false,
  });

  const { address } = useAccount();

  const filteredEvents = useMemo(() => {
    if (!allEvents || !address) return [];
    return allEvents.filter((event: { organizer: { toString: (arg0: number) => string; }; }) => {
      const organizerAddress = `0x00${event.organizer.toString(16).toLowerCase()}`;
      return organizerAddress === address?.toLowerCase();
    });
  }, [allEvents, address]);

  return (
    <>
      {(eventCountLoading || allEventsLoading) ? (
        <section className='w-full h-full fixed top-0 left-0 flex justify-center items-center layoutBg overflow-hidden z-[99999]'>
          <h2 className="text-deep-blue font-barlow text-lg md:text-xl flex items-center gap-1">
            <TbLoaderQuarter className="animate-spin text-4xl mr-3" />
            Fetching Events...
          </h2>
        </section>
      ) : (
        <>
          <DashboardAnalytics
            eventAttended={0}
            eventHosted={filteredEvents?.length || 0}
            totalEvents={eventCount === undefined ? 0 : Number(eventCount)}
          />

          <div className="flex gap-2">
            <EventTabs pageTabs={["Hosting", "Attending"]} data={eventCount} />
            <RecentActivities />
          </div>
        </>
      )}
    </>
  );
};

export default Page;                                                                                                           