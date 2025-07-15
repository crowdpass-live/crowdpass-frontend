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
    handleCartridgeConnect,
  }: any = useContext(StarknetContext);

  const router = useRouter();

  return useCallback(
    async (event: any, formData: any, address: string, id: string | number) => {
      try {
        let activeAccount = account;

        if (!account) {
          setIsLoading(true);
          toast.error("Account not connected");
          return;
        }

        try {
          setIsLoading(true);
          toast.loading("Registering for event...");
          const response = await axios.post("/api/registration", {
            eventId: event?.uri.split("/").pop(),
            eventName: event?.name,
            eventStartDate: Number(event?.start_date),
            id: String(id),
            address,
            ...formData,
          });
          toast.dismiss();
          toast.success("Registration successful. Check your mail to see confirmation");
        } catch (regErr: any) {
          toast.dismiss();
          console.error("Registration failed:", regErr);
          toast.error(
            regErr.response?.data?.message || "Registration failed, try again"
          );
          setIsLoading(false);
          return;
        }

        // if (Number(event?.ticket_price) > 0) {
        //   const approvalRequests = [
        //     {
        //       tokenAddress: token_addr,
        //       amount: (Number(event?.ticket_price) * 1e18).toString(),
        //       spender: contractAddr,
        //     },
        //   ];
        //   try {
        //     await argentWebWallet.requestApprovals(approvalRequests);
        //   } catch (error) {
        //     console.error("Approval error:", error);
        //     toast.error(`Error purchasing ticket: ${error}`);
        //     setIsLoading(false);
        //     return;
        //   }
        // }


        const call = {
          contractAddress: contractAddr,
          entrypoint: "purchase_ticket",
          calldata: CallData.compile([cairo.uint256(id)]),
        };

        // const { resourceBounds: estimatedResourceBounds } =
        //   await activeAccount.estimateInvokeFee(call,
        //     {
        //     version: "0x3",
        //   }
        // );

        // const resourceBounds = {
        //   ...estimatedResourceBounds,
        //   l1_gas: {
        //     ...estimatedResourceBounds.l1_gas,
        //     max_amount: "0x1388",
        //   },
        // };

        let { transaction_hash } = await activeAccount.execute(
          call
          //   {
          //   version: "0x3",
          //   resourceBounds,
          // }
        );

        await activeAccount.waitForTransaction(transaction_hash);
        setIsLoading(false);
        toast.success("Ticket purchased.");
        router.push(`/my-events/${id}`);
        return "success";
      } catch (err) {
        console.error("Error purchasing ticket:", err);
        toast.dismiss();
        const errMsg =
          err instanceof Error ? err.message : "Failed to purchase ticket";
        toast.error(errMsg);
        setIsLoading(false);
        throw err;
      }
    },
    [
      account,
      handleCartridgeConnect,
      contractAddr,
      setIsLoading,
      token_addr,
      router,
    ]
  );
};

export default useBuyTicket;
