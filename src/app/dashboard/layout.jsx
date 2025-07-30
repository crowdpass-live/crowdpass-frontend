// Layout.jsx
"use client";

import Sidebar from "../../components/dashboard/sidebar";
import Navbar from "../../components/dashboard/navbar";
import React, { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { StarknetContext } from "@/contexts/UserContext";
import { toast } from "sonner";

const Layout = ({ children }) => {
  const { address } = useContext(StarknetContext);
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const router = useRouter();
  

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

   useEffect(() => {
      if (!address) {
        router.push("/");
        toast.error("Please connect your wallet to access the dashboard.");
      }
    }, [address]);

  return (
    <div className="bg-deep-blue w-screen md:w-full flex overflow-x-hidden min-h-screen">
      <Sidebar isOpen={sidebarOpen} closeSidebar={closeSidebar} />
      <div className="bg-base-white w-full lg:w-[80%] bg-gradient-to-b from-[#14141A] to-[#14141A]/80 px-4 md:px-8 py-6 lg:ml-[20%]">
        <div className="overflow-y-auto h-full mx-[1%] lg:mx-[2%] xl:mx-[3%]">
          <Navbar toggleSidebar={toggleSidebar} />
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;