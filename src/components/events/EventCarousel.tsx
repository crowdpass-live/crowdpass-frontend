"use client";
import React, { act } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import useGetAllEvents from "@/hooks/read-hooks/useGetAllEvents";
import HashLoader from "react-spinners/HashLoader";

type Props = {};

const EventCarousel = (props: Props) => {
  const { events, isLoading } = useGetAllEvents();

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
    customPaging: function(i: number) {
        return (
            <img src={`https://res.cloudinary.com/dnohqlmjc/image/upload/v1742633483/inactive-dot_niv409.png`} />
        );
      },
  };
  return (
    <div className="slider-container ">
       {isLoading && (
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
      )}
      <Slider {...settings}>
        {events.map((event, index) => (
          <a key={index} className="mx-6" href={`/events/${event.id}`}>
            <img src={event?.image} alt="carousel-image"  className="h-24 w-[200px]  md:h-60 md:w-[400px]  lg:h-80 lg:w-[650px] mb-3 rounded-xl"/>
          </a>
        ))}
      </Slider>
    </div>
  );
};

export default EventCarousel;
