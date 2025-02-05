import React from "react";
import { Button } from "./ui/button";
import { UserCircle } from "lucide-react";
import { disconnect } from "starknetkit";

const ConnectedUser = ({setConnected }: any) => {
  const disconnectWallet = async () => {
    await disconnect()
    localStorage.removeItem("address")
    setConnected(false)
  }
  const address = localStorage.getItem("address")

  return (
    <Button onClick={()=> disconnectWallet()} className="flex items-center gap-4 p-6 bg-transparent hover:bg-light-black">
      {/* <p className="text-white font-medium text-lg">{data?.value}ETH</p> */}
      <UserCircle color="#FF6932" size={25} />
      <p className="text-white font-medium text-lg">{`0x${address
        ?.split("x")[1]
        .slice(0, 4)}...${address?.slice(-4)}`}</p>
    </Button>
  );
};

export default ConnectedUser;
