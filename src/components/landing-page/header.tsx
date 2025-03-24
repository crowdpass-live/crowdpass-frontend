"use client";

import React, { useContext, useEffect, useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import { StarknetContext } from "@/contexts/UserContext";
const ConnectWalletButton = dynamic(() => import("../ConnectWallet"), {
  ssr: false,
});
const ConnectedUser = dynamic(() => import("../ConnectedUser"), {
  ssr: false,
});

const Header = () => {

  const navLinks = [
    { name: "Events", href: "/events" },
    { name: "Marketplace", href: "/marketplace" },
  ];

  const { address }: any = useContext(StarknetContext);

  const [showMobileNav, setShowMobileNav] = useState(false);
  useEffect(() => {
    if (showMobileNav) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  });
  const pathname = usePathname();

  return (
    <>
      <div className="z-50 rounded-3xl bg-deep-blue flex justify-between items-center py-2 px-4 md:py-4 lg:py-5 lg:px-10  w-full my-6 top-0 sticky overflow-hidden">
        <Link href={"/"}>
          <img
            alt={"logo"}
            src="https://res.cloudinary.com/dnohqlmjc/image/upload/v1742633487/crowdpass_logo_a2f8bq.png"
            className="w-44 h-8 hidden sm:block"
          />
          <img
            src="https://res.cloudinary.com/dnohqlmjc/image/upload/v1742633483/logo-mobile_bewfoo.png"
            className="h-6 w-10 sm:hidden"
            alt={"mobile-logo"}
          />
        </Link>
        <div className="md:flex md:gap-3 lg:gap-8 hidden">
          {navLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              className={`text-white font-medium text-md lg:text-xl raleway hover:underline  hover:underline-offset-8 hover:decoration-primary ${
                pathname === link.href
                  ? "underline-offset-8 decoration-primary underline"
                  : ""
              }`}
            >
              {link.name}
            </a>
          ))}
          {address ? (
            <a
              href="/my-events"
              className={`text-white font-medium text-md lg:text-xl raleway hover:underline  hover:underline-offset-8 hover:decoration-primary ${
                pathname === "/my-events"
                  ? "underline-offset-8 decoration-primary underline"
                  : ""
              }`}
            >
              My Events
            </a>
          ) : (
            ""
          )}
        </div>
        <div className="hidden md:flex gap-4">
          {address ? (
            <ConnectedUser showMobileNav={showMobileNav} />
          ) : (
            <ConnectWalletButton showMobileNav={showMobileNav} />
          )}
          {address ? (
            <Link href="/dashboard/create-event">
              <Button className="bg-primary text-light-black font-semibold text-sm lg:text-base raleway hover:bg-primary hover:text-deep-blue lg:ml-4 lg:py-6 lg:px-6 hidden md:flex">
                Create Event
              </Button>
            </Link>
          ) : (
            <Link href="/create-event">
              <Button className="bg-primary text-light-black font-semibold text-sm lg:text-base raleway hover:bg-primary hover:text-deep-blue lg:ml-4 lg:py-6 lg:px-6 hidden md:flex">
                Create Event
              </Button>
            </Link>
          )}
        </div>

        <div className="md:hidden">
          <button
            onClick={() => setShowMobileNav(!showMobileNav)}
            className="bg-primary text-deep-blue rounded-[10px] p-1.5"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Header*/}
      <div
        className={`fixed top-0 z-[79] w-full h-[100dvh] bg-gradient-to-b from-[#14141A] to-[#14141A]/50 transition-all duration-[500ms] ease-[cubic-bezier(0.86,0,0.07,1)] lg:hidden flex justify-end ${
          showMobileNav ? "left-0" : "left-[100%]"
        }`}
      >
        <div
          className={`w-[80%] h-full bg-deep-blue flex flex-col gap-10 transition-all duration-[500ms] ease-[cubic-bezier(0.86,0,0.07,1)] px-8 py-8 delay-300 ${
            showMobileNav ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <header className="flex justify-between items-center w-full">
            <Link href={"/"}>
              <img
                src="https://res.cloudinary.com/dnohqlmjc/image/upload/v1742633483/logo-mobile_bewfoo.png"
                className="h-6 w-12 md:hidden"
                alt={"mobile-logo"}
              />
            </Link>
            <button
              type="button"
              className="text-2xl text-white"
              onClick={() => setShowMobileNav(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          </header>

          <ul className="flex flex-col lg:hidden mt-10 items-start gap-6">
            {navLinks.map((link, index) => (
              <li className="block relative list-none group" key={index}>
                <Link
                  className={`text-sm font-bold uppercase text-gray-100 block leading-none relative tracking-[0.8px] z-[1] font-barlow before:content-[''] before:absolute before:w-[7px] before:h-[7px] before:rounded-full before:opacity-0 before:transition-all before:duration-[0.3s] before:ease-[ease-out] before:delay-[0s]  before:top-1 before:-left-3 before:bg-primary group-hover:text-primary  group-hover:before:opacity-100 ${
                    pathname === link.href && "text-primary before:opacity-100"
                  }`}
                  href={link.href}
                >
                  {link.name}
                </Link>
              </li>
            ))}

            <li className="block relative list-none group">
              {address ? (
                <ConnectedUser showMobileNav={showMobileNav} />
              ) : (
                <ConnectWalletButton showMobileNav={showMobileNav} />
              )}
              {address ? (
            <Link href="/dashboard/create-event">
              <Button className="bg-primary text-light-black font-semibold text-sm lg:text-base raleway hover:bg-primary hover:text-deep-blue lg:ml-4 lg:py-6 lg:px-6 flex md:hidden">
                Create Event
              </Button>
            </Link>
          ) : (
            <Link href="/create-event">
              <Button className="bg-primary text-light-black font-semibold text-sm lg:text-base raleway hover:bg-primary hover:text-deep-blue lg:ml-4 lg:py-6 lg:px-6 flex md:hidden">
                Create Event
              </Button>
            </Link>
          )}
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Header;
