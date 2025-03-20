import { useCall } from "@starknet-react/core";
import { cairo } from "starknet";
import eventAbi from "../../Abis/eventAbi.json";
import { useContext, useEffect, useState } from "react";
import { StarknetContext } from "@/contexts/UserContext";

const useGetEventById = (eventId: number) => {
  const { contractAddr }: any = useContext(StarknetContext);
  const [updatedEvent, setUpdatedEvent] = useState<any>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const { data, isError, isLoading, error } = useCall({
    functionName: "get_event",
    args: [cairo.uint256(eventId)],
    abi: eventAbi,
    address: contractAddr,
    watch: true,
  });

  async function fetchAndMergeEventData(event: { uri: string, id: any }) {
    try {
      const response = await fetch(event.uri);
      const uriData = await response.json();
      
      return { ...event, ...uriData };
    } catch (error) {
      console.error(`Failed to fetch data for event ${event.id}:`, error);
      return event; 
    }
  }

  useEffect(() => {
    const processEvent = async () => {
      if (!data || isLoading || isError) return;
      
      setIsProcessing(true);
      
      if (data) {
        const processedEvent = await fetchAndMergeEventData(data as {uri: string; id: any;});
        setUpdatedEvent(processedEvent);
      } else {
        setUpdatedEvent(data);
      }
      
      setIsProcessing(false);
    };
  
    processEvent();
  }, [data, isLoading, isError]);

  return { 
    event: updatedEvent,
    originalEvent: data,
    isLoading: isLoading || isProcessing, 
    isError, 
    error 
  };
};

export default useGetEventById;