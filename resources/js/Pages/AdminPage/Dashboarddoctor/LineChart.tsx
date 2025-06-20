import React from "react";
import {
  LineChart as ReLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Sample data (you can replace with your props or API data)
const data = [
  { name: "Mon", value: 60 },
  { name: "Tue", value: 80 },
  { name: "Wed", value: 40 },
  { name: "Thu", value: 100 },
  { name: "Fri", value: 65 },
  { name: "Sat", value: 75 },
  { name: "Sun", value: 100 },
];

const LineChart: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow w-full min-h-[400px] text-gray-900 dark:text-white transition-colors duration-300">
      <h2 className="text-sm font-semibold mb-4 text-center">Weekly Patient Trend</h2>

      <ResponsiveContainer width="100%" height={350}>
        <ReLineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
          <XAxis dataKey="name" stroke="#8884d8" />
          <YAxis stroke="#8884d8" />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1f2937",
              border: "1px solid #4b5563",
              color: "#ffffff",
            }}
            itemStyle={{ color: "#ffffff" }}
            labelStyle={{ color: "#ffffff" }}
          />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#3182CE"
            strokeWidth={2}
            activeDot={{ r: 8 }}
            dot={{ stroke: "#3182CE", strokeWidth: 2, fill: "white" }}
          />
        </ReLineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChart;
