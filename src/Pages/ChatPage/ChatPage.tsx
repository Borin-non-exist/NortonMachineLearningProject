import React from "react";
import { FaTelegramPlane, FaSync, FaUserCircle } from "react-icons/fa";

const ChatPage = () => {
  return (
    <div className="min-h-screen bg-cyan-600 flex flex-col items-center justify-center text-white relative">
      {/* Top Header Bar */}
      <div className="absolute top-4 left-4 flex items-center gap-2">
        <img
          src="/src/assets/logo.jpg" // update path if needed
          alt="Logo"
          className="w-10 h-10 rounded-full"
        />
        <span className="text-white font-bold">Pikrous AI</span>
      </div>

      {/* Top right corner icons */}
      <div className="absolute top-4 right-4 flex items-center gap-3">
        <FaSync className="text-xl cursor-pointer" />
        <FaUserCircle className="text-2xl cursor-pointer" />
      </div>

      {/* Centered Message */}
      <h1 className="text-xl font-semibold mb-6">Ain't you feel good?</h1>

      {/* Input Box */}
      <div className="w-[90%] max-w-md bg-white rounded-full px-4 py-2 flex items-center shadow-md">
        <input
          type="text"
          placeholder="Don't worry, just let’s me know."
          className="flex-grow bg-transparent outline-none text-black text-sm"
        />
        <button className="text-cyan-600 hover:text-cyan-700">
          <FaTelegramPlane className="text-xl" />
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
