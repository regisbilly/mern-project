import React, { useState } from "react";
import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import app from "../firebase/firebase.config";
import { FaGoogle, FaFacebook, FaLinkedin, FaInstagram } from "react-icons/fa";

const Login = () => {
  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Handle Google Login
  const handleGoogleLogin = async () => {
    setError(""); // Reset error message
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/"); // Redirect to home page on success
    } catch (error) {
      setError(error.message); // Display error message
    }
  };

  // Handle Email & Password Login
  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setError(""); // Reset error message
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/"); // Redirect to home page on success
    } catch (error) {
      setError("Invalid email or password. Please try again."); // User-friendly error message
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="p-4 rounded-lg shadow-lg w-full max-w-[20rem] h-[90%] bg-white">
        <h2 className="text-2xl font-semibold text-center mb-3">Please Login!</h2>

        {/* Display error message */}
        {error && <p className="text-red-500 text-sm text-center mb-2">{error}</p>}

        {/* Email & Password Login */}
        <form onSubmit={handleEmailLogin} className="space-y-2">
          <div>
            <label className="text-sm font-medium text-gray-600">Email Address</label>
            <input
              type="email"
              placeholder="name@email.com"
              className="w-full px-4 py-2 border rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-primary/60"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">Password</label>
            <input
              type="password"
              placeholder="************"
              className="w-full px-4 py-2 border rounded-lg mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-primary/60"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="flex justify-between items-center">
            <button
              type="submit"
              className="bg-blue hover:bg-blue-700 text-white py-2 px-6 rounded-lg w-full"
            >
              Sign in
            </button>
          </div>
        </form>

        <div className="text-right text-xs text-blue-500 mt-2 cursor-pointer hover:underline">
          Forgot Password?
        </div>

        {/* Social Login */}
        <div className="text-center mt-6 text-gray-500 text-sm">Sign in with Social</div>
        <div className="flex justify-center gap-4 mt-4">
          <button
            className="p-3 bg-gray-200 rounded-full hover:bg-gray-300"
            onClick={handleGoogleLogin}
          >
            <FaGoogle className="text-red-500 text-xl" />
          </button>
          <button className="p-3 bg-gray-200 rounded-full hover:bg-gray-300">
            <FaFacebook className="text-blue-600 text-xl" />
          </button>
          <button className="p-3 bg-gray-200 rounded-full hover:bg-gray-300">
            <FaLinkedin className="text-blue-700 text-xl" />
          </button>
          <button className="p-3 bg-gray-200 rounded-full hover:bg-gray-300">
            <FaInstagram className="text-pink-500 text-xl" />
          </button>
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          ©2025 JobPortal. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Login;