
import React from "react";
import { motion } from "framer-motion";
import eventImage from "../../assets/images/event1.jpg";

const Hero = () => {
  return (
    <section
      id="hero"
      className="relative w-full min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(rgb(139 92 246 / 0), rgb(139 92 246 / 47%)), url(${eventImage})`
      }}
    >
      {/* Hero Content */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center max-w-3xl text-white px-6"
      >
        <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-4">
          Plan Your <span className="text-yellow-300">Perfect Event</span> with Evently
        </h1>
        <p className="text-lg md:text-xl text-gray-200 mb-6">
          Your AI-powered event planning assistant that helps you organize, budget, and execute memorable events with ease.
        </p>

        {/* Animated Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a 
            href="#events"
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold text-lg rounded-full shadow-lg hover:opacity-80 transition-all duration-300"
          >
            Get Started
          </a>
          <a 
            href="#about"
            className="px-6 py-3 bg-white text-blue-600 font-semibold text-lg rounded-full shadow-lg border border-blue-500 hover:bg-blue-500 hover:text-white transition-all duration-300"
          >
            Learn More
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
