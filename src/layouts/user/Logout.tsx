import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Remove the token from local storage
    localStorage.removeItem("token");

    // Redirect to the home page after removing the token
    navigate("/"); // Redirect to the home page or desired route
    // Optionally, you can reload the page after navigation
    window.location.reload();
  }, [navigate]);

  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p>Loading...</p>
    </div>
  );
};
