import React from "react";
import { FaArrowRight } from "react-icons/fa";

const Hero: React.FC = () => {
  return (
    <div className="px-4 sm:px-6 md:px-12 max-w-screen-xl mx-auto">
      <main className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center py-16 sm:py-24 md:py-28">
        <div className="text-center md:text-left space-y-4">
          <p className="text-sm text-gray-600">Manifestation Identifier - PiKrous</p>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-serif font-bold">PiKrous</h1>
          <p className="text-sm sm:text-base text-gray-700">
            Know Your Health And Instantly Analyze Symptoms
          </p>
          <div className="flex justify-center md:justify-start">
            <button className="mt-2 sm:mt-4 px-6 py-2 bg-teal-500 hover:bg-teal-600 text-white text-sm font-semibold rounded-full shadow-md flex items-center gap-2">
              Try PiKrous <FaArrowRight />
            </button>
          </div>
        </div>
        <div className="flex justify-center">
          <img
            src="/src/assets/Norton.png"
            alt="Hospital"
            className="w-full max-w-md sm:max-w-lg md:max-w-full object-contain"
          />
        </div>
      </main>
    </div>
  );
};

export default Hero;