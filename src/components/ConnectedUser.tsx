import React, { useContext } from "react";
import { Button } from "./ui/button";
import { UserCircle } from "lucide-react";
import { disconnect } from "starknetkit";
import { UserContext } from "@/app/layout";

const ConnectedUser = () => {
  const disconnectWallet = async () => {
    await disconnect()
    localStorage.removeItem("account")
  }

  const {account}: any = useContext(UserContext)
  return (
    <Button onClick={()=> disconnectWallet()} className="flex items-center gap-4 p-6 bg-transparent hover:bg-light-black">
      {/* <p className="text-white font-medium text-lg">{data?.value}ETH</p> */}
      <UserCircle color="#FF6932" size={25} />
      <p className="text-white font-medium text-lg">{`0x${account
        ?.split("x")[1]
        .slice(0, 4)}...${account?.slice(-4)}`}</p>
    </Button>
  );
};

export default ConnectedUser;
