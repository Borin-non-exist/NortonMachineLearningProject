import React, { useEffect, useRef, useState } from "react";
import { Link } from "@inertiajs/react";
import {
  FaUserCircle,
  FaSignOutAlt,
  FaCog,
  FaQuestionCircle,
  FaFileAlt,
} from "react-icons/fa";

interface Props {
  isLoggedIn: boolean;
  setIsLoggedIn: (val: boolean) => void;
  avatarMode?: boolean;
}

const ProfileMenu: React.FC<{
  setIsLoggedIn: (val: boolean) => void;
  setProfileOpen: (val: boolean) => void;
}> = ({ setIsLoggedIn, setProfileOpen }) => (
  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-md shadow-lg z-50">
    <ul className="py-1">
      <li>
        <Link
          href="/setting"
          className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <FaCog className="mr-2" />
          Settings
        </Link>
      </li>
      <li>
        <Link
          href="/how-to-use"
          className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <FaQuestionCircle className="mr-3" />
          How to use PiKrus
        </Link>
      </li>
      <li>
        <Link
          href="/terms-policy"
          className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <FaFileAlt className="mr-3" />
          Terms & Policy
        </Link>
      </li>
      <li>
        <button
          onClick={() => {
            localStorage.removeItem("auth_token");
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

const NavbarAuthActions: React.FC<Props> = ({
  isLoggedIn,
  setIsLoggedIn,
  avatarMode,
}) => {
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

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

  if (avatarMode && isLoggedIn) {
    return (
      <div ref={profileRef} className="relative">
        <img
          src="/User.png"
          alt="User"
          onClick={() => setProfileOpen((prev) => !prev)}
          className="h-7 w-7 rounded-full cursor-pointer object-cover"
        />
        {profileOpen && (
          <ProfileMenu
            setIsLoggedIn={setIsLoggedIn}
            setProfileOpen={setProfileOpen}
          />
        )}
      </div>
    );
  }

  return isLoggedIn ? (
    <>
      <li className="hidden sm:block">
        <Link
          href="/welcome"
          className="px-5 py-2 bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-800 text-white rounded-full text-sm shadow transition-colors"
        >
          Try PiKrus
        </Link>
      </li>
      <div ref={profileRef} className="relative">
        <button
          onClick={() => setProfileOpen((prev) => !prev)}
          className="focus:outline-none"
        >
          <FaUserCircle className="text-3xl text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100" />
        </button>
        {profileOpen && (
          <ProfileMenu
            setIsLoggedIn={setIsLoggedIn}
            setProfileOpen={setProfileOpen}
          />
        )}
      </div>
    </>
  ) : (
    <li className="flex items-center gap-2">
      <Link
        href="/login"
        className="px-5 py-2 bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-800 text-white rounded-full shadow text-sm transition-colors"
      >
        Login
      </Link>
      <Link
        href="/signup"
        className="px-5 py-2 bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-300 border border-blue-600 dark:border-blue-400 rounded-full text-sm hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors"
      >
        Sign Up
      </Link>
    </li>
  );
};

export default NavbarAuthActions;
