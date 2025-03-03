"use client";

import "./globals.css";
import { StarknetProvider } from "@/components/StarknetProvider";
import { constants, Contract, RpcProvider } from "starknet";
import eventAbi from "../Abis/eventAbi.json";
import { useEffect, useState } from "react";
import { createContext } from "react";
import { argentWebWallet } from "@/components/AbiCalls";
import {
  deployAndExecuteWithPaymaster,
  SessionAccountInterface,
} from "@argent/webwallet-sdk";
import ReactLenis from "lenis/react";
import { Toaster } from "@/components/ui/sonner";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const UserContext = createContext({});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const provider = new RpcProvider({
    nodeUrl:
      "https://starknet-sepolia.g.alchemy.com/starknet/version/rpc/v0_7/gKKJpRDCSZwEGB79uwIXLS8Qyoabfcdp",
    chainId: constants.StarknetChainId.SN_SEPOLIA,
  });

  const router = useRouter();

  // Contract Addresses
  const token_addr =
    (process.env.NEXT_PUBLIC_TOKEN_ADDRESS as `0x${string}`) || "0x0";
  const contractAddr =
    (process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`) || "0x0";

  // User States
  const [account, setAccount] = useState<SessionAccountInterface | undefined>(
    undefined
  );

  const [address, setAddress] = useState<String | undefined>(undefined);

  const [isLoading, setIsLoading] = useState(false);

  const handleClearSession = async () => {
    try {
      await argentWebWallet.clearSession();
      setAccount(undefined);
      setAddress(undefined);
      router.push("/");
      toast.success("Wallet Disconnected Successfully");
    } catch (err) {
      toast.error(`Error disconnecting:${err}`);
    }
  };

  const handleConnect = async () => {
    try {
      const response = await argentWebWallet.requestConnection({
        callbackData: "custom_callback_data",
        approvalRequests: [
          {
            tokenAddress:
              "0x049D36570D4e46f48e99674bd3fcc84644DdD6b96F7C741B1562B82f9e004dC7",
            amount: BigInt("100000000000000000").toString(),
            // Your dapp contract
            spender:
              "0x7e00d496e324876bbc8531f2d9a82bf154d1a04a50218ee74cdd372f75a551a",
          },
        ],
      });

      if (response) {
        const { account: sessionAccount } = response;

        if (response.deploymentPayload) {
          console.log("Deploying an account");
          const isDeployed = await sessionAccount.isDeployed();

          if (!isDeployed && response.approvalRequestsCalls) {
            // @note If you're not willing to sponsor deployment, notify user to fund his wallet
            const resp = await deployAndExecuteWithPaymaster(
              sessionAccount,
              {
                apiKey: "c6a2dd57-fa65-4daf-87a7-2361611df07a",
              },
              response.deploymentPayload,
              response.approvalRequestsCalls
            );

            if (resp) {
              console.log("Deployment hash: ", resp.transaction_hash);

              await provider.waitForTransaction(resp.transaction_hash);

              console.log("Account deployed");
            }
          } else {
            console.log("Account already deployed");
          }
        }

        setAccount(sessionAccount);
      } else {
        console.log("requestConnection response is undefined");
      }
    } catch (err) {
      console.error(err);
    }
  };

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
              token_addr,
              address,
              handleClearSession,
              handleConnect,
              setAddress,
            }}
          >
            <StarknetProvider>
              {children}
              <Toaster richColors={true} />
            </StarknetProvider>
          </UserContext.Provider>
        </body>
      </ReactLenis>
    </html>
  );
}
