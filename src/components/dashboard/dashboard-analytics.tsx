"use client"

import {
  BriefcaseIcon,
  CalendarIcon,
  TrophyIcon,
  UsersIcon,
} from "lucide-react";
import React from "react";
import { Card } from "../ui/card";

type Props = {
  eventHosted: number
  eventAttended: number
  totalEvents: number
}


const DashboardAnalytics = ({
  eventHosted,
  eventAttended,
  totalEvents,
}: Props) => {
  return (
    <div className="flex flex-wrap gap-8 items-center">
      <Card className="bg-light-black shadow-xl rounded-lg p-6 flex flex-col items-start gap-4 min-w-64 border-0">
        <div className="flex items-center gap-4">
          <CalendarIcon className="h-8 w-8 text-primary" />
          <div className="text-3xl text-primary font-bold ">{eventHosted}</div>
        </div>
        <p className="text-primary">Events Hosted</p>
      </Card>
      <Card className="bg-primary shadow-xl border-0 rounded-lg p-6 flex flex-col items-start gap-4 min-w-64">
        <div className="flex items-center gap-4">
          <UsersIcon className="h-8 w-8 text-light-black" />
          <div className="text-3xl font-bold text-light-black ">
            {eventAttended}
          </div>
        </div>
        <p className="text-light-black">Events Attended</p>
      </Card>
      {/* <Card className="bg-deep-blue shadow-xl rounded-lg p-6 flex flex-col items-start gap-4 min-w-64">
        <div className="flex items-center gap-4">
          <TrophyIcon className="h-8 w-8 text-primary" />
          <div className="text-3xl font-bold text-primary ">{poa}</div>
        </div>
        <p className="text-primary">POAPs Collected</p>
      </Card> */}
      <Card className="bg-primary border-0 shadow-xl rounded-lg p-6 flex flex-col items-start gap-4 min-w-64">
        <div className="flex items-center gap-4">
          <BriefcaseIcon className="h-8 w-8 text-light-black" />
          <div className="text-3xl font-bold text-light-black ">
            {totalEvents}
          </div>
        </div>
        <p className="text-light-black">Total Events</p>
      </Card>
    </div>
  );
};

export default DashboardAnalytics;
