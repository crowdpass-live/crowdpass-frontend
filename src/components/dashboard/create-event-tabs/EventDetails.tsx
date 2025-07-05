import { Button } from "@/components/ui/button";
import React, { useState, useMemo } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

const EventDetails = ({ setActiveStep, eventData, setEventData }: any) => {
  const googleApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY;

  const [localEventData, setLocalEventData] = useState({ ...eventData });
  const [selectedPlace, setSelectedPlace] = useState(null);

  const categories = [
    "Sports",
    "Festivals",
    "Gaming",
    "Wellness",
    "Exhibition",
    "Travels",
    "Family",
    "Fundraisers",
    "Concerts",
    "Climate",
    "Theatre",
    "Technology",
    "Webinars",
    "Corporate",
    "Networking",
    "Education",
  ];
  const eventTypes = ["Online", "Offline"];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    
    setLocalEventData((prevData: any) => ({ 
      ...prevData, 
      [name]: value 
    }));
  };

  const handlePlaceSelect = (place: any) => {
    if (!place) return;
    
    setSelectedPlace(place);
    
    // Fetch coordinates for the selected place
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${place.label}&key=${googleApiKey}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.results && data.results.length > 0) {
          const { lat, lng } = data.results[0].geometry.location;
          setLocalEventData((prevData: any) => ({
            ...prevData,
            eventLocation: place.label,
            eventCoordinates: { latitude: lat, longitude: lng }
          }));
        } else {
          console.error(
            "Unable to retrieve coordinates for the selected place."
          );
          // Still set the location name even if coordinates fail
          setLocalEventData((prevData: any) => ({
            ...prevData,
            eventLocation: place.label
          }));
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLocalEventData((prevData: any) => ({
          ...prevData,
          eventLocation: place.label
        }));
      });
  };

  const isFormValid = useMemo(() => {
    return (
      localEventData.eventLocation?.trim() !== "" &&
      localEventData.eventCategory?.trim() !== "" &&
      localEventData.eventType?.trim() !== "" &&
      localEventData.eventStartDate?.trim() !== "" &&
      localEventData.eventEndDate?.trim() !== ""
    );
  }, [localEventData]);

  const handleNextClick = () => {
    setEventData(localEventData);
    setActiveStep(2);
  };

  const handlePreviousClick = () => {
    setEventData(localEventData);
    setActiveStep(0);
  };

  return (
    <div className="w-[655px] h-full overflow-y-auto flex flex-col gap-8">
      <div className="flex flex-col gap-4 w-full">
        <h1 className="raleway font-semibold text-xl text-white">Event Location</h1>
        <div className="w-full">
          <GooglePlacesAutocomplete
            apiKey={googleApiKey}
            autocompletionRequest={{
              types: ['establishment', 'geocode']
            }}
            selectProps={{
              classNamePrefix: "react-select",
              value: selectedPlace,
              onChange: handlePlaceSelect,
              placeholder: "Search for a location...",
              styles: {
                control: (provided: any, state: any) => ({
                  ...provided,
                  backgroundColor: "transparent",
                  borderRadius: "8px",
                  border: "1px solid rgba(255, 255, 255, 0.7)",
                  boxShadow: "none",
                  padding: "5px",
                  fontSize: "14px",
                  minHeight: "40px",
                  color: "rgba(255, 255, 255, 0.7)",
                  "&:hover": {
                    borderColor: "rgba(255, 255, 255, 0.7)",
                  },
                }),
                placeholder: (provided: any) => ({
                  ...provided,
                  color: "rgba(255, 255, 255, 0.5)",
                }),
                singleValue: (provided: any) => ({
                  ...provided,
                  color: "rgba(255, 255, 255, 0.7)",
                }),
                input: (provided: any) => ({
                  ...provided,
                  color: "rgba(255, 255, 255, 0.7)",
                }),
                menu: (provided: any) => ({
                  ...provided,
                  backgroundColor: "#1a1a1a",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                }),
                option: (provided: any, state: { isSelected: any; isFocused: any; }) => ({
                  ...provided,
                  backgroundColor: state.isSelected 
                    ? "rgba(255, 255, 255, 0.1)" 
                    : state.isFocused 
                    ? "rgba(255, 255, 255, 0.05)" 
                    : "transparent",
                  color: "rgba(255, 255, 255, 0.8)",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                  },
                }),
                dropdownIndicator: (provided: any) => ({
                  ...provided,
                  color: "rgba(255, 255, 255, 0.5)",
                }),
                indicatorSeparator: (provided: any) => ({
                  ...provided,
                  backgroundColor: "rgba(255, 255, 255, 0.3)",
                }),
              },
            }}
          />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-10 w-full">
        <div className="flex flex-col gap-4 w-full md:w-[50%] text-white/70">
          <h1 className="raleway font-semibold text-xl text-white">Event Category</h1>
          <select
            name="eventCategory"
            id="eventCategory"
            className="w-full bg-transparent border-white/70 text-white/70 rounded-lg h-10 md:h-14"
            value={localEventData.eventCategory || ""}
            onChange={handleInputChange}
          >
            <option value="" disabled>Select Category</option>
            {categories.map((category) => (
              <option key={category} value={category} className="text-[#B0B0B4] m-2">
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-4 w-full md:w-[50%]">
          <h1 className="raleway font-semibold text-xl text-white">Event Type</h1>
          <select
            name="eventType"
            id="eventType"
            className="w-full bg-transparent border-white/70 text-white/70 rounded-lg h-10 md:h-14"
            value={localEventData.eventType || ""}
            onChange={handleInputChange}
          >
            <option value="" disabled>Select Type</option>
            {eventTypes.map((eventType) => (
              <option key={eventType} value={eventType} className="text-[#B0B0B4] m-2">
                {eventType}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-10 w-full">
        <div className="flex flex-col gap-4 w-full md:w-[50%]">
          <h1 className="raleway font-semibold text-xl text-white">Start Date and Time</h1>
          <input
            type="datetime-local"
            name="eventStartDate"
            id="eventStartDate"
            className="w-full bg-transparent border-white/70 text-white/70 rounded-lg h-10 md:h-14"
            value={localEventData.eventStartDate || ""}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex flex-col gap-4 w-full md:w-[50%]">
          <h1 className="raleway font-semibold text-xl text-white">End Date and Time</h1>
          <input
            type="datetime-local"
            name="eventEndDate"
            id="eventEndDate"
            className="w-full bg-transparent border-white/70 text-white/70 rounded-lg h-10 md:h-14"
            value={localEventData.eventEndDate || ""}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="flex justify-end gap-5">
        <Button
          className="bg-primary raleway text-light-black hover:bg-primary hover:text-deep-blue px-10 py-7 text-xl mt-4 font-semibold"
          onClick={handlePreviousClick}
        >
          Previous
        </Button>
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

export default EventDetails;