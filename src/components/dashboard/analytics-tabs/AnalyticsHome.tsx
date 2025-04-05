import { StarknetContext } from "@/contexts/UserContext";
import useGetAllEvents from "@/hooks/read-hooks/useGetAllEvents";
import React, { useContext } from "react";
import { FaSquare } from "react-icons/fa6";
import { IoIosPeople } from "react-icons/io";
import { MdCelebration } from "react-icons/md";
import { TbMessageCircleUser } from "react-icons/tb";
import HashLoader from "react-spinners/HashLoader";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Label } from 'recharts';
import { num } from "starknet";

const COLORS = ["#B0B0B4", "#5B5959"];

type Props = {};

const AnalyticsHome = (props: Props) => {
  const { address } = useContext(StarknetContext);
  const { events, isLoading } = useGetAllEvents();

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

  const paidEvents = myEvents.filter((event) => event.ticket_price > 0);
  const freeEvents = myEvents.filter((event) => event.ticket_price === 0);

  const totalRevenue = paidEvents.reduce((sum, event) => {
    const price = Number(event.ticket_price) || 0;
    const ticketsSold = Number(event.total_tickets) - Number(event.tickets_left) || 0;
    return sum + (price * ticketsSold);
  }, 0);

  const totalTicketsSold = paidEvents.reduce((sum, event) => {
    return sum + (Number(event.total_tickets) - Number(event.tickets_left) || 0);
  }, 0);

  const averageTicketPrice = paidEvents.length > 0 
    ? totalRevenue / totalTicketsSold 
    : 0;

  // Pie chart data
  const pieData = [
    { name: "Paid Events", value: paidEvents.length },
    { name: "Free Events", value: freeEvents.length },
  ];

  // Custom tooltip content
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#14141A] p-2 rounded shadow text-white">
          <p>{`${payload[0].name}: ${payload[0].value}`}</p>
          <p>{`Percentage: ${((payload[0].value / myEvents.length) * 100).toFixed(1)}%`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      {isLoading && (
        <div className="fixed inset-0 z-50 flex flex-col gap-10 items-center justify-center bg-black bg-opacity-50">
          <HashLoader
            color={"#FF6932"}
            loading={isLoading}
            size={100}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
          <div className="text-white text-2xl">
            Fetching Event Analytics...
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-[#14141A] rounded-xl col-span-1 md:col-span-2 p-4">
          <h1 className="text-base xl:text-2xl text-white font-semibold raleway">Daily Ticket Count</h1>
          <div className="bg-[#5B5959] h-3 rounded-3xl w-full mt-2">
            <div className="bg-primary h-full rounded-3xl w-[0%]"></div>
          </div>
          <div className="flex justify-between items-center mt-2">
            <p className="text-white text-sm font-thin">Sold: {totalTicketsSold} Tickets</p>
            <p className="text-white text-sm font-thin">Revenue: ${totalRevenue.toFixed(2)}</p>
            <p className="text-white text-sm font-thin">{paidEvents.reduce((sum, event) => sum + Number(event.tickets_left), 0)} left</p>
          </div>
        </div>
        <div className="bg-[#14141A] rounded-xl p-4 flex flex-col justify-between">
          <div className="flex justify-between items-center">
            <p className="text-white text-sm font-thin">Free: {freeEvents.length}</p>
            <p className="text-white text-sm font-thin">Paid: {paidEvents.length}</p>
          </div>
          <div className="flex flex-col justify-center items-center">
            <p className="text-white text-sm font-thin">Events</p>
            <h1 className="text-3xl text-white font-semibold">{myEvents.length}</h1>
          </div>
        </div>
        <div className="bg-[#14141A] rounded-xl p-4 flex flex-col items-center justify-center">
          <p className="text-sm text-white/80">Ticket Revenue</p>
          <h1 className="text-3xl text-white font-semibold">${totalRevenue.toFixed(2)}</h1>
        </div>
        <div className="bg-[#14141A] rounded-xl p-4 flex flex-col items-center justify-center">
          <p className="text-sm text-white/80">Total Attendees</p>
          <h1 className="text-3xl text-white font-semibold">{myEvents.reduce((sum, event) => sum + (Number(event.total_tickets) - Number(event.tickets_left)), 0) || 0}</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-[#14141A] rounded-xl col-span-1 md:col-span-3 p-4">
          <h1 className="text-white text-2xl raleway font-medium mb-4">Sales Analytics</h1>
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <p className="text-white text-base">Total Revenue</p>
              <p className="text-white text-base font-semibold">${totalRevenue.toFixed(2)}</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-white text-base">Tickets Sold</p>
              <p className="text-white text-base font-semibold">{totalTicketsSold}</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-white text-base">Average Ticket Price</p>
              <p className="text-white text-base font-semibold">${averageTicketPrice.toFixed(2)}</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-white text-base">Paid Events</p>
              <p className="text-white text-base font-semibold">{paidEvents.length}</p>
            </div>
            <div className="bg-[#5B5959] h-3 rounded-3xl w-full mt-2">
              <div 
                className="bg-primary h-full rounded-3xl" 
                style={{ width: `${(totalTicketsSold / myEvents.reduce((sum, event) => sum + Number(event.total_tickets), 0)) * 100 || 0}%` }}
              ></div>
            </div>
            <p className="text-white text-sm font-thin">
              Sales Progress: {totalTicketsSold} / {myEvents.reduce((sum, event) => sum + Number(event.total_tickets), 0)} tickets sold
            </p>
          </div>
        </div>
        <div className="bg-[#14141A] rounded-xl col-span-1 md:col-span-2 p-4 flex flex-col justify-start gap-10">
          <h1 className="text-white text-3xl raleway font-medium">Event Stats</h1>
          <div className="flex justify-center">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  labelLine={true}
                >
                  {pieData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={COLORS[index % COLORS.length]} 
                    />
                  ))}
                  <Label
                    value={`${myEvents.length} Total`}
                    position="center"
                    fill="#ffffff"
                    style={{
                      fontSize: "20px",
                      fontWeight: "bold",
                    }}
                  />
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-[#14141A] rounded-xl col-span-1 md:col-span-3 p-4 flex flex-col gap-4">
          <div className="flex gap-4 items-center">
            <h1 className="text-white text-2xl raleway font-medium">SPOK History</h1>
            <div className="flex justify-center items-center p-2 border border-white border-dashed rounded-full mb-1">
              <MdCelebration size={16} color="#ffffff" />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex gap-4 items-center">
                <FaSquare size={16} color="#FF642" />
                <p className="text-white text-sm font-thin">Available: 0</p>
              </div>
              <div className="bg-[#5B5959] h-4 rounded-3xl flex-1">
                <div className="bg-primary h-full rounded-3xl w-[0%]"></div>
              </div>
            </div>
            <div className="flex items-center justify-between gap-4">
              <div className="flex gap-4 items-center">
                <FaSquare size={16} color="#FFFFFF" />
                <p className="text-white text-sm font-thin">Minted: 0</p>
              </div>
              <div className="bg-[#5B5959] h-4 rounded-3xl flex-1">
                <div className="bg-white h-full rounded-3xl w-[0%]"></div>
              </div>
            </div>
            <div className="flex items-center justify-between gap-4">
              <div className="flex gap-4 items-center">
                <FaSquare size={16} color="#5B5959" />
                <p className="text-white text-sm font-thin">Total: 0</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-[#14141A] rounded-xl p-4 flex flex-col items-center justify-center">
          <div className="flex justify-center items-center p-3 border border-white border-dashed rounded-full mb-1">
            <IoIosPeople size={30} color="#ffffff" />
          </div>
          <p className="text-sm text-white/80">Delegates</p>
          <h1 className="text-white text-3xl">0</h1>
        </div>
        <div className="bg-[#14141A] rounded-xl p-4 flex flex-col items-center justify-center">
          <div className="flex justify-center items-center p-3 border border-white border-dashed rounded-full mb-1">
            <TbMessageCircleUser size={30} color="#ffffff" />
          </div>
          <p className="text-sm text-white/80">Feedbacks</p>
          <h1 className="text-white text-3xl">0</h1>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsHome;