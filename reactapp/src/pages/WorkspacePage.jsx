import React, { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import WorkspaceCard from "../components/WorkspaceCard";
import { listWorkspaces, createWorkspace, deleteWorkspace, getWorkspace } from "../services/api";
import "../styles/workspace.css";

export default function WorkspacePage() {
  const navigate = useNavigate();
  
  const [workspaces, setWorkspaces] = useState([]);
  const [workspaceName, setWorkspaceName] = useState("");
  const [workspaceSearch, setWorkspaceSearch] = useState("");
  const [user, setUser] = useState(null);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(6);
  const [totalPages, setTotalPages] = useState(0);
  const [sortBy, setSortBy] = useState("id");
  const [sortDir, setSortDir] = useState("asc");
  const [loading, setLoading] = useState(false);

  const fetchWorkspaces = useCallback(async (email) => {
    try {
      const response = await listWorkspaces(email, page, size, sortBy, sortDir);
      setWorkspaces(response.content);
      setTotalPages(response.totalPages);
    } catch (err) {
      console.error("Error fetching workspaces:", err);
    }
  }, [page, size, sortBy, sortDir]);

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem("user"));
    setUser(loggedUser);

    if (loggedUser?.email) {
      fetchWorkspaces(loggedUser.email);
    }
  }, [fetchWorkspaces, page, size, sortBy, sortDir]);

  const handleCreateWorkspace = async () => {
    if (!workspaceName.trim()) {
      alert("Please enter a workspace name");
      return;
    }

    if (!user?.email) {
      alert("Please log in to create a workspace");
      return;
    }

    try {
      await createWorkspace({
        name: workspaceName.trim(),
        ownerEmail: user.email,
        members: [user.email]
      });

      // Refresh the workspace list after creation
      fetchWorkspaces(user.email);
      setWorkspaceName("");
      alert("Workspace created successfully!");
    } catch (error) {
      console.error("Error creating workspace:", error);
      alert("Failed to create workspace");
    }
  };

  const handleDeleteWorkspace = async (workspaceId) => {
    if (!window.confirm("Are you sure you want to delete this workspace?")) {
      return;
    }

    try {
      setLoading(true);
      await deleteWorkspace(workspaceId);
      // Refresh the workspace list after deletion
      fetchWorkspaces(user?.email);
      alert("Workspace deleted successfully!");
    } catch (error) {
      console.error("Error deleting workspace:", error);
      alert("Failed to delete workspace: " + (error.response?.data || error.message));
    } finally {
      setLoading(false);
    }
  };

  const handleOpenWorkspace = async (workspaceId) => {
    try {
      setLoading(true);
      const workspace = await getWorkspace(workspaceId);
      // Navigate to the whiteboard page with the workspace context
      navigate(`/whiteboard/${workspaceId}`, { state: { workspace } });
    } catch (error) {
      console.error("Error opening workspace:", error);
      alert("Failed to open workspace: " + (error.response?.data || error.message));
    } finally {
      setLoading(false);
    }
  };

  const filteredWorkspaces = workspaces.filter(ws =>
    ws.name.toLowerCase().includes(workspaceSearch.toLowerCase()) ||
    ws.ownerEmail.toLowerCase().includes(workspaceSearch.toLowerCase())
  );

  return (
    <div className="workspace-page">
      <section className="workspace-hero">
        <div>
          <p className="workspace-kicker">Workspaces</p>
          <h2>Manage Your Creative Spaces</h2>
          <p className="workspace-subtitle">Create, organize, and collaborate in dedicated workspaces.</p>
        </div>
      </section>

      <section className="workspace-body">
        <div className="workspace-left">
          <div className="workspace-actions">
            <div className="workspace-actions-header">
              <h3>Create a new workspace</h3>
              <p>Set up a fresh canvas hub for your next project.</p>
            </div>
            <div className="workspace-create">
              <input
                type="text"
                placeholder="Workspace name"
                value={workspaceName}
                onChange={(e) => setWorkspaceName(e.target.value)}
              />
              <button className="btn" onClick={handleCreateWorkspace}>
                {loading ? "Creating..." : "Create Workspace"}
              </button>
            </div>
            <div className="workspace-search">
              <input
                type="text"
                placeholder="Search workspaces..."
                value={workspaceSearch}
                onChange={(e) => setWorkspaceSearch(e.target.value)}
              />
            </div>

            <div className="workspace-controls">
              <div className="sorting-controls">
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="id">ID</option>
                  <option value="name">Name</option>
                  <option value="ownerEmail">Owner</option>
                </select>
                <button 
                  className="sort-direction-btn"
                  onClick={() => setSortDir(sortDir === "asc" ? "desc" : "asc")}
                >
                  {sortDir === "asc" ? "↑" : "↓"}
                </button>
                <select
                  value={size}
                  onChange={(e) => setSize(Number(e.target.value))}
                  className="page-size-select"
                >
                  <option value={6}>6 per page</option>
                  <option value={12}>12 per page</option>
                  <option value={24}>24 per page</option>
                </select>
              </div>
            </div>
          </div>

          <div className="workspace-grid">
            {loading && <div className="workspace-loading">Loading...</div>}
            {!loading && filteredWorkspaces.length > 0 ? (
              filteredWorkspaces.map((workspace) => (
                <WorkspaceCard
                  key={workspace.id}
                  workspace={workspace}
                  onSelect={() => handleOpenWorkspace(workspace.id)}
                  onDelete={() => handleDeleteWorkspace(workspace.id)}
                />
              ))
            ) : !loading && (
              <div className="workspace-empty">
                <h4>No workspaces found</h4>
                <p>Try different search terms or create a new workspace.</p>
              </div>
            )}
          </div>

          <div className="workspace-pagination">
            <button
              onClick={() => setPage(page - 1)}
              disabled={page === 0}
            >
              Previous
            </button>
            <span>Page {page + 1} of {totalPages}</span>
            <button
              onClick={() => setPage(page + 1)}
              disabled={page >= totalPages - 1}
            >
              Next
            </button>
          </div>
        </div>

        <aside className="workspace-right">
          <div className="workspace-detail">
            <h3>Welcome to Workspaces</h3>
            <p>
              Select a workspace to view details, create whiteboards, and manage collaborators.
            </p>
            <ul className="workspace-tips">
              <li>Create a new workspace using the form on the left</li>
              <li>Use filters and sorting to organize your spaces</li>
              <li>Click on a workspace to view its details and whiteboards</li>
            </ul>
          </div>
        </aside>
      </section>
    </div>
  );
}