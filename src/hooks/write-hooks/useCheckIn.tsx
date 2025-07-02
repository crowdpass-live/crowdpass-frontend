"use client";

import { CallData, cairo } from "starknet";
import { toast } from "sonner";
import { useCallback, useContext } from "react";
import axios from "axios";
import { StarknetContext } from "@/contexts/UserContext";

const useCheckIn = () => {
  const { contractAddr, account, setIsLoading }: any = useContext(StarknetContext);

  return useCallback(
    async (
      event_id: number,
      email: string 
    ) => {
      try {
        if (!account) {
          throw new Error("Account not connected");
        }

        setIsLoading(true);
        toast.loading("Fetching attendee info...");

        // 1️⃣ Fetch attendee address from API
        const res = await axios.get(`/api/registration/${encodeURIComponent(email)}`);
        const attendee_address = res.data.address as `0x${string}`;

        if (!attendee_address) {
          throw new Error("Attendee address not found");
        }
        toast.dismiss();

        toast.loading("Checking in attendee...");

        // 2️⃣ Build Starknet call
        const call = {
          contractAddress: contractAddr,
          entrypoint: "check_in",
          calldata: CallData.compile([
            cairo.uint256(event_id),
            attendee_address,
          ]),
        };

        // 3️⃣ Estimate fee
        const { resourceBounds: estimatedResourceBounds } = await account.estimateInvokeFee(call, {
          version: "0x3",
        });

        const resourceBounds = {
          ...estimatedResourceBounds,
          l1_gas: {
            ...estimatedResourceBounds.l1_gas,
            max_amount: "0x1388", // adjust as needed
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
        toast.success("✅ Attendee checked in successfully!");
        return "success";
      } catch (err) {
        toast.dismiss();
        console.error("Error during check-in:", err);
        setIsLoading(false);
        toast.error(`❌ Check-in failed: ${err instanceof Error ? err.message : "Unknown error"}`);
        throw err instanceof Error ? err : new Error("Failed to check in attendee");
      }
    },
    [account, contractAddr, setIsLoading]
  );
};

export default useCheckIn;
