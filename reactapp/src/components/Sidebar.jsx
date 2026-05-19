import React from "react";
import { NavLink } from "react-router-dom";
import "../styles/common.css";

const NavItem = ({ to, icon, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}
  >
    <span className="sidebar-icon" aria-hidden>{icon}</span>
    <span>{label}</span>
  </NavLink>
);

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <span className="sidebar-brand-icon">✦</span>
        <div>
          <strong>Whiteboard Pro</strong>
          <span>Collaboration Suite</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        <div className="sidebar-section-label">Overview</div>
        <NavItem to="/workspace" icon="🏠" label="Dashboard" />
        <NavItem to="/workspace/1" icon="🗂" label="Workspaces" />
        <NavItem to="/whiteboard/1" icon="🧩" label="Whiteboards" />
      </nav>

      <div className="sidebar-footer">
        <p>Need inspiration?</p>
        <button className="sidebar-footer-btn">Browse templates</button>
      </div>
    </aside>
  );
}