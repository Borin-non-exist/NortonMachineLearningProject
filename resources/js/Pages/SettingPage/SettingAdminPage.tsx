import React, { useState, useEffect } from "react";
import { router } from "@inertiajs/react";
import { BiUndo } from "react-icons/bi";
import { FaBars } from "react-icons/fa";

const SettingAdminPage: React.FC = () => {

  const [view, setView] = useState<"account" | "security">("account");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [sidebarOpen]);

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
    <div className="min-h-screen bg-blue-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 flex transition-colors duration-300 relative">
      {/* Sidebar - Desktop */}
      <aside className="hidden md:flex flex-col w-64 h-screen fixed top-0 left-0 bg-white dark:bg-gray-800 p-6 border-r border-gray-200 dark:border-gray-700 z-40">
        <div className="mb-8 flex flex-col items-center">
          <img src="/assets/logo.jpg" alt="PiKrus Logo" className="h-12 object-contain mb-2" />
          <h2 className="text-lg font-semibold text-blue-600 dark:text-blue-300">Settings</h2>
        </div>
        <nav className="space-y-4 flex-1">
          <button
            onClick={() => setView("account")}
            className={`w-full text-left font-medium px-3 py-2 rounded-lg ${
              view === "account"
                ? "bg-blue-100 dark:bg-blue-700 text-blue-600 dark:text-white"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            Account
          </button>
          <button
            onClick={() => setView("security")}
            className={`w-full text-left font-medium px-3 py-2 rounded-lg ${
              view === "security"
                ? "bg-blue-100 dark:bg-blue-700 text-blue-600 dark:text-white"
                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            Security
          </button>
        </nav>
        <button
          onClick={() => router.get("/dashboard")}
          className="mt-6 w-20 h-12 flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-lg transition duration-200"
          title="Back to Dashboard"
        >
          <BiUndo className="text-2xl" /> Back
        </button>
      </aside>

      {/* Sidebar Toggle Button - Mobile */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setSidebarOpen(true)}
          className="p-2 bg-white dark:bg-gray-700 rounded-full shadow"
        >
          <FaBars />
        </button>
      </div>

      {/* Sidebar Drawer - Mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div className="w-64 h-full bg-white dark:bg-gray-800 shadow-lg p-6 space-y-4">
            <h2 className="text-lg font-semibold text-blue-600 dark:text-blue-300 text-center">Settings</h2>
            <nav className="space-y-2">
              <button
                onClick={() => {
                  setView("account");
                  setSidebarOpen(false);
                }}
                className={`w-full text-left font-medium px-3 py-2 rounded-lg ${
                  view === "account"
                    ? "bg-blue-100 dark:bg-blue-700 text-blue-600 dark:text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                Account
              </button>
              <button
                onClick={() => {
                  setView("security");
                  setSidebarOpen(false);
                }}
                className={`w-full text-left font-medium px-3 py-2 rounded-lg ${
                  view === "security"
                    ? "bg-blue-100 dark:bg-blue-700 text-blue-600 dark:text-white"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                Security
              </button>
            </nav>
            <button
              onClick={() => {
                router.get("/dashboard");
                setSidebarOpen(false);
              }}
              className="w-full mt-6 flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl shadow"
            >
              <BiUndo className="text-xl mr-2" /> Back
            </button>
          </div>
          <div className="flex-1 bg-black/40" onClick={() => setSidebarOpen(false)} />
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 w-full md:ml-64 p-6 sm:p-10 space-y-10">
        {view === "account" ? (
          <form onSubmit={handleSaveAccount} className="space-y-6">
            <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-300">Account Settings</h2>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow space-y-4">
              <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-300">Personal Information</h3>
              <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
                <input type="text" placeholder="First Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="flex-1 px-4 py-2 border rounded bg-gray-100 dark:bg-gray-700" />
                <input type="text" placeholder="Last Name" value={lastName} onChange={(e) => setLastName(e.target.value)} className="flex-1 px-4 py-2 border rounded bg-gray-100 dark:bg-gray-700" />
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow space-y-4">
              <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-300">Contact Details</h3>
              <input type="text" placeholder="Phone Number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className="w-full px-4 py-2 border rounded bg-gray-100 dark:bg-gray-700" />
              <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2 border rounded bg-gray-100 dark:bg-gray-700" />
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-300">Log Out</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Log out of your account</p>
              </div>
              <button type="button" className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-md">Log Out</button>
            </div>
            <div className="flex justify-between">
              <button type="button" className="text-gray-600 hover:underline dark:text-gray-300">Cancel</button>
              <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md">Save</button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleChangePassword} className="space-y-6">
            <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-300">Security Settings</h2>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow space-y-4">
              <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-300">Change Password</h3>
              <input type="password" placeholder="Current Password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} className="w-full px-4 py-2 border rounded bg-gray-100 dark:bg-gray-700" />
              <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
                <input type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="flex-1 px-4 py-2 border rounded bg-gray-100 dark:bg-gray-700" />
                <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="flex-1 px-4 py-2 border rounded bg-gray-100 dark:bg-gray-700" />
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-blue-600 dark:text-blue-300">Delete Account</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Permanently remove your account</p>
              </div>
              <button type="button" className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-md">Delete</button>
            </div>
            <div className="flex justify-between">
              <button type="button" className="text-gray-600 hover:underline dark:text-gray-300">Cancel</button>
              <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-md">Save</button>
            </div>
          </form>
        )}
      </main>
    </div>
  );
};

export default SettingAdminPage;