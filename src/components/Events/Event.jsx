import React from "react";
import party1 from "../../assets/images/party1.jpg";
import pretty from "../../assets/images/pretty.jpg";
import seminar from "../../assets/images/seminar.jpg";
import pretty_icon from "../../assets/images/pretty_icon.png";
import party_icon from "../../assets/images/party_icon.png";
import seminar_icon from "../../assets/images/seminar_icon.png";

const Events = () => {
  const eventData = [
    { img: party1, icon: party_icon, text: "Party" },
    { img: pretty, icon: pretty_icon, text: "Birthday" },
    { img: seminar, icon: seminar_icon, text: "Seminars" },
  ];

  return (
    <section id="events" className="w-[90%] mx-auto my-20">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-10">
        Our <span className="text-purple-600">Events</span>
      </h2>

      <div className="flex flex-wrap justify-center gap-8">
        {eventData.map((event, index) => (
          <div
            key={index}
            className="relative w-full sm:w-[48%] lg:w-[31%] overflow-hidden rounded-lg shadow-lg group transition-transform duration-300 hover:scale-105"
          >
            {/* Event Image */}
            <img
              src={event.img}
              alt={event.text}
              className="w-full h-[300px] sm:h-[250px] lg:h-[300px] rounded-lg object-cover transition duration-500 transform group-hover:scale-110"
              loading="lazy" // ✅ Improves Performance
            />

            {/* Hover Caption */}
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-60 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <img
                src={event.icon}
                alt={`${event.text} Icon`}
                className="w-16 h-16 mb-4 object-contain drop-shadow-lg transition-transform duration-300 group-hover:scale-110"
                loading="lazy" // ✅ Lazy loads icons too
              />
              <p className="text-2xl font-semibold tracking-wide uppercase">
                {event.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Events;