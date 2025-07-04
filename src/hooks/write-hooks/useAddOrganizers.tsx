"use client";

import { CallData, cairo } from "starknet";
import { toast } from "sonner";
import { useCallback, useContext } from "react";
import axios from "axios";
import { StarknetContext } from "@/contexts/UserContext";

const useAddOrganizer = () => {
  const { contractAddr, account, setIsLoading, isLoading }: any =
    useContext(StarknetContext);

  return useCallback(
    async (event_id: number, email: string) => {
      try {
        if (!account) {
          toast.error("Account not connected");
        }

        setIsLoading(true);
        toast.loading("Fetching organizer info...");

        // 1️⃣ Fetch organizer address from API
        const res = await axios.get(`/api/registration/${encodeURIComponent(email)}`);
        const organizer_address = res.data.address as `0x${string}`;

        if (!organizer_address) {
          throw new Error("Organizer address not found");
        }
        toast.dismiss();

        toast.loading("Adding organizer...");

        // 2️⃣ Build Starknet call
        const call = {
          contractAddress: contractAddr,
          entrypoint: "add_organizer",
          calldata: CallData.compile([
            cairo.uint256(event_id),
            organizer_address,
          ]),
        };

        // 3️⃣ Estimate fee
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

        // 4️⃣ Execute
        const { transaction_hash } = await account.execute(call, {
          version: "0x3",
          resourceBounds,
        });

        await account.waitForTransaction(transaction_hash);
        toast.dismiss();
        setIsLoading(false);
        toast.success("✅ Organizer added successfully!");
        return "success";
      } catch (err) {
        toast.dismiss();
        console.error("Error adding organizer");
        setIsLoading(false);
        toast.error(`❌ Adding organizer failed`);
        throw err instanceof Error ? err : new Error("Failed to add organizer");
      }
    },
    [account, contractAddr, setIsLoading]
  );
};

export default useAddOrganizer;