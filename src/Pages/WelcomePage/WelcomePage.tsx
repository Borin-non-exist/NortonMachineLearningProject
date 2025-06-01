// src/pages/WelcomePage.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageSquarePlus, History as HistoryIcon } from 'lucide-react';
import historyData from './history.json';

const WelcomePage: React.FC = () => {
  // Sidebar is closed by default
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(prev => !prev);

  return (
    <div className="relative h-screen bg-blue-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 flex justify-between items-center px-4 sm:px-8 py-4 bg-blue-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 z-20 transition-colors">
        {/* Logo + Title (Left) */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/src/assets/logo.jpg"
            alt="PiKrous Logo"
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-blue-200 dark:border-gray-600 transition-colors"
          />
          <span className="font-bold text-lg sm:text-xl text-blue-600 dark:text-blue-300 transition-colors">
            PiKrous
          </span>
        </Link>

        {/* Button Group (Right) */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          {/* New Chat Button */}
          <button
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="New chat"
          >
            <MessageSquarePlus className="h-5 w-5 sm:h-6 sm:w-6 text-gray-600 dark:text-gray-200" />
          </button>

          {/* Toggle Sidebar Button */}
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label={sidebarOpen ? 'Hide recently' : 'Show recently'}
          >
            <HistoryIcon className="h-5 w-5 sm:h-6 sm:w-6 text-gray-600 dark:text-gray-200" />
          </button>

          {/* User Avatar */}
          <img
            src="/avatar.png"
            alt="User"
            className="h-6 w-6 sm:h-8 sm:w-8 rounded-full border border-gray-300 dark:border-gray-600 transition-colors"
          />
        </div>
      </header>

      {/* Main + Sidebar Wrapper */}
      <div className="pt-16 h-full flex">
        {/* Main Content */}
        <div
          className={`
            flex-1 flex items-center justify-center px-4 sm:px-6 h-full
            transition-all duration-300
            ${sidebarOpen ? 'md:mr-[25%]' : 'md:mr-0'}
          `}
        >
          <div className="w-full max-w-2xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-blue-600 dark:text-blue-300 mb-4 text-center transition-colors">
              How Can I Help You?
            </h1>
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 mb-8 text-center transition-colors">
              Choose what you want to know?
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Card 1 */}
              <div className="border-2 border-blue-300 dark:border-gray-600 rounded-lg p-6 bg-white dark:bg-gray-800 hover:shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors transition-shadow cursor-pointer">
                <h2 className="text-xl sm:text-2xl font-semibold text-blue-600 dark:text-blue-300 mb-2 transition-colors">
                  Diagnose a Disease
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4 transition-colors">
                  Analyze your illness
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </div>

              {/* Card 2 */}
              <div className="border-2 border-blue-300 dark:border-gray-600 rounded-lg p-6 bg-white dark:bg-gray-800 hover:shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors transition-shadow cursor-pointer">
                <h2 className="text-xl sm:text-2xl font-semibold text-blue-600 dark:text-blue-300 mb-2 transition-colors">
                  Advice
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4 transition-colors">
                  Give suggestions of your well-being
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400 transition-colors">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              </div>
            </div>

            {/* Footer */}
            <footer className="mt-12 bg-blue-50 dark:bg-gray-800 text-center text-gray-500 dark:text-gray-400 text-xs sm:text-sm py-4 border-t border-gray-200 dark:border-gray-700 w-full transition-colors">
              Pikunus can be wrong, please double check!
            </footer>
          </div>
        </div>

        {/* Sidebar (Recently) */}
        <aside
          className={`
            fixed top-16 right-0 h-[calc(100vh-64px)]
            w-full md:w-1/4 bg-white dark:bg-gray-800 p-4 sm:p-6 overflow-y-auto border-l border-gray-200 dark:border-gray-700 z-10
            transform transition-transform duration-300
            ${sidebarOpen ? 'translate-x-0' : 'translate-x-full'}
          `}
        >
          <h3 className="text-lg sm:text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200 transition-colors">
            Recently
          </h3>
          <ul className="space-y-4">
            {historyData.map((item, idx) => (
              <li
                key={idx}
                className="p-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg transition-colors"
              >
                <p className="text-base sm:text-lg font-medium text-gray-800 dark:text-gray-100 transition-colors">
                  {item.label}
                </p>
                <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mt-1 transition-colors">
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
