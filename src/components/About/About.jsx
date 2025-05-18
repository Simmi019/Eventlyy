import React from "react";
import { motion } from "framer-motion";
import aboutImage from "../../assets/images/balloons.jpg";

const About = () => {
  return (
    <section id="about" className="w-[90%] mx-auto my-20 flex flex-col md:flex-row items-center gap-12">
      {/* Left: Image with Animation */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full md:w-1/2"
      >
        <img
          src={aboutImage}
          alt="About Us"
          className="w-full h-auto rounded-lg shadow-lg"
          loading="lazy" // ✅ Improves Performance
        />
      </motion.div>

      {/* Right: Text Section with Animation */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        className="w-full md:w-1/2 text-center md:text-left"
      >
        <h2 className="text-5xl font-extrabold text-gray-800 mb-6 leading-tight">
          Crafting <span className="text-purple-600">Unforgettable</span> Moments
        </h2>
        <p className="text-lg text-gray-600 leading-relaxed">
          At <span className="font-semibold text-gray-900">Big Events</span>, we transform your vision into reality. 
          We are your trusted partner in creating unforgettable moments that leave a lasting impression, 
          making your special occasions truly special and memorable.
          
        </p>

        <p className="text-lg text-gray-600 leading-relaxed mt-4">
          Our team of experts is dedicated to helping you bring your vision to life. 
          Whether you're planning a wedding, a birthday party, or a corporate event, 
          we have the skills and expertise to make your event a success.
        </p>

        {/* Animated Button */}
        <motion.a
          href="#contact" // ✅ Navigates to Contact Section (if exists)
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block mt-6 px-8 py-3 bg-purple-600 text-white font-semibold text-lg rounded-lg shadow-md hover:bg-purple-700 transition"
        >
          Get in Touch
        </motion.a>
      </motion.div>
    </section>
  );
};

export default About;
