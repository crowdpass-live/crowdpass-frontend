"use client"

import Link from "next/link";
import React from "react";

const SidebarItem = ({ menu, pathname}: any) => {
  return (
    <Link
      href={menu.url}
      className={``}
    >
      <div
        className={`py-3 px-4 mt-2 flex items-center mx-6 rounded-md hover:bg-light-black hover:text-primary ${pathname === menu.url ? "bg-light-black text-primary" :"text-white" }`}
      >
        <div>{menu.icon}</div>
        <div className="ml-3 text-lg font-semibold">{menu.title}</div>
      </div>
    </Link>
  );
};

export default SidebarItem;
