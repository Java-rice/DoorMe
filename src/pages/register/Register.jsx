import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";

import backgroundImage from "../../assets/backgroundRegister.png";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [university, setUniversity] = useState("");
  const [socialStatus, setSocialStatus] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showTooltip, setShowTooltip] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    const user = {
      fullName,
      email,
      university,
      socialStatus,
      phoneNumber,
      username,
      password,
    };

    try {
      await axios.post("http://localhost:5000/api/register", user);
      navigate("/login");
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  return (
    <div
      className="register-page"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="register-container">
        <h1>Register</h1>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="University"
            value={university}
            onChange={(e) => setUniversity(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Social Status (e.g., Student, Landlord)"
            value={socialStatus}
            onChange={(e) => setSocialStatus(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <FontAwesomeIcon
            icon={faQuestionCircle}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            className="tooltip-icon"
          />
          {showTooltip && (
            <div className="tooltip">
              Password must be at least 8 characters long and contain at least
              one uppercase letter, one lowercase letter, and one number.
            </div>
          )}
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
