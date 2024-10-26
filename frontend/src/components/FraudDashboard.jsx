import React from 'react';
import {
  PieChart, Pie, Cell,
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer
} from 'recharts';
import AlertsSection from './AlertsSection'
const FraudDashboard = ({ data }) => {
  const verificationData = [
    { name: 'Verified', value: data.verificationsCompleted },
    { name: 'Pending', value: data.pendingVerifications }
  ];

  const accuracyData = [
    { name: 'True Positives', value: data.truePositives },
    { name: 'False Positives', value: data.verificationsCompleted - data.truePositives }
  ];

  const COLORS = ['#2596be', '#E5E7EB'];

  return (
    <div className="w-full space-y-6 p-6 bg-white">
      <h1 className="text-3xl font-bold text-blue-800 mb-6">Fraud Detection Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-blue-50 rounded-lg shadow-md p-4">
          <h2 className="text-xl font-semibold text-blue-800 mb-4">Verification Status</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={verificationData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#60A5FA"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {verificationData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-blue-50 rounded-lg shadow-md p-4">
          <h2 className="text-xl font-semibold text-blue-800 mb-4">Detection Accuracy</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={accuracyData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#60A5FA"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {accuracyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-blue-50 rounded-lg shadow-md p-4">
          <h2 className="text-xl font-semibold text-blue-800 mb-4">Alerts Over Time</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.timeSeriesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="timestamp" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="alerts" stroke="#60A5FA" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-blue-50 rounded-lg shadow-md p-4">
          <h2 className="text-xl font-semibold text-blue-800 mb-4">Verification History</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.timeSeriesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="timestamp" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="verifications" stroke="#60A5FA" strokeWidth={2} />
                <Line type="monotone" dataKey="truePositives" stroke="#34D399" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      <AlertsSection/>
    </div>
  );
};

export default FraudDashboard;