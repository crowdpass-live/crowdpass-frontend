import { useContext, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { StarknetContext } from "@/contexts/UserContext";
import { useAccount, useConnect, useDisconnect } from '@starknet-react/core'
import {ControllerConnector} from '@cartridge/connector'


const ConnectWalletButton = ({showMobileNav}: any) => {
  const { handleConnect, handleCartridgeConnect }: any = useContext(StarknetContext);
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect()
  const { address } = useAccount()
  const controller = connectors[0] as ControllerConnector
  const [username, setUsername] = useState<string>()

  useEffect(() => {
    if (!address) return
    controller.username()?.then((n) => setUsername(n))
  }, [address, controller])
 
 
  return (
    <>
    <Button
      onClick={handleConnect}
      className={`bg-transaparent text-white font-semibold border border-white text-sm lg:text-base raleway hover:bg-primary hover:text-black hover:border-primary lg:ml-4 lg:py-6 lg:px-6 md:flex ${showMobileNav ? "block mb-3": ""}`}
    >
      Log in
    </Button>

   <Button
      onClick={handleCartridgeConnect}
      className={`bg-transaparent text-white font-semibold border border-white text-sm lg:text-base raleway hover:bg-primary hover:text-black hover:border-primary lg:ml-4 lg:py-6 lg:px-6 md:flex ${showMobileNav ? "block mb-3": ""}`}
    >
      Cartridge
    </Button>

    </>
  );
};

export default ConnectWalletButton;

