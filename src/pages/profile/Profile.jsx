import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Profile.css";

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("user") !== null
  );

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/");
  };

  const getAccountType = () => {
    if (user) {
      return user.hasOwnProperty("university") ? "Renter" : "Landowner";
    }
    return "";
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
            {user && (
              <h1 className="text-xl font-semibold mt-4">
                Welcome, {user.fullName}!
              </h1>
            )}
          </div>
          <div className="profile-info">
            <div className="info-item">
              <span className="info-label">Name</span>
              {user && (
                <h1 className="flex-1 text-right mr-4">{user.fullName}</h1>
              )}
              <span className="material-icons edit-icon">edit</span>
            </div>
            <div className="info-item">
              <span className="info-label">Email Address</span>
              {user && <h1 className="flex-1 text-right mr-4">{user.email}</h1>}
              <span className="material-icons edit-icon">edit</span>
            </div>
            <div className="info-item">
              <span className="info-label">Mobile Number</span>
              {user && (
                <h1 className="flex-1 text-right mr-4">{user.phoneNumber}</h1>
              )}
              <span className="material-icons edit-icon">edit</span>
            </div>
            <div className="info-item">
              <span className="info-label">Account Type</span>
              <span className="flex-1 text-right mr-4">{getAccountType()}</span>
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
