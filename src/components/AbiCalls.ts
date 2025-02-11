// import { UserContext } from "@/app/layout";
// import {
//   SignSessionError,
//   CreateSessionParams,
//   createSession,
//   buildSessionAccount,
//   bytesToHexString,
//   SessionKey,
//   createSessionRequest,
// } from "@argent/x-sessions";
// import { useContext } from "react";
// import { ec, constants, RpcProvider } from "starknet";
// import { useSignTypedData } from "@starknet-react/core";


// const privateKey = ec.starkCurve.utils.randomPrivateKey();

// const sessionKey: SessionKey = {
//   privateKey: bytesToHexString(privateKey), //string
//   publicKey: ec.starkCurve.getStarkKey(privateKey), //string
// };

// const sessionParams: CreateSessionParams = {
//   allowedMethods: [
//     {
//       "Contract Address":
//         "0x03b6e892ebacbee65e8f944547207d3d97bf0ad044bd073436fcb33661339f0d",
//       selector: "create_event",
//     },
//     {
//       "Contract Address":
//         "0x03b6e892ebacbee65e8f944547207d3d97bf0ad044bd073436fcb33661339f0d",
//       selector: "update_event",
//     },
//     {
//       "Contract Address":
//         "0x03b6e892ebacbee65e8f944547207d3d97bf0ad044bd073436fcb33661339f0d",
//       selector: "cancel_event",
//     },
//     {
//       "Contract Address":
//         "0x03b6e892ebacbee65e8f944547207d3d97bf0ad044bd073436fcb33661339f0d",
//       selector: "add_organizer",
//     },
//     {
//       "Contract Address":
//         "0x03b6e892ebacbee65e8f944547207d3d97bf0ad044bd073436fcb33661339f0d",
//       selector: "remove_organizer",
//     },
//   ],
//   expiry: Math.floor((Date.now() + 1000 * 60 * 60 * 24 * 90) / 1000) as any,
//   sessionKey: sessionKey,
//   metaData: {
//     projectID: "CrowdPass",
//     txFees: [
//       {
//         tokenAddress:
//           "0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d",
//         maxAmount: (Number("1") * 1e18).toString(),
//       },
//     ],
//   },
// };

// // Compute the typed data to be signed
// const sessionRequest = createSessionRequest({
//   sessionParams,
//   chainId: constants.StarknetChainId.SN_SEPOLIA,
// });

// // wallet is a StarknetWindowObject. There are others ways to sign typed data.
// // You could use the starknet-react hook useSignTypedData
// const {signTypedDataAsync} = useSignTypedData({
//   params: sessionRequest.sessionTypedData,
// });

// const signature = await  signTypedDataAsync()

// // Build session request
// const session = await createSession({
//   sessionRequest, // SessionRequest
//   address: "0x01ff8b59f9cd71ab51547b850e3ef151ebf1313ab800ac0fcb9c39b02adfac21", // Account address
//   chainId: constants.StarknetChainId.SN_SEPOLIA,
//   authorisationSignature: signature,
// });

// // Create session account. This is the account that will be used to execute transactions.
// const sessionAccount = await buildSessionAccount({
//   useCacheAuthorisation: false, // optional and defaulted to false, will be added in future developments
//   session,
//   sessionKey,
//   provider: new RpcProvider({
//     nodeUrl: "https://starknet-mainnet.g.alchemy.com/v2/demo",
//     chainId: constants.StarknetChainId.SN_SEPOLIA,
//   }),
//   argentSessionServiceBaseUrl: "https://web-v2.hydrogen.argent47.net/email", // Optional: defaulted to mainnet url. This is basically the backend api.
// });



import { RpcProvider, constants } from "starknet";
import { ArgentWebWallet } from "@argent/webwallet-sdk";

const CONTRACT_ADDRESS = "0x03b6e892ebacbee65e8f944547207d3d97bf0ad044bd073436fcb33661339f0d";

export const provider = new RpcProvider({
      nodeUrl: "https://starknet-sepolia.g.alchemy.com/starknet/version/rpc/v0_7/gKKJpRDCSZwEGB79uwIXLS8Qyoabfcdp",
      chainId: constants.StarknetChainId.SN_SEPOLIA,
    });

export const argentWebWallet = ArgentWebWallet.init({
   appName: "CrowdPass",
   environment: "sepolia",
   sessionParams: {
    allowedMethods: [
          {
            contract:
              CONTRACT_ADDRESS,
            selector: "create_event",
          },
          {
            contract:
              CONTRACT_ADDRESS,
            selector: "update_event",
          },
          {
            contract:
              CONTRACT_ADDRESS,
            selector: "cancel_event",
          },
          {
            contract:
              CONTRACT_ADDRESS,
            selector: "add_organizer",
          },
          {
            contract:
              CONTRACT_ADDRESS,
            selector: "remove_organizer",
          },
        ],
   },
});