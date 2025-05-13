import React from "react";

const AboutUs: React.FC = () => {
  return (
    <section className="bg-white px-4 sm:px-10 md:px-16 py-12">
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10">About US</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at orci enim. Etiam a lobortis nunc, vel auctor lorem.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Our Vision</h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vel sollicitudin velit. Aliquam erat volutpat.
            </p>
          </div>
        </div>
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">Our Team</h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at orci enim. Aliquam erat volutpat.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[...Array(6)].map((_, i) => (
              <img
                key={i}
                src="/src/assets/Norton_logo.png"
                alt={`Team ${i + 1}`}
                className="rounded-lg object-cover w-full h-24"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;