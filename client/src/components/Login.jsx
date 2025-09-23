import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [userid, setUserId] = useState("");
  const [upassword, setPassword] = useState("");
  const [error, setError] = useState("");

  const loginFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const user_response = await axios.post(
        "http://localhost:5000/login",
        { userid, upassword },
        { withCredentials: true }
      );
      const response = user_response.data;
      console.log(response);
    } catch (error) {
      console.log(`Error on submit login form : ${error}`);
      setError(`Error on submit login form : ${error}`);
    }
    setUserId("");
    setPassword("");
    setUserId("");
  };
  return (
    <form onSubmit={loginFormSubmit}>
      <h1>Login Form</h1>
      <input
        type="text"
        name=""
        id="userid"
        onChange={(e) => setUserId(e.target.value)}
        placeholder="User Id"
        required
      />
      <input
        type="password"
        name=""
        id="password"
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Login</button>
      <p>{error}</p>
    </form>
  );
};

export default Login;
