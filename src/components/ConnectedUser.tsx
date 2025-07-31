import React, { useContext } from "react";
import { Button } from "./ui/button";
import { UserCircle, LogOut, Wallet } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"; 
import { StarknetContext } from "@/contexts/UserContext";
import { lookupAddresses } from "@cartridge/controller";

const ConnectedUser = ({ showMobileNav }: any) => {
  const { address, handleClearSession, username }: any = useContext(StarknetContext);

  const getAddress =  async()=>{
     const addressMap = await lookupAddresses([address.toString()]);
  }
  
  getAddress();

  return (
    <Dialog>
      <DialogTrigger className={`${showMobileNav ? "block mb-3" : ""} flex items-center gap-4 p-4 bg-transparent hover:bg-light-black lg:ml-4 lg:py-3 lg:px-6 rounded-lg transition-all duration-200 hover:scale-105`}>
        <div className="relative">
          <UserCircle color="#FF6932" size={25} />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
        </div>
        <div className="flex flex-col items-start">
          {username && <p className="text-white font-medium text-xs opacity-75">{username}</p>}
          <p className="text-white font-medium text-sm">{`0x${address
            ?.split("x")[1]
            .slice(0, 4)}...${address?.slice(-4)}`}</p>
        </div>
      </DialogTrigger>
      
      <DialogContent className="bg-[#0d0d0d] border border-light-black/30 shadow-2xl rounded-2xl mx-auto max-w-[90vw] md:max-w-[450px] overflow-hidden">
        
        <DialogHeader className="relative z-10 text-center pb-6">
          <div className="flex justify-center mb-4">
            <div className="relative p-4 bg-light-black rounded-full border border-light-black/50">
              <Wallet className="w-8 h-8 text-primary" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-deep-blue"></div>
            </div>
          </div>
          
          <DialogTitle className="text-2xl font-bold text-white mb-2">
            Disconnect Wallet
          </DialogTitle>
          
          <div className="bg-light-black/50 rounded-lg p-4 border border-light-black/30">
            <p className="text-sm text-base-white/70 mb-1">Connected Address</p>
            <p className="text-white font-mono text-sm bg-black px-3 py-2 rounded-md border border-light-black/50">
              {`0x${address?.split("x")[1].slice(0, 8)}...${address?.slice(-8)}`}
            </p>
            {username && (
              <p className="text-primary text-sm mt-2 font-medium">
                {username}
              </p>
            )}
          </div>
          
          <p className="text-base-white/60 text-sm mt-4">
            Are you sure you want to disconnect your wallet? You'll need to reconnect to continue using the app.
          </p>
        </DialogHeader>

        <DialogFooter className="relative z-10 flex flex-col sm:flex-row gap-3 pt-4">
          <DialogClose asChild className="w-full sm:w-auto">
            <Button
              variant="secondary"
              className="bg-light-black hover:bg-light-black/80 text-white border-light-black/50 hover:border-light-black/70 transition-all duration-200"
            >
              Cancel
            </Button>
          </DialogClose>
          
          <DialogClose asChild className="w-full sm:w-auto">
            <Button
              onClick={handleClearSession}
              className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Disconnect
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConnectedUser;