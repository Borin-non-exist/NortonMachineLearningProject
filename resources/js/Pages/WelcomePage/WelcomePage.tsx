import React, { useState } from "react";
import { Link, router } from "@inertiajs/react";
import { BiUndo } from "react-icons/bi";
import { MessageSquarePlus, History as HistoryIcon } from "lucide-react";
import historyData from "./history.json";
import NavbarAuthActions from "@/components/NavbarAuthActions";

const WelcomePage: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => !!localStorage.getItem("auth_token")
  );
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  return (
    <div className="relative h-screen bg-blue-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 flex justify-between items-center px-4 sm:px-8 py-4 bg-blue-50 dark:bg-gray-900 z-20">
        <Link href="/" className="flex items-center">
          <img
            src="/assets/logo.jpg"
            alt="PiKrus Logo"
            className="h-12 w-auto object-contain"
          />
        </Link>

        <div className="flex items-center gap-4">
          <button className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
            <MessageSquarePlus className="h-5 w-5 sm:h-6 sm:w-6 text-gray-600 dark:text-gray-200" />
          </button>
          {isLoggedIn && (
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              title="View History"
            >
              <HistoryIcon className="h-5 w-5 sm:h-6 sm:w-6 text-gray-600 dark:text-gray-200" />
            </button>
          )}
          <NavbarAuthActions
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            avatarMode
          />
        </div>
      </header>

      {/* Main Content and Sidebar */}
      <div className="pt-16 h-full flex">
        <div
          className={`flex-1 flex flex-col items-center justify-center px-4 sm:px-6 transition-all duration-300 ${
            sidebarOpen ? "md:mr-[25%]" : "md:mr-0"
          }`}
        >
          <div className="w-full max-w-2xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-blue-600 dark:text-blue-300 mb-4 text-center">
              How Can I Help You?
            </h1>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 mb-8 text-center">
              Choose what you want to know?
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="border-2 border-blue-300 dark:border-gray-600 rounded-lg p-6 bg-white dark:bg-gray-800 hover:shadow-lg transition-colors cursor-pointer">
                <h2 className="text-xl sm:text-2xl font-semibold text-blue-600 dark:text-blue-300 mb-2">
                  Diagnose a Disease
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Analyze your illness
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Lorem ipsum dolor sit amet.
                </p>
              </div>

              <div className="border-2 border-blue-300 dark:border-gray-600 rounded-lg p-6 bg-white dark:bg-gray-800 hover:shadow-lg transition-colors cursor-pointer">
                <h2 className="text-xl sm:text-2xl font-semibold text-blue-600 dark:text-blue-300 mb-2">
                  Advice
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  Give suggestions of your well-being
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Lorem ipsum dolor sit amet.
                </p>
              </div>
            </div>

            <footer className="mt-12 text-center text-xs sm:text-sm py-4 border-t border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400">
              Pikrus can be wrong, please double check!
            </footer>

            {/* New Styled Back Button */}
            <div className="mt-6 flex justify-center">
              <button
                onClick={() => router.get("/doctor")}
                className="w-44 h-12 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg transition duration-200"
                title="Back to Dashboard"
              >
                <BiUndo className="text-2xl" />
                <span className="text-sm font-medium">Back to Dashboard</span>
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside
          className={`fixed top-16 right-0 h-[calc(100vh-64px)] w-full md:w-1/4 bg-white dark:bg-gray-800 p-4 sm:p-6 overflow-y-auto border-l border-gray-200 dark:border-gray-700 z-10 transform transition-transform duration-300 ${
            sidebarOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <h3 className="text-lg sm:text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
            Recently
          </h3>
          <ul className="space-y-4">
            {historyData.map((item, idx) => (
              <li
                key={idx}
                className="p-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg"
              >
                <p className="text-base sm:text-lg font-medium text-gray-800 dark:text-gray-100">
                  {item.label}
                </p>
                <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mt-1">
                  {item.date}
                </p>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  );
};

export default WelcomePage;
