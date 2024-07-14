import React from "react";
import { Routes, Route } from "react-router-dom";
import ProfileSection from "./ProfileSection";
import MessageSection from "./MessageSection";
import BookmarksSection from "./BookmarksSection";
import VisitsSection from "./VisitsSection";
import ToReviewSection from "./ToReviewSection";
import SecuritySection from "./SecuritySection";
import "./Profile.css";

const ProfileContent = ({ user }) => {
  return (
    <div className="content">
      <Routes>
        <Route path="/" element={<ProfileSection user={user} />} />
        <Route path="ProfileSection" element={<ProfileSection user={user} />} />
        <Route path="BookmarksSection" element={<BookmarksSection />} />
        <Route path="VisitsSection" element={<VisitsSection />} />
        <Route path="ToReviewSection" element={<ToReviewSection />} />
        <Route path="SecuritySection" element={<SecuritySection user={user}/>} />
        <Route path="MessageSection" element={<MessageSection />} />
      </Routes>
    </div>
  );
};

export default ProfileContent;
