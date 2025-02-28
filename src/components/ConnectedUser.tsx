import React, { useContext } from "react";
import { Button } from "./ui/button";
import { UserCircle } from "lucide-react";
import { UserContext } from "../app/layout";
import { argentWebWallet } from "./AbiCalls";

const ConnectedUser = () => {
  const { address, setAccount }: any = useContext(UserContext);

  const handleClearSession = async () => {
    await argentWebWallet.clearSession();
    setAccount(undefined);
    console.log("clicked");
  };
  return (
    <Button
      onClick={() => handleClearSession()}
      className="flex items-center gap-4 p-6 bg-transparent hover:bg-light-black"
    >
      {/* <p className="text-white font-medium text-lg">{data?.value}ETH</p> */}
      <UserCircle color="#FF6932" size={25} />
      <p className="text-white font-medium text-base">{`0x${address
        ?.split("x")[1]
        .slice(0, 4)}...${address?.slice(-4)}`}</p>
    </Button>
  );
};

export default ConnectedUser;
