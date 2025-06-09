import React, { useState } from "react";

const SettingsPage: React.FC = () => {
  const [view, setView] = useState<"account" | "security">("account");

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSaveAccount = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Saved:\n${firstName} ${lastName}, ${email}`);
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("New passwords do not match!");
      return;
    }
    alert("Password changed successfully!");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="min-h-screen bg-blue-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors flex">
      {/* Sidebar */}
      <div className="hidden md:flex flex-col w-64 h-screen fixed top-0 left-0 bg-white dark:bg-gray-800 p-6 border-r border-gray-200 dark:border-gray-700 z-50">
        <div className="mb-8 flex flex-col items-center space-x-2">
         <img src="/src/assets/logo.jpg" alt="PiKrous Logo" className="h-12 w-auto object-contain" />
          <h2 className="text-lg font-semibold text-blue-600  dark:text-blue-300">Settings</h2>
        </div>
        <nav className="space-y-4">
          <button
            onClick={() => setView("account")}
            className={`block text-left w-full font-medium ${
              view === "account"
                ? "text-blue-600 dark:text-blue-300"
                : "text-gray-700 dark:text-gray-200"
            }`}
          >
            Account
          </button>
          <button
            onClick={() => setView("security")}
            className={`block text-left w-full font-medium ${
              view === "security"
                ? "text-blue-600 dark:text-blue-300"
                : "text-gray-700 dark:text-gray-200"
            }`}
          >
            Security
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 md:ml-64 p-6 sm:p-10 space-y-12">

        {view === "account" && (
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-300">Account</h2>
            <form onSubmit={handleSaveAccount} className="space-y-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow space-y-4">
                <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-300">Personal Information</h3>
                <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
                  <input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="flex-1 px-4 py-2 border rounded bg-gray-100 dark:bg-gray-700"
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="flex-1 px-4 py-2 border rounded bg-gray-100 dark:bg-gray-700"
                  />
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow space-y-4">
                <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-300">Description</h3>
                <input
                  type="text"
                  placeholder="Phone Number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full px-4 py-2 border rounded bg-gray-100 dark:bg-gray-700"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border rounded bg-gray-100 dark:bg-gray-700"
                />
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-300">Log Out</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Log out of your account</p>
                </div>
                <button
                  type="button"
                  className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-md"
                >
                  Log Out
                </button>
              </div>

              <div className="flex justify-between">
                <button type="button" className="text-gray-600 hover:underline dark:text-gray-300">
                  Cancel
                </button>
                <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md">
                  Save
                </button>
              </div>
            </form>
          </section>
        )}

        {view === "security" && (
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-300">Security</h2>
            <form onSubmit={handleChangePassword} className="space-y-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow space-y-4">
                <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-300">Change your password</h3>
                <input
                  type="password"
                  placeholder="Current Password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full px-4 py-2 border rounded bg-gray-100 dark:bg-gray-700"
                />
                <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
                  <input
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="flex-1 px-4 py-2 border rounded bg-gray-100 dark:bg-gray-700"
                  />
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="flex-1 px-4 py-2 border rounded bg-gray-100 dark:bg-gray-700"
                  />
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-300">Delete your account</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Delete your account</p>
                </div>
                <button
                  type="button"
                  className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-md"
                >
                  Delete
                </button>
              </div>

              <div className="flex justify-between">
                <button type="button" className="text-gray-600 hover:underline dark:text-gray-300">
                  Cancel
                </button>
                <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md">
                  Save
                </button>
              </div>
            </form>
          </section>
        )}
      </div>
    </div>
  );
};

export default SettingsPage;
