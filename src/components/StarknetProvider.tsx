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
    "0x04db787da1e9a4ef771846c1884dc43c6c0b4b989139f4a28e7306ce249c55f7": {
      name: "crowdpass",
      description: "contains the logic for crowdpass event ticketing",
      methods: [
        {
          name: "create_event",
          description: "creates an event",
          entrypoint: "create_event"
        },
        {
          name: "update_event",
          description: "updates event details",
          entrypoint: "update_event"
        },
        {
          name: "cancel_event",
          description: "updates event details",
          entrypoint: "update_event"
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
      connectors={[cartridgeConnector, connector]}
      explorer={voyager}
    >
      {children}
    </StarknetConfig>
  );
}

