import React, { useEffect, useRef, useState } from "react";
import { Link, router, usePage } from "@inertiajs/react";
import {
  FaUserCircle,
  FaSignOutAlt,
  FaCog,
  FaQuestionCircle,
  FaFileAlt,
} from "react-icons/fa";

const ProfileMenu: React.FC<{
  setProfileOpen: (val: boolean) => void;
}> = ({ setProfileOpen }) => {
  const handleLogout = () => {
    router.post("/logout", {}, {
      onFinish: () => setProfileOpen(false),
    });
  };

  return (
    <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-50">
      <ul className="py-1 text-sm">
        <li>
          <Link
            href='/setting'
            className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <FaCog className="mr-2" />
            Settings
          </Link>
        </li>
        <li>
          <Link
            href='/how-to-use'
            className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <FaQuestionCircle className="mr-2" />
            How to use PiKrus
          </Link>
        </li>
        <li>
          <Link
            href='/terms-policy'
            className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <FaFileAlt className="mr-2" />
            Terms & Policy
          </Link>
        </li>
        <li>
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-2 text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <FaSignOutAlt className="mr-2" />
            Log Out
          </button>
        </li>
      </ul>
    </div>
  );
};

const NavbarAuthActions: React.FC = () => {
  const { props } = usePage<{ auth?: { user?: any } }>();
  const user = props.auth?.user;
  const { auth } = usePage().props as any;

  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  // get profile image
  const profileImage =
    auth?.user?.image
      ? (auth.user.image.startsWith('users/')
        ? `/storage/${auth.user.image}`
        : `/assets/${auth.user.image.replace(/^\/+/, '')}`)
      : "/assets/User.png";

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
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (user) {
    return (
      <div ref={profileRef} className="relative">
        <button
          onClick={() => setProfileOpen((prev) => !prev)}
          className="flex items-center gap-2 focus:outline-none"
        >
          <img
            src={profileImage}
            alt={user.user_name}
            className="h-7 w-7 rounded-full object-cover border"
          />
          <span className="hidden sm:inline text-sm font-medium text-blue-900 dark:text-white">
            {user.user_name}
          </span>
        </button>
        {profileOpen && (
          <ProfileMenu setProfileOpen={setProfileOpen} />
        )}
      </div>
    );
  }

  // If not logged in, show login/signup buttons
  return (
    <li className="flex items-center gap-2">
      <Link
        href='/login'
        className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow text-sm transition-colors"
      >
        Login
      </Link>
      <Link
        href='/register'
        className="px-5 py-2 bg-white text-blue-600 border border-blue-600 rounded-full text-sm hover:bg-blue-50 dark:bg-transparent dark:border-blue-400 dark:text-blue-400 dark:hover:bg-gray-700 transition-colors"
      >
        Sign Up
      </Link>
    </li>
  );
};

export default NavbarAuthActions;
