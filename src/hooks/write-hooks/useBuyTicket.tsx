"use client";

import { CallData, cairo } from "starknet";
import { toast } from "sonner";
import { useCallback, useContext } from "react";
import { StarknetContext } from "@/contexts/UserContext";
import { useRouter } from "next/navigation";

const useBuyTicket = () => {
  const {
    contractAddr,
    account,
    setIsLoading,
    isLoading,
    token_addr,
    argentWebWallet
  }: any = useContext(StarknetContext);
  const router = useRouter();
  return useCallback(
    async (event_id: number, amount: number) => {
      const approvalRequests = [
        {
          tokenAddress: token_addr,
          amount: (amount * 1e18).toString(),
          spender: contractAddr,
        },
      ];
      try {
        const res = await argentWebWallet.requestApprovals(approvalRequests);
      } catch (error) {
        toast.error(`Error Purchasing ticket: ${error}` )
      }
      

      try {
        if (!account) {
          throw new Error("Account not connected");
        }
        setIsLoading(true);
        {
          isLoading == true && toast.loading("Claiming refund in progress");
        }

        try {
          const call = {
            contractAddress: contractAddr,
            entrypoint: "purchase_ticket",
            calldata: CallData.compile([cairo.uint256(event_id)]),
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
          const waitForTransaction = await account.waitForTransaction(
            transaction_hash
          );

          setIsLoading(false);
          toast.success("Ticket purchased");
          router.push("/my-events");
          return "success";
        } catch (error) {
          console.error(error);
          toast.error(`Error purchasing ticket, Try again`);

          setIsLoading(false);
        }
      } catch (err) {
        console.error("Error purchasing ticket :", err);
        throw err instanceof Error
          ? err
          : new Error("Failed to purchase ticket ");
      }
    },
    [account]
  );
};

export default useBuyTicket;
