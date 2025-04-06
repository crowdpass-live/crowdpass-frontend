// Sidebar.jsx
"use client";
import React from "react";
import SidebarItem from "./sidebar-item";
import { IoLogOut } from "react-icons/io5";
import { BiSolidBarChartAlt2 } from "react-icons/bi";
import { MdCreateNewFolder } from "react-icons/md";
import Link from "next/link";
import { Button } from "../ui/button";
import { useDisconnect } from "@starknet-react/core";
import { usePathname, useRouter } from "next/navigation";
import { FaChevronDown, FaChevronUp } from "react-icons/fa6";
import { FaDotCircle, FaTimes } from "react-icons/fa";
import { motion } from "framer-motion";
import { CiLogout } from "react-icons/ci";

const Sidebar = ({ isOpen, closeSidebar }: any) => {
  const [analyticsOpen, setAnalyticsOpen] = React.useState(false);
  const eventMainSidebarData = [
    {
      url: "/dashboard/create-event",
      icon: <MdCreateNewFolder className="w-6 h-6" />,
      title: "Create event",
    },
  ];
  const dropDownLink = {
    icon: <BiSolidBarChartAlt2 className="w-6 h-6" />,
    title: "Analytics",
    sublinks: [
      {
        url: "/dashboard/analytics/overview",
        icon: <FaDotCircle className="w-6 h-6" />,
        title: "Overview",
      },
      {
        url: "/dashboard/analytics/events",
        icon: <FaDotCircle className="w-6 h-6" />,
        title: "Events",
      },
      {
        url: "/dashboard/analytics/delegation",
        icon: <FaDotCircle className="w-6 h-6" />,
        title: "Delegation",
      },
    ],
  };
  const { disconnect, status } = useDisconnect({});
  const router = useRouter();
  const pathname = usePathname();

  React.useEffect(() => {
    if (status === "success") {
      router.push("/");
    }
  }, [status, router]);

  // Handle window resize to ensure sidebar state is appropriate
  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isOpen) {
        // If screen becomes large and mobile sidebar is open, close it
        closeSidebar();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen, closeSidebar]);

  // Animation variants for mobile sidebar
  const sidebarVariants = {
    open: { x: 0, transition: { type: "spring", stiffness: 300, damping: 30 } },
    closed: {
      x: "-100%",
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
  };

  // If clicking a link in mobile view, close the sidebar
  const handleLinkClick = () => {
    if (window.innerWidth < 1024) {
      closeSidebar();
    }
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:block h-screen w-[20%] fixed bg-deep-blue">
        <div className="flex flex-col py-10 justify-between h-screen">
          <div className="flex flex-col gap-10">
            <div className="my-2 mx-6 flex items-center">
              <Link href="/" className="flex items-center">
                <img
                  src="https://res.cloudinary.com/dnohqlmjc/image/upload/v1742633487/crowdpass_logo_a2f8bq.png"
                  alt="logo"
                  width={250}
                  height={41}
                />
              </Link>
            </div>
            <div className="">
              {eventMainSidebarData.map((menu, index) => (
                <SidebarItem key={index} menu={menu} pathname={pathname} />
              ))}
              <div className="w-full">
                <div className="flex items-center w-full">
                  <div
                    className="w-full py-4 px-6 mt-2 flex items-center mx-6 group rounded-xl hover:bg-light-black hover:text-primary cursor-pointer"
                    onClick={() => setAnalyticsOpen(!analyticsOpen)}
                  >
                    <div className="text-white group-hover:text-primary">
                      {dropDownLink.icon}
                    </div>
                    <div className="text-white ml-3 lg:text-lg xl:text-xl font-semibold raleway group-hover:text-primary mr-auto">
                      {dropDownLink.title}
                    </div>
                    {analyticsOpen ? (
                      <FaChevronUp
                        size={20}
                        className="text-white text-right group-hover:text-primary flex justify-end"
                      />
                    ) : (
                      <FaChevronDown
                        size={20}
                        className="text-white text-right group-hover:text-primary flex justify-end"
                      />
                    )}
                  </div>
                </div>
                {analyticsOpen &&
                  dropDownLink.sublinks.map((menu, index) => (
                    <div className="ml-10" key={index}>
                      <SidebarItem menu={menu} pathname={pathname} />
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <div className="mx-4">
          <hr className="h-px w-full my-4 border-t border-white" />
          <div
            className={`py-4 px-6 mt-2 flex items-center rounded-xl hover:bg-light-black hover:text-primary`}
            onClick={() => disconnect()}
          >
            <div>
              {" "}
              <CiLogout color="#fff" size={24} />
            </div>
            <div className="ml-3 lg:text-lg xl:text-xl font-semibold raleway text-white">
              LogOut
            </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeSidebar}
        />
      )}

      {/* Mobile Sidebar */}
      <motion.div
        className="lg:hidden fixed inset-y-0 left-0 z-50 w-64 bg-deep-blue shadow-lg overflow-y-auto"
        variants={sidebarVariants}
        initial="closed"
        animate={isOpen ? "open" : "closed"}
      >
        <div className="flex flex-col py-6 h-full">
          <div className="flex justify-between items-center px-4 mb-6">
            <Link href="/" className="flex items-center">
              <img
                src="https://res.cloudinary.com/dnohqlmjc/image/upload/v1742633487/crowdpass_logo_a2f8bq.png"
                alt="logo"
                width={150}
                height={30}
              />
            </Link>
            <button
              onClick={closeSidebar}
              className="text-white focus:outline-none"
            >
              <FaTimes size={24} />
            </button>
          </div>

          <div className="flex-1">
            {eventMainSidebarData.map((menu, index) => (
              <div key={index} onClick={handleLinkClick}>
                <SidebarItem menu={menu} pathname={pathname} />
              </div>
            ))}
            <div className="w-full">
              <div className="flex items-center w-full">
                <div
                  className="w-full py-4 px-6 flex items-center mx-2 group rounded-xl hover:bg-light-black hover:text-primary cursor-pointer"
                  onClick={() => setAnalyticsOpen(!analyticsOpen)}
                >
                  <div className="text-white group-hover:text-primary">
                    {dropDownLink.icon}
                  </div>
                  <div className="text-white ml-3 font-semibold raleway group-hover:text-primary mr-auto">
                    {dropDownLink.title}
                  </div>
                  {analyticsOpen ? (
                    <FaChevronUp
                      size={16}
                      className="text-white text-right group-hover:text-primary flex justify-end"
                    />
                  ) : (
                    <FaChevronDown
                      size={16}
                      className="text-white text-right group-hover:text-primary flex justify-end"
                    />
                  )}
                </div>
              </div>
              {analyticsOpen &&
                dropDownLink.sublinks.map((menu, index) => (
                  <div className="ml-8" key={index} onClick={handleLinkClick}>
                    <SidebarItem menu={menu} pathname={pathname} />
                  </div>
                ))}
            </div>
          </div>

          <div className="mt-auto px-4">
            <hr className="h-px w-full my-4 border-t border-white" />
            <Button
              className="flex w-full gap-2 bg-transparent py-4 justify-center items-center"
              onClick={() => {
                disconnect();
                closeSidebar();
              }}
            >
              <IoLogOut color="#fff" size={24} />
              <p className="text-white text-lg font-semibold">LogOut</p>
            </Button>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Sidebar;
