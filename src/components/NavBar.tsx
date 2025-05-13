// import React, { useState, useEffect } from "react";
// import { FaBars } from "react-icons/fa";
// import { Link } from "react-router-dom";

// const sections = ["home", "about", "privacy"] as const;
// type Section = typeof sections[number];

// const Navbar: React.FC = () => {
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [active, setActive] = useState<Section>("home");

//   useEffect(() => {
//     const handleScroll = () => {
//       const scrollY = window.scrollY + window.innerHeight / 3; 
//       // add a bit of offset so the section is “in view”
      
//       let newActive: Section = "home";

//       for (const sec of sections) {
//         const el = document.getElementById(sec);
//         if (el && el.offsetTop <= scrollY) {
//           newActive = sec;
//         }
//       }

//       setActive(newActive);
//     };

//     window.addEventListener("scroll", handleScroll, { passive: true });
//     handleScroll(); // init on mount
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const linkClass = (sec: Section) =>
//     active === sec
//       ? "px-4 py-1 rounded-full bg-gray-300 text-black"
//       : "hover:text-cyan-700";

//   return (
//     <nav className="fixed top-0 w-full z-50 bg-white">
//       <div className="mx-auto max-w-screen-xl px-4 sm:px-6 md:px-10 py-3 shadow-md rounded-full flex items-center justify-between">
//         <div className="flex items-center gap-2">
//           <img
//             src="/src/assets/logo.jpg"
//             alt="PiKrous Logo"
//             className="w-10 h-10 rounded-full"
//           />
//           <span className="font-bold text-xl text-cyan-700">PiKrous</span>
//         </div>

//         {/* Desktop */}
//         <div className="hidden sm:flex items-center gap-8">
//           <ul className="flex items-center gap-6 font-medium text-sm">
//             <li>
//               <Link to="#home" className={linkClass("home")}>
//                 Home
//               </Link>
//             </li>
//             <li>
//               <Link to="#about" className={linkClass("about")}>
//                 About Us
//               </Link>
//             </li>
//             <li>
//               <Link to="#privacy" className={linkClass("privacy")}>
//                 Privacy &amp; Policy
//               </Link>
//             </li>
//           </ul>

//           <div className="flex items-center gap-4">
//             <Link
//               to="/login"
//               className="px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-full text-sm"
//             >
//               Login
//             </Link>
//             <Link
//               to="/signup"
//               className="px-4 py-2 border border-gray-300 rounded-full text-sm hover:bg-gray-100"
//             >
//               Sign Up
//             </Link>
//           </div>
//         </div>

//         {/* Mobile */}
//         <div className="sm:hidden">
//           <button
//             onClick={() => setMenuOpen((p) => !p)}
//             className="text-2xl text-cyan-700"
//           >
//             <FaBars />
//           </button>
//         </div>
//       </div>

//       {menuOpen && (
//         <div className="sm:hidden bg-white shadow-md rounded-b-xl px-4 pb-4 mt-2 mx-4">
//           <ul className="flex flex-col gap-3 text-center font-medium text-sm">
//             {sections.map((sec) => (
//               <li key={sec}>
//                 <Link to={`#${sec}`} className={linkClass(sec)}>
//                   {sec === "home"
//                     ? "Home"
//                     : sec === "about"
//                     ? "About Us"
//                     : "Privacy & Policy"}
//                 </Link>
//               </li>
//             ))}

//             <li className="flex justify-center gap-4 mt-2">
//               <Link
//                 to="/login"
//                 className="px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-full text-sm"
//               >
//                 Login
//               </Link>
//               <Link
//                 to="/signup"
//                 className="px-4 py-2 border border-gray-300 rounded-full text-sm hover:bg-gray-100"
//               >
//                 Sign Up
//               </Link>
//             </li>
//           </ul>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;
import React, { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";

const sections = ["home", "about", "privacy"] as const;
type Section = typeof sections[number];
const labels: Record<Section, string> = {
  home: "Home",
  about: "About Us",
  privacy: "Privacy & Policy",
};

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState<Section>("home");

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + window.innerHeight / 3;
      let current: Section = "home";
      sections.forEach((sec) => {
        const el = document.getElementById(sec);
        if (el && el.offsetTop <= scrollY) {
          current = sec;
        }
      });
      setActive(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sec: Section) => {
    const el = document.getElementById(sec);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    setMenuOpen(false);
  };

  const linkClass = (sec: Section) =>
    active === sec
      ? "px-4 py-1 rounded-full bg-gray-300 text-black text-sm"
      : "px-4 py-1 rounded-full hover:bg-gray-100 text-sm";

  return (
    <nav className="fixed top-0 w-full z-50 bg-white">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 md:px-10 py-3 shadow-md rounded-full flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img
            src="/src/assets/logo.jpg"
            alt="PiKrous Logo"
            className="w-10 h-10 rounded-full"
          />
          <span className="font-bold text-xl text-cyan-700">PiKrous</span>
        </div>

        {/* Desktop nav */}
        <div className="hidden sm:flex items-center">
          <ul className="flex items-center gap-6 font-medium text-sm">
            {sections.map((sec) => (
              <li key={sec}>
                <button
                  onClick={() => scrollToSection(sec)}
                  className={linkClass(sec)}
                >
                  {labels[sec]}
                </button>
              </li>
            ))}

            {/* Auth buttons without background */}
            <li className="flex items-center gap-2">
              <Link
                to="/login"
                className="px-5 py-2 bg-teal-500 text-white rounded-full shadow text-sm"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-5 py-2 bg-white text-black border border-gray-300 rounded-full text-sm"
              >
                Sign Up
              </Link>
            </li>
          </ul>
        </div>

        {/* Mobile toggle */}
        <div className="sm:hidden">
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="text-2xl text-cyan-700"
          >
            <FaBars />
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="sm:hidden bg-white shadow-md rounded-b-xl px-4 pb-4 mt-2 mx-4">
          <ul className="flex flex-col gap-3 text-center font-medium text-sm">
            {sections.map((sec) => (
              <li key={sec}>
                <button
                  onClick={() => scrollToSection(sec)}
                  className={linkClass(sec)}
                >
                  {labels[sec]}
                </button>
              </li>
            ))}

            {/* Mobile Auth Buttons - no extra wrapper */}
            <li className="flex justify-center gap-2">
              <Link
                to="/login"
                className="px-5 py-2 bg-teal-500 text-white rounded-full shadow text-sm"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-5 py-2 bg-white text-black border border-gray-300 rounded-full text-sm"
              >
                Sign Up
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
