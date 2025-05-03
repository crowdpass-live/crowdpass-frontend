"use client";
import React from "react";
import { Chain, sepolia, mainnet } from "@starknet-react/chains";
import { WebWalletConnector } from "starknetkit/webwallet";
import { StarknetConfig, publicProvider, voyager, jsonRpcProvider} from "@starknet-react/core";
import { SessionPolicies } from "@cartridge/controller";
import { ControllerConnector } from "@cartridge/connector";
import { constants } from "starknet";

const policies: SessionPolicies = {
  contracts: {
    "0x076278c1c8e8cfd6c8304681bcf3670c2dd6751bc12b4e1d7d717dc01f7aa130": {
      name: "wordle",
      description: "contains the logic for a wordle game on starknet",
      methods: [
        {
          name: "Start",
          description: "starts a classic game",
          entrypoint: "start"
        }
      ]
    },
   
  },
}

// Configure RPC provider
const provider = jsonRpcProvider({
  rpc: (chain: Chain) => {
    switch (chain) {
      case mainnet:
        return { nodeUrl: 'https://api.cartridge.gg/x/starknet/mainnet' }
      case sepolia:
      default:
        return { nodeUrl: 'https://api.cartridge.gg/x/starknet/sepolia' }
    }
  },
})

  // Initialize the connector
  const cartridgeConnector = new ControllerConnector({
    policies,
    chains: [
      {
        rpcUrl: "https://api.cartridge.gg/x/starknet/sepolia",
      },
    ],
    defaultChainId: constants.StarknetChainId.SN_SEPOLIA,
  });
 

export function StarknetProvider({ children }: { children: React.ReactNode }) {
  const connector = new WebWalletConnector({
    url: "https://web-v2.hydrogen.argent47.net/email",
  });

  return (
    <StarknetConfig
      autoConnect
      chains={[sepolia]}
      provider={provider}
      connectors={[cartridgeConnector]}
      explorer={voyager}
    >
      {children}
    </StarknetConfig>
  );
}
