"use client";

import { CallData, cairo } from "starknet";
import { toast } from "sonner";
import { useCallback, useContext } from "react";
import { StarknetContext } from "@/contexts/UserContext";

const useRemoveOrganizer = () => {
  const { contractAddr, account, setIsLoading, isLoading }: any =
    useContext(StarknetContext);

  return useCallback(
    async (event_id: number, organizer_address: `0x${string}`) => {
      try {
        if (!account) {
          throw new Error("Account not connected");
        }
        setIsLoading(true);
        {
          isLoading == true && toast.loading("removing organizer");
        }

        try {
          const call = {
            contractAddress: contractAddr,
            entrypoint: "remove_organizer",
            calldata: CallData.compile([
              cairo.uint256(event_id),
              organizer_address,
            ]),
          };

          const { resourceBounds: estimatedResourceBounds } =
            await account.estimateInvokeFee(call, {
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
          const waitForTransaction =
            await account.waitForTransaction(transaction_hash);
          toast.dismiss();

          setIsLoading(false);
          toast.success("Organizer removed successfully");
          return "success";
        } catch (error) {
          console.error(error);
          toast.error(`Error removing organizer, Try again`);
          toast.dismiss();

          setIsLoading(false);
        }
      } catch (err) {
        console.error("Error removing Organizer:", err);
        throw err instanceof Error
          ? err
          : new Error("Failed to remove Organizer");
      }
    },
    [account]
  );
};

export default useRemoveOrganizer;
