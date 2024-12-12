import React from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from "recharts";

const teamPerformanceData = [
  { name: "Jan", salesVolume: 5000, opportunities: 12, avgDealSize: 420 },
  { name: "Feb", salesVolume: 6000, opportunities: 15, avgDealSize: 400 },
  { name: "Mar", salesVolume: 7000, opportunities: 20, avgDealSize: 350 },
  { name: "Apr", salesVolume: 8000, opportunities: 22, avgDealSize: 360 },
  { name: "May", salesVolume: 7500, opportunities: 18, avgDealSize: 415 },
  { name: "Jun", salesVolume: 8500, opportunities: 25, avgDealSize: 340 },
  { name: "Jul", salesVolume: 9000, opportunities: 30, avgDealSize: 300 },
  { name: "Aug", salesVolume: 9500, opportunities: 28, avgDealSize: 310 },
  { name: "Sep", salesVolume: 9800, opportunities: 32, avgDealSize: 320 },
  { name: "Oct", salesVolume: 9200, opportunities: 27, avgDealSize: 330 },
  { name: "Nov", salesVolume: 8900, opportunities: 25, avgDealSize: 340 },
  { name: "Dec", salesVolume: 9100, opportunities: 29, avgDealSize: 350 },
];

export default function App() {
  return (
    <div className="bg-gray-100 min-h-screen">
      <center>
        <div className="text-5xl font-bold p-3">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-green-600 to-gray-900">
            Welcome to Motorparts CRM
          </span>
        </div>
      </center>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 p-4">
        {/* Sales Volume Chart */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Monthly Sales Volume</h2>
          <BarChart width={400} height={250} data={teamPerformanceData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="salesVolume" fill="#8884d8"/>
          </BarChart>
        </div>

        {/* Opportunities Chart */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Opportunities Over Time</h2>
          <LineChart width={400} height={250} data={teamPerformanceData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="opportunities" stroke="#82ca9d" />
          </LineChart>
        </div>

        {/* Average Deal Size */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Average Deal Size</h2>
          <AreaChart width={400} height={250} data={teamPerformanceData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="avgDealSize" stroke="#ffc658" fill="#ffc658" />
          </AreaChart>
        </div>

        {/* Total Opportunities Breakdown */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Opportunities Breakdown</h2>
          <PieChart width={400} height={250}>
            <Pie
              data={teamPerformanceData}
              dataKey="opportunities"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#82ca9d"
              label={(entry) => entry.name}
            />
          </PieChart>
        </div>

        {/* Combined Performance Overview */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Performance Overview</h2>
          <LineChart width={400} height={250} data={teamPerformanceData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="salesVolume" stroke="#8884d8" />
            <Line type="monotone" dataKey="opportunities" stroke="#82ca9d" />
          </LineChart>
        </div>

        {/* Radar Chart for Metrics Comparison */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Metrics Comparison</h2>
          <RadarChart outerRadius={90} width={400} height={250} data={teamPerformanceData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="name" />
            <PolarRadiusAxis />
            <Radar name="Sales Volume" dataKey="salesVolume" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
            <Radar name="Opportunities" dataKey="opportunities" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
          </RadarChart>
        </div>
      </div>
    </div>
  );
};

