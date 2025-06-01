// src/pages/PrivacyPage.tsx
import React from "react";
import AboutUs from "../AboutUs/AboutUsPage";

const PrivacyPage: React.FC = () => {
  return (
    <>
      {/* Privacy & Policy Section */}
      <section
        id="privacy"
        className="bg-[#EEF6FE] dark:bg-gray-900 px-6 sm:px-10 md:px-20 py-24 min-h-screen transition-colors"
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-blue-600 dark:text-blue-300 mb-12">
          Privacy &amp; Policy
        </h2>

        <div className="space-y-12 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section 1 */}
          <div>
            <h3 className="text-xl font-bold text-blue-600 dark:text-blue-300 mb-3">
              Security compliance &amp; accreditation
            </h3>
            <p className="text-sm leading-relaxed text-justify text-blue-800 dark:text-gray-300">
              Quisque cursus nisi vel tempor sollicitudin. Praesent condimentum eget metus vitae aliquam. Vivamus
              consectetur sapien at suscipit imperdiet. Cras suscipit varius eros, ac tempor metus mattis non. Nam
              nisi lectus, sagittis non purus et, venenatis imperdiet tellus. Etiam hendrerit, ligula ac imperdiet
              dignissim, libero metus cursus mauris, a pulvinar ligula quam et ex. Nullam et turpis consequat,
              scelerisque erat at, suscipit ligula. Cras justo leo, tempus sit amet sem vitae, aliquam tincidunt
              lectus. Mauris quis lacus lorem. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
              quis urna ut mi pharetra facilisis. Etiam facilisis est id risus tristique, vel tempus elit posuere.
              Maecenas faucibus lacus sed dolor ullamcorper tristique. Integer scelerisque sem a magna luctus, ut
              vehicula nisl posuere. Donec vestibulum dictum felis, fermentum pellentesque ipsum rutrum tincidunt.
              Curabitur feugiat felis non justo sodales, non hendrerit dolor auctor. Vestibulum lacinia.
            </p>
          </div>

          {/* Section 2 */}
          <div>
            <h3 className="text-xl font-bold text-blue-600 dark:text-blue-300 mb-3">
              Customer requirements
            </h3>
            <p className="text-sm leading-relaxed text-justify text-blue-800 dark:text-gray-300">
              Donec suscipit faucibus porttitor. Cras vehicula vel erat quis placerat. Vestibulum id leo at nulla
              aliquet luctus. Donec suscipit faucibus porttitor. Cras vehicula vel erat quis placerat. Vestibulum id
              leo at nulla aliquet luctus.
            </p>
          </div>

          {/* Section 3 */}
          <div className="mb-12">
            <h3 className="text-xl font-bold text-blue-600 dark:text-blue-300 mb-3">
              Security &amp; privacy commitments
            </h3>
            <p className="text-sm leading-relaxed text-justify text-blue-800 dark:text-gray-300">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at orci enim. Etiam a lobortis nunc, vel
              auctor lorem. Aliquam erat volutpat. Fusce vel sollicitudin velit. Aliquam egestas quis metus a
              facilisis. Aliquam erat volutpat. Ut nec sollicitudin augue. Suspendisse auctor lacus in nulla
              fringilla pulvinar. Donec suscipit faucibus porttitor. Cras vehicula vel erat quis placerat. Vestibulum
              id leo at nulla aliquet luctus.
            </p>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <AboutUs />
    </>
  );
};

export default PrivacyPage;
