"use client";

import AnalyticsHome from "@/components/dashboard/analytics-tabs/AnalyticsHome";
import EventPortfolio from "@/components/dashboard/analytics-tabs/EventPortfolio";
import React from "react";


const page = () => {
  const [activeComponent, setActiveComponent] = React.useState(0);

  const ActiveComponent = () => {
    switch (activeComponent) {
      case 0:
        return <AnalyticsHome />;
      case 1:
        return <EventPortfolio/>;
      default:
        return <AnalyticsHome />;
    }
  };

  return (
    <>
      <h1 className="raleway font-medium text-4xl mb-6 text-white">
        Analytics
      </h1>
     <ActiveComponent />
    </>
  );
};

export default page;
