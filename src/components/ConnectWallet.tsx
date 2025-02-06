import { UserContext } from "@/app/layout";
import { useContext } from "react";
import { connect } from "starknetkit";
import { WebWalletConnector } from "starknetkit/webwallet";
import { Button } from "./ui/button";

const ConnectWalletButton = () => {
  const { setAccount }: any = useContext(UserContext);
  const handleConnectWallet = async () => {
    const { connectorData } = await connect({
      modalMode: "alwaysAsk",
      modalTheme: "dark",
      webWalletUrl: "https://web.argent.xyz",
      argentMobileOptions: {
        dappName: "CrowdPass",
        url: "https://www.crowdpass.live",
      },
      connectors: [new WebWalletConnector()],
    });

    if (connectorData && connectorData.account) {
      setAccount(connectorData.account);
    }
  };

  return (
    <Button
      onClick={handleConnectWallet}
      className="bg-transaparent text-white font-semibold border border-white text-sm lg:text-xl raleway hover:bg-primary hover:text-black hover:border-primary lg:ml-4 lg:py-6 lg:px-6 hidden md:flex"
    >
      Log in
    </Button>
  );
};

export default ConnectWalletButton;
