"use client"

import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const ComingSoon = () => {
  return (
    <div className="flex text-center justify-center items-center flex-col w-full h-[calc(100vh-130px)] gap-2 ">
      <h1 className="text-white text-6xl font-bold">Coming soon!</h1>
      <Link href={"/dashboard/explore-events"}>
        {" "}
        <Button
          variant="link"
          className="text-white hover:text-primary text-xl underline"
        >
          Explore our events
        </Button>
      </Link>
    </div>
  );
};

export default ComingSoon;
