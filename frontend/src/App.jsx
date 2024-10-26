// src/App.js
import React from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import DashboardPage from './components/pages/DashboardPage';
import Analytics from './components/pages/AnalyticsPage';

import NavigationBar from './components/NavigationBar';
import Terminal from './components/pages/Terminal';
import HomePage from './components/pages/HomePage';

function App() {

  return (
    <div className="App">

    <NavigationBar />

    <Router>
      <div>
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/terminal" element={<Terminal />} />
          </Routes>
        </main>
      </div>
    </Router>

     
      
    </div>
  );
}

export default App;
