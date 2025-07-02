"use client";
import React from "react";
import { sepolia } from "@starknet-react/chains";
import { WebWalletConnector } from "starknetkit/webwallet";
import { jsonRpcProvider, StarknetConfig, voyager } from "@starknet-react/core";

export function StarknetProvider({ children }: { children: React.ReactNode }) {
  const connector = new WebWalletConnector({
    url: "https://web-v2.hydrogen.argent47.net/email",
  });
  function rpc() {
    return {
      nodeUrl: process.env.NEXT_PUBLIC_NODE_URL,
    };
  }

  const provider = jsonRpcProvider({ rpc });
  return (
    <StarknetConfig
      chains={[sepolia]}
      provider={provider}
      connectors={[connector]}
      explorer={voyager}
    >
      {children}
    </StarknetConfig>
  );
}
