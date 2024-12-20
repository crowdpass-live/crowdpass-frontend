import { epochToDatetime } from "datetime-epoch-conversion";
import React from "react";

const EventScheduleItem = ({
  scheduleItem,
}: {
  scheduleItem: { time: string; title: string; description: string };
}) => {
  const { time, title, description } = scheduleItem;
  const response = epochToDatetime(`${time}`);

  return (
    <div className="border-b-2 border-[#f5f5f5] flex gap-10 justify-start m-1 pb-3">
      <h1 className="font-semibold text-white"> {response.time}</h1>
      <div className="flex flex-col gap-3">
        <h1 className="font-semibold text-white">{title}</h1>
        <p className="text-white text-sm">{description}</p>
      </div>
    </div>
  );
};

export default EventScheduleItem;
