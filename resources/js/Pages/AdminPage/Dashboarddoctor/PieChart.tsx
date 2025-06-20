import React from "react";
import {
  PieChart as RePieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import dashboardData from "./dashboardData.json";

const PieChart: React.FC = () => {
  const data = dashboardData.diseaseTypes;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow w-full min-h-[500px] text-gray-900 dark:text-white transition-colors duration-300">
      <h2 className="text-sm font-semibold mb-4 text-center">
        Type of Disease Found
      </h2>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={300}>
        <RePieChart>
          <Pie
            data={data}
            dataKey="percentage"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={90}
            label={({ name, percent }) =>
              `${name} ${(percent * 100).toFixed(0)}%`
            }
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: "#1f2937",
              border: "1px solid #4b5563",
              color: "#ffffff",
            }}
            itemStyle={{ color: "#ffffff" }}
            labelStyle={{ color: "#ffffff" }}
          />
        </RePieChart>
      </ResponsiveContainer>

      {/* Vertical List of Disease Types */}
      <ul className="mt-6 space-y-2 px-4 text-sm">
        {data.map((entry, index) => (
          <li key={index} className="flex items-center space-x-2">
            <span
              className="inline-block w-3 h-3 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span>{entry.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PieChart;
