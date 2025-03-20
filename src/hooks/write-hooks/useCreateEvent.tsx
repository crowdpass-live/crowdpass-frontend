"use client"

import { CallData, byteArray, cairo } from "starknet";
import { toast } from "sonner";
import { useCallback, useContext } from "react";
import { StarknetContext } from "@/contexts/UserContext";
import { datetimeToEpochTime } from "datetime-epoch-conversion";
import { useRouter } from "next/navigation";

const useCreateEvent = () => {

  const router = useRouter();

  const baseUrl = process.env.NEXT_PUBLIC_BASE_JSON_URL;

    const { contractAddr, account, setIsLoading, isLoading }: any = useContext(StarknetContext);
    
    return useCallback(
        async (
          event_name: string,
          event_Acronym: string,
          img_uri: string,
          description: string,
          organizer_name: string,
          event_type: string,
          event_category: string,
          event_location: string,
          event_schedule: any[],
          start_date: string,
          end_date: string,
          total_tickets: number,
          ticket_price: number
        ) => {
          try {
            
            if (!account) {
                throw new Error("Account not connected");
              }
              setIsLoading(true);
              {isLoading == true && toast.loading("creating event")}

              const hashRes = await fetch(`${baseUrl}api/events`, {
                method: "POST",
                body: JSON.stringify({
                    name: event_name,
                    image: img_uri,
                    description: description,
                    organizer_name: organizer_name,
                    event_type: event_type,
                    event_category: event_category,
                    location: event_location,
                    schedule: event_schedule
                  }
                ),
              });

              const { link } = await hashRes.json();
              
              console.log(link)

              try {
                const call = {
                  contractAddress: contractAddr,
                  entrypoint: "create_event",
                  calldata: CallData.compile([
                    byteArray.byteArrayFromString(event_name),
                    byteArray.byteArrayFromString(event_Acronym),
                    byteArray.byteArrayFromString(link),
                    datetimeToEpochTime(start_date),
                    datetimeToEpochTime(end_date),
                    cairo.uint256(total_tickets),
                    cairo.uint256(ticket_price),
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
                toast.success("Event Created");
                router.push("/dashboard/analytics");

                return "success";
              } catch (error) {
                console.error(error);
                toast.error(`${error}`);
          
                setIsLoading(false);
              }
    
          } catch (err) {
            console.error("Error creating Event:", err);
            throw err instanceof Error ? err : new Error("Failed to create event");
          }
        },
        [account]
      );

}

export default useCreateEvent;