import { useCall } from "@starknet-react/core";
import eventAbi from "../../Abis/eventAbi.json";
import { useContext } from "react";
import { StarknetContext } from "@/contexts/UserContext";
import { cairo } from "starknet";

const useGetAvailableTicket = (eventId: number) => {
  const { contractAddr }: any = useContext(StarknetContext);

  const { data, isError, isLoading, error } = useCall({
    functionName: "get_available_tickets",
    args: [cairo.uint256(eventId)],
    abi: eventAbi,
    address: contractAddr,
    watch: true,
  });

  return { data, isError, isLoading, error };
};

export default useGetAvailableTicket;
