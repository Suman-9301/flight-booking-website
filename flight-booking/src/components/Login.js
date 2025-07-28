

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const loginData = { email, password };

    const isValidEmail = /\S+@\S+\.\S+/.test(email);
    if (!isValidEmail) {
      alert("Please enter a valid email address.");
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const result = await response.json();
      console.log("Login Result: ", result);

      if (response.ok) {
          localStorage.setItem("token", result.token);
          localStorage.setItem("username", result.user.username);
          localStorage.setItem("email", result.user.email);
          localStorage.setItem("mobile", result.user.mobile);
          localStorage.setItem("userId", result.user.id);
          alert("Login successful!");
          navigate("/");
      } else {
        alert("Invalid credentials. Please try again.");
        console.error(result);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };
  
  return (
    <div className="max-w-lg mx-auto bg-gray-100 shadow-xl outline outline-black/5 rounded-lg p-8 my-10">
      <h1 className="text-3xl font-extrabold text-primary mb-6 text-center">
        Login
      </h1>
      <form onSubmit={handleLogin} className="space-y-6">
        <div>
          <label className="block text-textDark font-semibold">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-accent focus:outline-none"
          />
        </div>
        <div>
          <label className="block text-textDark font-semibold">Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-accent focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-orange-500 text-textLight py-3 rounded-lg font-semibold hover:bg-orange-600 transition duration-300"
        >
          Login 
        </button>
        
        {/* Added register link */}
        <div className="text-center mt-4">
          <p className="text-textDark">
            Not registered yet?{" "}
            <Link 
              to="/register" 
              className="text-accent hover:underline font-semibold"
            >
              Create an account
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Login;