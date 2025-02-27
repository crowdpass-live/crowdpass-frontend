"use client";

import "./globals.css";
import { Toaster } from "react-hot-toast";
import { StarknetProvider } from "@/components/StarknetProvider";
import { Contract } from "starknet";
import eventAbi from "../Abis/eventAbi.json";
import strkAbi from "../Abis/strkAbi.json";
import { useEffect, useState } from "react";
import { createContext } from "react";
import { argentWebWallet, provider } from "@/components/AbiCalls";
import { SessionAccountInterface } from "@argent/webwallet-sdk";
import ReactLenis from "lenis/react";

export const UserContext = createContext({});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Contract Addresses
  const token_addr =
    "0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d";
  const contractAddr =
    "0x03b6e892ebacbee65e8f944547207d3d97bf0ad044bd073436fcb33661339f0d";

  const [account, setAccount] = useState<SessionAccountInterface | undefined>(
    undefined
  );

  const [address, setAddress] = useState<String | undefined>(undefined);

  const [isLoading, setIsLoading] = useState(false);

  // user connection to dapp
  useEffect(() => {
    argentWebWallet
      .connect()
      .then((res) => {
        if (!res) {
          console.log("Not connected");
          return;
        }

        const { account } = res;

        if (account.getSessionStatus() !== "VALID") {
          console.log("Session is not valid");
          return;
        }

        setAccount(account);

        setAddress(account.address);
      })
      .catch((err) => {
        console.error("Failed to connect to Argent Web Wallet", err);
      });
  }, []);

  const eventContract = new Contract(eventAbi, contractAddr, account);
  const readEventContract = new Contract(eventAbi, contractAddr, provider);
  const strkContract = new Contract(strkAbi, token_addr, account);

  return (
    <html lang="en">
      <ReactLenis root>
        <body>
          <UserContext.Provider
            value={{
              isLoading,
              setIsLoading,
              account,
              setAccount,
              contractAddr,
              eventAbi,
              eventContract,
              readEventContract,
              strkContract,
              token_addr,
              address,
              setAddress,
            }}
          >
            <StarknetProvider>
              {children}
              <Toaster />
            </StarknetProvider>
          </UserContext.Provider>
        </body>
      </ReactLenis>
    </html>
  );
}
