"use client"

import { CallData, byteArray, cairo } from "starknet";
import { toast } from "sonner";
import { useCallback, useContext } from "react";
import { StarknetContext } from "@/contexts/UserContext";

const useCancelEvent = () => {

    const { contractAddr, account, setIsLoading, isLoading }: any = useContext(StarknetContext);

    return useCallback(
        async (
          event_id: number,
        ) => {
          try {
            if (!account) {
                throw new Error("Account not connected");
              }
              setIsLoading(true);
              {isLoading == true && toast.loading("canceling event")}

              try {
                const call = {
                  contractAddress: contractAddr,
                  entrypoint: "cancel_event",
                  calldata: CallData.compile([
                    cairo.uint256(event_id),
                  ]),
                };
          
                const {
                  resourceBounds: estimatedResourceBounds,
                } = await account.estimateInvokeFee(call, {
                  version: "0x3",
                });
          
          
                const resourceBounds = {
                  ...estimatedResourceBounds,
                  l1_gas: {
                    ...estimatedResourceBounds.l1_gas,
                    max_amount: "0x1388",
                  },
                };
          
                let { transaction_hash } = await account.execute(call, {
                  version: "0x3",
                  resourceBounds,
                });
          
                // // Wait for transaction to be mined
                const waitForTransaction = await account.waitForTransaction(transaction_hash);
          
                setIsLoading(false);
                toast.success("Event Cancelled");
                return "success";
              } catch (error) {
                console.error(error);
                toast.error(`${error}`);
          
                setIsLoading(false);
              }
    
          } catch (err) {
            console.error("Error Cancelling Event:", err);
            throw err instanceof Error ? err : new Error("Failed to cancel event");
          }
        },
        [account]
      );

}

export default useCancelEvent;