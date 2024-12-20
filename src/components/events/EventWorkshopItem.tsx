import React from "react";

const EventWorkshopItem = ({
  workshopItem,
  itemNo,
}: {
  workshopItem: { name: string; description: string };
  itemNo: any;
}) => {
  const { name, description } = workshopItem;

  return (
    <div className="flex gap-10 justify-start m-3 pb-3">
      <div>
        <h1 className="font-semibold text-white p-4 border-4 border-white rounded-full">
          {itemNo + 1}
        </h1>
      </div>
      <div className="flex flex-col gap-3">
        <h1 className="font-semibold text-white">{name}</h1>
        <p className="text-white text-sm">{description}</p>
      </div>
    </div>
  );
};

export default EventWorkshopItem;
