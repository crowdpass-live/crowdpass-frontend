import React, { ReactElement } from "react";
import { Card } from "../ui/card";


type Props = {
    icon: ReactElement
    title: string
    description: string
}

const FeaturesCard = ({ icon, title, description }: Props) => {
  return (
    <Card className="w-full md:w-[300px] lg:w-[400px] flex flex-col justify-center items-center border-deep-blue bg-deep-blue px-4 pb-8 rounded-2xl mb-16 shadow-xl">
      <div className="bg-light-black p-4 -mt-14 rounded-full">
        {icon}
      </div>
      <h3 className="text-white font-semibold raleway mt-2">{title}</h3>
      <p className="text-white text-center pt-3">{description}</p>
    </Card>
  );
};

export default FeaturesCard;