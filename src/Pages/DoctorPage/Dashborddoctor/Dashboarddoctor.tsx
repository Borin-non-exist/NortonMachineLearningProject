import React, { useState } from "react";
import Sidebar from "../doctor_components/Sidebar";
import StatCard from "./StatCard";
import Header from "../doctor_components/Header";
import LineChart from "./LineChart";
import PieChart from "./PieChart";
import { FaUserInjured, FaKey, FaUserMd, FaBars } from "react-icons/fa";

const Dashboard: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-blue-50 dark:bg-gray-900 text-gray-900 dark:text-white flex relative">
      {/* Pinned Sidebar for Desktop */}
      <aside className="hidden sm:block fixed inset-y-0 left-0 w-64 z-40 bg-white dark:bg-gray-800 shadow-lg">
        <Sidebar />
      </aside>

      {/* Toggle Button for Mobile */}
      <div className="sm:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-full shadow"
        >
          <FaBars />
        </button>
      </div>

      {/* Sidebar Overlay on Mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="w-64 h-full bg-white dark:bg-gray-800 shadow-lg">
            <Sidebar />
          </div>
          <div
            className="flex-1 bg-black/40"
            onClick={() => setSidebarOpen(false)}
          />
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 w-full sm:ml-64 px-4 py-6 transition-all duration-300">
        <div className="max-w-7xl mx-auto space-y-6">
          <Header title="Dashboard" />

          <div className="border-2 border-blue-400 rounded-xl p-4 sm:p-6 bg-white dark:bg-gray-800 shadow-md space-y-6 transition-colors">
            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <StatCard
                icon={<FaUserInjured />}
                label="Total Patients"
                value={10000}
                percentage="20.5%"
              />
              <StatCard
                icon={<FaKey />}
                label="Total Disease Found"
                value={250}
                percentage="32.5%"
              />
              <StatCard
                icon={<FaUserMd />}
                label="Total Numbers of Doctors"
                value={25}
                percentage="10.9%"
              />
            </div>

            {/* Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <LineChart />
              <PieChart />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
