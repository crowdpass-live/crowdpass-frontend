"use client"

import Navbar from "@/components/dashboard/navbar";
import Sidebar from "@/components/dashboard/sidebar";
import React from "react";


const Layout = ({ children }: any) => {
  return (
    <div className="bg-deep-blue w-screen md:w-full flex overflow-x-hidden min-h-screen">
      <Sidebar />
      <div className="md:ml-64 grow bg-base-white bg-gradient-to-br from-[#14141A] via-[#14141A]/70 via-70% to-[#626280] pl-20 py-6 pr-10 h-screen">
        <div className="overflow-y-auto h-full">
          <Navbar />
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
