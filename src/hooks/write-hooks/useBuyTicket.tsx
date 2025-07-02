"use client";

import { CallData, cairo } from "starknet";
import { toast } from "sonner";
import { useCallback, useContext } from "react";
import { StarknetContext } from "@/contexts/UserContext";
import { useRouter } from "next/navigation";
import axios from "axios";

const useBuyTicket = () => {
  const {
    contractAddr,
    account,
    setIsLoading,
    token_addr,
    argentWebWallet,
  }: any = useContext(StarknetContext);

  const router = useRouter();

  return useCallback(
    async (
      event: any,
      formData: any,
      address: string,
      id: string | number
    ) => {
      try {
        if (!account) {
          throw new Error("Account not connected");
        }

        // Register first
        setIsLoading(true);
        toast.loading("Registering for event...");

        try {
          const response = await axios.post("/api/registration", {
            eventId: event?.uri.split("/").pop(),
            eventName: event?.name,
            eventStartDate: Number(event?.start_date),
            id: String(id),
            address,
            ...formData,
          });

          toast.success("Registration successful");
        } catch (regErr: any) {
          console.error("Registration failed:", regErr);
          toast.error(
            regErr.response?.data?.message || "Registration failed, try again"
          );
          setIsLoading(false);
          return;
        }

        // Handle approval if needed
        if (Number(event?.ticket_price) > 0) {
          const approvalRequests = [
            {
              tokenAddress: token_addr,
              amount: (Number(event?.ticket_price) * 1e18).toString(),
              spender: contractAddr,
            },
          ];
          try {
            await argentWebWallet.requestApprovals(approvalRequests);
          } catch (error) {
            console.error("Approval error:", error);
            toast.error(`Error purchasing ticket: ${error}`);
            setIsLoading(false);
            return;
          }
        }

        // Proceed to buy ticket
        toast.loading("Purchasing your ticket...");

        const call = {
          contractAddress: contractAddr,
          entrypoint: "purchase_ticket",
          calldata: CallData.compile([cairo.uint256(id)]),
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

        await account.waitForTransaction(transaction_hash);

        setIsLoading(false);
        toast.success("Ticket purchased");
        router.push("/my-events");
        return "success";
      } catch (err) {
        console.error("Error purchasing ticket:", err);
        const errMsg =
          err instanceof Error ? err.message : "Failed to purchase ticket";
        toast.error(errMsg);
        setIsLoading(false);
        throw err;
      }
    },
    [account]
  );
};

export default useBuyTicket;
