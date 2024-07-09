import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Profile.css";


const Profile = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // This state should be managed globally or passed as props from a global state management solution like Redux

  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);


  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <div className="profile">
      <div className="profile-container">
        <div className="sidebar">
          <ul className="menu">
            <li className="menu-item">
              <span className="material-icons">person</span>
              <span>Profile</span>
            </li>
            <li className="menu-item">
              <span className="material-icons">bookmark</span>
              <span>Bookmarks</span>
            </li>
            <li className="menu-item">
              <span className="material-icons">event</span>
              <span>Visits</span>
            </li>
            <li className="menu-item">
              <span className="material-icons">rate_review</span>
              <span>To Review</span>
            </li>
            <li className="menu-item">
              <span className="material-icons">security</span>
              <span>Security</span>
            </li>
            <li className="menu-item" onClick={handleLogout}>
              <span className="material-icons">logout</span>
              <span>Logout</span>
            </li>
          </ul>
        </div>

        <div className="content">
          <div className="profile-details">
            <img
              className="profile-picture"
              src="https://placehold.co/100x100"
              alt="User Profile Picture"
            />
            <button className="change-picture">Change Picture</button>
            <h1 className="profile-name">Welcome, Kurt Patrick!</h1>
          </div>
          <div className="profile-info">
            <div className="info-item">
              <span className="info-label">Name</span>
              <span className="info-value">Kurt Patrick Peroche</span>
              <span className="material-icons edit-icon">edit</span>
            </div>
            <div className="info-item">
              <span className="info-label">Email Address</span>
              <span className="info-value">kurpatper@gmail.com</span>
              <span className="material-icons edit-icon">edit</span>
            </div>
            <div className="info-item">
              <span className="info-label">Mobile Number</span>
              <span className="info-value">09987562853</span>
              <span className="material-icons edit-icon">edit</span>
            </div>
            <div className="info-item">
              <span className="info-label">Account Type</span>
              <span className="info-value">Renter</span>
            </div>
          </div>
        </div>
      </div>
      <link
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
        rel="stylesheet"
      />
    </div>
  );
};

export default Profile;
