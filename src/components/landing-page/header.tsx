import React from "react";
import ConnectWallet from "./ConnectWallet";

const Header = () => {

  return (
    <div className="rounded-3xl bg-deep-blue flex justify-between items-center py-5 px-10 w-full my-6">
      <img src="/assets/crowdpass_logo.png" height={30} width={150} />
      <div className="flex">
        <ConnectWallet />
      </div>
    </div>
  );
};

export default Header;