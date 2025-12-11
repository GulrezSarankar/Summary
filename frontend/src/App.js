import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

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
  const token = localStorage.getItem("token");

  return (
    <Router>
      <Routes>

        {/* ===== PUBLIC PAGES ===== */}
        <Route path="/" element={<LandingHome />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/features" element={<Features />} />

        {/* ===== AUTH PAGES ===== */}
        <Route
          path="/login"
          element={token ? <Navigate to="/home" replace /> : <Login />}
        />

        <Route
          path="/register"
          element={token ? <Navigate to="/home" replace /> : <Register />}
        />

        {/* ===== PROTECTED ROUTES ===== */}
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

        {/* ===== 404 PAGE (Fallback) ===== */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>
    </Router>
  );
}

export default App;
