"use client";

import Footer from "@/components/landing-page/footer";
import Header from "@/components/landing-page/header";
import React from "react";

type Props = {};

export default function Component({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-x-hidden p-2 bg-gradient-to-b from-[#14141A] to-[#14141A]/80 ">
      <div className="max-w-[1280px] mx-auto relative min-h-[75vh]">
        <Header />
        {children}
      </div>
        <Footer />
    </div>
  );
}

