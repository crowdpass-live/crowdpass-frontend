import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { StarknetContext } from "@/contexts/UserContext";
import useGetAllEvents from "@/hooks/read-hooks/useGetAllEvents";
import useAddOrganizer from "@/hooks/write-hooks/useAddOrganizers";
import useRemoveOrganizer from "@/hooks/write-hooks/useRemoveOrganizer";
import React, { useContext, useState } from "react";
import HashLoader from "react-spinners/HashLoader";
import { num } from "starknet";

const GrantOrganizerRole = () => {
  const [delegateEmail, setDelegateEmail] = useState("");
  const [revokeEmail, setRevokeEmail] = useState("");
  const [id, setId] = useState(0);
  const handleDelegateRole = useAddOrganizer();
  const handleRevokeRole = useRemoveOrganizer();
  const { address } = useContext(StarknetContext);
  const { events, isLoading } = useGetAllEvents();

  const tableData: any[] = [];

  function normalizeHex(hexString: string) {
    hexString = hexString.startsWith("0x") ? hexString.slice(2) : hexString;
    hexString = hexString.replace(/^0+/, "");
    return `0x${hexString}`;
  }

  const myEvents = events.filter(
    (event) =>
      normalizeHex(num.toHex(event.organizer)) ===
      normalizeHex(address as string)
  );

  return (
    <div className="bg-[#14141A] rounded-xl w-full p-10 flex flex-col gap-3">
      <h1 className="text-white text-xl raleway font-medium">
          Delegate role
        </h1>
      {isLoading && (
        <div className="fixed inset-0 z-50 flex flex-col gap-10 items-center justify-center bg-black bg-opacity-50">
          <HashLoader
            color={"#FF6932"}
            loading={isLoading}
            size={100}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
          <div className="text-white text-2xl">Fetching Events...</div>
        </div>
      )}
      {
        myEvents.length === 0 ? (
          <div className="w-full py-12 flex flex-col items-center justify-center text-center">
            <div className="text-gray-400 text-lg mb-4">
              You haven't created any events yet
            </div>
            <div className="text-gray-500 mb-6">
              Create an event first to delegate organizer roles
            </div>
            <Button className="bg-[#FF6932] hover:bg-[#e05a28] text-white py-2 px-6 rounded-lg transition-colors">
              Create Event
            </Button>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <div>
              <Select onValueChange={(value) => setId(parseInt(value))}>
                <SelectTrigger className="w-60 text-white border-deep-blue">
                  <SelectValue placeholder="Select Event to Delegate" />
                </SelectTrigger>
                <SelectContent className=" bg-light-black border-deep-blue text-white">
                  {myEvents.map((event) => (
                    <SelectItem key={event.id} value={event.id.toString()}>
                      {event.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="border border-deep-blue p-6 rounded-lg">
              <div className="flex flex-col lg:flex-row w-full gap-4 items-center">
                <div className="flex flex-col gap-4 w-full">
                  <h1 className="text-white text-lg mb-4 raleway font-semibold">
                    Delegate Role
                  </h1>
                  <input
                    type="text"
                    placeholder="whitelist email address"
                    className="raleway w-full bg-transparent border border-deep-blue rounded-lg text-deep-blue py-4 px-8"
                    value={delegateEmail}
                    onChange={(e) => setDelegateEmail(e.target.value)}
                  />
                  <Button
                    className="bg-primary w-full py-6 raleway text-light-black hover:border-deep-blue hover:bg-transparent hover:text-deep-blue"
                    onClick={async () =>
                      await handleDelegateRole(id, delegateEmail as `0x${string}`)
                    }
                  >
                    Delegate Role
                  </Button>
                </div>
                <img
                  src="https://res.cloudinary.com/dnohqlmjc/image/upload/v1742633480/line-divider_wvokop.png"
                  alt="line-divider"
                  className="hidden lg:flex"
                />
                <div className="flex flex-col gap-4 w-full">
                  <h1 className="text-white text-lg mb-4 raleway font-semibold">
                    Revoke Role
                  </h1>
                  <input
                    type="text"
                    placeholder="revoke email address"
                    className="raleway w-full bg-transparent border border-deep-blue rounded-lg text-deep-blue py-4 px-8"
                    value={revokeEmail}
                    onChange={(e) => setRevokeEmail(e.target.value)}
                  />
                  <Button
                    className="bg-primary w-full py-6 raleway text-light-black hover:border-deep-blue hover:bg-transparent hover:text-deep-blue"
                    onClick={async () =>
                      await handleRevokeRole(id, revokeEmail as `0x${string}`)
                    }
                  >
                    Revoke Role
                  </Button>
                </div>
              </div>
            </div>
            <h1 className="text-white ">
              Delegates: <span className="text-white text-2xl">0</span>
            </h1>
            <div className="border border-deep-blue p-4 md:p-6 rounded-lg">
              {/* Header - visible only on md and larger screens */}
              <div className="hidden md:flex w-full border-b border-deep-blue pb-3 pl-3">
                <h1 className="w-1/6 font-bold text-white">SN</h1>
                <h1 className="w-2/6 font-bold text-white">Email</h1>
                <h1 className="w-3/6 font-bold text-white">Wallet Address</h1>
              </div>

              {/* Table rows */}
              {tableData.length === 0 ? (
                <div className="py-8 text-center text-gray-400">
                  No delegates found for this event
                </div>
              ) : (
                tableData.map((row) => (
                  <React.Fragment key={row.id}>
                    {/* Desktop view - visible only on md and larger screens */}
                    <div className="hidden md:flex w-full border-b border-deep-blue py-3 pl-3">
                      <p className="w-1/6 text-deep-blue">{row.id}</p>
                      <p className="w-2/6 text-deep-blue overflow-hidden text-ellipsis">
                        {row.email}
                      </p>
                      <p className="w-3/6 text-deep-blue overflow-hidden text-ellipsis">
                        {row.walletAddress}
                      </p>
                    </div>

                    {/* Mobile view - visible only on smaller than md screens */}
                    <div className="md:hidden border-b border-deep-blue py-3">
                      <div className="flex py-1">
                        <h2 className="w-1/3 font-bold text-white">SN:</h2>
                        <p className="w-2/3 text-deep-blue">{row.id}</p>
                      </div>
                      <div className="flex py-1">
                        <h2 className="w-1/3 font-bold text-white">Email:</h2>
                        <p className="w-2/3 text-deep-blue break-all">{row.email}</p>
                      </div>
                      <div className="flex py-1">
                        <h2 className="w-1/3 font-bold text-white">Wallet:</h2>
                        <p className="w-2/3 text-deep-blue break-all">
                          {row.walletAddress}
                        </p>
                      </div>
                    </div>
                  </React.Fragment>
                ))
              )}
            </div>
          </div>
        )
      }
    </div>
  );
};

export default GrantOrganizerRole;