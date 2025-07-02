import { Button } from "@/components/ui/button";
import useGetAvailableTicket from "@/hooks/read-hooks/useGetAvailableTicket";
import useCancelEvent from "@/hooks/write-hooks/useCancelEvent";
import { epochToDatetime } from "datetime-epoch-conversion";
import { Calendar } from "lucide-react";
import Image from "next/image";
import React from "react";

type Props = {};

const AnalyticsEventDetails = ({ eventDetails, id }: any) => {
  const { data: availableTicket } = useGetAvailableTicket(id);

  const { event }: any = eventDetails;

  const response = epochToDatetime(`${Number(event?.start_date)}`);

  const handleCancelEvent = useCancelEvent();

  function convertTime(time: string) {
    let hours = time.substring(0, 2);
    let minutes = time.substring(3, 5);
    let ampm = parseInt(hours) >= 12 ? "PM" : "AM";

    if (parseInt(hours) > 12) {
      hours = (parseInt(hours) - 12).toString();
    } else if (parseInt(hours) == 0) {
      hours = "12";
    }

    return hours + ":" + minutes + " " + ampm;
  }
  const attendeeImages = [
    "https://res.cloudinary.com/dnohqlmjc/image/upload/v1742633488/attendee1_hvftrx.png",
    "https://res.cloudinary.com/dnohqlmjc/image/upload/v1742633488/attendee2_fuynig.png",
    "https://res.cloudinary.com/dnohqlmjc/image/upload/v1742633488/attendee3_pwpu24.png",
    "https://res.cloudinary.com/dnohqlmjc/image/upload/v1742633487/attendee5_b81v8c.png",
    "https://res.cloudinary.com/dnohqlmjc/image/upload/v1742633487/attendee4_swblfx.png",
  ];

  const totalEventTicket =
    Number(event?.total_tickets) - Number(availableTicket) || 0;

  const displayCount = Math.min(totalEventTicket, 5);
  const remaining = totalEventTicket - 5;

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <Image
        src={event?.image}
        alt="event-image"
        width={240}
        height={240}
        className="rounded-3xl w-full md:w-96 object-center object-cover"
      />
      <div className="flex flex-col gap-4 lg:w-full lg:gap-3">
        <div>
          <p className="text-primary">
            {Number(event?.ticket_price) > 0 ? "PAID" : "FREE"}
          </p>
          <h1 className="raleway text-xl text-white font-semibold">
            {event?.name}
          </h1>
        </div>
        <div className="bg-[#CBCACF66] w-60 md:w-80 flex gap-2 rounded-lg py-2 px-3">
          <div className="bg-[#14141A] p-2 rounded-xl">
            <Calendar size={20} color="#FF6932" />
          </div>
          <div className="flex flex-col ">
            <p className="text-white">
              {response.day} {response.month}, {response.year}
            </p>
            <p className="text-white text-sm">{convertTime(response.time)}</p>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-4">
            {totalEventTicket === 0 ? (
              <div className="flex items-center">
                <p className="text-gray-400 italic">
                  No participant has registered yet
                </p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-center">
                  {attendeeImages.slice(0, displayCount).map((src, idx) => (
                    <Image
                      key={idx}
                      src={src}
                      alt={`attendee${idx + 1}`}
                      width={50}
                      height={50}
                      className={`${
                        idx !== 0 ? "-ml-3" : ""
                      } w-8 h-8 md:w-[50px] md:h-[50px]`}
                    />
                  ))}

                  {totalEventTicket > 5 && (
                    <p className="text-primary flex justify-center items-center text-sm p-2 bg-white rounded-full -ml-3 border-2 border-primary">
                      {remaining}+
                    </p>
                  )}
                </div>
                <div className="flex flex-col">
                  <p className="font-semibold text-white">Participant</p>
                  <p className="font-medium text-sm text-white">
                    Across the globe
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="flex gap-4">
        <Button className="bg-primary raleway text-light-black hover:border-deep-blue hover:bg-transparent hover:text-deep-blue">
          Edit Event
        </Button>
        <Button
          className="bg-primary raleway text-light-black hover:border-deep-blue hover:bg-transparent hover:text-deep-blue"
          onClick={async () => await handleCancelEvent(id)}
        >
          Cancel Event
        </Button>
      </div>
    </div>
  );
};

export default AnalyticsEventDetails;
