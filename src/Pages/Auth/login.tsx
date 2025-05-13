import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const LoginPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4">
      {/* Logo + Welcome */}
      <div className="absolute top-6 left-6 flex items-center gap-2">
        <img
          src="/src/assets/logo.jpg" // Replace with your logo path
          alt="Logo"
          className="w-8 h-8 rounded-full"
        />
        <span className="text-lg font-semibold text-gray-800">PiKrous</span>
      </div>

      <h1 className="text-xl sm:text-2xl font-semibold mb-6 text-center">
        Welcome Back!
      </h1>

      {/* Login Card */}
      <div className="bg-gray-200 rounded-lg shadow-md w-full max-w-sm p-6 space-y-5">
        <h2 className="text-lg font-semibold text-center text-gray-700 mb-4">
          Login
        </h2>

        {/* Email Input */}
        <input
          type="email"
          placeholder="Email"
          className="bg-white w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        />

        {/* Password Input */}
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="bg-white w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm pr-10"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-600"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        {/* Login Button */}
        <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded">
          Log In
        </button>

        {/* Google Button */}
        <button className="w-full flex items-center justify-center gap-2 py-2 border rounded bg-white hover:bg-gray-100 text-sm">
          <FcGoogle className="text-lg" />
          Log in with Google
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
