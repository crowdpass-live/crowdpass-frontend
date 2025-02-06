"use client";

import "./globals.css";
import { Toaster } from "react-hot-toast";
import { StarknetProvider } from "@/components/StarknetProvider";
import { Contract, RpcProvider } from "starknet";
import eventAbi from "../Abis/eventAbi.json";
import strkAbi from "../Abis/strkAbi.json";
import { useEffect, useState } from "react";
import { createContext } from "react";

export const UserContext = createContext({});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const token_addr =
    "0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d";
  const contractAddr =
    "0x03b6e892ebacbee65e8f944547207d3d97bf0ad044bd073436fcb33661339f0d";
  const providers = new RpcProvider({
    nodeUrl: "https://free-rpc.nethermind.io/sepolia-juno/",
  });
  const [address, setAddress] = useState("");
  const [] = useState();

  const [account, setAccount] = useState(undefined);

useEffect(() => {
  const storedAccount = localStorage.getItem("account");
  if (storedAccount) {
    setAccount(JSON.parse(storedAccount));
  }
}, []);

useEffect(() => {
  if (account) {
    localStorage.setItem("account", JSON.stringify(account));
  }
}, [account]);

  const eventContract = new Contract(eventAbi, contractAddr, account);
  const readEventContract = new Contract(eventAbi, contractAddr, providers);
  const strkContract = new Contract(strkAbi, token_addr, account);

  return (
    <html lang="en">
      <body>
        <UserContext.Provider
          value={{
            address,
            setAddress,
            account,
            setAccount,
            contractAddr,
            eventAbi,
            eventContract,
            readEventContract,
            strkContract,
          }}
        >
          <StarknetProvider>
            {children}
            <Toaster />
          </StarknetProvider>
        </UserContext.Provider>
      </body>
    </html>
  );
}
