import { create } from "zustand";
import { connect, disconnect } from "starknetkit";



const connectWallet = async () => {
  const { wallet, connector, connectorData } = await connect({
    modalMode: "neverAsk",
    webWalletUrl: "https://web-v2.hydrogen.argent47.net/email",
    argentMobileOptions: {
      dappName: "CrowdPass",
      url: "https://www.crowdpass.live",
    },
  });

  

};

const disconnectWallet = async () => {
  await disconnect({ clearLastWallet: true });
};

export const useUserStore = create((set) => ({
  user: null,
  setUser: (user: any) =>
    set(
      (state: {
        user: { walletAddress: string; name: string; email: string };
      }) => ({
        user: {
          walletAddress: state.user.walletAddress,
          name: state.user.name,
          email: state.user.email,
        },
      })
    ),
  logout: () => set({ user: null }),
}));