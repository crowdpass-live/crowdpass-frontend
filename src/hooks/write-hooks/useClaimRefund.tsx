"use client"

import { CallData, byteArray } from "starknet";
import { toast } from "sonner";
import { useCallback, useContext } from "react";
import { StarknetContext } from "@/contexts/UserContext";

const useClaimRefund = () => {

    const { contractAddr, account, setIsLoading, isLoading }: any = useContext(StarknetContext);

    return useCallback(
        async (
          event_id: string,
          attendee_address: `0x${string}`
        ) => {
          try {
            if (!account) {
                throw new Error("Account not connected");
              }
              setIsLoading(true);
              {isLoading == true && toast.loading("Claiming refund in progress")}

              try {
                const call = {
                  contractAddress: contractAddr,
                  entrypoint: "refund_ticket",
                  calldata: CallData.compile([
                    byteArray.byteArrayFromString(event_id),
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
                toast.success("Refund claimed");
                return "success";
              } catch (error) {
                console.error(error);
                toast.error(`Error Claiming refund, Try again`);
          
                setIsLoading(false);
              }
    
          } catch (err) {
            console.error("Error Claiming refund:", err);
            throw err instanceof Error ? err : new Error("Failed to claim refund");
          }
        },
        [account]
      );

}

export default useClaimRefund;