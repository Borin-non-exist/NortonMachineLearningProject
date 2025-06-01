// src/pages/AboutPage.tsx
import React from "react";

const AboutPage: React.FC = () => {
  return (
    <section className="bg-[#EEF6FE] dark:bg-gray-900 px-6 sm:px-10 md:px-55 py-24 min-h-screen">
      {/* Title */}
      <h2 className="text-3xl sm:text-4xl font-bold text-center text-blue-600 dark:text-blue-300 underline underline-offset-4 mb-16">
        AI Purpose
      </h2>

      {/* Row 1: Text on Left, Image on Right */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
        <div>
          <p className="text-sm text-blue-800 dark:text-gray-300 leading-relaxed text-justify">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at orci enim. Etiam a lobortis nunc,
            vel auctor lorem. Aliquam erat volutpat. Fusce vel sollicitudin velit. Aliquam egestas quis metus a
            facilisis. Aliquam erat volutpat. Ut nec sollicitudin augue. Suspendisse auctor lacus in nulla fringilla
            pulvinar. Donec suscipit faucibus porttitor. Cras vehicula vel erat quis placerat. Vestibulum id leo
            at nulla aliquet luctus.
          </p>
        </div>
        <div className="flex items-center justify-center">
          <div className="p-4 bg-blue-100 dark:bg-gray-700 rounded-lg">
            <img
              src="/src/assets/questionicon.jpg"
              alt="Thinking Icon"
              className="w-32 sm:w-40 md:w-48 h-auto"
            />
          </div>
        </div>
      </div>

      {/* Row 2: Image on Left, Text on Right */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="flex justify-center">
          <div className="p-4 bg-blue-100 dark:bg-gray-700 rounded-lg">
            <img
              src="/src/assets/sickicon.jpg"
              alt="Speaking Icon"
              className="w-32 sm:w-40 md:w-48 h-auto"
            />
          </div>
        </div>
        <div>
          <p className="text-sm text-blue-800 dark:text-gray-300 leading-relaxed text-justify">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at orci enim. Etiam a lobortis nunc,
            vel auctor lorem. Aliquam erat volutpat. Fusce vel sollicitudin velit. Aliquam egestas quis metus a
            facilisis. Aliquam erat volutpat. Ut nec sollicitudin augue. Suspendisse auctor lacus in nulla fringilla
            pulvinar. Donec suscipit faucibus porttitor. Cras vehicula vel erat quis placerat. Vestibulum id leo
            at nulla aliquet luctus.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
