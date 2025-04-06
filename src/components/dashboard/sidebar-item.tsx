"use client"

import Link from "next/link";
import React from "react";

const SidebarItem = ({ menu, pathname}: any) => {
  return (
    <Link
      href={menu.url}
      className=""
    >
      <div
        className={`py-4 px-6 mt-2 my-3 flex items-center mx-4 rounded-xl hover:bg-light-black hover:text-primary ${pathname === menu.url ? "bg-light-black text-primary shadow-md" :"text-white" }`}
      >
        <div>{menu.icon}</div>
        <div className="ml-3 lg:text-lg xl:text-xl font-semibold raleway">{menu.title}</div>
      </div>
    </Link>
  );
};

export default SidebarItem;