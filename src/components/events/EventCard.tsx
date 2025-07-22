import { epochToDatetime } from "datetime-epoch-conversion";
import Link from "next/link";
import React from "react";
import { Card } from "../ui/card";
import { Calendar, Clock, ArrowRight, Users, MapPin } from "lucide-react";

const EventCard = ({ eachEvent }: any) => {
  const {
    id,
    name,
    start_date,
    description,
    ticket_price,
    image,
    location,
    attendees_count = 0,
  } = eachEvent;
  
  const response = epochToDatetime(`${start_date}`);
  const isUpcoming = new Date(Number(start_date) * 1000) > new Date();
  const isFree = Number(ticket_price) === 0;

  function convertTime(time: string) {
    let hours = time.substring(0, 2);
    let minutes = time.substring(3, 5);
    let ampm = parseInt(hours) >= 12 ? "PM" : "AM";

    if (parseInt(hours) > 12) {
      hours = (parseInt(hours) - 12).toString();
    } else if (parseInt(hours) == 0) {
      hours = "12";
    }

    return hours + ":" + minutes + " " + ampm;
  }

  // Clean up description HTML for preview
  const getDescriptionPreview = (html: string) => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    const text = tempDiv.textContent || tempDiv.innerText || '';
    return text.length > 48 ? text.substring(0, 48) + '...' : text;
  };

  return (
    <Card className="bg-deep-blue rounded-xl w-full h-full flex flex-col flex-grow border-0 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1 group overflow-hidden">
      <div className="relative">
        <img
          src={image}
          alt={`${name} event`}
          className="w-full h-[200px] object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Price Badge */}
        <div className="absolute top-3 right-3">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
            isFree 
              ? "bg-green-500/90 text-white backdrop-blur-sm" 
              : "bg-primary/90 text-black backdrop-blur-sm"
          }`}>
            {isFree ? "FREE" : `${Number(ticket_price)} STRK`}
          </span>
        </div>

        {/* Status Badge */}
        {!isUpcoming && (
          <div className="absolute top-3 left-3">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-500/90 text-white backdrop-blur-sm">
              Past Event
            </span>
          </div>
        )}
      </div>

      <div className="p-4 space-y-3 flex flex-col flex-grow">
        {/* Date and Time */}
        <div className="flex items-center gap-2 text-gray-300">
          <Calendar size={16} className="text-primary" />
          <span className="text-sm">
            {response.day} {response.month}, {response.year}
          </span>
          <Clock size={14} className="text-primary ml-2" />
          <span className="text-sm">
            {convertTime(response.time)}
          </span>
        </div>

        {/* Event Title */}
        <h3 className="text-lg font-semibold text-white line-clamp-2 group-hover:text-primary transition-colors duration-200">
          {name.length > 30 ? `${name.substring(0, 30)}...` : name}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-300 line-clamp-2 leading-relaxed">
          {typeof window !== 'undefined' ? getDescriptionPreview(description) : description.replace(/<[^>]*>/g, '').substring(0, 120)}
        </p>

        {/* Event Stats */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-4 text-xs text-gray-400">
            {attendees_count > 0 && (
              <div className="flex items-center gap-1">
                <Users size={14} />
                <span>{attendees_count} registered</span>
              </div>
            )}
            {location && (
              <div className="flex items-center gap-1">
                <MapPin size={14} />
                <span className="truncate max-w-20">{location}</span>
              </div>
            )}
          </div>

          {/* View Details Link */}
          <Link
            href={`/events/${id}`}
            className="flex items-center gap-1 text-white hover:text-primary transition-colors duration-200 text-sm font-medium group/link"
          >
            <span>View Details</span>
            <ArrowRight 
              size={16} 
              className="transition-transform duration-200 group-hover/link:translate-x-1" 
            />
          </Link>
        </div>

        {/* Action Hint */}
        <div className="pt-2 border-t border-gray-700/50">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400">
              {isUpcoming ? "Registration available" : "Event completed"}
            </span>
            {isUpcoming && (
              <Link
                href={`/events/${id}`}
                className="bg-primary/10 hover:bg-primary/20 text-primary px-3 py-1 rounded-lg text-xs font-medium transition-colors duration-200 border border-primary/20"
              >
                {isFree ? "Register Free" : "Get Ticket"}
              </Link>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default EventCard;