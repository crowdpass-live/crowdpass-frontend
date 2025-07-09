"use client";

import { createContext, useState, useEffect, ReactNode } from "react";
import { constants, RpcProvider } from "starknet";
import eventAbi from "../Abis/eventAbi.json";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAccount, useConnect, useDisconnect } from '@starknet-react/core'
import {ControllerConnector} from '@cartridge/connector'

// Define types to avoid direct imports that cause SSR issues
type SessionAccountInterface = any;

// Dynamically import browser-only modules
let argentWebWallet: any = null;
let deployAndExecuteWithPaymaster: any = null;

const CONTRACT_ADDRESS =
  (process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`) || "0x0";

interface StarknetContextType {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  account: SessionAccountInterface | undefined;
  setAccount: (account: SessionAccountInterface | undefined) => void;
  contractAddr: `0x${string}`;
  eventAbi: any;
  token_addr: `0x${string}`;
  address: String | undefined;
  argentWebWallet: any;
  handleClearSession: () => Promise<void>;
  handleConnect: () => Promise<void>;
  setAddress: (address: String | undefined) => void;
  username: string | undefined;
  handleCartridgeConnect: () => Promise<void>;
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
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect()
  const controller = connectors[0] as ControllerConnector
  const [username, setUsername] = useState<string>()

  useEffect(() => {
    if (!address) return
    controller.username()?.then((n) => setUsername(n))
  }, [controller])
 

  const router = useRouter();
  const { address: cartridgeAddress, account: cartridgeAccount } = useAccount();
  const [isLoading, setIsLoading] = useState(false);
  const [account, setAccount] = useState<SessionAccountInterface | undefined>(
    undefined
  );
  const [address, setAddress] = useState<String | undefined>(undefined);
  const [isClient, setIsClient] = useState(false);

  // Contract Addresses
  const token_addr =
    (process.env.NEXT_PUBLIC_TOKEN_ADDRESS as `0x${string}`) || "0x0";
  const contractAddr =
    (process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`) || "0x0";

    // set the cartrige controller
    const setCartridge = () => {
      

      setAddress(cartridgeAddress);
      setAccount(cartridgeAccount);
      console.log(address)
    }

  useEffect(() => {
    
    setCartridge()
   
  }, [account, address]);



  // Initialize client-side only modules
  useEffect(() => {
    setIsClient(true);

    const initArgentSDK = async () => {
      try {
        // Dynamically import browser-only modules
        const {
          ArgentWebWallet,
          deployAndExecuteWithPaymaster: deployExecuteWithPaymaster,
        } = await import("@argent/invisible-sdk");

        // Initialize the wallet
        argentWebWallet = ArgentWebWallet.init({
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
                selector: "refund_ticket",
              },
              {
                contract: CONTRACT_ADDRESS,
                selector: "collect_event_payout",
              },
              {
                contract: CONTRACT_ADDRESS,
                selector: "check_in",
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

        deployAndExecuteWithPaymaster = deployExecuteWithPaymaster;

        // Try to connect to an existing session
        tryConnect();
      } catch (error) {
        console.error("Failed to initialize Argent SDK:", error);
      }
    };

    initArgentSDK();
  }, []);

  // Provider setup - only initialize in client environment
  const provider = isClient
    ? new RpcProvider({
        nodeUrl: process.env.NEXT_PUBLIC_NODE_URL,
        chainId: constants.StarknetChainId.SN_SEPOLIA,
      })
    : null;

  const handleClearSession = async () => {
    if (!argentWebWallet) return;

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

  const tryConnect = async () => {
    if (!argentWebWallet) return;

    try {
      const res = await argentWebWallet.connect();
      if (!res) {
        toast("Not connected");
        return;
      }

      const { account } = res;

      if (account.getSessionStatus() !== "VALID") {
        toast("Session is not valid");
        return;
      }

      setAccount(account);
      setAddress(account.address);
    } catch (err) {
      toast.error(`Failed to connect to Argent Web Wallet: ${err}`);
    }
  };

  const handleCartridgeConnect = async () => {
      await connect({ connector: controller })
      setAddress(cartridgeAddress);
      setAccount(cartridgeAccount);
  }

  const handleConnect = async () => {
    if (!argentWebWallet || !provider || !deployAndExecuteWithPaymaster) {
      toast.error("Wallet functionality not available yet. Please try again.");
      return;
    }

    try {
      const response = await argentWebWallet.requestConnection({
        callbackData: "custom_callback_data",
        approvalRequests: [
          // {
          //   tokenAddress:
          //     "0x049D36570D4e46f48e99674bd3fcc84644DdD6b96F7C741B1562B82f9e004dC7",
          //   amount: BigInt("100000000000000000").toString(),
          //   spender:
          //     "0x0144cfdfabe90c5e0819277d2ee524c1b71ccb09f38599404cc89c6e970ea0fb",
          // },
          // {
          //       tokenAddress: token_addr,
          //       amount: (10 * 1e18).toString(),
          //       spender: contractAddr,
          // }
        ],
      });

      if (response) {
        const { account: sessionAccount } = response;
        if (response.deploymentPayload) {
          const isDeployed = await sessionAccount.isDeployed();

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
              await provider.waitForTransaction(resp.transaction_hash);
              toast.success("Account deployed");
            }
          } else {
            toast("Account already deployed");
          }
        }

        setAccount(sessionAccount);
        setAddress(sessionAccount.address);
        toast.success("Wallet Connected Successfully");
        return sessionAccount;
      } else {
        toast.error("requestConnection response is undefined");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to connect wallet");
    }
  };

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
        argentWebWallet,
        handleConnect,
        setAddress,
        username,
        handleCartridgeConnect
      }}
    >
      {children}
    </StarknetContext.Provider>
  );
};
