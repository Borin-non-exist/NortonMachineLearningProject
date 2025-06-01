// src/pages/HomePage.tsx
import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#EEF6FE] dark:bg-gray-900 px-4 sm:px-6 md:px-12 max-w-screen-xl mx-auto">
      <main className="grid grid-cols-1 md:grid-cols-2 gap-14 items-center px-6 sm:px-12 md:px-20 py-24 sm:py-32 md:py-55 max-w-full mx-auto">
        <div className="text-center md:text-left space-y-4">
          <p className="text-sm text-blue-800 dark:text-gray-400">
            Manifestation Identifier - PiKrous
          </p>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-serif font-bold text-blue-600 dark:text-blue-300">
            PiKrous
          </h1>
          <p className="text-sm sm:text-base text-blue-800 dark:text-gray-300">
            Know Your Health And Instantly Analyze Symptoms
          </p>
          <div className="flex justify-center md:justify-start">
            <Link
              to="/welcome"
              className="mt-2 sm:mt-4 px-6 py-2 bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-800 text-white rounded-full shadow-md flex items-center gap-2 text-sm font-semibold transition-colors"
            >
              Try PiKrous <FaArrowRight />
            </Link>
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

export default HomePage;
