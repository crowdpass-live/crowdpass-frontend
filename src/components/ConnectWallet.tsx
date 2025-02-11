import { UserContext } from "@/app/layout";
import { useContext } from "react";
import { connect } from "starknetkit";
import { WebWalletConnector } from "starknetkit/webwallet";
import { Button } from "./ui/button";
import { argentWebWallet } from "./AbiCalls";

const ConnectWalletButton = () => {
  const { token_addr, contractAddr }: any = useContext(UserContext);
  // const handleConnectWallet = async () => {
  //   const { connectorData } = await connect({
  //     modalMode: "alwaysAsk",
  //     modalTheme: "dark",
  //     // webWalletUrl: "https://web-v2.hydrogen.argent47.net",
  //     argentMobileOptions: {
  //       dappName: "CrowdPass",
  //       url: "https://www.crowdpass.live",
  //     },
  //     connectors: [
  //       new WebWalletConnector({
  //         url: "https://web-v2.hydrogen.argent47.net",
  //       }),
  //     ],
  //   });

  //   if (connectorData && connectorData.account) {
  //     setAccount(connectorData.account);
  //   }
  // };

  const handleConnect = async () => {
    try {
       const response =  await argentWebWallet.requestConnection({
          callbackData: "custom_callback_data",
          approvalRequests: [
             {
                tokenAddress: token_addr,
                amount: BigInt("100000000000000000").toString(),
                // Your dapp contract
                spender: contractAddr,
             },
          ],
       });
       
      console.log(response);
      //  console.log(sessionTypedData);
      //  setAccount(sessionAccount);
    } catch (err) {
       console.error(err);
    }
 };

  return (
    <Button
      onClick={handleConnect}
      className="bg-transaparent text-white font-semibold border border-white text-sm lg:text-xl raleway hover:bg-primary hover:text-black hover:border-primary lg:ml-4 lg:py-6 lg:px-6 hidden md:flex"
    >
      Log in
    </Button>
  );
};

export default ConnectWalletButton;
