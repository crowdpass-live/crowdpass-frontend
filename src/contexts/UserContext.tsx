"use client";

import { createContext, useState, useEffect, ReactNode } from "react";
import { constants, RpcProvider } from "starknet";
import eventAbi from "../Abis/eventAbi.json";
import {
  ArgentWebWallet,
  deployAndExecuteWithPaymaster,
  SessionAccountInterface,
} from "@argent/invisible-sdk";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const CONTRACT_ADDRESS =
  (process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`) || "0x0";
const argentWebWallet = ArgentWebWallet.init({
  appName: "CrowdPass",
  environment: "sepolia",
  sessionParams: {
    allowedMethods: [
      {
        contract: CONTRACT_ADDRESS,
        selector: "create_event",
      },
      {
        contract: CONTRACT_ADDRESS,
        selector: "update_event",
      },
      {
        contract: CONTRACT_ADDRESS,
        selector: "cancel_event",
      },
      {
        contract: CONTRACT_ADDRESS,
        selector: "add_organizer",
      },
      {
        contract: CONTRACT_ADDRESS,
        selector: "remove_organizer",
      },
      {
        contract: CONTRACT_ADDRESS,
        selector: "purchase_ticket",
      },
    ],
  },
  paymasterParams: {
    apiKey: "c6a2dd57-fa65-4daf-87a7-2361611df07a",
  },
});

interface StarknetContextType {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  account: SessionAccountInterface | undefined;
  setAccount: (account: SessionAccountInterface | undefined) => void;
  contractAddr: `0x${string}`;
  eventAbi: any;
  token_addr: `0x${string}`;
  address: String | undefined;
  handleClearSession: () => Promise<void>;
  handleConnect: () => Promise<void>;
  setAddress: (address: String | undefined) => void;
}

export const StarknetContext = createContext<StarknetContextType>(
  {} as StarknetContextType
);

interface StarknetProviderProps {
  children: ReactNode;
}

export const StarknetContextProvider = ({
  children,
}: StarknetProviderProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [account, setAccount] = useState<SessionAccountInterface | undefined>(
    undefined
  );
  const [address, setAddress] = useState<String | undefined>(undefined);

  // Provider setup
  const provider = new RpcProvider({
    nodeUrl:
      "https://starknet-sepolia.g.alchemy.com/starknet/version/rpc/v0_7/gKKJpRDCSZwEGB79uwIXLS8Qyoabfcdp",
    chainId: constants.StarknetChainId.SN_SEPOLIA,
  });

  // Contract Addresses
  const token_addr =
    (process.env.NEXT_PUBLIC_TOKEN_ADDRESS as `0x${string}`) || "0x0";
  const contractAddr =
    (process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`) || "0x0";

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
            spender:
              "0x0144cfdfabe90c5e0819277d2ee524c1b71ccb09f38599404cc89c6e970ea0fb",
          },
        ],
      });
      console.log(response);

      if (response) {
        const { account: sessionAccount } = response;
        const isDeployed = await sessionAccount.isDeployed();
        console.log(isDeployed);
        console.log(sessionAccount);
        console.log(response.deploymentPayload);
        if (response.deploymentPayload) {
          console.log("Deploying an account");
          const isDeployed = await sessionAccount.isDeployed();
          console.log("isDeployed", isDeployed);

          if (!isDeployed && response.approvalRequestsCalls) {
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

  // Check for existing wallet connection on component mount
  useEffect(() => {
    argentWebWallet
      .connect()
      .then((res: any) => {
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
      .catch((err: any) => {
        console.error("Failed to connect to Argent Web Wallet", err);
      });
  }, []);

  return (
    <StarknetContext.Provider
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
      {children}
    </StarknetContext.Provider>
  );
};
