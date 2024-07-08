import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";

import backgroundImage from "../../assets/backgroundRegister.png";

const Register = () => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    university: "",
    socialStatus: "",
    phoneNumber: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [touched, setTouched] = useState({});
  const [showTooltip, setShowTooltip] = useState(false);
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
    setTouched((prevTouched) => ({
      ...prevTouched,
      [name]: true,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const allFieldsFilled = Object.keys(form).every((key) => form[key]);
    const passwordsMatch = form.password === form.confirmPassword;

    if (!allFieldsFilled || !passwordsMatch) {
      setShowTooltip(true);
      setPasswordMismatch(!passwordsMatch);
    } else {
      setShowTooltip(false);
      setPasswordMismatch(false);
      try {
        const response = await axios.post(
          "http://localhost:5000/register",
          form
        );
        if (response.data.message === "User registered successfully") {
          navigate("/success");
        }
      } catch (error) {
        console.error("There was an error registering!", error);
      }
    }
  };

  const renderTooltip = (field) => {
    return showTooltip && !form[field] && touched[field] ? (
      <span className="required-tooltip active">
        <FontAwesomeIcon
          icon={faQuestionCircle}
          className="text-gray-500 text-sm cursor-pointer"
        />
        <span className="tooltip-text"></span>
      </span>
    ) : (
      <span className="required-tooltip">
        <FontAwesomeIcon
          icon={faQuestionCircle}
          className="text-gray-500 text-sm cursor-pointer"
        />
        <span className="tooltip-text"></span>
      </span>
    );
  };

  // University options from StudentRegister component
  const universities = [
    "Adamson University",
    "Ateneo de Manila University",
    "De La Salle University",
    "De La Salle-College of Saint Benilde",
    "National University, Philippines",
    "Polytechnic University of the Philippines",
    "University of Santo Tomas",
    "University of the Philippines Diliman",
    "University of the Philippines Manila",
    "University of the Philippines System",
  ];

  return (
    <div className="flex flex-col md:flex-row">
      <div className="md:w-1/2 bg-white p-10">
        <h1 className="text-3xl font-bold text-gray-800">
          Input your information
        </h1>
        <p className="text-sm text-gray-600 mt-2">
          We need you to help us with some basic information for your account
          creation. Here are our{" "}
          <span className="text-blue-600">terms and conditions</span>. Please
          read them carefully. We are GDPR compliant.
        </p>

        <form onSubmit={handleSubmit} className="mt-6">
          <div className="flex flex-col md:flex-row mb-4">
            <div className="w-full md:w-1/2 pr-0 md:pr-3 mb-4 md:mb-0">
              <label className="block mb-1">
                <span>Full Name {renderTooltip("fullName")}</span>
              </label>
              <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
                value={form.fullName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="w-full md:w-1/2 pl-0 md:pl-3">
              <label className="block mb-1">
                Email {renderTooltip("email")}
              </label>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row mb-4">
            <div className="w-full md:w-1/2 pr-0 md:pr-3 mb-4 md:mb-0">
              <label className="block mb-1">
                University {renderTooltip("university")}
              </label>
              <select
                name="university"
                className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
                value={form.university}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Select University
                </option>
                {universities.map((uni, index) => (
                  <option key={index} value={uni}>
                    {uni}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-full md:w-1/2 pl-0 md:pl-3">
              <label className="block mb-1">
                Social Status {renderTooltip("socialStatus")}
              </label>
              <input
                type="text"
                name="socialStatus"
                placeholder="Your Social Status"
                className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
                value={form.socialStatus}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row mb-4">
            <div className="w-full md:w-1/2 pr-0 md:pr-3 mb-4 md:mb-0">
              <label className="block mb-1">
                Phone Number {renderTooltip("phoneNumber")}
              </label>
              <input
                type="tel"
                name="phoneNumber"
                placeholder="+63 999 999 9999"
                className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
                pattern="[0-9]{11}"
                value={form.phoneNumber}
                onChange={handleChange}
                required
              />
            </div>
            <div className="w-full md:w-1/2 pl-0 md:pl-3">
              <label className="block mb-1">
                Username {renderTooltip("username")}
              </label>
              <input
                type="text"
                name="username"
                placeholder="Username"
                className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
                value={form.username}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row mb-4">
            <div className="w-full md:w-1/2 pr-0 md:pr-3 mb-4 md:mb-0">
              <label className="block mb-1">
                Password {renderTooltip("password")}
              </label>
              <input
                type="password"
                name="password"
                className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="w-full md:w-1/2 pl-0 md:pl-3">
              <label className="block mb-1">
                Confirm Password {renderTooltip("confirmPassword")}
              </label>
              <input
                type="password"
                name="confirmPassword"
                className="w-full px-3 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
                value={form.confirmPassword}
                onChange={handleChange}
                required
              />
              {passwordMismatch && touched.confirmPassword && (
                <span className="text-red-500 text-xs">
                  Passwords do not match.
                </span>
              )}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded"
            >
              Register
            </button>
          </div>
        </form>
      </div>

      <div
        className="md:w-1/2 bg-cover bg-center h-64 md:h-auto"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      ></div>
    </div>
  );
};

export default Register;
