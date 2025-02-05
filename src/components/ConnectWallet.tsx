import { create } from "zustand";
import { connect, disconnect } from "starknetkit";
import RegModal from './RegModal';
import ReactDOM from 'react-dom';
import { WebWalletConnector } from "starknetkit/webwallet"
import { useRouter } from "next/router";

export const ConnectWallet = async (setConnected: any) => {

  const { connector, connectorData } = await connect({
    modalMode: "alwaysAsk",
    modalTheme: "dark",
    webWalletUrl: "https://web.argent.xyz",
    argentMobileOptions: {
      dappName: "CrowdPass",
      url: "https://www.crowdpass.live",
    },
    connectors: [
      new WebWalletConnector(),
    ],
  });


  if (connectorData && connectorData.account) {
    localStorage.setItem("address", connectorData.account)

  }

  window.location.reload();


  // const handleDialogSubmit = (name: string, email: string) => {
  //   useUserStore.getState().setUser({ walletAddress: wallet.selectedAddress, name, email });
  // };

  // ReactDOM.render(
  //   <RegModal onSubmit={handleDialogSubmit} />,
  //   document.getElementById('dialog-root')
  // );
};

