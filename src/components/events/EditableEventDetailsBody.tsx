import { MapPin, Edit2 } from "lucide-react";
import Image from "next/image";
import React, { useState, useEffect } from "react";

const EditableEventDetailsBody = ({ eventDetails, isEditing, editedEvent, onInputChange }: any) => {
  const { event } = eventDetails;

  return (
    <>
      <hr className="text-white " />
      <h1 className="raleway text-2xl md:text-4xl text-white font-semibold my-4">
        Description
      </h1>
      <hr className="text-white" />
      <div className="flex flex-col md:flex-row gap-10">
        {isEditing ? (
          <div className="my-6 md:basis-4/6">
            <textarea
              value={editedEvent.description}
              onChange={(e) => onInputChange('description', e.target.value)}
              className="bg-[#1E1E1E] border border-deep-blue rounded-md px-4 py-3 text-white w-full min-h-[200px]"
              placeholder="Event description"
            />
          </div>
        ) : (
          <div
            className="prose prose-invert max-w-full text-white my-6 md:basis-4/6 relative group"
          >
            <div dangerouslySetInnerHTML={{ __html: event?.description }} />
            {isEditing && (
              <button className="absolute top-2 right-2 text-primary hover:text-white transition-colors bg-[#14141A] p-1 rounded-full">
                <Edit2 size={16} />
              </button>
            )}
          </div>
        )}
        
        <div className="flex flex-col my-6 md:basis-2/6">
          <Image
            src={"https://res.cloudinary.com/dnohqlmjc/image/upload/v1742633489/MapImage_jgeu3d.png"}
            alt="map"
            objectFit="fill"
            width={450}
            height={250}
            className="w-full"
          />
          <div className="bg-[#42424033] font-semibold rounded-md p-2 my-4 flex items-center justify-start text-white gap-4 w-full relative">
            <div className="bg-[#14141A] p-2 rounded-xl">
              <MapPin size={30} color="#FF6932" />
            </div>
            {isEditing ? (
              <input
                type="text"
                value={editedEvent.location}
                onChange={(e) => onInputChange('location', e.target.value)}
                className="bg-[#1E1E1E] border border-deep-blue rounded-md px-2 py-1 text-white flex-1"
                placeholder="Event location"
              />
            ) : (
              <div className="flex-1">
                {event?.attributes[3].value || "Location not specified"}
                {isEditing && (
                  <button className="absolute top-2 right-2 text-primary hover:text-white transition-colors">
                    <Edit2 size={16} />
                  </button>
                )}
              </div>
            )}
          </div>
          
          {isEditing && (
            <div className="mt-4">
              <h3 className="text-white mb-2">Additional Event Details</h3>
              <div className="space-y-3">
                <div>
                  <label className="text-white text-sm">Organizer Name</label>
                  <input
                    type="text"
                    value={editedEvent.organizer_name}
                    onChange={(e) => onInputChange('organizer_name', e.target.value)}
                    className="bg-[#1E1E1E] border border-deep-blue rounded-md px-2 py-1 text-white w-full"
                  />
                </div>
                <div>
                  <label className="text-white text-sm">Event Type</label>
                  <input
                    type="text"
                    value={editedEvent.event_type}
                    onChange={(e) => onInputChange('event_type', e.target.value)}
                    className="bg-[#1E1E1E] border border-deep-blue rounded-md px-2 py-1 text-white w-full"
                  />
                </div>
                <div>
                  <label className="text-white text-sm">Event Category</label>
                  <input
                    type="text"
                    value={editedEvent.event_category}
                    onChange={(e) => onInputChange('event_category', e.target.value)}
                    className="bg-[#1E1E1E] border border-deep-blue rounded-md px-2 py-1 text-white w-full"
                  />
                </div>
                <div>
                  <label className="text-white text-sm">Ticket Price</label>
                  <input
                    type="number"
                    value={editedEvent.ticket_price}
                    onChange={(e) => onInputChange('ticket_price', Number(e.target.value))}
                    className="bg-[#1E1E1E] border border-deep-blue rounded-md px-2 py-1 text-white w-full"
                  />
                </div>
                <div>
                  <label className="text-white text-sm">Total Tickets</label>
                  <input
                    type="number"
                    value={editedEvent.total_tickets}
                    onChange={(e) => onInputChange('total_tickets', Number(e.target.value))}
                    className="bg-[#1E1E1E] border border-deep-blue rounded-md px-2 py-1 text-white w-full"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default EditableEventDetailsBody;