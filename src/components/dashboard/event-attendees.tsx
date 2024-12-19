"use client"

import React from 'react'

const EventAttendees = ({ darkText }: any) => {
    const image = "https://picsum.photos/200/300";

    const attendees = {
      data: [
        {
          image: `${image}?random=1`,
        },
        {
          image: `${image}?random=5`,
        },
        {
          image: `${image}?random=6`,
        },
      ],
      total: 100,
    }
    const displayedAttendees = attendees.data.slice(0, 3);
    const remainingAttendeesCount = Math.max(0, attendees.total - 3);
  
    return (
      <div>
        <div className="relative">
          {/* Attendee Pictures */}
          <div className="flex items-center -space-x-3">
            {displayedAttendees.map((attendee, index) => (
              <img
                width={8}
                height={8}
                className={`${darkText? "w-6 h-6":"w-6 h-6 mdl:w-8 mdl:h-8"} rounded-full overflow-hidden`}
                key={index}
                src={attendee.image}
                alt={`Attendee ${index + 1}`}
              />
            ))}
            {remainingAttendeesCount > 0 && (
              <div className="flex items-center">
                <div
                  style={{
                    background:
                      "linear-gradient(264deg, #C7FFD0 -48.37%, #35FF50 -48.35%, #5D35FF 171.28%",
                    backgroundSize: "100% 100%",
                  }}
                  className="h-8 rounded-full overflow-hidden flex justify-center items-center bg-gray-200"
                >
                  <p
                    className={`${
                      darkText ? "text-cardText" : "text-[#fff]"
                    } text-xs font-normal leading-none p-2`}
                  >
                    +{remainingAttendeesCount} 
                  </p>
                </div>
                {darkText && <p className="ml-2 text-neutral-600 font-normal leading-none">Attendees</p>}
              </div>
            )}
          </div>
        </div>
      </div>
    );
}

export default EventAttendees