// src/pages/SettingsPage.tsx

import React, { useState } from "react";
import { FaLock, FaBell } from "react-icons/fa";
import userData from "./users.json"; // adjust the path if needed

const SettingsPage: React.FC = () => {
  // Account settings: initialize from JSON
  const [fullName, setFullName] = useState<string>(userData.fullName);
  const [email, setEmail] = useState<string>(userData.email);

  // Security (password change)
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  // Notifications
  const [emailNotifications, setEmailNotifications] = useState<boolean>(true);
  const [pushNotifications, setPushNotifications] = useState<boolean>(false);

  const handleToggleEmailNotifications = () => {
    setEmailNotifications((prev) => !prev);
  };

  const handleTogglePushNotifications = () => {
    setPushNotifications((prev) => !prev);
  };

  const handleSaveAccount = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: call your backend API to save account info
    alert(`Saved:\nFull Name: ${fullName}\nEmail: ${email}`);
  };

  const handleSaveSecurity = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("New passwords do not match!");
      return;
    }
    // TODO: call your backend API to change the password
    alert("Password changed successfully!");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors pt-20">
      <div className="max-w-4xl mx-auto px-4 py-10">
        <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-100 mb-8">
          Settings
        </h2>

        {/* ────────── Account Settings ────────── */}
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-8 transition-colors">
          <div className="flex items-center mb-4">
            <FaLock className="text-2xl text-blue-600 dark:text-blue-400 mr-2" />
            <h3 className="text-xl font-medium text-gray-700 dark:text-gray-200">
              Account Settings
            </h3>
          </div>
          <form onSubmit={handleSaveAccount} className="space-y-4">
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-gray-600 dark:text-gray-300"
              >
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="mt-1 block w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-gray-100"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-600 dark:text-gray-300"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800 dark:text-gray-100"
              />
            </div>
            <button
              type="submit"
              className="mt-4 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow-sm transition-colors"
            >
              Save Account
            </button>
          </form>
        </div>

        {/* ────────── Security Settings ────────── */}
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-8 transition-colors">
          <div className="flex items-center mb-4">
            <FaLock className="text-2xl text-red-600 dark:text-red-400 mr-2" />
            <h3 className="text-xl font-medium text-gray-700 dark:text-gray-200">
              Security Settings
            </h3>
          </div>
          <form onSubmit={handleSaveSecurity} className="space-y-4">
            <div>
              <label
                htmlFor="currentPassword"
                className="block text-sm font-medium text-gray-600 dark:text-gray-300"
              >
                Current Password
              </label>
              <input
                id="currentPassword"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="mt-1 block w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-800 dark:text-gray-100"
              />
            </div>
            <div>
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium text-gray-600 dark:text-gray-300"
              >
                New Password
              </label>
              <input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="mt-1 block w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-800 dark:text-gray-100"
              />
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-600 dark:text-gray-300"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 block w-full px-4 py-2 bg-gray-100 dark:bg-gray-700 border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-800 dark:text-gray-100"
              />
            </div>
            <button
              type="submit"
              className="mt-4 px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md shadow-sm transition-colors"
            >
              Change Password
            </button>
          </form>
        </div>

        {/* ────────── Notification Settings ────────── */}
        <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-8 transition-colors">
          <div className="flex items-center mb-4">
            <FaBell className="text-2xl text-yellow-500 dark:text-yellow-400 mr-2" />
            <h3 className="text-xl font-medium text-gray-700 dark:text-gray-200">
              Notification Settings
            </h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-700 dark:text-gray-200">
                  Email Notifications
                  <br />
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    (Email Alerts)
                  </span>
                </p>
              </div>
              <label className="inline-flex relative items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={emailNotifications}
                  onChange={handleToggleEmailNotifications}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 dark:bg-gray-600 rounded-full peer peer-checked:bg-blue-600 transition-colors"></div>
                <div className="absolute left-0.5 top-0.5 bg-white dark:bg-gray-300 w-5 h-5 rounded-full peer-checked:translate-x-full peer-checked:bg-white transition-transform"></div>
              </label>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-700 dark:text-gray-200">
                  Push Notifications
                  <br />
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    (App Alerts)
                  </span>
                </p>
              </div>
              <label className="inline-flex relative items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={pushNotifications}
                  onChange={handleTogglePushNotifications}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 dark:bg-gray-600 rounded-full peer peer-checked:bg-blue-600 transition-colors"></div>
                <div className="absolute left-0.5 top-0.5 bg-white dark:bg-gray-300 w-5 h-5 rounded-full peer-checked:translate-x-full peer-checked:bg-white transition-transform"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
