import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";

// Pages
import Dashboard from "./pages/Dashboard";
import WorkspacePage from "./pages/WorkspacePage";
import WhiteboardPage from "./pages/WhiteboardPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./styles/app.css";
// Layout Components
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

// Layout wrapper
const Layout = ({ children }) => {
  const location = useLocation();
  const hideLayout = ["/login", "/register"].some((path) => location.pathname.startsWith(path));

  const user = React.useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("user"));
    } catch (_) {
      return null;
    }
  }, [location.key, location.pathname]);

  if (hideLayout) {
    return <>{children}</>; // only render login/register pages
  }

  return (
    <div className="app-container">
      {/* Navbar at top */}
      <Navbar user={user} />

      <div className="main-layout">
        {/* Sidebar on left */}
        <Sidebar />

        {/* Main content */}
        <main className="content-area">{children}</main>
      </div>
    </div>
  );
};

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  let user = null;
  try {
    user = JSON.parse(localStorage.getItem("user"));
  } catch (_) {
    user = null;
  }

  if (!user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
};

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/workspace" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/workspace"
            element={(
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            )}
          />
          <Route
            path="/workspace/:id"
            element={(
              <ProtectedRoute>
                <WorkspacePage />
              </ProtectedRoute>
            )}
          />
          <Route
            path="/whiteboard/:id"
            element={(
              <ProtectedRoute>
                <WhiteboardPage />
              </ProtectedRoute>
            )}
          />

          <Route path="*" element={<Navigate to="/workspace" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
