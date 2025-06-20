import React from "react";

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  percentage: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, label, value, percentage }) => {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md flex items-center px-8 py-6 justify-between w-full min-h-[120px] text-black dark:text-white transition-colors duration-300">
      {/* Icon (left) */}
      <div className="text-5xl text-black dark:text-white mr-6">
        {icon}
      </div>

      {/* Value + Label (center) */}
      <div className="flex-1 text-center">
        <div className="text-3xl font-extrabold text-black dark:text-white">
          {value}
        </div>
        <div className="text-base text-gray-600 dark:text-gray-300 font-medium">
          {label}
        </div>
      </div>

      {/* Percentage badge (right) */}
      <div className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-sm font-semibold px-4 py-2 rounded-full">
        {percentage} ↑
      </div>
    </div>
  );
};

export default StatCard;
