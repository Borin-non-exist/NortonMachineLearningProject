import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaTachometerAlt,
  FaBookMedical,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

const Sidebar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const linkClasses = (path: string) =>
    `flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
      isActive(path)
        ? "bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-white font-semibold"
        : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
    }`;

  const confirmLogout = () => {
    localStorage.removeItem("auth_token");
    setShowLogoutModal(false);
    navigate("/login");
  };

  return (
    <>
      <aside className="w-64 fixed top-0 left-0 h-screen bg-white dark:bg-gray-800 shadow z-50 flex flex-col justify-between p-4 overflow-y-auto">
        {/* Logo & Navigation */}
        <div>
          <Link to="/" className="flex justify-center mb-8">
            <img src="/src/assets/logo.jpg" alt="PiKrous Logo" className="h-12 object-contain" />
          </Link>

          <nav className="space-y-2">
            <Link to="/Admin" className={linkClasses("/Admin")}>
              <FaTachometerAlt className="text-lg" />
              <span>Dashboard</span>
            </Link>

            <Link to="/doctor-list" className={linkClasses("/doctor-list")}>
              <FaBookMedical className="text-lg" />
              <span>Doctor</span>
            </Link>

            <Link to="/SettingAdmin" className={linkClasses("/SettingAdmin")}>
              <FaCog className="text-lg" />
              <span>Setting</span>
            </Link>
          </nav>
        </div>

        {/* Logout Button */}
        <button
          onClick={() => setShowLogoutModal(true)}
          className="flex items-center text-red-500 space-x-3 px-4 py-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900 transition"
        >
          <FaSignOutAlt className="text-lg" />
          <span>Log Out</span>
        </button>
      </aside>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl w-full max-w-sm">
            <h2 className="text-lg font-semibold mb-3 text-gray-800 dark:text-white">
              Confirm Log Out
            </h2>
            <p className="text-sm mb-6 text-gray-600 dark:text-gray-300">
              Are you sure you want to log out?
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={confirmLogout}
                className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
