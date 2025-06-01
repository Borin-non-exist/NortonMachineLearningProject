// src/pages/SignUpPage.tsx
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { auth, provider, signInWithPopup } from "../../lib/firebase";

const SignUpPage: React.FC = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    dob: "",
    email: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showAgreementError, setShowAgreementError] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { [key: string]: string } = {};

    if (!form.firstName) newErrors.firstName = "First Name is required";
    if (!form.lastName) newErrors.lastName = "Last Name is required";
    if (!form.gender) newErrors.gender = "Gender is required";
    if (!form.dob) newErrors.dob = "Date of Birth is required";
    if (!form.email) newErrors.email = "Email is required";
    if (!form.password) newErrors.password = "Password is required";
    if (!form.confirmPassword)
      newErrors.confirmPassword = "Confirm Password is required";
    if (form.password !== form.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    setShowAgreementError(!form.agree);

    if (Object.keys(newErrors).length === 0 && form.agree) {
      alert("Account created!");
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      alert(`Signed up with Google: ${result.user.displayName}`);
    } catch (error: unknown) {
      if (error instanceof Error) {
        alert(`Google sign-in failed: ${error.message}`);
      } else {
        alert("Google sign-in failed: Unknown error");
      }
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 dark:bg-gray-900 px-4 py-10 flex flex-col items-center justify-center relative transition-colors">
      {/* Logo + Site Name */}
      <div className="absolute top-4 left-6 flex items-center gap-2">
        <img
          src="/src/assets/logo.jpg"
          alt="Logo"
          className="w-8 h-8 rounded-full border border-blue-200 dark:border-gray-600 transition-colors"
        />
        <span className="text-lg font-semibold text-blue-600 dark:text-blue-300 transition-colors">
          PiKrous
        </span>
      </div>

      <h1 className="text-xl sm:text-2xl font-bold text-center mb-6 text-blue-600 dark:text-blue-300 transition-colors">
        Let’s Get You Started
      </h1>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg p-6 space-y-4 shadow-md border border-blue-100 dark:border-gray-700 transition-colors"
      >
        <h2 className="text-lg font-bold text-center text-blue-600 dark:text-blue-300 mb-2 transition-colors">
          Create New Account
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={form.firstName}
              onChange={handleChange}
              className="bg-blue-50 dark:bg-gray-700 px-3 py-2 rounded border border-blue-200 dark:border-gray-600 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-blue-800 dark:text-gray-100 transition-colors"
            />
            {errors.firstName && (
              <p className="text-red-600 text-xs mt-1">*{errors.firstName}*</p>
            )}
          </div>
          <div>
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={form.lastName}
              onChange={handleChange}
              className="bg-blue-50 dark:bg-gray-700 px-3 py-2 rounded border border-blue-200 dark:border-gray-600 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-blue-800 dark:text-gray-100 transition-colors"
            />
            {errors.lastName && (
              <p className="text-red-600 text-xs mt-1">*{errors.lastName}*</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <input
              type="text"
              name="gender"
              placeholder="Gender"
              value={form.gender}
              onChange={handleChange}
              className="bg-blue-50 dark:bg-gray-700 px-3 py-2 rounded border border-blue-200 dark:border-gray-600 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-blue-800 dark:text-gray-100 transition-colors"
            />
            {errors.gender && (
              <p className="text-red-600 text-xs mt-1">*{errors.gender}*</p>
            )}
          </div>
          <div>
            <input
              type="date"
              name="dob"
              value={form.dob}
              onChange={handleChange}
              className="bg-blue-50 dark:bg-gray-700 px-3 py-2 rounded border border-blue-200 dark:border-gray-600 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500 text-blue-800 dark:text-gray-100 transition-colors"
            />
            {errors.dob && (
              <p className="text-red-600 text-xs mt-1">*{errors.dob}*</p>
            )}
          </div>
        </div>

        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="bg-blue-50 dark:bg-gray-700 w-full px-3 py-2 rounded border border-blue-200 dark:border-gray-600 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-blue-800 dark:text-gray-100 transition-colors"
          />
          {errors.email && (
            <p className="text-red-600 text-xs mt-1">*{errors.email}*</p>
          )}
        </div>

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="bg-blue-50 dark:bg-gray-700 w-full px-3 py-2 pr-10 rounded border border-blue-200 dark:border-gray-600 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-blue-800 dark:text-gray-100 transition-colors"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-2.5 text-blue-600 dark:text-gray-200 transition-colors"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
          {errors.password && (
            <p className="text-red-600 text-xs mt-1">*{errors.password}*</p>
          )}
        </div>

        <div className="relative">
          <input
            type={showConfirm ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            className="bg-blue-50 dark:bg-gray-700 w-full px-3 py-2 pr-10 rounded border border-blue-200 dark:border-gray-600 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-blue-800 dark:text-gray-100 transition-colors"
          />
          <button
            type="button"
            onClick={() => setShowConfirm(!showConfirm)}
            className="absolute right-3 top-2.5 text-blue-600 dark:text-gray-200 transition-colors"
          >
            {showConfirm ? <FaEyeSlash /> : <FaEye />}
          </button>
          {errors.confirmPassword && (
            <p className="text-red-600 text-xs mt-1">
              *{errors.confirmPassword}*
            </p>
          )}
        </div>

        <label className="flex items-center gap-2 text-xs text-blue-700 dark:text-gray-300 transition-colors">
          <input
            type="checkbox"
            name="agree"
            checked={form.agree}
            onChange={handleChange}
            className="w-4 h-4 text-blue-600 dark:text-gray-300 border border-blue-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-blue-500 transition-colors"
          />
          I agree to the{" "}
          <span className="text-blue-600 dark:text-blue-300 underline cursor-pointer transition-colors">
            terms and services
          </span>
        </label>

        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center gap-3 bg-white dark:bg-gray-700 border border-blue-600 dark:border-gray-600 text-blue-600 dark:text-gray-100 text-sm py-2 rounded hover:bg-blue-50 dark:hover:bg-gray-600 transition-colors"
        >
          <FcGoogle className="text-xl" />
          Sign in with Google
        </button>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded text-sm font-semibold transition-colors"
        >
          Sign Up
        </button>
      </form>

      {showAgreementError && (
        <div className="mt-4 bg-white dark:bg-gray-800 border border-blue-200 dark:border-gray-600 rounded-lg px-4 py-3 flex justify-between items-center w-full max-w-md shadow transition-colors">
          <p className="text-sm font-medium text-red-600">You need to agree with Terms and Services</p>
          <button
            onClick={() => setShowAgreementError(false)}
            className="text-red-500 font-semibold text-sm hover:underline transition-colors"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default SignUpPage;
