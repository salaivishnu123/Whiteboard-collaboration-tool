import axios from "axios";

const computeDefaultBase = () => {
  if (typeof window !== "undefined" && window.location) {
    try {
      const url = new URL(window.location.href);
      const { protocol, hostname } = url;
      
      // Premium project pattern mapping: 8081-xxxx -> 8080-xxxx (no explicit port)
      if (/\.premiumproject\.examly\.io$/.test(hostname)) {
        if (hostname.startsWith("8081-")) {
          const backendHost = hostname.replace(/^8081-/, "8080-");
          const backendURL = `${protocol}//${backendHost}`;
          return backendURL;
        }
        if (hostname.startsWith("8080-")) {
          return `${protocol}//${hostname}`;
        }
      }
      // Local dev: map to :8080 on same host
      if (hostname === "localhost" || hostname === "127.0.0.1") {
        return `${protocol}//${hostname}:8080`;
      }
      // Fallback
      return "http://localhost:8080";
    } catch (e) {
      console.error("Error computing API base:", e);
      return "http://localhost:8080";
    }
  }
  return "http://localhost:8080";
};

export const API_BASE = process.env.REACT_APP_API_BASE || computeDefaultBase();

// Configure axios defaults
axios.defaults.timeout = 30000;
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["Accept"] = "application/json";

// Auth API functions
export const register = (payload) => 
  axios.post(`${API_BASE}/api/auth/register`, payload).then(r => r.data);

export const login = (payload) => 
  axios.post(`${API_BASE}/api/auth/login`, payload).then(r => r.data);

export const logout = () => 
  axios.post(`${API_BASE}/api/auth/logout`).then(r => r.data);

// User API functions
export const getProfile = () => 
  axios.get(`${API_BASE}/api/users/profile`).then(r => r.data);

export const updateProfile = (payload) => 
  axios.put(`${API_BASE}/api/users/profile`, payload).then(r => r.data);

// Workspace API functions
export const listWorkspaces = (email, page = 0, size = 10, sortBy = "id", sortDir = "asc") => 
  axios.get(`${API_BASE}/api/workspaces`, {
    params: { email, page, size, sortBy, sortDir }
  }).then(r => r.data);

export const getWorkspace = (id) => 
  axios.get(`${API_BASE}/api/workspaces/${id}`).then(r => r.data);

export const createWorkspace = (payload) => 
  axios.post(`${API_BASE}/api/workspaces`, payload).then(r => r.data);

export const updateWorkspace = (id, payload) => 
  axios.put(`${API_BASE}/api/workspaces/${id}`, payload).then(r => r.data);

export const deleteWorkspace = (id) => 
  axios.delete(`${API_BASE}/api/workspaces/${id}`).then(r => r.data);
