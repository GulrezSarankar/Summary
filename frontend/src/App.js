import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Auth Pages
import Login from './Login';
import Register from './Register';

// Public Landing Pages
import LandingHome from './landings/Home';
import About from './landings/About';
import Contact from './landings/contact';
import Features from './landings/features';

// Protected Pages
import SummaryPage from './summary';
import Dashboard from './Dashboard';
import DownloadSummary from './DownloadSummary';

import ProtectedRoute from './ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>

        {/* Public Pages */}
        <Route path="/" element={<LandingHome />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/features" element={<Features />} />

        {/* Auth Pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Pages */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <SummaryPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/download-summary"
          element={
            <ProtectedRoute>
              <DownloadSummary />
            </ProtectedRoute>
          }
        />

      </Routes>
    </Router>
  );
}

export default App;
