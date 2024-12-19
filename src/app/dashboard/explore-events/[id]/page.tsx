"use client";

import { Button } from "@/components/ui/button";
import { useReadContract, useAccount } from "@starknet-react/core";
import { useParams } from "next/navigation";
import React from "react";
import { BsCash } from "react-icons/bs";
import { MdCancel } from "react-icons/md";
import eventAbi from "../../../../Abis/eventAbi.json";
import { CallData, Contract, ProviderInterface, RpcProvider, Uint256, cairo } from "starknet";
import token_abi from '@/Abis/strkAbi.json';
import Preloader from "@/components/Preloader";
import toast from "react-hot-toast";

type Props = {};

const page = (props: Props) => {
  const params = useParams<{ id: string }>();
  const contractAddr =
    "0x04da2dd996dc36097f2f5b663db1ffa75466d32036d7bbdbe6719f768bdc5b26";

  const STRK_SEPOLIA = "0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d";

  const { account, address } = useAccount();

  // RPC PROVIDER
  const provider = new RpcProvider({
    nodeUrl: "https://starknet-sepolia.public.blastapi.io",
  });

  // STRK SEPOLIA CONTRACT
  const strk_contract = new Contract(token_abi, STRK_SEPOLIA, provider);
  const eventContract = new Contract(eventAbi, contractAddr, account)

  const { data } = useReadContract({
    functionName: "get_event",
    args: [Number(params.id)],
    abi: eventAbi,
    address: contractAddr,
    watch: true,
  });
  console.log(data);

  // --------------implement buy ticket ------

  const handle_buy_ticket = async () => {
    try {
      if (!account) {
        return;
      }

      const approvedAmt: Uint256 = cairo.uint256(Number(data?.ticket_price) * 1e18);
      strk_contract.connect(account);
      const multicall = await account?.execute([
        // approve contract to spend ticket Amount
        {
          contractAddress: "0x04718f5a0fc34cc1af16a1cdee98ffb20c31f5cd61d6ab07201858f4287c938d",
          entrypoint: "approve",
          calldata: CallData.compile({
            spender: contractAddr,
            amount: approvedAmt
          })
        },

        // purchase ticket
        {
          contractAddress: contractAddr,
          entrypoint: "purchase_ticket",
          calldata: CallData.compile({
            _event_id: Number(params.id)
          })
        }
      ])

      if(!multicall) {
        return
      }

      await provider.waitForTransaction(multicall.transaction_hash)
      
    } catch (error: any) {
      console.log(error.message);

    }finally{
      console.log('done')
    }

  }
  // -----------------------------------------

  const handle_cancel_event = async () => {

    const toast1 = toast.loading('Canceling Event')

    try {
        await eventContract.cancel_event(Number(params.id))
        toast.remove(toast1);
        toast.success("Event Canceled")
    } catch (error: any) {
        toast.remove(toast1);
        toast.error(error.message)
    }

  }


  return (
    <div>
        {data === undefined && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
          <Preloader />
        </div>
      )}
      <div className="flex justify-between items-center my-4">
        <h1 className="text-white font-bold text-3xl">Event details</h1>
        {data && `0x00${data?.organizer.toString(16).toLowerCase()}` != address?.toLowerCase() ? (
          <Button onClick={handle_buy_ticket} className="font-semibold flex gap-3 text-light-black text-base p-4">
            Buy Ticket{" "}
            <BsCash color="#14141A" size={20} className="font-bold" />{" "}
          </Button>
        ) : (
          <Button onClick={handle_cancel_event} className="font-semibold flex gap-3 text-light-black text-base p-4">
            Cancel Event{" "}
            <MdCancel color="#14141A" size={20} className="font-bold" />
          </Button>
        )}
      </div>
      <div className="flex gap-10 items-start">
        <img
          src={data? `https://gateway.pinata.cloud/ipfs/${data?.image.toString()}`  : ""}
          alt="Event Image"
          className="object-cover w-[45%] rounded-2xl"
        />
        <div className="flex flex-col justify-between h-full">
          <div className="flex flex-col gap-10">
            <h1 className="text-white font-bold text-3xl">
              {data ? data?.name.toString() : ""}
            </h1>
            <p className="text-white text-base ">
              {data ? data?.description.toString() : ""}
            </p>
          </div>
          <div className="flex flex-col gap-10">
          <hr className="h2 text-white w-full " />
          <div className="flex gap-6 items-center">
            <div className="flex flex-col">
              <h1 className="text-white font-bold text-4xl">{`$STRK ${
                Number(data?.ticket_price) / 1e18
              }`}</h1>
              <p className="text-sm text-white italic text-right">per ticket</p>
            </div>

            <p className="text-white font-extralight text-5xl">|</p>

            <div className="flex flex-col">
              <h1 className="text-white font-bold text-4xl">
                {Number(data?.total_tickets)}
              </h1>
              <p className="text-sm text-white italic text-right">
                Total tickets
              </p>
            </div>

            <p className="text-white font-extralight text-5xl">|</p>

            <div className="flex flex-col">
              <h1 className="text-white font-bold text-4xl">
                {Number(data?.tickets_sold)}
              </h1>
              <p className="text-sm text-white italic text-right">
                sold tickets
              </p>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
