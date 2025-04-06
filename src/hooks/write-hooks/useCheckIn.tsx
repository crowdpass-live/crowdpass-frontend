"use client"

import { CallData, cairo } from "starknet";
import { toast } from "sonner";
import { useCallback, useContext } from "react";
import { StarknetContext } from "@/contexts/UserContext";

const useCheckIn = () => {

    const { contractAddr, account, setIsLoading, isLoading }: any = useContext(StarknetContext);

    return useCallback(
        async (
          event_id: number,
          attendee_address: `0x${string}`
        ) => {
          try {
            if (!account) {
                throw new Error("Account not connected");
              }
              setIsLoading(true);
              {isLoading == true && toast.loading("Checking-in attendee")}

              try {
                const call = {
                  contractAddress: contractAddr,
                  entrypoint: "check_in",
                  calldata: CallData.compile([
                    cairo.uint256(event_id),
                    attendee_address
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
                toast.success("Attendee Checked-in");
                return "success";
              } catch (error) {
                console.error(error);
                toast.error(`Error Checking-in attendee, Try again`);
          
                setIsLoading(false);
              }
    
          } catch (err) {
            console.error("Error Checking in Attendee:", err);
            throw err instanceof Error ? err : new Error("Failed to CheckIn Attendee");
          }
        },
        [account]
      );

}

export default useCheckIn;