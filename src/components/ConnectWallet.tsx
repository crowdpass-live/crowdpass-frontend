import { UserContext } from "../app/layout";
import { useContext } from "react";
import { Button } from "./ui/button";

const ConnectWalletButton = ({showMobileNav}: any) => {
  const { handleConnect }: any = useContext(UserContext);

 
  return (
    <Button
      onClick={handleConnect}
      className={`bg-transaparent text-white font-semibold border border-white text-sm lg:text-base raleway hover:bg-primary hover:text-black hover:border-primary lg:ml-4 lg:py-6 lg:px-6 md:flex ${showMobileNav ? "block mb-3": ""}`}
    >
      Log in
    </Button>
  );
};

export default ConnectWalletButton;
