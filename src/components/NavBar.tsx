// src/components/Navbar.tsx
import React, { useState, useEffect, useRef } from "react";
import {
  FaBars,
  FaUserCircle,
  FaCog,
  FaQuestionCircle,
  FaFileAlt,
  FaSignOutAlt,
  FaMoon,
  FaSun,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { Theme, useTheme } from "@/components/ThemeProvider";

const sections = ["home", "about", "privacy"] as const;
type Section = (typeof sections)[number];

const labels: Record<Section, string> = {
  home: "Home",
  about: "About Us",
  privacy: "Privacy & Policy",
};

const Navbar: React.FC = () => {
  // ប្តូរលាក់ខាន់
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [active, setActive] = useState<Section>("home");
  const profileRef = useRef<HTMLDivElement>(null);
  const { theme, setTheme } = useTheme();

  // Scroll‐spy for active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY + window.innerHeight / 3;
      let current: Section = "home";
      for (const sec of sections) {
        const el = document.getElementById(sec);
        if (el && el.offsetTop <= scrollY) {
          current = sec;
        }
      }
      setActive(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close profile dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const scrollToSection = (sec: Section) => {
    const el = document.getElementById(sec);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setMenuOpen(false);
  };

  const linkClass = (sec: Section) =>
    active === sec
      ? "px-4 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 text-sm"
      : "px-4 py-1 rounded-full text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-blue-800 hover:text-blue-600 dark:hover:text-blue-300 text-sm";

  // Toggle between "light" and "dark"
  const handleToggleTheme = () => {
    const next: Theme = theme === "light" ? "dark" : "light";
    setTheme(next);
  };

  const renderDesktopLinks = () => (
    <ul className="flex items-center gap-6">
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

      {isLoggedIn && (
        <>
          <li>
            <Link
              to="/welcome"
              className="px-5 py-2 bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-800 text-white rounded-full text-sm shadow transition-colors"
            >
              Try PiKrous
            </Link>
          </li>

          <li ref={profileRef} className="relative">
            <button
              onClick={() => setProfileOpen((o) => !o)}
              className="focus:outline-none"
            >
              <FaUserCircle className="text-3xl text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100" />
            </button>

            {profileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-md shadow-lg z-50">
                <ul className="py-1">
                  <li className="flex items-center px-4 py-2 border-b border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700">
                    <FaCog className="mr-2 text-gray-600 dark:text-gray-300" />
                    <span className="font-medium text-gray-700 dark:text-gray-200">
                      Settings
                    </span>
                  </li>
                  <li>
                    <Link
                      to="/how-to-use"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <FaQuestionCircle className="mr-3 text-gray-500 dark:text-gray-400" />
                      How to use PiKrous
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/terms-policy"
                      className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <FaFileAlt className="mr-3 text-gray-500 dark:text-gray-400" />
                      Terms & Policy
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        setProfileOpen(false);
                        setIsLoggedIn(false);
                      }}
                      className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <FaSignOutAlt className="mr-3" />
                      Log Out
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </li>
        </>
      )}

      {!isLoggedIn && (
        <li className="flex items-center gap-2">
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
  );

  const renderMobileProfileDropdown = () => (
    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-md shadow-lg z-50">
      <ul className="py-1">
        <li className="flex items-center px-4 py-2 border-b border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700">
          <FaCog className="mr-2 text-gray-600 dark:text-gray-300" />
          <span className="font-medium text-gray-700 dark:text-gray-200">
            Settings
          </span>
        </li>
        <li>
          <Link
            to="/how-to-use"
            className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <FaQuestionCircle className="mr-3 text-gray-500 dark:text-gray-400" />
            How to use PiKrous
          </Link>
        </li>
        <li>
          <Link
            to="/terms-policy"
            className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <FaFileAlt className="mr-3 text-gray-500 dark:text-gray-400" />
            Terms & Policy
          </Link>
        </li>
        <li>
          <button
            onClick={() => {
              setProfileOpen(false);
              setIsLoggedIn(false);
            }}
            className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <FaSignOutAlt className="mr-3" />
            Log Out
          </button>
        </li>
      </ul>
    </div>
  );

  const renderMobileMenu = () => (
    <div className="sm:hidden bg-white dark:bg-gray-800 shadow dark:shadow-gray-700 rounded-b-xl px-4 pb-4 mt-2 mx-4">
      <ul className="flex flex-col gap-3 text-center">
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
  );

  return (
    <nav className="fixed top-0 w-full z-50 bg-white dark:bg-gray-800 shadow dark:shadow-gray-700">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 md:px-10 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/src/assets/logo.jpg"
            alt="PiKrous Logo"
            className="w-10 h-10 rounded-full border border-blue-200 dark:border-blue-400"
          />
          <span className="font-bold text-xl text-blue-600 dark:text-blue-300">
            PiKrous
          </span>
        </Link>

        {/* Desktop links */}
        <div className="hidden sm:flex items-center gap-4">
          {renderDesktopLinks()}

          {/* Theme toggle button */}
          <button
            onClick={handleToggleTheme}
            className="ml-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            {theme === "dark" ? (
              <FaSun className="text-yellow-400" />
            ) : (
              <FaMoon className="text-gray-600" />
            )}
          </button>
        </div>

        {/* Mobile: profile icon + menu icon + theme toggle */}
        <div className="sm:hidden flex items-center gap-2">
          {/* Theme toggle (mobile) */}
          <button
            onClick={handleToggleTheme}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            {theme === "dark" ? (
              <FaSun className="text-yellow-400" />
            ) : (
              <FaMoon className="text-gray-600" />
            )}
          </button>

          {isLoggedIn && (
            <div ref={profileRef} className="relative">
              <button
                onClick={() => setProfileOpen((o) => !o)}
                className="focus:outline-none"
              >
                <FaUserCircle className="text-3xl text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100" />
              </button>
              {profileOpen && renderMobileProfileDropdown()}
            </div>
          )}

          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="text-2xl text-blue-600 dark:text-blue-300"
          >
            <FaBars />
          </button>
        </div>
      </div>

      {menuOpen && renderMobileMenu()}
    </nav>
  );
};

export default Navbar;
