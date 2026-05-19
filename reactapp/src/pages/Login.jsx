// src/pages/Login.jsx
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./../styles/auth.css";
import { login } from "../services/api";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      const existing = JSON.parse(localStorage.getItem("user"));
      if (existing) {
        navigate("/workspace", { replace: true });
      }
    } catch (_) {
      // ignore parsing errors
    }
  }, [navigate]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      const payload = {
        email: formData.email.trim(),
        password: formData.password,
      };
      const user = await login(payload);
      localStorage.setItem("user", JSON.stringify(user));
      const destination = location.state?.from?.pathname || "/workspace";
      navigate(destination, { replace: true });
    } catch (err) {
      const status = err?.response?.status;
      let message = err?.response?.data?.message || err?.message;
      if (status === 401) {
        message = message || "Invalid email or password.";
      } else if (!status) {
        message = message || "Unable to reach the server. Please verify the backend is running.";
      } else {
        message = message || "Login failed. Please try again.";
      }
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Welcome back</h2>
        <p style={{ color: "#9ca3af", marginBottom: "1.5rem" }}>Sign in to continue collaborating.</p>

        {error && (
          <div style={{
            background: "rgba(248, 113, 113, 0.18)",
            border: "1px solid rgba(239, 68, 68, 0.45)",
            color: "#fecaca",
            padding: "0.65rem 0.85rem",
            borderRadius: "10px",
            marginBottom: "1rem",
          }}>
            {error}
          </div>
        )}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          autoComplete="email"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          autoComplete="current-password"
          minLength={4}
          required
        />

        <button type="submit" className="auth-btn" disabled={loading}>
          {loading ? "Signing in..." : "Login"}
        </button>

        <p>
          Don't have an account? <Link to="/register">Create one</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
