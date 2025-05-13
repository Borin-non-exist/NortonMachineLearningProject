import React from "react";

const PrivacyPolicy: React.FC = () => {
  return (
    <section className="bg-gray-100 px-4 sm:px-10 md:px-16 py-16 rounded-b-xl">
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10">Privacy & Policy</h2>
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2">Security compliance & accreditation</h3>
        <p className="text-sm text-gray-700 leading-relaxed">
          Quisque cursus nisi vel tempor sollicitudin. Vivamus consectetur sapien at suscipit imperdiet. Etiam hendrerit, ligula ac imperdiet dignissim.
        </p>
      </div>
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2">Customer requirements</h3>
        <p className="text-sm text-gray-700 leading-relaxed">
          Donec suscipit faucibus porttitor. Vestibulum id leo at nulla aliquet luctus. Cras vehicula vel erat quis placerat.
        </p>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2">Security & privacy commitments</h3>
        <p className="text-sm text-gray-700 leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vel sollicitudin velit. Donec suscipit faucibus porttitor.
        </p>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
