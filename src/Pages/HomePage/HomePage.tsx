// import React, { useState } from "react";
// import { FaArrowRight, FaBars } from "react-icons/fa";
// import { Link } from "react-router-dom";

// const HomePage: React.FC = () => {
//   const [menuOpen, setMenuOpen] = useState(false);

//   return (
//     <div className="min-h-screen bg-white font-sans text-black relative">
//       {/* Navbar */}
//       <nav className="bg-white shadow-md rounded-b-xl px-4 sm:px-6 py-4">
//         <div className="flex items-center justify-between">
//           {/* Left: Logo */}
//           <div className="flex items-center gap-2">
//             <img src="/src/assets/logo.jpg" alt="Logo" className="w-10 h-10 rounded-full" />
//             <span className="font-bold text-xl text-cyan-700">PiKrous</span>
//           </div>

//           {/* Hamburger Button (Mobile Only) */}
//           <div className="sm:hidden">
//             <button onClick={() => setMenuOpen(!menuOpen)}>
//               <FaBars className="text-2xl text-cyan-700" />
//             </button>
//           </div>

//           {/* Right: Desktop Menu */}
//           <div className="hidden sm:flex items-center gap-6">
//             <ul className="flex gap-4 font-medium text-sm items-center">
//               <li className="bg-gray-300 px-4 py-1 rounded-full text-black">Home</li>
//               <li className="hover:text-cyan-700 cursor-pointer">About AI</li>
//               <li>
//                 <Link to="" className="hover:text-cyan-700">Privacy & Policy</Link>
//               </li>
//             </ul>
//             <button className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-full shadow-md text-sm flex items-center gap-2">
//               Try PiKrous <FaArrowRight />
//             </button>
//           </div>
//         </div>

//         {/* Mobile Dropdown Menu */}
//         {menuOpen && (
//           <div className="sm:hidden mt-4 flex flex-col gap-3 items-center text-sm">
//             <ul className="flex flex-col gap-2 w-full text-center font-medium">
//               <li className="bg-gray-300 px-4 py-2 rounded-full text-black">Home</li>
//               <li className="hover:text-cyan-700 cursor-pointer">About AI</li>
//               <li className="hover:text-cyan-700 cursor-pointer">Privacy & Policy</li>
//             </ul>
//             <button className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded-full shadow-md flex items-center gap-2">
//               Try PiKrous <FaArrowRight />
//             </button>
//           </div>
//         )}
//       </nav>

//       {/* Hero Section with container margin */}
//       <div className="px-4 sm:px-6 md:px-12">
//         <main className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center py-16 sm:py-20">
//           {/* Left Side */}
//           <div className="text-center md:text-left space-y-4">
//             <p className="text-sm text-gray-600">Manifestation Identifier - PiKrous</p>
//             <h1 className="text-5xl sm:text-6xl md:text-7xl font-serif font-bold">PiKrous</h1>
//             <p className="text-sm sm:text-base text-gray-700">
//               Know Your Health And Instantly Analyze Symptoms
//             </p>
//             <div className="flex justify-center md:justify-start">
//               <button className="mt-2 sm:mt-4 px-6 py-2 bg-teal-500 hover:bg-teal-600 text-white text-sm font-semibold rounded-full shadow-md flex items-center gap-2">
//                 Try PiKrous <FaArrowRight />
//               </button>
//             </div>
//           </div>

//           {/* Right Side */}
//           <div className="flex justify-center">
//             <img
//               src="/src/assets/Norton.png"
//               alt="Hospital"
//               className="w-full max-w-md sm:max-w-lg md:max-w-full object-contain"
//             />
//           </div>
//         </main>
//       </div>

//       {/* Down Arrow (Bottom Left) */}
//       {/* <div className="absolute bottom-4 left-4 px-6 py-2">
//         <button className="bg-black text-white text-xl px-3 py-1 rounded-full shadow">
//           <FaChevronDown />
//         </button>
//       </div> */}

//       {/* About Us Section */}
//       <section className="bg-white px-4 sm:px-10 md:px-16 py-12">
//         <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10">About US</h2>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
//           {/* Left Column: Mission + Vision */}
//           <div className="space-y-8">
//             <div>
//               <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
//               <p className="text-sm text-gray-700 leading-relaxed">
//                 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at orci enim. Etiam a lobortis nunc, vel auctor lorem.
//                 Aliquam erat volutpat. Fusce vel sollicitudin velit. Aliquam egetus quis metus a facilisis. Aliquam erat volutpat.
//               </p>
//             </div>

//             <div>
//               <h3 className="text-xl font-semibold mb-2">Our Vision</h3>
//               <p className="text-sm text-gray-700 leading-relaxed">
//                 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at orci enim. Etiam a lobortis nunc, vel auctor lorem.
//                 Aliquam erat volutpat. Fusce vel sollicitudin velit. Aliquam egetus quis metus a facilisis. Aliquam erat volutpat.
//               </p>
//             </div>
//           </div>

//           {/* Right Column: Team + Images */}
//           <div className="space-y-6">
//             <div>
//               <h3 className="text-xl font-semibold mb-2">Our Team</h3>
//               <p className="text-sm text-gray-700 leading-relaxed">
//                 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at orci enim. Etiam a lobortis nunc, vel auctor lorem.
//                 Aliquam erat volutpat. Fusce vel sollicitudin velit. Aliquam egetus quis metus a facilisis. Aliquam erat volutpat.
//               </p>
//             </div>

//             {/* Image Grid */}
//             <div className="grid grid-cols-3 gap-2">
//               <img src="/src/assets/Norton_logo.png" alt="Team 1" className="rounded-lg object-cover w-full h-24" />
//               <img src="/src/assets/Norton_logo.png" alt="Team 2" className="rounded-lg object-cover w-full h-24" />
//               <img src="/src/assets/Norton_logo.png" alt="Team 3" className="rounded-lg object-cover w-full h-24" />
//               <img src="/src/assets/Norton_logo.png" alt="Team 4" className="rounded-lg object-cover w-full h-24" />
//               <img src="/src/assets/Norton_logo.png" alt="Team 5" className="rounded-lg object-cover w-full h-24" />
//               <img src="/src/assets/Norton_logo.png" alt="Team 6" className="rounded-lg object-cover w-full h-24" />
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Privacy & Policy Section */}
// <section className="bg-gray-100 px-4 sm:px-10 md:px-16 py-16 rounded-b-xl">
//   <h2 className="text-3xl sm:text-4xl font-bold text-center mb-10">Privacy & Policy</h2>

//   {/* Section: Security Compliance */}
//   <div className="mb-8">
//     <h3 className="text-xl font-semibold mb-2">Security compliance & accreditation</h3>
//     <p className="text-sm text-gray-700 leading-relaxed">
//       Quisque cursus nisi vel tempor sollicitudin. Praesent condimentum eget metus vitae aliquam.
//       Vivamus consectetur sapien at suscipit imperdiet. Cras suscipit varius eros, ac tempor metus mattis non.
//       Nam nisi lectus, sagittis non purus et, venenatis imperdiet tellus. Etiam hendrerit, ligula ac imperdiet dignissim,
//       libero metus cursus mauris, a pulvinar ligula quam et ex. Nullam et turpis consequat, scelerisque erat at,
//       suscipit ligula. Cras justo leo, tempus sit amet sem vitae, aliquam tincidunt lectus. Mauris quis lacus lorem.
//       Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque quis urna ut mi pharetra facilisis.
//       Etiam facilisis est id risus tristique, vel tempus elit posuere. Maecenas faucibus lacus sed dolor ullamcorper tristique.
//       Integer scelerisque sem a magna luctus, ut vehicula nisl posuere. Donec vestibulum dictum felis, fermentum
//       pellentesque ipsum rutrum tincidunt. Curabitur feugiat felis non justo sodales, non hendrerit dolor auctor.
//       Vestibulum lacinia.
//     </p>
//   </div>

//   {/* Section: Customer Requirements */}
//   <div className="mb-8">
//     <h3 className="text-xl font-semibold mb-2">Customer requirements</h3>
//     <p className="text-sm text-gray-700 leading-relaxed">
//       Donec suscipit faucibus porttitor. Cras vehicula vel erat quis placerat. Vestibulum id leo at nulla aliquet luctus.
//       Donec suscipit faucibus porttitor. Cras vehicula vel erat quis placerat. Vestibulum id leo at nulla aliquet luctus.
//     </p>
//   </div>

//   {/* Section: Security Commitments */}
//   <div>
//     <h3 className="text-xl font-semibold mb-2">Security & privacy commitments</h3>
//     <p className="text-sm text-gray-700 leading-relaxed">
//       Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin at orci enim. Etiam a lobortis nunc, vel auctor lorem.
//       Aliquam erat volutpat. Fusce vel sollicitudin velit. Aliquam egestas quis metus a facilisis. Aliquam erat volutpat.
//       Ut nec sollicitudin augue. Suspendisse auctor lacus in nulla fringilla pulvinar. Donec suscipit faucibus porttitor.
//       Cras vehicula vel erat quis placerat. Vestibulum id leo at nulla aliquet luctus.
//     </p>
//   </div>
// </section>

//     </div>
//   );
// };

// export default HomePage;


import React from "react";
import Navbar from "./NavBar";
import Hero from "./Hero";
import AboutUs from "./AboutUs";
import PrivacyPolicy from "./PrivacyPolicy";

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white font-sans text-black relative">
      <Navbar />
      <Hero />
      <AboutUs />
      <PrivacyPolicy />
    </div>
  );
};

export default HomePage;
