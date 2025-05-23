import { useCall } from "@starknet-react/core";
import eventAbi from "../../Abis/eventAbi.json";
import { useContext, useEffect, useState } from "react";
import { StarknetContext } from "@/contexts/UserContext";

const useGetAllEvents = () => {
  const { contractAddr }: any = useContext(StarknetContext);
  const [updatedEvents, setUpdatedEvents] = useState<any[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const { data, isError, isLoading, error } = useCall({
    functionName: "get_all_events",
    abi: eventAbi,
    args: [],
    address: contractAddr,
    watch: false,
  });

  async function fetchAndMergeEventData(event: { uri: string, id: any }) {
    try {
      const response = await fetch(event.uri);
      const uriData = await response.json();
      const backData = uriData.data
      return { ...event, ...backData};
    } catch (error) {
      console.error(`Failed to fetch data for event ${event.id}:`, error);
      return event; 
    }
  }

  useEffect(() => {
    const processEvents = async () => {
      if (!Array.isArray(data) || data.length === 0 || isLoading || isError) return;
      
      setIsProcessing(true);
      const processedEvents = [];
      
      for (let i = 0; i < data.length; i++) {
        const event = data[i];
        if (event && event.uri) {
          const updatedEvent = await fetchAndMergeEventData(event);
          processedEvents.push(updatedEvent);
        } else {
          processedEvents.push(event);
        }
      }
      
      setUpdatedEvents(processedEvents);
      setIsProcessing(false);
    };
  
    processEvents();
  }, [data, isLoading, isError]);

  return { 
    events: updatedEvents, 
    originalEvents: data,
    isLoading: isLoading || isProcessing, 
    isError, 
    error 
  };
};

export default useGetAllEvents;