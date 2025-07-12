"use client";
import React from "react";
import { Chain, sepolia, mainnet } from "@starknet-react/chains";
// import { WebWalletConnector } from "starknetkit/webwallet";
import { StarknetConfig, voyager, jsonRpcProvider } from "@starknet-react/core";
import Controller, { toSessionPolicies } from "@cartridge/controller";
import { ControllerConnector } from "@cartridge/connector";
import { constants } from "starknet";

const policies = {
  contracts: {
    "0x038333fabb72e3349038439cddcb1687d58458f30dfaef3e1d71ae7401445d26": {
      methods: [
        {
          name: "Create Event",
          entrypoint: "create_event",
          description: "Create an event",
        },
        {
          name: "Update Event",
          entrypoint: "update_event",
          description: "Update your exiting event",
        },
        {
          name: "Cancel Event",
          entrypoint: "cancel_event",
          description: "Cancel your event",
        },
        {
          name: "Add Orgnaizer",
          entrypoint: "add_organizer",
          description:
            "Add an organizer to assist in your event checkin process",
        },
        {
          name: "Remove Organizer",
          entrypoint: "remove_organizer",
          description:
            "Remove organizer from helping out in the checkin process",
        },
        {
          name: "Refund Ticket",
          entrypoint: "refund_ticket",
          description: "Collect refund on your payment for cancelled event",
        },
        {
          name: "Collect Event Payout",
          entrypoint: "collect_event_payout",
          description: "Organizer collect payout for already concluded events",
        },
        {
          name: "Check In",
          entrypoint: "check_in",
          description: "Check in attendees on the day of the event",
        },
        {
          name: "Purchase event ticket",
          entrypoint: "purchase_ticket",
          description: "Purchase ticket for event you want to attend",
        },
      ],
    },
  },
};

const sessions = toSessionPolicies(policies);

const connector = new ControllerConnector({
  policies: sessions,
  chains: [
    {
      rpcUrl:
        "https://api.cartridge.gg/x/starknet/sepolia",
    },
  ],
  defaultChainId: constants.StarknetChainId.SN_SEPOLIA,
});

// Configure RPC provider
const provider = jsonRpcProvider({
  rpc: (chain: Chain) => {
    switch (chain) {
      case mainnet:
        return { nodeUrl: "https://api.cartridge.gg/x/starknet/mainnet" };
      case sepolia:
      default:
        return {
          nodeUrl:
            "https://starknet-sepolia.g.alchemy.com/starknet/version/rpc/v0_8/FtlFKmlVF7DMCHmzZHQDu",
        };
    }
  },
});

export function StarknetProvider({ children }: { children: React.ReactNode }) {
  return (
    <StarknetConfig
      autoConnect
      chains={[sepolia]}
      provider={provider}
      connectors={[connector]}
      explorer={voyager}
    >
      {children}
    </StarknetConfig>
  );
}
