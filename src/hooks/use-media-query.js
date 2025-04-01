"use client"

import Sidebar from "../../components/dashboard/sidebar";
import Navbar from "../../components/dashboard/navbar";
import React from "react";


const Layout = ({ children }) => {
  return (
    <div className="bg-deep-blue w-screen md:w-full flex overflow-x-hidden min-h-screen">
      <Sidebar />
      <div className="bg-base-white w-full lg:w-[80%] bg-gradient-to-b from-[#14141A] to-[#14141A]/80 px-4 md:px-8 py-6 lg:ml-[20%]">
        <div className="overflow-y-auto h-full mx-[1%] lg:mx-[2%] xl:mx-[3%]">
          <Navbar />
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
