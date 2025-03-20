import { useCall } from "@starknet-react/core";
import eventAbi from "../../Abis/eventAbi.json";
import { useContext } from "react";
import { StarknetContext } from "@/contexts/UserContext";

const useGetEventCount = () => {
  const { contractAddr }: any = useContext(StarknetContext);

  const { data, isError, isLoading, error } = useCall({
    functionName: "get_event_count",
    args: [],
    abi: eventAbi,
    address: contractAddr,
    watch: true,
  });

  return { data, isError, isLoading, error };
};

export default useGetEventCount;
