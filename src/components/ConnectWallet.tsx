import { UserContext } from "../app/layout";
import { useContext } from "react";
import { connect } from "starknetkit";
import { WebWalletConnector } from "starknetkit/webwallet";
import { Button } from "./ui/button";
import { argentWebWallet } from "./AbiCalls";

const ConnectWalletButton = () => {
  const { token_addr, contractAddr }: any = useContext(UserContext);

  const handleConnect = async () => {
    try {
       const response =  await argentWebWallet.requestConnection({
          callbackData: "custom_callback_data",
          approvalRequests: [
             {
                tokenAddress: token_addr,
                amount: BigInt("1000000000000000000").toString(),
                // Your dapp contract
                spender: contractAddr,
             },
          ],
       });
    } catch (err) {
       console.error(err);
    }
 };

  return (
    <Button
      onClick={handleConnect}
      className="bg-transaparent text-white font-semibold border border-white text-sm lg:text-base raleway hover:bg-primary hover:text-black hover:border-primary lg:ml-4 lg:py-6 lg:px-6 hidden md:flex"
    >
      Log in
    </Button>
  );
};

export default ConnectWalletButton;
