import { useCall } from "@starknet-react/core";
import eventAbi from "../../Abis/eventAbi.json";
import { useContext } from "react";
import { StarknetContext } from "@/contexts/UserContext";
import { cairo } from "starknet";

const useIsTicketHolder = (eventId: number, address: `0x${string}`) => {
  const { contractAddr }: any = useContext(StarknetContext);

  const { data, isError, isLoading, error } = useCall({
    functionName: "is_ticket_holder",
    args: [cairo.uint256(eventId), address],
    abi: eventAbi,
    address: contractAddr,
    watch: false,
  });
  return { data, isError, isLoading, error };
};

export default useIsTicketHolder;
