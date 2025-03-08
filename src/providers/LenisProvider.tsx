"use client";

import { ReactNode, useEffect, useState } from "react";
import ReactLenis from "lenis/react";

interface LenisProviderProps {
  children: ReactNode;
}

export const LenisProvider = ({ children }: LenisProviderProps) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      {children}
      {isClient && <ReactLenis root />}
    </>
  );
};
