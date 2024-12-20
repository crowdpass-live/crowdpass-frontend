import React from "react";
import { Card } from "../ui/card";


type Props = {
    icon: string
    title: string
    description: string
}

const FeaturesCard = ({ icon, title, description }: Props) => {
  return (
    <Card className="w-full md:w-[300px] lg:w-[400px] flex flex-col justify-center items-center border-deep-blue bg-deep-blue px-4 pb-4 rounded-2xl mb-16 ">
      <div className="bg-light-black p-6 -mt-14 rounded-full">
        <img src={icon} width={64} height={64} className="w-8 h-8 lg:w-16 lg:h-16" />
      </div>
      <h3 className="text-white font-semibold raleway mt-2">{title}</h3>
      <p className="text-white pt-3">{description}</p>
    </Card>
  );
};

export default FeaturesCard;