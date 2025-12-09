// src/components/Sidebar.js
import React from "react";
import { NavLink } from "react-router-dom";
import {
  Dashboard as DashboardIcon,
  Summarize as SummaryIcon,
  CloudDownload as DownloadIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";

import "./sidebar.css"; // Extra animation styles

function Sidebar() {
  return (
    <div className="sidebar">
      <h2 className="sidebar-title">Smart Summarizer</h2>

      <nav className="sidebar-nav">
        <NavLink to="/dashboard" className="nav-item">
          <DashboardIcon /> <span>Dashboard</span>
        </NavLink>

        <NavLink to="/home" className="nav-item">
          <SummaryIcon /> <span>Generate Summary</span>
        </NavLink>

        <NavLink to="/download-summary" className="nav-item">
          <DownloadIcon /> <span>Download Summary</span>
        </NavLink>

        <NavLink
          to="/login"
          className="nav-item logout"
          onClick={() => localStorage.removeItem("token")}
        >
          <LogoutIcon /> <span>Logout</span>
        </NavLink>
      </nav>
    </div>
  );
}

export default Sidebar;
    