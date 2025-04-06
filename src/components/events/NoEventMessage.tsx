"use client";

import React from "react";
import Link from "next/link";
import { CalendarX } from "lucide-react";

interface NoEventsMessageProps {
  message?: string;
  actionText?: string;
  actionLink?: string;
  icon?: React.ReactNode;
  ticket?: boolean;
}

const NoEventsMessage: React.FC<NoEventsMessageProps> = ({
  message,
  actionText,
  actionLink,
  icon = <CalendarX size={48} className="text-primary" />,
  ticket,
}) => {
  return (
    <div className="w-full py-16 flex flex-col items-center justify-center bg-[#1A1A22] rounded-lg border border-gray-800">
      <div className="mb-4">{icon}</div>
      <h3 className="text-white text-xl font-semibold mb-2">{message}</h3>
      {ticket && (
        <p className="text-gray-400 mb-6 text-center max-w-md">
          Your tickets will appear here once you have registered for an event
        </p>
      )}
      <Link
        href={actionLink as string}
        className="bg-primary hover:bg-primary/90 transition-colors px-6 py-3 rounded-md text-[#14141A] font-medium"
      >
        {actionText}
      </Link>
    </div>
  );
};

export default NoEventsMessage;
