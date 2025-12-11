import React from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  // If no token → block the route
  if (!token || token === "null" || token === "undefined") {
    return <Navigate to="/login" replace />;
  }

  return children;
}
