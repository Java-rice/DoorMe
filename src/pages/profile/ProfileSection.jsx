import React from "react";

const ProfileSection = ({ user }) => (
  <div>
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
        {user && <h1 className="flex-1 text-right mr-4">{user.fullName}</h1>}
        <span className="material-icons edit-icon">edit</span>
      </div>
      <div className="info-item">
        <span className="info-label">Email Address</span>
        {user && <h1 className="flex-1 text-right mr-4">{user.email}</h1>}
        <span className="material-icons edit-icon">edit</span>
      </div>
      <div className="info-item">
        <span className="info-label">Mobile Number</span>
        {user && <h1 className="flex-1 text-right mr-4">{user.phoneNumber}</h1>}
        <span className="material-icons edit-icon">edit</span>
      </div>
      <div className="info-item">
        <span className="info-label">Account Type</span>
        <span className="flex-1 text-right mr-4">
          {user && (user.university ? "Renter" : "Landowner")}
        </span>
      </div>
    </div>
  </div>
);

export default ProfileSection;