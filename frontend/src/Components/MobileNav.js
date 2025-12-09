// src/components/MobileNav.js
import React from "react";
import { NavLink } from "react-router-dom";
import {
  Dashboard as DashboardIcon,
  Summarize as SummaryIcon,
  CloudDownload as DownloadIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";

import "./mobile.css";

function MobileNav() {
  return (
    <div className="mobile-nav">
      <NavLink to="/dashboard" className="mobile-item">
        <DashboardIcon />
      </NavLink>

      <NavLink to="/home" className="mobile-item">
        <SummaryIcon />
      </NavLink>

      <NavLink to="/download-summary" className="mobile-item">
        <DownloadIcon />
      </NavLink>

      <NavLink
        to="/login"
        className="mobile-item"
        onClick={() => localStorage.removeItem("token")}
      >
        <LogoutIcon />
      </NavLink>
    </div>
  );
}

export default MobileNav;
