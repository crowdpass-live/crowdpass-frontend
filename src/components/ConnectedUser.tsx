import React, { useContext } from "react";
import { Button } from "./ui/button";
import { UserCircle } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { StarknetContext } from "@/contexts/UserContext";

const ConnectedUser = ({showMobileNav}:any) => {
  const { address, handleClearSession }: any = useContext(StarknetContext);

  return (
    <Dialog>
      <DialogTrigger className={`${showMobileNav ? "block mb-3": ""}`}>
        <Button className={`flex items-center gap-4 p-4 bg-transparent hover:bg-light-black`}>
          <UserCircle color="#FF6932" size={25} />
          <p className="text-white font-medium text-sm">{`0x${address
            ?.split("x")[1]
            .slice(0, 4)}...${address?.slice(-4)}`}</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-deep-blue border-none z-[99] shadow-2xl rounded-xl mx-auto max-w-[90vw]">
        <DialogHeader className="text-neutral-100">
          Do you want to disconnect your Wallet?
        </DialogHeader>
      
        <DialogFooter className="sm:justify-center mb-1">
          <DialogClose asChild>
            <Button onClick={()=>{handleClearSession()
              
            }}>Yes</Button>
          </DialogClose>

          <DialogClose asChild>
            <Button
              type="button"
              variant="secondary"
              className="text-white shadow-black shadow-sm mb-4"
            >
              No
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConnectedUser;
