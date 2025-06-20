import React, { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { router } from "@inertiajs/react";
//import logo from "/assets/logo.jpg"; // ✅ Use import for image

const LoginDoctorPage: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loginError, setLoginError] = useState("");

  useEffect(() => {
    localStorage.removeItem("auth_token");
    localStorage.removeItem("user");
  }, []);

  const handleLogin = async () => {
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

    if (!isValid) return;

    try {
      // Simulated API response
      const res = {
        data: {
          token: "mock_token_123456",
          user: {
            name: "Doctor User",
            email,
          },
        },
      };

      localStorage.setItem("auth_token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Login successful! Redirecting...");
      router.get("/doctor"); // ✅ Ensure this matches your route
    } catch (error) {
      console.error("Login error:", error);
      setLoginError("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 dark:bg-gray-900 flex flex-col items-center justify-center px-4 transition-colors">
      <div className="mb-6">
        <img /* src={logo} */ src="/assets/logo.jpg" alt="Logo" className="h-16 w-auto object-contain" />
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md w-full max-w-sm p-6 space-y-5 border border-blue-100 dark:border-gray-700 transition-colors">
        <h2 className="text-lg font-semibold text-center text-blue-600 dark:text-blue-300 mb-4">
          Doctor Login
        </h2>

        {loginError && (
          <p className="text-red-500 text-sm text-center">{loginError}</p>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
          className="space-y-5"
        >
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
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-blue-600 dark:text-gray-200"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {passwordError && (
              <p className="text-red-500 text-xs mt-1">{passwordError}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded shadow transition-colors"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginDoctorPage;
