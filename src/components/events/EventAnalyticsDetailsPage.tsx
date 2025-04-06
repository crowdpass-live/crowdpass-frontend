"use client";

import React, { useState, useEffect } from "react";
import EditableAnalyticsEventDetails from "./EditableAnalyticsEventDetails";
import EditableEventDetailsBody from "./EditableEventDetailsBody";


const EventAnalyticsDetailsPage = ({ eventDetails, id }: any) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedEvent, setEditedEvent] = useState({
    name: '',
    description: '',
    image: '',
    organizer_name: '',
    event_type: '',
    event_category: '',
    location: '',
    schedule: [],
    ticket_price: 0,
    total_tickets: 0,
    acronym: '',
    start_date: 0,
    end_date: BigInt(0)
  });

  useEffect(() => {
    if (eventDetails?.event) {
      const { event } = eventDetails;
      setEditedEvent({
        name: event.name || '',
        description: event.description || '',
        image: event.image || '',
        organizer_name: event.organizer_name || '',
        event_type: event.event_type || '',
        event_category: event.event_category || '',
        location: event.location || '',
        schedule: event.schedule || [],
        ticket_price: Number(event.ticket_price) || 0,
        total_tickets: Number(event.total_tickets) || 0,
        acronym: event.acronym || '',
        start_date: Number(event.start_date) || 0,
        end_date: BigInt(event.end_date || 0)
      });
    }
  }, [eventDetails]);

  const handleInputChange = (field: any, value: any) => {
    setEditedEvent(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <>
      <EditableAnalyticsEventDetails
        eventDetails={eventDetails}
        id={Number(id)}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        editedEvent={editedEvent}
        handleInputChange={handleInputChange}
      />
      <EditableEventDetailsBody
        eventDetails={eventDetails}
        isEditing={isEditing}
        editedEvent={editedEvent}
        onInputChange={handleInputChange}
      />
    </>
  );
};

export default EventAnalyticsDetailsPage;