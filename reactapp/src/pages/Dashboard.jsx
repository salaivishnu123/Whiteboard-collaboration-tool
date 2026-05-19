import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/dashboard.css";

export default function Dashboard() {
  const navigate = useNavigate();

  const featuredTemplates = useMemo(
    () => [
      { id: "brainstorm", title: "Brainstorm Board", desc: "Sticky notes and clusters" },
      { id: "flowchart", title: "Flowchart", desc: "Diagram shapes and connectors" },
      { id: "canvas", title: "Blank Canvas", desc: "Start from scratch" },
      { id: "storyboard", title: "Storyboard", desc: "Map product storytelling frames" },
    ],
    []
  );

  const recentWorkspaces = useMemo(
    () => [
      { id: "marketing", title: "Marketing Sprint 09", boards: 6, updated: "3h ago", link: 1 },
      { id: "uxsync", title: "UX Sync", boards: 4, updated: "Yesterday", link: 2 },
      { id: "roadmap", title: "2025 Roadmap", boards: 9, updated: "2 days ago", link: 3 },
    ],
    []
  );

  const activityTimeline = useMemo(
    () => [
      { title: "Feedback session exported", subtitle: "You exported Wireframe Iteration 3", time: "45m ago" },
      { title: "Workspace invite sent", subtitle: "Priya joined Marketing Sprint 09", time: "2h ago" },
      { title: "New board created", subtitle: "UX Sync • Journey Map", time: "Yesterday" },
    ],
    []
  );

  const stats = useMemo(
    () => [
      { label: "Active Workspaces", value: "08" },
      { label: "Boards in Review", value: "12" },
      { label: "Live Collaborators", value: "18" },
      { label: "Exports this week", value: "05" },
    ],
    []
  );

  const [showModal, setShowModal] = useState(false);
  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const quickCreate = (type) => {
    if (type === "canvas") navigate("/whiteboard/1");
    else if (type === "brainstorm") navigate("/whiteboard/2");
    else if (type === "flowchart") navigate("/whiteboard/3");
    else navigate("/whiteboard/4");
  };

  const handleCreateWorkspace = () => {
    if (!newName || !newDescription) {
      alert("Please fill both name and description!");
      return;
    }
    navigate(`/workspace/${Math.floor(Math.random() * 1000)}`);
    setShowModal(false);
    setNewName("");
    setNewDescription("");
  };

  return (
    <div className="dashboard-page">
      <section className="dash-hero">
        <div>
          <h2>Command center for your whiteboard strategy</h2>
          <p>
            Create spaces, launch boards, and keep teams aligned with a single canvas-first hub.
            Start with a template or spin up a blank board in seconds.
          </p>
          <div className="quick-actions">
            <button className="btn" onClick={() => setShowModal(true)}>+ New Workspace</button>
            <button className="btn" onClick={() => quickCreate("canvas")}>Blank board</button>
            <button className="btn" onClick={() => quickCreate("brainstorm")}>Brainstorm kit</button>
          </div>
        </div>
        <div className="dash-stats">
          {stats.map((card) => (
            <div key={card.label} className="dash-stat-card">
              <span>{card.label}</span>
              <strong>{card.value}</strong>
            </div>
          ))}
        </div>
      </section>

      <section className="dash-grid">
        <div className="dash-main">
          <div className="glass-panel">
            <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <h3 style={{ margin: 0 }}>Featured templates</h3>
                <p style={{ margin: "6px 0 0", color: "#94a3b8" }}>Kickstart workshops with curated canvases.</p>
              </div>
              <button className="nav-pill" onClick={() => setShowModal(true)}>Create workspace</button>
            </header>
            <div className="template-grid">
              {featuredTemplates.map((t) => (
                <article key={t.id} className="template-card" onClick={() => quickCreate(t.id)}>
                  <h4>{t.title}</h4>
                  <p>{t.desc}</p>
                  <footer>
                    <span>Template</span>
                    <button className="btn" style={{ padding: "6px 12px" }}>Use</button>
                  </footer>
                </article>
              ))}
            </div>
          </div>

          <div className="glass-panel">
            <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <h3 style={{ margin: 0 }}>Recent workspaces</h3>
                <p style={{ margin: "6px 0 0", color: "#94a3b8" }}>Pick up where your team left off.</p>
              </div>
              <button className="nav-pill" onClick={() => navigate("/workspace/1")}>View all</button>
            </header>
            <div className="recent-grid">
              {recentWorkspaces.map((ws) => (
                <div key={ws.id} className="recent-card">
                  <div>
                    <h4>{ws.title}</h4>
                    <span>{ws.boards} boards • Updated {ws.updated}</span>
                  </div>
                  <button onClick={() => navigate(`/workspace/${ws.link}`)}>Open</button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <aside className="dash-aside">
          <div className="glass-panel">
            <h3 style={{ marginTop: 0 }}>Activity timeline</h3>
            <div className="timeline">
              {activityTimeline.map((item) => (
                <div key={item.title} className="timeline-item">
                  <div className="timeline-dot" />
                  <div className="timeline-content">
                    <h5>{item.title}</h5>
                    <span>{item.subtitle}</span>
                    <span style={{ color: "#64748b", marginTop: 4 }}>{item.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel dash-upgrade">
            <h4>Level up collaboration</h4>
            <p>Unlock real-time presence, advanced roles, and analytics with the studio plan.</p>
            <button onClick={() => navigate("/workspace")}>Explore plans</button>
          </div>
        </aside>
      </section>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Create new workspace</h3>
            <input type="text" placeholder="Workspace Name" value={newName} onChange={(e) => setNewName(e.target.value)} />
            <input type="text" placeholder="Description" value={newDescription} onChange={(e) => setNewDescription(e.target.value)} />
            <div style={{ display: "flex", justifyContent: "center", gap: 12 }}>
              <button className="btn" onClick={handleCreateWorkspace}>Create</button>
              <button className="btn" onClick={() => setShowModal(false)} style={{ background: "#ef4444" }}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}