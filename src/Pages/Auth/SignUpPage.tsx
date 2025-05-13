import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { auth, provider, signInWithPopup } from "../../lib/firebase";

const SignUpPage: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setPasswordError("");

    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long.");
      return;
    }

    alert("Signed up manually!");
    // Handle actual sign-up logic here
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log("Google User:", user);
      alert(`Signed up with Google: ${user.displayName}`);
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Google sign-in error:", error);
        alert("Google sign-in failed: " + error.message);
      } else {
        console.error("Unknown sign-in error:", error);
        alert("Google sign-in failed.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4">
      {/* Logo and Title */}
      <div className="flex flex-col items-center mb-6">
        <img
          src="/src/assets/logo.jpg"
          alt="PiKrous Logo"
          className="w-20 h-20 rounded-full mb-2"
        />
        <h1 className="text-xl font-bold text-gray-800 text-center leading-tight font-[Hanuman]">
          ពិគ្រោះ AI
          <br />
          <span className="text-sm font-normal text-gray-500">PiKrous AI</span>
        </h1>
      </div>

      {/* Sign Up Card */}
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-600"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-600"
          />
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={`w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 ${
                passwordError
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-cyan-600"
              }`}
            />
            {passwordError && (
              <p className="text-red-500 text-sm mt-1">{passwordError}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Sign Up
          </button>
        </form>

        {/* Divider */}
        <div className="my-4 " />

        {/* Google Sign In Button */}
        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center gap-3 border border-gray-300 bg-white text-gray-700 py-2 rounded-md hover:bg-gray-100 transition font-medium"
        >
          <FcGoogle className="text-xl" />
          <span>Sign in with Google</span>
        </button>
      </div>
    </div>
  );
};

export default SignUpPage;
