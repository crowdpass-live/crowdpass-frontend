import dynamic from 'next/dynamic';
import axios from "axios";
import { Button } from "@/components/ui/button";
import React, { useState, useMemo } from "react";
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false
});

const EventBasic = ({ setActiveStep, eventData, setEventData }: any) => {
  const [localEventData, setLocalEventData] = useState({...eventData});
  
  const handleInputChange = (
    e: any
  ) => {
    const { name, value } = e.target;

    setLocalEventData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDescriptionChange = (content: string) => {
    setLocalEventData((prevData: any) => ({
      ...prevData,
      eventDescription: content,
    }));
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) { 
      setLocalEventData((prevData: any) => ({
        ...prevData,
        eventImage: file,
      }));
      
      try {
        const formData = new FormData();
        formData.append("file", file);
        const response = await axios.post(
          "https://api.pinata.cloud/pinning/pinFileToIPFS",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              pinata_api_key: process.env.NEXT_PUBLIC_API_KEY,
              pinata_secret_api_key: process.env.NEXT_PUBLIC_API_SECRET,
            },
          }
        );
        const cid = response.data.IpfsHash;
        
        setLocalEventData((prevData: any) => ({
          ...prevData,
          eventUri: `${cid}`,
        }));
      } catch (error) {
        console.error("Image upload error", error);
      }
    }
  };

  const isFormValid = useMemo(() => {
    return (
      localEventData.eventName?.trim() !== "" &&
      localEventData.eventOrganizer?.trim() !== "" &&
      localEventData.eventUri?.trim() !== "" &&
      localEventData.eventDescription?.trim() !== "" &&
      localEventData.eventImage !== null
    );
  }, [localEventData]);

  const handleNextClick = () => {
    setEventData(localEventData);
    setActiveStep(1);
  };

  return (
    <div className="w-full md:w-[655px] h-full overflow-y-auto flex flex-col gap-8">
      <div className="flex w-full h-32 md:h-[210px] bg-add-image justify-center items-center relative">
        {localEventData.eventImage ? (
          <img
            src={URL.createObjectURL(localEventData.eventImage)}
            alt="event-preview"
            className="w-full h-full object-cover md:rounded-lg"
          />
        ) : (
          <img
            src="https://res.cloudinary.com/dnohqlmjc/image/upload/v1742633488/add-icon-image_uv5rlg.png"
            alt="create-event"
            className="object-fill"
          />
        )}
        <input
          type="file"
          accept="image/*"
          className="absolute inset-0 w-full object-cover md:rounded-lg h-full opacity-0 cursor-pointer"
          onChange={handleImageChange}
        />
      </div>
      <div className="flex flex-col gap-4 w-full">
        <h1 className="raleway font-semibold text-xl text-white">Event Name</h1>
        <input
          type="text"
          name="eventName"
          id="eventName"
          className="w-full bg-transparent border-white/70 text-white/70 rounded-lg h-10 md:h-14"
          value={localEventData.eventName || ""}
          onChange={handleInputChange}
        />
      </div>
      <div className="flex flex-col md:flex-row gap-10 w-full">
        <div className="flex flex-col gap-4 w-full md:w-[50%]">
          <h1 className="raleway font-semibold text-xl text-white">
            Event Organizer
          </h1>
          <input
            type="text"
            name="eventOrganizer"
            id="eventOrganizer"
            className="w-full bg-transparent border-white/70 text-white/70 rounded-lg h-10 md:h-14"
            value={localEventData.eventOrganizer || ""}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex flex-col gap-4 w-full md:w-[50%]">
          <h1 className="raleway font-semibold text-xl text-white">
            Event Image URI
          </h1>
          <input
            type="text"
            readOnly
            name="eventUri"
            id="eventUri"
            className="w-full bg-transparent border-white/70 text-white/70 rounded-lg h-10 md:h-14"
            value={localEventData.eventUri || ""}
          />
        </div>
      </div>
      <div className="flex flex-col gap-4 w-full">
        <h1 className="raleway font-semibold text-xl text-white">
          Event Description
        </h1>
        <ReactQuill 
          theme="snow" 
          value={localEventData.eventDescription || ""}
          onChange={handleDescriptionChange}
          className="bg-transparent text-white/70"
        />
      </div>
      <div className="flex justify-end">
        <Button
          className="bg-primary raleway text-light-black hover:bg-primary hover:text-deep-blue px-10 py-5 md:py-7 text-xl mt-4 font-semibold"
          onClick={handleNextClick}
          disabled={!isFormValid}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default EventBasic;