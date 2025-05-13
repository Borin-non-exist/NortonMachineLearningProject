import React from "react";

const PrivacyPage: React.FC = () => {
  return (
    <section className="bg-white px-6 sm:px-10 md:px-20 py-24 min-h-screen">
      {/* Privacy & Policy Title */}
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
        Privacy & Policy
      </h2>

      {/* Privacy Sections */}
      <div className="space-y-12 max-w-4xl mx-auto text-gray-800">
        {/* Section 1 */}
        <div>
          <h3 className="text-xl font-bold mb-3">
            Security compliance & accreditation
          </h3>
          <p className="text-sm leading-relaxed text-justify">
            Quisque cursus nisi vel tempor sollicitudin. Praesent condimentum
            eget metus vitae aliquam. Vivamus consectetur sapien at suscipit
            imperdiet. Cras suscipit varius eros, ac tempor metus mattis non.
            Nam nisi lectus, sagittis non purus et, venenatis imperdiet tellus.
            Etiam hendrerit, ligula ac imperdiet dignissim, libero metus cursus
            mauris, a pulvinar ligula quam et ex. Nullam et turpis consequat,
            scelerisque erat at, suscipit ligula. Cras justo leo, tempus sit
            amet sem vitae, aliquam tincidunt lectus. Mauris quis lacus lorem.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Pellentesque quis urna ut mi pharetra facilisis. Etiam facilisis est
            id risus tristique, vel tempus elit posuere. Maecenas faucibus lacus
            sed dolor ullamcorper tristique.
            <br />
            <br />
            Integer scelerisque sem a magna luctus, ut vehicula nisl posuere.
            Donec vestibulum dictum felis, fermentum pellentesque ipsum rutrum
            tincidunt. Curabitur feugiat felis non justo sodales, non hendrerit
            dolor auctor. Vestibulum lacinia.
          </p>
        </div>

        {/* Section 2 */}
        <div>
          <h3 className="text-xl font-bold mb-3">Customer requirements</h3>
          <p className="text-sm leading-relaxed text-justify">
            Donec suscipit faucibus porttitor. Cras vehicula vel erat quis
            placerat. Vestibulum id leo at nulla aliquet luctus. Donec suscipit
            faucibus porttitor. Cras vehicula vel erat quis placerat. Vestibulum
            id leo at nulla aliquet luctus.
          </p>
        </div>

        {/* Section 3 */}
        <div className="mb-12">
          <h3 className="text-xl font-bold mb-3">
            Security & privacy commitments
          </h3>
          <p className="text-sm leading-relaxed text-justify">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at
            orci enim. Etiam a lobortis nunc, vel auctor lorem. Aliquam erat
            volutpat. Fusce vel sollicitudin velit. Aliquam egestas quis metus a
            facilisis. Aliquam erat volutpat. Ut nec sollicitudin augue.
            Suspendisse auctor lacus in nulla fringilla pulvinar. Donec suscipit
            faucibus porttitor. Cras vehicula vel erat quis placerat. Vestibulum
            id leo at nulla aliquet luctus.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PrivacyPage;
