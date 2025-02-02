import { create } from "zustand";
import { connect, disconnect } from "starknetkit";
import RegModal from './RegModal';
import ReactDOM from 'react-dom';

const ConnectWallet = async () => {
  const { wallet, connector, connectorData } = await connect({
    modalMode: "neverAsk",
    webWalletUrl: "https://web.argent.xyz",
    argentMobileOptions: {
      dappName: "CrowdPass",
      url: "https://www.crowdpass.live",
    },
  });

  const handleDialogSubmit = (name: string, email: string) => {
    useUserStore.getState().setUser({ walletAddress: wallet.selectedAddress, name, email });
  };

  ReactDOM.render(
    <RegModal onSubmit={handleDialogSubmit} />,
    document.getElementById('dialog-root')
  );
};