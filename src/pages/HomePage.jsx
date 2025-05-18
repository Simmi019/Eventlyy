import React from "react";
import Hero from "../components/Hero/Hero";
import Events from "../components/Events/Event";
import About from "../components/About/About";
import Pricing from "../components/Pricing/pricing"; 
import Chatbot from "../components/Chatbot/Chatbot"; // Import Chatbot

const HomePage = () => {
  return (
    <>
      <Hero />
      <Chatbot /> {/* Add chatbot at the bottom */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <section id="events" className="py-16">
          <Events />
        </section>

        <section id="about" className="py-16">
          <About />
        </section>

        <section id="pricing" className="py-16">
          <Pricing />
        </section>
        <Chatbot /> {/* Add chatbot at the bottom */}

      </div>
    </>
  );
};

export default HomePage;
