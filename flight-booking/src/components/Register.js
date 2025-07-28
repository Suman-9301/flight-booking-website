
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isEmailRegistered, setIsEmailRegistered] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setIsEmailRegistered(false);

    const userData = { username, email, mobile, password };

    const isValidEmail = /\S+@\S+\.\S+/.test(email);
    if (!isValidEmail) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const result = await response.json();
      
      if (response.ok) {
        localStorage.setItem("token", result.token);
        localStorage.setItem("username", result.user.username);
        localStorage.setItem("email", result.user.email);
        localStorage.setItem("mobile", result.user.mobile);
        localStorage.setItem("userId", result.user.id);
        alert("Registration successful!");
        navigate("/");
      } else {
        if (result.error && result.error.includes("Account already exists")) {
          setIsEmailRegistered(true);
        }
        setError(result.error || "Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Error sending registration data:", error);
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-gray-100  shadow-xl outline outline-black/5 rounded-lg p-8 my-10">
      <h1 className="text-3xl font-extrabold text-primary mb-6 text-center">Register</h1>
      
      {/* Error message display */}
      {error && (
        <div className={`mb-4 p-3 rounded-md ${isEmailRegistered ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-700'}`}>
          {error}
          {isEmailRegistered && (
            <div className="mt-2">
              <Link 
                to="/login" 
                className="text-accent hover:underline font-semibold"
              >
                Click here to login instead
              </Link>
            </div>
          )}
        </div>
      )}
      
      <form onSubmit={handleRegister} className="space-y-6">
        <div>
          <label className="block text-textDark font-semibold">Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-accent focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-textDark font-semibold">Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={`w-full border rounded-lg px-4 py-2 focus:ring-2 focus:outline-none ${
              isEmailRegistered 
                ? 'border-yellow-500 focus:ring-yellow-300' 
                : 'border-gray-300 focus:ring-accent'
            }`}
          />
          {isEmailRegistered && (
            <p className="text-yellow-600 text-sm mt-1">
              This email is already registered
            </p>
          )}
        </div>

        <div>
          <label className="block text-textDark font-semibold">Mobile Number:</label>
          <input
            type="tel"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            required
            pattern="[0-9]{10}"
            maxLength="10"
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
          Register
        </button>
        
        <div className="text-center mt-4">
          <p className="text-textDark">
            Already have an account?{" "}
            <Link 
              to="/login" 
              className="text-accent hover:underline font-semibold"
            >
              Login here
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Register;