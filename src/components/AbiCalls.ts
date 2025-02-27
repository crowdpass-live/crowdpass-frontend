import { CallData, RpcProvider, byteArray, cairo, constants } from "starknet";
import { ArgentWebWallet } from "@argent/webwallet-sdk";
import { useCall } from "@starknet-react/core";
import eventAbi from "../Abis/eventAbi.json";

const CONTRACT_ADDRESS =
  "0x03b6e892ebacbee65e8f944547207d3d97bf0ad044bd073436fcb33661339f0d";

export const provider = new RpcProvider({
  nodeUrl:
    "https://starknet-sepolia.g.alchemy.com/starknet/version/rpc/v0_7/gKKJpRDCSZwEGB79uwIXLS8Qyoabfcdp",
  chainId: constants.StarknetChainId.SN_SEPOLIA,
});

export const argentWebWallet = ArgentWebWallet.init({
  appName: "CrowdPass",
  environment: "sepolia",
  sessionParams: {
    allowedMethods: [
      {
        contract: CONTRACT_ADDRESS,
        selector: "create_event",
      },
      {
        contract: CONTRACT_ADDRESS,
        selector: "update_event",
      },
      {
        contract: CONTRACT_ADDRESS,
        selector: "cancel_event",
      },
      {
        contract: CONTRACT_ADDRESS,
        selector: "add_organizer",
      },
      {
        contract: CONTRACT_ADDRESS,
        selector: "remove_organizer",
      },
    ],
  },
});

// Write Contract with Sessions
export const handleCreateEvent = async (
  contractAddr: any,
  account: any,
  setIsLoading: any
) => {
  try {
    if (!account) {
      throw new Error("Account not connected");
    }
    setIsLoading(true);

    console.log(contractAddr);

    try {
      const call = {
        contractAddress: contractAddr,
        entrypoint: "create_event",
        calldata: CallData.compile([
          byteArray.byteArrayFromString("david"),
          byteArray.byteArrayFromString("da"),
          byteArray.byteArrayFromString("www"),
          byteArray.byteArrayFromString("test event 2"),
          byteArray.byteArrayFromString("iyana ipaja"),
          1727830769,
          1727830969,
          cairo.uint256(100),
          cairo.uint256(2),
        ]),
      };

      console.log(call);
      console.log(account);
      const {
        resourceBounds: estimatedResourceBounds,
        suggestedMaxFee: estimatedFee1,
      } = await account.estimateInvokeFee(call, {
        version: "0x3",
      });

      console.log(estimatedFee1);
      console.log(estimatedResourceBounds);

      const resourceBounds = {
        ...estimatedResourceBounds,
        l1_gas: {
          ...estimatedResourceBounds.l1_gas,
          max_amount: "0x1388",
        },
      };

      console.log(resourceBounds);

      let { transaction_hash } = await account.execute(call, {
        version: "0x3",
        resourceBounds,
      });

      console.log(transaction_hash);

      // // Wait for transaction to be mined
      const sogo = await account.waitForTransaction(transaction_hash);

      console.log(sogo);

      setIsLoading(false);

      return "success";
    } catch (error) {
      console.error(error);

      setIsLoading(false);
    }
  } catch (err) {
    console.error(err);
    setIsLoading(false);
  }
};

export const handleUpdateEvent = async (
  contractAddr: any,
  account: any,
  setIsLoading: any
) => {
  try {
    if (!account) {
      throw new Error("Account not connected");
    }
    setIsLoading(true);

    console.log(contractAddr);

    try {
      const call = {
        contractAddress: contractAddr,
        entrypoint: "update_event",
        calldata: CallData.compile([
          cairo.uint256(3),
          byteArray.byteArrayFromString("mano"),
          byteArray.byteArrayFromString("m"),
          byteArray.byteArrayFromString("www"),
          byteArray.byteArrayFromString("test event 3"),
          byteArray.byteArrayFromString("iyana itire"),
          1727830769,
          1727830969,
          cairo.uint256(100),
          cairo.uint256(2),
        ]),
      };

      console.log(call);
      console.log(account);
      const {
        resourceBounds: estimatedResourceBounds,
        suggestedMaxFee: estimatedFee1,
      } = await account.estimateInvokeFee(call, {
        version: "0x3",
      });

      console.log(estimatedFee1);
      console.log(estimatedResourceBounds);

      const resourceBounds = {
        ...estimatedResourceBounds,
        l1_gas: {
          ...estimatedResourceBounds.l1_gas,
          max_amount: "0x1388",
        },
      };

      console.log(resourceBounds);

      let { transaction_hash } = await account.execute(call, {
        version: "0x3",
        resourceBounds,
      });

      console.log(transaction_hash);

      // // Wait for transaction to be mined
      const sogo = await account.waitForTransaction(transaction_hash);

      console.log(sogo);

      setIsLoading(false);

      return "success";
    } catch (error) {
      console.error(error);

      setIsLoading(false);
    }
  } catch (err) {
    console.error(err);
    setIsLoading(false);
  }
};

export const handleCancelEvent = async (
  contractAddr: any,
  account: any,
  setIsLoading: any
) => {
  try {
    if (!account) {
      throw new Error("Account not connected");
    }
    setIsLoading(true);

    console.log(contractAddr);

    try {
      const call = {
        contractAddress: contractAddr,
        entrypoint: "cancel_event",
        calldata: CallData.compile([cairo.uint256(3)]),
      };

      console.log(call);
      console.log(account);
      const {
        resourceBounds: estimatedResourceBounds,
        suggestedMaxFee: estimatedFee1,
      } = await account.estimateInvokeFee(call, {
        version: "0x3",
      });

      console.log(estimatedFee1);
      console.log(estimatedResourceBounds);

      const resourceBounds = {
        ...estimatedResourceBounds,
        l1_gas: {
          ...estimatedResourceBounds.l1_gas,
          max_amount: "0x1388",
        },
      };

      console.log(resourceBounds);

      let { transaction_hash } = await account.execute(call, {
        version: "0x3",
        resourceBounds,
      });

      console.log(transaction_hash);

      // // Wait for transaction to be mined
      const sogo = await account.waitForTransaction(transaction_hash);

      console.log(sogo);

      setIsLoading(false);

      return "success";
    } catch (error) {
      console.error(error);

      setIsLoading(false);
    }
  } catch (err) {
    console.error(err);
    setIsLoading(false);
  }
};

export const handleAddOrganizer = async (
  contractAddr: any,
  account: any,
  setIsLoading: any
) => {
  try {
    if (!account) {
      throw new Error("Account not connected");
    }
    setIsLoading(true);

    console.log(contractAddr);

    try {
      const call = {
        contractAddress: contractAddr,
        entrypoint: "add_organizer",
        calldata: CallData.compile([
          cairo.uint256(3),
          "0x05F85a26306d00dEdfa0a43F224d49B84b1F326972288E6465e33fc4CeFC9190",
        ]),
      };

      console.log(call);
      console.log(account);
      const {
        resourceBounds: estimatedResourceBounds,
        suggestedMaxFee: estimatedFee1,
      } = await account.estimateInvokeFee(call, {
        version: "0x3",
      });

      console.log(estimatedFee1);
      console.log(estimatedResourceBounds);

      const resourceBounds = {
        ...estimatedResourceBounds,
        l1_gas: {
          ...estimatedResourceBounds.l1_gas,
          max_amount: "0x1388",
        },
      };

      console.log(resourceBounds);

      let { transaction_hash } = await account.execute(call, {
        version: "0x3",
        resourceBounds,
      });

      console.log(transaction_hash);

      // // Wait for transaction to be mined
      const sogo = await account.waitForTransaction(transaction_hash);

      console.log(sogo);

      setIsLoading(false);

      return "success";
    } catch (error) {
      console.error(error);

      setIsLoading(false);
    }
  } catch (err) {
    console.error(err);
    setIsLoading(false);
  }
};

export const handleRemoveOrganizer = async (
  contractAddr: any,
  account: any,
  setIsLoading: any
) => {
  try {
    if (!account) {
      throw new Error("Account not connected");
    }
    setIsLoading(true);

    console.log(contractAddr);

    try {
      const call = {
        contractAddress: contractAddr,
        entrypoint: "remove_organizer",
        calldata: CallData.compile([
          cairo.uint256(3),
          "0x05F85a26306d00dEdfa0a43F224d49B84b1F326972288E6465e33fc4CeFC9190",
        ]),
      };

      console.log(call);
      console.log(account);
      const {
        resourceBounds: estimatedResourceBounds,
        suggestedMaxFee: estimatedFee1,
      } = await account.estimateInvokeFee(call, {
        version: "0x3",
      });

      console.log(estimatedFee1);
      console.log(estimatedResourceBounds);

      const resourceBounds = {
        ...estimatedResourceBounds,
        l1_gas: {
          ...estimatedResourceBounds.l1_gas,
          max_amount: "0x1388",
        },
      };

      console.log(resourceBounds);

      let { transaction_hash } = await account.execute(call, {
        version: "0x3",
        resourceBounds,
      });

      console.log(transaction_hash);

      // // Wait for transaction to be mined
      const sogo = await account.waitForTransaction(transaction_hash);

      console.log(sogo);

      setIsLoading(false);

      return "success";
    } catch (error) {
      console.error(error);

      setIsLoading(false);
    }
  } catch (err) {
    console.error(err);
    setIsLoading(false);
  }
};
const useEvents = () => {
  const { data, isError, isLoading, error } = useCall({
    functionName: "get_all_events",
    abi: eventAbi,
    args: [],
    address: CONTRACT_ADDRESS,
    watch: true,
  });

  return { data, isError, isLoading, error };
};

const useEvent = (eventId: number) => {
  const { data, isError, isLoading, error } = useCall({
    functionName: "get_event",
    args: [cairo.uint256(eventId)],
    abi: eventAbi,
    address: CONTRACT_ADDRESS,
    watch: true,
  });

  return { data, isError, isLoading, error };
};

const useEventCount = () => {
  const { data, isError, isLoading, error } = useCall({
    functionName: "get_event_count",
    args: [],
    abi: eventAbi,
    address: CONTRACT_ADDRESS,
    watch: true,
  });

  return { data, isError, isLoading, error };
};

const useHasRole = () => {
  const { data, isError, isLoading, error } = useCall({
    functionName: "has_role",
    args: [],
    abi: eventAbi,
    address: CONTRACT_ADDRESS,
    watch: true,
  });

  return { data, isError, isLoading, error };
};

const useGetRoleAdmin = () => {
  const { data, isError, isLoading, error } = useCall({
    functionName: "get_role_admin",
    args: [],
    abi: eventAbi,
    address: CONTRACT_ADDRESS,
    watch: true,
  });

  return { data, isError, isLoading, error };
};

export { useEvents, useEvent, useEventCount, useHasRole, useGetRoleAdmin };