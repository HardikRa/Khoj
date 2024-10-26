import React, { useState } from 'react';
import FraudDashboard from '../FraudDashboard';

const Analytics = () => {
  const [analyticsData] = useState({
    verificationsCompleted: 150,
    pendingVerifications: 50,
    truePositives: 120,
    timeSeriesData: [
      {
        timestamp: '2024-01-01',
        alerts: 30,
        verifications: 25,
        truePositives: 20
      },
      {
        timestamp: '2024-01-02',
        alerts: 45,
        verifications: 40,
        truePositives: 35
      },
      {
        timestamp: '2024-01-03',
        alerts: 35,
        verifications: 30,
        truePositives: 25
      },
    ]
  });

  return (
    <div className="">
      <div className="">
        <FraudDashboard data={analyticsData} />
      </div>
    </div>
  );
};

export default Analytics;