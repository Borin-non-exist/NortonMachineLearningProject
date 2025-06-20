import React from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { useTheme } from "@/components/ThemeProvider"; // Adjust if needed
import user from "./user.json"; // Adjust path based on file location

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const { theme, setTheme } = useTheme();

  const handleToggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className="flex justify-between items-center px-6 py-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
      {/* Page Title */}
      <h1 className="text-lg font-semibold text-gray-800 dark:text-white">{title}</h1>

      {/* Theme Toggle + Profile */}
      <div className="flex items-center space-x-3">
        {/* Theme Toggle Button */}
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

        {/* Avatar + User Info */}
        <img
          src={user.avatar}
          alt="Profile"
          className="h-10 w-10 rounded-full object-cover border-2 border-blue-500"
        />
        <div className="text-right">
          <div className="text-sm font-medium text-gray-900 dark:text-white">
            {user.name}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-300">
            {user.role}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
