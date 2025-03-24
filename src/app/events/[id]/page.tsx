"use client";

import EventDetails from "@/components/events/EventDetails";
import EventDetailsBody from "@/components/events/EventDetailsBody";
import { StarknetContext } from "@/contexts/UserContext";
import useGetEventById from "@/hooks/read-hooks/useGetEventById";
import { useParams } from "next/navigation";
import React, { useContext } from "react";

type Props = {};

const page = (props: Props) => {
  const params = useParams<{ id: string }>();

  const eventDetails = useGetEventById(Number(params.id));

  const {isLoading: loading} = eventDetails

  return (
    <div>
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="text-white text-2xl">Fetching Event Details...</div>
        </div>
      )}
      <EventDetails eventDetails={eventDetails} id={params.id} />
      <div className="bg-deep-blue max-w-[1280px] pt-28 -mt-16 mb-4">
        <div className="mx-4 lg:mx-28">
          <EventDetailsBody eventDetails={eventDetails} />
        </div>
      </div>
    </div>
  );
};

export default page;