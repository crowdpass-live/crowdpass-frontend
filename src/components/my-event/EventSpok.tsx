import React from "react";

type Props = {};

const EventSpok = (props: Props) => {
  return (
    <div className="flex flex-col mt-6">
      <div className="flex justify-between items-center">
        <p className="raleway text-white text-xl font-semibold">SPOK</p>
        <p className="raleway text-white ">
          STATUS: <span className="italic">Minted</span>
        </p>
      </div>
      <img src="https://res.cloudinary.com/dnohqlmjc/image/upload/v1742633487/carousel2_qgonb8.png" alt="spok" className="w-full md:w-80 h-64" />
    </div>
  );
};

export default EventSpok;
