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

const Sidebar = () => {
  const eventMainSidebarData = [
    {
      url: "/dashboard/create-event",
      icon: <MdCreateNewFolder className="w-6 h-6" />,
      title: "Create event",
    },
    {
      url: "/dashboard/analytics",
      icon: <BiSolidBarChartAlt2 className="w-6 h-6" />,
      title: "Analytics",
    },
  ];

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
