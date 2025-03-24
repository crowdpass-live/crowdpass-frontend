import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useGetAllEvents from "@/hooks/read-hooks/useGetAllEvents";
import useAddOrganizer from "@/hooks/write-hooks/useAddOrganizers";
import useRemoveOrganizer from "@/hooks/write-hooks/useRemoveOrganizer";
import React, { useState } from "react";

const GrantOrganizerRole = () => {
  const [delegateEmail, setDelegateEmail] = useState("");
  const [revokeEmail, setRevokeEmail] = useState("");
  const [id, setId] = useState(0);
  const handleDelegateRole = useAddOrganizer();
  const handleRevokeRole = useRemoveOrganizer();
  const { events } = useGetAllEvents();

  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(parseInt(e.target.value));
  };

  return (
    <div className="bg-[#14141A] rounded-xl w-full p-10 flex flex-col gap-3">
      <div className="flex flex-col gap-4">
        <div>
          <Select>
            <SelectTrigger className="w-60 text-white border-deep-blue">
              <SelectValue placeholder="Select Event to Delegate" />
            </SelectTrigger>
            <SelectContent className=" bg-light-black border-deep-blue text-white">
              {events.map((event) => (
                <SelectItem key={event.id} value={event.id}>
                  {event.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="border border-deep-blue p-6 rounded-lg">
          <div className="flex w-full gap-4 items-center">
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
            <img src="/assets/line-divider.png" alt="line-divider" />
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
          Delegates: <span className="text-white text-2xl">20</span>
        </h1>
        <div className="border border-deep-blue p-6 rounded-lg">
          <div className="w-full border-b border-deep-blue pb-3 flex pl-3">
            <h1 className="w-1/6 font-bold text-white">SN</h1>
            <h1 className="w-2/6 font-bold text-white">Email</h1>
            <h1 className="w-3/6 font-bold text-white">Wallet Address</h1>
          </div>
          <div className="w-full border-b border-deep-blue py-3 flex pl-3">
            <p className="w-1/6 text-deep-blue ">1</p>
            <p className="w-2/6 text-deep-blue ">sogobanwo@gmail.com</p>
            <p className="w-3/6 text-deep-blue ">
              0x045ERM4989756553795783NMDSLO3900049CAB
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GrantOrganizerRole;
