"use client";

import { toast } from "sonner";
import { useCallback, useContext } from "react";
import { StarknetContext } from "@/contexts/UserContext";
import axios from "axios";

const useBuyWeb2Ticket = () => {
  const { setIsLoading }: any = useContext(StarknetContext);

  return useCallback(
    async (event: any, formData: any, address: string, id: string | number) => {
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
        toast.success(
          "Registration successful. Check your mail to see confirmation"
        );
      } catch (regErr: any) {
        toast.dismiss();
        console.error("Registration failed:", regErr);
        toast.error(
          regErr.response?.data?.message || "Registration failed, try again"
        );
        setIsLoading(false);
        return;
      }
    },
    [setIsLoading]
  );
};

export default useBuyWeb2Ticket;
