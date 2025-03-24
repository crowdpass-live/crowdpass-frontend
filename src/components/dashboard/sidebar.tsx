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
import { FaDotCircle } from "react-icons/fa";

const Sidebar = () => {
  const [open, setOpen] = React.useState(false);
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

  return (
    <div className="hidden h-screen w-[20%] lg:block fixed bg-deep-blue">
      <div className="flex flex-col py-20  justify-between h-screen">
        <div className="flex flex-col gap-10">
          <div className="my-2 mx-6 flex items-center">
            <Link href="/" className="flex items-center">
              <img
                src="/assets/crowdpass_logo.png"
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
                  className={`w-full py-4 px-6 mt-2 flex items-center mx-6 group rounded-xl hover:bg-light-black hover:text-primary`}
                  onClick={() => setOpen(!open)}
                >
                  <div className="text-white group-hover:text-primary">
                    {dropDownLink.icon}
                  </div>
                  <div className="text-white ml-3 lg:text-lg xl:text-xl font-semibold raleway group-hover:text-primary mr-auto">
                    {dropDownLink.title}
                  </div>
                  {open ? (
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
              {open && dropDownLink.sublinks.map((menu, index) => (
                <div className="ml-10">

                  <SidebarItem key={index} menu={menu} pathname={pathname} />
                </div>
            ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center gap-3 mx-3">
          <hr className="h-4 w-full mx-10" />
          <p>
            <Button
              className="flex gap-2 bg-transparent py-6 "
              onClick={() => {
                disconnect();
              }}
            >
              <IoLogOut color="#fff" size={30} />
              <p className="text-white ml-2 text-lg px-3 font-semibold ">
                LogOut
              </p>
            </Button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
