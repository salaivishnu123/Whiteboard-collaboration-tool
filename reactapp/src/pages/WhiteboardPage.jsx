// src/pages/WhiteboardPage.jsx
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import WhiteboardCanvas from "../components/WhiteboardCanvas";

const WhiteboardPage = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // whiteboardId from route

  const handleFocusCanvas = () => {
    document.getElementById("whiteboard-canvas-section")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="whiteboard-page">
      <section className="whiteboard-hero">
        <div>
          <h1>Immersive Whiteboard {id ? `#${id}` : "Studio"}</h1>
          <p>
            Sketch product flows, annotate discoveries, or storyboard features with a precision canvas that adapts to your
            surface preferences. Everything auto-saves, so you can focus on capturing ideas.
          </p>
        </div>
        <div className="hero-actions">
          <button className="primary" onClick={handleFocusCanvas}>Start sketching</button>
          <button className="ghost" onClick={() => navigate("/workspace")}>Back to workspaces</button>
        </div>
      </section>

      <div id="whiteboard-canvas-section">
        <WhiteboardCanvas whiteboardId={id} />
      </div>
    </div>
  );
};

export default WhiteboardPage;
