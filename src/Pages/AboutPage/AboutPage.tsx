import React from "react";

const AboutPage: React.FC = () => {
  return (
    <section className="bg-white px-6 sm:px-10 md:px-55 py-24 min-h-screen">
      {/* Title */}
      <h2 className="text-3xl sm:text-4xl font-bold text-center underline underline-offset-4 mb-16">
        AI Purpose
      </h2>

      {/* Row 1: Text on Left, Image on Right */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
        <div>
          <p className="text-sm text-gray-800 leading-relaxed text-justify">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at orci enim. Etiam a lobortis nunc,
            vel auctor lorem. Aliquam erat volutpat. Fusce vel sollicitudin velit. Aliquam egestas quis metus a
            facilisis. Aliquam erat volutpat. Ut nec sollicitudin augue. Suspendisse auctor lacus in nulla fringilla
            pulvinar. Donec suscipit faucibus porttitor. Cras vehicula vel erat quis placerat. Vestibulum id leo
            at nulla aliquet luctus.
          </p>
        </div>
        <div className="flex items-center justify-center">
          <img
            src="/src/assets/question_mark_man_icon.jpg" // Replace with your actual image path
            alt="Thinking Icon"
            className="w-32 sm:w-40 md:w-48 h-auto"
          />
        </div>
      </div>

      {/* Row 2: Image on Left, Text on Right */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="flex justify-center">
          <img
            src="/src/assets/sickicon.jpg" // Replace with your own image
            alt="Speaking Icon"
            className="w-32 sm:w-40 md:w-48 h-auto"
          />
        </div>
        <div>
          <p className="text-sm text-gray-800 leading-relaxed text-justify">
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
