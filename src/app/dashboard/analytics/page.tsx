"use client";

import AnalyticsHome from "@/components/dashboard/analytics-tabs/AnalyticsHome";
import EventPortfolio from "@/components/dashboard/analytics-tabs/EventPortfolio";
import React from "react";


const page = () => {
  const [activeComponent, setActiveComponent] = React.useState(0);

  const ActiveComponent = () => {
    switch (activeComponent) {
      case 0:
        return <AnalyticsHome setActiveComponent={setActiveComponent}/>;
      case 1:
        return <EventPortfolio setActiveComponent={setActiveComponent}/>;
      default:
        return <AnalyticsHome setActiveComponent={setActiveComponent}/>;
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
