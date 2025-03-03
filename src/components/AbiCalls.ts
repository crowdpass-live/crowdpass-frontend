import { CallData, byteArray, cairo } from "starknet";
import { ArgentWebWallet } from "@argent/webwallet-sdk";
import { useCall } from "@starknet-react/core";
import eventAbi from "../Abis/eventAbi.json";
import { toast } from "sonner";

const CONTRACT_ADDRESS =
  (process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`) || "0x0";

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
      {
        contract: CONTRACT_ADDRESS,
        selector: "purchase_ticket",
      },
    ],
  },
  paymasterParams: {
	   apiKey: "c6a2dd57-fa65-4daf-87a7-2361611df07a"
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

    try {
      const call = {
        contractAddress: contractAddr,
        entrypoint: "create_event",
        calldata: CallData.compile([
          byteArray.byteArrayFromString("Starknet Africa MeetUp"),
          byteArray.byteArrayFromString("SAM"),
          byteArray.byteArrayFromString(
            "bafkreie6uzxpuf36wyjtzfw7ueskjne2me5o5gwdx5hcfsxdlxpwxdgyyq"
          ),
          byteArray.byteArrayFromString("This is a test event for crowdpass"),
          byteArray.byteArrayFromString("Lagos, Nigeria"),
          1741024000,
          1741072000,
          cairo.uint256(100),
          cairo.uint256(1),
        ]),
      };

      const {
        resourceBounds: estimatedResourceBounds,
      } = await account.estimateInvokeFee(call, {
        version: "0x3",
      });


      const resourceBounds = {
        ...estimatedResourceBounds,
        l1_gas: {
          ...estimatedResourceBounds.l1_gas,
          max_amount: "0x1388",
        },
      };

      let { transaction_hash } = await account.execute(call, {
        version: "0x3",
        resourceBounds,
      });

      // // Wait for transaction to be mined
      const waitForTransaction = await account.waitForTransaction(transaction_hash);

      setIsLoading(false);
      toast.success("Event Created");
      return "success";
    } catch (error) {
      console.error(error);
      toast.error(`${error}`);

      setIsLoading(false);
    }
  } catch (err) {
    toast.error(`Error creating event`);
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

      const {
        resourceBounds: estimatedResourceBounds,
      } = await account.estimateInvokeFee(call, {
        version: "0x3",
      });


      const resourceBounds = {
        ...estimatedResourceBounds,
        l1_gas: {
          ...estimatedResourceBounds.l1_gas,
          max_amount: "0x1388",
        },
      };

      let { transaction_hash } = await account.execute(call, {
        version: "0x3",
        resourceBounds,
      });

      // // Wait for transaction to be mined
      const waitForTransaction = await account.waitForTransaction(transaction_hash);

      setIsLoading(false);
      toast.success("Event Updated");

      return "success";
    } catch (error) {
      console.error(error);

      setIsLoading(false);
    }
  } catch (err) {
    toast.error("Error updating event");

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

    try {
      const call = {
        contractAddress: contractAddr,
        entrypoint: "cancel_event",
        calldata: CallData.compile([cairo.uint256(3)]),
      };

      const {
        resourceBounds: estimatedResourceBounds,
      } = await account.estimateInvokeFee(call, {
        version: "0x3",
      });


      const resourceBounds = {
        ...estimatedResourceBounds,
        l1_gas: {
          ...estimatedResourceBounds.l1_gas,
          max_amount: "0x1388",
        },
      };

      let { transaction_hash } = await account.execute(call, {
        version: "0x3",
        resourceBounds,
      });

      // // Wait for transaction to be mined
      const waitForTransaction = await account.waitForTransaction(transaction_hash);

      setIsLoading(false);
      toast.success("Event Cancelled");

      return "success";
    } catch (error) {
      console.error(error);

      setIsLoading(false);
    }
  } catch (err) {
    toast.error("Error cancelling event");

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

    try {
      const call = {
        contractAddress: contractAddr,
        entrypoint: "add_organizer",
        calldata: CallData.compile([
          cairo.uint256(3),
          "0x05F85a26306d00dEdfa0a43F224d49B84b1F326972288E6465e33fc4CeFC9190",
        ]),
      };

      const {
        resourceBounds: estimatedResourceBounds,
      } = await account.estimateInvokeFee(call, {
        version: "0x3",
      });


      const resourceBounds = {
        ...estimatedResourceBounds,
        l1_gas: {
          ...estimatedResourceBounds.l1_gas,
          max_amount: "0x1388",
        },
      };

      let { transaction_hash } = await account.execute(call, {
        version: "0x3",
        resourceBounds,
      });

      // // Wait for transaction to be mined
      const waitForTransaction = await account.waitForTransaction(transaction_hash);

      setIsLoading(false);
      toast.success("Organizer Added");

      return "success";
    } catch (error) {
      console.error(error);

      setIsLoading(false);
    }
  } catch (err) {
    toast.error("Error Adding organiser");

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

    try {
      const call = {
        contractAddress: contractAddr,
        entrypoint: "remove_organizer",
        calldata: CallData.compile([
          cairo.uint256(3),
          "0x05F85a26306d00dEdfa0a43F224d49B84b1F326972288E6465e33fc4CeFC9190",
        ]),
      };

      const {
        resourceBounds: estimatedResourceBounds,
      } = await account.estimateInvokeFee(call, {
        version: "0x3",
      });


      const resourceBounds = {
        ...estimatedResourceBounds,
        l1_gas: {
          ...estimatedResourceBounds.l1_gas,
          max_amount: "0x1388",
        },
      };

      let { transaction_hash } = await account.execute(call, {
        version: "0x3",
        resourceBounds,
      });

      // // Wait for transaction to be mined
      const waitForTransaction = await account.waitForTransaction(transaction_hash);

      setIsLoading(false);
      toast.success("Organizer removed");

      return "success";
    } catch (error) {
      console.error(error);

      setIsLoading(false);
    }
  } catch (err) {
    toast.error("Error removing organiser");
    console.error(err);
    setIsLoading(false);
  }
};

export const handlePurchaseFreeEventTicket =async (
  contractAddr: any,
  account: any,
  setIsLoading: any,
  eventId: String
) => {
  try {
    if (!account) {
      throw new Error("Account not connected");
    }
    setIsLoading(true);
    try {
      const call = {
        contractAddress: contractAddr,
        entrypoint: "purchase_ticket",
        calldata: CallData.compile([cairo.uint256(Number(eventId))]),
      };
      const {
        resourceBounds: estimatedResourceBounds,
      } = await account.estimateInvokeFee(call, {
        version: "0x3",
      });
      const resourceBounds = {
        ...estimatedResourceBounds,
        l1_gas: {
          ...estimatedResourceBounds.l1_gas,
          max_amount: "0x1388",
        },
      };
      let { transaction_hash } = await account.execute(call, {
        version: "0x3",
        resourceBounds,
      });

      // // Wait for transaction to be mined
      const waitForTransaction = await account.waitForTransaction(transaction_hash);
      setIsLoading(false);
      toast.success("Event Ticket Purchased");
      return "success";
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  } catch (err) {
    toast.error("Error purchasing ticket");
    console.error(err);
    setIsLoading(false);
  }
};

// Read Contract Hook calls
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