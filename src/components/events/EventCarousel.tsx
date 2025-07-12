"use client";
import React, { useState, useEffect } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import useGetAllEvents from "@/hooks/read-hooks/useGetAllEvents";
import HashLoader from "react-spinners/HashLoader";
import { BsFillArrowUpRightCircleFill } from "react-icons/bs";

const EventCarousel = () => {
  const { events, isLoading } = useGetAllEvents();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 1.5,
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    dots: true,
    activeDot: true,
    dotsClass: "slick-dots slick-thumb",
    customPaging: function(i: any) {
      return (
        <img src="https://res.cloudinary.com/dnohqlmjc/image/upload/v1742633483/inactive-dot_niv409.png" alt="dot" />
      );
    },
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1.5,
          centerPadding: "40px",
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          centerPadding: "30px",
        }
      }
    ]
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col gap-10 items-center justify-center bg-black bg-opacity-50">
        <HashLoader
          color={"#FF6932"}
          loading={isLoading}
          size={100}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
        <div className="text-white text-2xl">Fetching Event Details...</div>
      </div>
    );
  }

  if (!events?.length || !mounted) {
    return null;
  }


  return (
   <Slider {...settings}>
  {Array.isArray(events) &&
    events.slice(0,3).map((event, index) => (
      <div key={index} className="px-3">
        <div className="relative group">
          <a href={`/events/${event.id}`}>
            <img
              src={event?.image}
              alt="carousel-image"
              className="h-24 w-[200px] md:h-60 md:w-[400px] lg:h-80 lg:w-[650px] mb-3 rounded-xl object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-xl">
              <span className="text-white text-sm md:text-lg flex items-center gap-2">
                Go to Event <BsFillArrowUpRightCircleFill />
              </span>
            </div>
          </a>
        </div>
      </div>
    ))}
</Slider>
  );
};

export default EventCarousel;