import React from "react";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <span className="navbar-title">AppName</span>
      </div>
      <div className="navbar-right">
        <button className="navbar-BUTT " onClick={() => navigate("/events")}>
          Events
        </button>
        <button className="navbar-BUTT " onClick={() => navigate("/")}>
          Participants
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
