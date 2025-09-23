import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [userid, setUserId] = useState("");
  const [upassword, setPassword] = useState("");
  const [error, setError] = useState("");

  const loginFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/login",
        { userid, upassword },
        { withCredentials: true }
      );
      if (response.status == 200) {
        navigate("/");
      }
      setUserId("");
      setPassword("");
      setError("");
    } catch (error) {
      if (error.response) {
        const status = error.response.status;
        if (status === 400) {
          setError("All fields are required");
        } else if (status === 404) {
          setError("User not found");
        } else if (status === 401) {
          setError("Invalid password");
        } else if (status === 500) {
          setError("Server error, try again later");
        } else {
          setError("Login failed");
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
        onSubmit={loginFormSubmit}
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-sm"
      >
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Login
        </h1>

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
          value={upassword}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className="w-full px-4 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Login
        </button>

        {error && (
          <p className="text-red-500 text-sm mt-3 text-center">{error}</p>
        )}
      </form>
    </div>
  );
};

export default Login;
