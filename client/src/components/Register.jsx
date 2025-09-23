import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [username, setUserName] = useState("");
  const [userid, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");

  const registerFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/register",
        { username, userid, password, role },
        { withCredentials: true }
      );
      setUserName("");
      setUserId("");
      setPassword("");
      setRole("");
      setError("");
    } catch (error) {
      if (error.response) {
        const status = error.response.status;
        if (status === 400) {
          setError("All fields are required in register");
        } else if (status == 409) {
          setError("user already registered");
        } else if (status === 500) {
          setError("Server error, try again later");
        } else {
          setError("Register failed");
        }
      } else {
        setError("Network error, check your connection");
      }
      console.log(`Error on submit login form : ${error}`);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={registerFormSubmit}
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-sm"
      >
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Register
        </h1>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
          placeholder="User Name"
          required
          className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          id="userid"
          value={userid}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="User Id"
          required
          className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          required
          className="w-full px-4 py-2 mb-4 border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">--Please choose a role--</option>
          <option value="admin">admin</option>
          <option value="manager">manager</option>
          <option value="employee">employee</option>
        </select>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Register
        </button>
        <button
          type="button"
          onClick={() => navigate("/")}
          className="w-full mt-1.5 bg-gray-300 text-gray-700 font-semibold py-2 rounded-lg hover:bg-gray-400 transition duration-300"
        >
          Back
        </button>

        {error && (
          <p className="text-red-500 text-sm mt-3 text-center">{error}</p>
        )}
      </form>
    </div>
  );
};

export default Register;
