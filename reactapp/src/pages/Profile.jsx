import React from "react";
import "../styles/dashboard.css";

export default function Profile() {
  const user = {
    name: "Salai Jayavishnu G",
    email: "salai@gmail.com",
    role: "Member",
  };

  return (
    <div className="profile-page fade-in">
      <h2>User Profile</h2>
      <div className="profile-card">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>
      </div>
    </div>
  );
}