// src/pages/LoginPage.tsx
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleLogin = () => {
    let isValid = true;

    if (!email.trim()) {
      setEmailError("Email is required");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (!password.trim()) {
      setPasswordError("Password is required");
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (isValid) {
      console.log("Logging in with:", { email, password });
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 dark:bg-gray-900 flex flex-col items-center justify-center px-4 transition-colors">
      {/* Centered Logo */}
      <div className="mb-6">
        <img
          src="/src/assets/logo.jpg"
          alt="Logo"
          className="h-16 w-auto object-contain"
        />
      </div>

      {/* Login Card */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md w-full max-w-sm p-6 space-y-5 border border-blue-100 dark:border-gray-700 transition-colors">
        <h2 className="text-lg font-semibold text-center text-blue-600 dark:text-blue-300 mb-4 transition-colors">
          Login
        </h2>

        {/* Email Input */}
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="bg-blue-50 dark:bg-gray-700 w-full px-4 py-2 border border-blue-200 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-blue-800 dark:text-gray-100 transition-colors"
          />
          {emailError && (
            <p className="text-red-500 text-xs mt-1">{emailError}</p>
          )}
        </div>

        {/* Password Input */}
        <div>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="bg-blue-50 dark:bg-gray-700 w-full px-4 py-2 border border-blue-200 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm text-blue-800 dark:text-gray-100 pr-10 transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 right-3 transform -translate-y-1/2 text-blue-600 dark:text-gray-200 transition-colors"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {passwordError && (
            <p className="text-red-500 text-xs mt-1">{passwordError}</p>
          )}
        </div>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded shadow transition-colors"
        >
          Log In
        </button>

        {/* Google Button */}
        <button className="w-full flex items-center justify-center gap-2 py-2 border border-blue-600 dark:border-gray-600 rounded bg-white dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-gray-700 text-sm text-blue-600 dark:text-gray-100 transition-colors">
          <FcGoogle className="text-lg" />
          Log in with Google
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
