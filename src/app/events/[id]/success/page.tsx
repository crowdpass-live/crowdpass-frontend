"use client"

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter, useParams } from "next/navigation";

const SuccessPage = () => {
  const router = useRouter();
  const params = useParams();
  const id = params.id;

  return (
    <div className="flex flex-col items-center justify-center bg-[#5b5959] p-4 mb-6 py-10 rounded-md">
      <h1 className="text-white text-2xl font-semibold mb-4">
        Registration Successful!
      </h1>
      <p className="text-gray-300 text-center mb-6">
        You've successfully registered for the event. Check your email for confirmation and further details.
      </p>
      <Button
        onClick={() => router.push(`/events/${id}`)}
        className="bg-[#ff6932] hover:bg-[#ff8152] text-[#1e1e24] text-lg font-semibold"
      >
        <ArrowLeft className="mr-2 h-5 w-5" />
        Back to Event
      </Button>
    </div>
  );
};

export default SuccessPage;