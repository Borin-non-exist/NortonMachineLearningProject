
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaMoon, FaSun } from 'react-icons/fa';
import { useTheme } from './ThemeProvider';
import NavbarAuthActions from './NavbarAuthActions';

const sections = ['home', 'about', 'privacy'] as const;
type Section = (typeof sections)[number];

const labels: Record<Section, string> = {
  home: 'Home',
  about: 'About Us',
  privacy: 'Privacy & Policy',
};

const Navbar: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState<Section>('home');
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + window.innerHeight / 3;
      let current: Section = 'home';
      for (const sec of sections) {
        const el = document.getElementById(sec);
        if (el && el.offsetTop <= scrollY) {
          current = sec;
        }
      }
      setActive(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sec: Section) => {
    const el = document.getElementById(sec);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setMenuOpen(false);
  };

  const linkClass = (sec: Section) =>
    active === sec
      ? 'px-4 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 text-sm'
      : 'px-4 py-1 rounded-full text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-blue-800 hover:text-blue-600 dark:hover:text-blue-300 text-sm';

  const handleToggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-white dark:bg-gray-800 shadow dark:shadow-gray-700">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 md:px-10 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src="/src/assets/logo.jpg" alt="PiKrous Logo" className="h-12 w-auto object-contain" />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden sm:flex items-center gap-4">
          <ul className="flex items-center gap-6">
            {sections.map((sec) => (
              <li key={sec}>
                <button onClick={() => scrollToSection(sec)} className={linkClass(sec)}>
                  {labels[sec]}
                </button>
              </li>
            ))}

            <NavbarAuthActions isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          </ul>

          <button
            onClick={handleToggleTheme}
            className="ml-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            {theme === 'dark' ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-gray-600" />}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="sm:hidden flex items-center gap-2">
          <button
            onClick={handleToggleTheme}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            {theme === 'dark' ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-gray-600" />}
          </button>

          <button onClick={() => setMenuOpen((o) => !o)} className="text-2xl text-blue-600 dark:text-blue-300">
            <FaBars />
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="sm:hidden bg-white dark:bg-gray-800 shadow dark:shadow-gray-700 rounded-b-xl px-4 pb-4 mt-2 mx-4">
          <ul className="flex flex-col gap-3 text-center">
            {sections.map((sec) => (
              <li key={sec}>
                <button onClick={() => scrollToSection(sec)} className={linkClass(sec)}>
                  {labels[sec]}
                </button>
              </li>
            ))}
            {isLoggedIn ? (
              <li className="mt-2">
                <Link
                  to="/welcome"
                  className="block px-5 py-2 bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-800 text-white rounded-full text-sm shadow transition-colors"
                >
                  Try PiKrous
                </Link>
              </li>
            ) : (
              <li className="flex justify-center gap-2 mt-2">
                <Link
                  to="/login"
                  className="px-5 py-2 bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-800 text-white rounded-full shadow text-sm transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-5 py-2 bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-300 border border-blue-600 dark:border-blue-400 rounded-full text-sm hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors"
                >
                  Sign Up
                </Link>
              </li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;




//code ដេលlogin and signup

// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { FaBars, FaMoon, FaSun } from 'react-icons/fa';
// import { useTheme } from './ThemeProvider';
// import NavbarAuthActions from './NavbarAuthActions';

// const sections = ['home', 'about', 'privacy'] as const;
// type Section = (typeof sections)[number];

// const labels: Record<Section, string> = {
//   home: 'Home',
//   about: 'About Us',
//   privacy: 'Privacy & Policy',
// };

// const Navbar: React.FC = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => !!localStorage.getItem('auth_token'));
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [active, setActive] = useState<Section>('home');
//   const { theme, setTheme } = useTheme();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const handleScroll = () => {
//       const scrollY = window.scrollY + window.innerHeight / 3;
//       let current: Section = 'home';
//       for (const sec of sections) {
//         const el = document.getElementById(sec);
//         if (el && el.offsetTop <= scrollY) {
//           current = sec;
//         }
//       }
//       setActive(current);
//     };

//     window.addEventListener('scroll', handleScroll, { passive: true });
//     handleScroll();
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const scrollToSection = (sec: Section) => {
//     const el = document.getElementById(sec);
//     if (el) {
//       el.scrollIntoView({ behavior: 'smooth', block: 'start' });
//     }
//     setMenuOpen(false);
//   };

//   const handleToggleTheme = () => {
//     setTheme(theme === 'light' ? 'dark' : 'light');
//   };

//   const linkClass = (sec: Section) =>
//     active === sec
//       ? 'px-4 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 text-sm'
//       : 'px-4 py-1 rounded-full text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-blue-800 hover:text-blue-600 dark:hover:text-blue-300 text-sm';

//   return (
//     <nav className="fixed top-0 w-full z-50 bg-white dark:bg-gray-800 shadow dark:shadow-gray-700">
//       <div className="mx-auto max-w-screen-xl px-4 sm:px-6 md:px-10 py-3 flex items-center justify-between">
//         <Link to="/" className="flex items-center gap-2">
//           <img src="/src/assets/logo.jpg" alt="PiKrous Logo" className="h-12 w-auto object-contain" />
//         </Link>

//         {/* Desktop Menu */}
//         <div className="hidden sm:flex items-center gap-4">
//           <ul className="flex items-center gap-6">
//             {sections.map((sec) => (
//               <li key={sec}>
//                 <button onClick={() => scrollToSection(sec)} className={linkClass(sec)}>
//                   {labels[sec]}
//                 </button>
//               </li>
//             ))}

//             {isLoggedIn ? (
//               <NavbarAuthActions isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
//             ) : (
//               <li className="flex items-center gap-2">
//                 <Link
//                   to="/login"
//                   className="px-5 py-2 bg-blue-600 dark:bg-blue-700 text-white rounded-full text-sm shadow hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors"
//                 >
//                   Login
//                 </Link>
//                 <Link
//                   to="/signup"
//                   className="px-5 py-2 bg-white dark:bg-gray-800 border border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-300 rounded-full text-sm hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors"
//                 >
//                   Sign Up
//                 </Link>
//               </li>
//             )}
//           </ul>

//           <button
//             onClick={handleToggleTheme}
//             className="ml-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
//           >
//             {theme === 'dark' ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-gray-600" />}
//           </button>
//         </div>

//         {/* Mobile Menu Button */}
//         <div className="sm:hidden flex items-center gap-2">
//           <button onClick={handleToggleTheme} className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
//             {theme === 'dark' ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-gray-600" />}
//           </button>

//           <button onClick={() => setMenuOpen((o) => !o)} className="text-2xl text-blue-600 dark:text-blue-300">
//             <FaBars />
//           </button>
//         </div>
//       </div>

//       {/* Mobile Dropdown */}
//       {menuOpen && (
//         <div className="sm:hidden bg-white dark:bg-gray-800 shadow dark:shadow-gray-700 rounded-b-xl px-4 pb-4 mt-2 mx-4">
//           <ul className="flex flex-col gap-3 text-center">
//             {sections.map((sec) => (
//               <li key={sec}>
//                 <button onClick={() => scrollToSection(sec)} className={linkClass(sec)}>
//                   {labels[sec]}
//                 </button>
//               </li>
//             ))}

//             {isLoggedIn ? (
//               <>
//                 <li>
//                   <Link
//                     to="/welcome"
//                     className="block px-5 py-2 bg-blue-600 dark:bg-blue-700 text-white rounded-full text-sm shadow hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors"
//                   >
//                     Try PiKrous
//                   </Link>
//                 </li>
//                 <li>
//                   <NavbarAuthActions isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
//                 </li>
//               </>
//             ) : (
//               <li className="flex justify-center gap-2">
//                 <Link
//                   to="/login"
//                   className="px-5 py-2 bg-blue-600 dark:bg-blue-700 text-white rounded-full text-sm shadow hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors"
//                 >
//                   Login
//                 </Link>
//                 <Link
//                   to="/signup"
//                   className="px-5 py-2 bg-white dark:bg-gray-800 border border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-300 rounded-full text-sm hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors"
//                 >
//                   Sign Up
//                 </Link>
//               </li>
//             )}
//           </ul>
//         </div>
//       )}
//     </nav>
//   );
// };

// export default Navbar;
