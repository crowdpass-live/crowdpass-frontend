"use client";
import React from "react";
 
import { sepolia } from "@starknet-react/chains";
import { WebWalletConnector } from "starknetkit/webwallet";
import {
  StarknetConfig,
  publicProvider,
  voyager
} from "@starknet-react/core";
 
export function StarknetProvider({ children }: { children: React.ReactNode }) {
    const connector = new WebWalletConnector({ url: "https://web.argent.xyz" })
    
  return (
    <StarknetConfig
      chains={[sepolia]}
      provider={publicProvider()}
      connectors={[connector]}
      explorer={voyager}
    >
      {children}
    </StarknetConfig>
  );
}