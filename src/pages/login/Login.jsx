import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

function Login({ setIsLoggedIn }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (username.trim() === "") {
      setUsernameError("Username is required");
    } else {
      setUsernameError("");
    }

    if (password.trim() === "") {
      setPasswordError("Password is required");
    } else {
      setPasswordError("");
    }

    if (username && password) {
      try {
        const response = await axios.post("http://localhost:5000/api/login", {
          username,
          password,
        });
        if (response.data.message === "Login successful") {
          localStorage.setItem("user", JSON.stringify(response.data.user));
          navigate("/Home");
          window.location.reload();
        }
      } catch (error) {
        if (error.response && error.response.status === 400) {
          setLoginError("Invalid username or password");
        } else {
          console.error("There was an error logging in!", error);
        }
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <h1>Login</h1>
        <p>Knock, Knock! Welcome to DoorMe!</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            className="login-input"
            value={username}
            onChange={handleUsernameChange}
          />
          {usernameError && <p className="error-message">{usernameError}</p>}
          <input
            type="password"
            placeholder="Password"
            className="login-input"
            value={password}
            onChange={handlePasswordChange}
          />
          {passwordError && <p className="error-message">{passwordError}</p>}
          {loginError && <p className="error-message">{loginError}</p>}
          <button type="submit" className="login-button">
            Login Now
          </button>
        </form>
        <p>
          Don’t have an account?{" "}
          <a href="/register" className="create-account-link">
            Create an account
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
