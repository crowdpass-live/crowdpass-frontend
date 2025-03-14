import axios from "axios";
import { Button } from "@/components/ui/button";
import React, { useState, useMemo, useEffect } from "react";


const EventBasic = ({ setActiveStep, eventData, setEventData }: any) => {
  const [localEventData, setLocalEventData] = useState({...eventData});
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);
  const imageBaseUrl = 
  (process.env.NEXT_PUBLIC_BASE_IMG_URL as string) || "";
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    
    // Update local state immediately for responsive UI
    setLocalEventData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
    
    // Clear any existing timeout
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }
    
    // Set a new timeout to update parent state after 500ms of no typing
    const timeout = setTimeout(() => {
      setEventData((prevData: any) => ({
        ...prevData,
        [name]: value,
      }));
    }, 2000);
    
    setTypingTimeout(timeout);
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) { 
      // Update local state immediately
      setLocalEventData((prevData: any) => ({
        ...prevData,
        eventImage: file,
      }));
      
      // Update parent state immediately for images
      setEventData((prevData: any) => ({
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
        console.log(response.data)
        const cid = response.data.IpfsHash;
        
        // Update both local and parent state with the URI
        setLocalEventData((prevData: any) => ({
          ...prevData,
          eventUri: `${imageBaseUrl}${cid}`,
        }));
        
        setEventData((prevData: any) => ({
          ...prevData,
          eventUri: `${imageBaseUrl}${cid}`,
        }));
      } catch (error) {
        // Handle error (could add toast notification here)
      }
    }
  };

  // Keep local state in sync with parent state for external changes
  useEffect(() => {
    setLocalEventData(eventData);
  }, [eventData]);

  const isFormValid = useMemo(() => {
    return (
      localEventData.eventName.trim() !== "" &&
      localEventData.eventOrganizer.trim() !== "" &&
      localEventData.eventUri.trim() !== "" &&
      localEventData.eventDescription.trim() !== "" &&
      localEventData.eventImage !== null
    );
  }, [localEventData]);

  const handleNextClick = () => {
    // Ensure parent state is fully updated before proceeding
    setEventData(localEventData);
    setActiveStep(1);
  };

  return (
    <div className=" w-full md:w-[655px] h-full flex flex-col gap-8">
      <div className="flex w-full h-[210px] bg-add-image justify-center items-center relative">
        {localEventData.eventImage ? (
          <img
            src={URL.createObjectURL(localEventData.eventImage)}
            alt="event-preview"
            className="w-full h-full object-cover rounded-lg"
          />
        ) : (
          <img
            src="/assets/add-icon-image.png"
            alt="create-event"
            className="object-fill"
          />
        )}
        <input
          type="file"
          accept="image/*"
          className="absolute inset-0 w-full object-cover rounded-lg h-full opacity-0 cursor-pointer"
          onChange={handleImageChange}
        />
      </div>
      <div className="flex flex-col gap-4 w-full">
        <h1 className="raleway font-semibold text-xl text-white">Event Name</h1>
        <input
          type="text"
          name="eventName"
          id="eventName"
          className="w-full bg-transparent border-white/70 text-white/70 rounded-lg h-14"
          value={localEventData.eventName}
          onChange={handleInputChange}
        />
      </div>
      <div className="flex flex-col md:flex-row gap-10 w-full">
        <div className="flex flex-col gap-4 md:w-[50%]">
          <h1 className="raleway font-semibold text-xl text-white">
            Event Organizer
          </h1>
          <input
            type="text"
            name="eventOrganizer"
            id="eventOrganizer"
            className="w-full bg-transparent border-white/70 text-white/70 rounded-lg h-14"
            value={localEventData.eventOrganizer}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex flex-col gap-4 md:w-[50%]">
          <h1 className="raleway font-semibold text-xl text-white">
            Event Image URI
          </h1>
          <input
            type="text"
            readOnly
            name="eventUri"
            id="eventUri"
            className="w-full bg-transparent border-white/70 text-white/70 rounded-lg h-14"
            value={localEventData.eventUri}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="flex flex-col gap-4 w-full">
        <h1 className="raleway font-semibold text-xl text-white">
          Event Description
        </h1>
        <textarea
          name="eventDescription"
          id="eventDescription"
          className="w-full bg-transparent border-white/70 text-white/70 rounded-lg h-28"
          value={localEventData.eventDescription}
          onChange={handleInputChange}
        />
      </div>
      <div className="flex justify-end">
        <Button
          className="bg-primary raleway text-light-black hover:bg-primary hover:text-deep-blue px-10 py-7 text-xl mt-4 font-semibold"
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