import { useContext, useEffect, useState } from "react";
import { StarknetContext } from "@/contexts/UserContext";
import { useProvider } from "@starknet-react/core";
import eventAbi from "../../Abis/eventAbi.json";
import { cairo, CallData } from "starknet";
import useGetAllEvents from "./useGetAllEvents";
import useGetEventCount from "./useGetEventCount";

const useGetUserEvents = (address: `0x${string}`) => {
  const { contractAddr }: any = useContext(StarknetContext);
  const { provider } = useProvider();

  const [userEvents, setUserEvents] = useState<any[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const {
    events: allEvents,
    isLoading: eventsLoading,
    isError: eventsError,
    error: eventsErrorObj,
  } = useGetAllEvents();

  const {
    data: eventCount,
    isLoading: countLoading,
    isError: countError,
  } = useGetEventCount();

  useEffect(() => {
    const checkUserTickets = async () => {
      if (!provider || !contractAddr || !address || eventsLoading || countLoading) return;
      if (!Array.isArray(allEvents) || allEvents.length === 0) return;
      if (eventCount && allEvents.length < Number(eventCount)) return;

      setIsProcessing(true);
      const userEventsList: any[] = [];

      // Batched calls (not real multicall)
      const batchSize = 10;

      for (let i = 0; i < allEvents.length; i += batchSize) {
        const batch = allEvents.slice(i, i + batchSize);

        const batchResults = await Promise.all(
          batch.map(async (event) => {
            try {
              const response = await provider.callContract({
                contractAddress: contractAddr,
                entrypoint: "is_ticket_holder",
                calldata: CallData.compile([
                  cairo.uint256(Number(event.id)),
                  address,
                ]),
              });

              if (response[0] === "0x1") return event;
            } catch (err) {
              console.error(`Error checking event ${event.id}`, err);
            }

            return null;
          })
        );

        userEventsList.push(...batchResults.filter(Boolean));
      }

      setUserEvents(userEventsList);
      setIsProcessing(false);
    };

    checkUserTickets();
  }, [allEvents, address, contractAddr, provider, eventCount, eventsLoading, countLoading]);

  return {
    userEvents,
    isLoading: eventsLoading || countLoading || isProcessing,
    isError: eventsError || countError,
    error: eventsErrorObj,
  };
};

export default useGetUserEvents;
