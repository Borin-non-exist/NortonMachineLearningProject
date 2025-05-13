import React, { useState } from "react";
import { FaArrowRight, FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md rounded-b-xl px-4 sm:px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src="/src/assets/logo.jpg" alt="Logo" className="w-10 h-10 rounded-full" />
          <span className="font-bold text-xl text-cyan-700">PiKrous</span>
        </div>
        <div className="sm:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            <FaBars className="text-2xl text-cyan-700" />
          </button>
        </div>
        <div className="hidden sm:flex items-center gap-6">
          <ul className="flex gap-4 font-medium text-sm items-center">
            <li className="bg-gray-300 px-4 py-1 rounded-full text-black">Home</li>
            <li className="hover:text-cyan-700 cursor-pointer">About AI</li>
            <li>
              <Link to="" className="hover:text-cyan-700">Privacy & Policy</Link>
            </li>
          </ul>
          <button className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-full shadow-md text-sm flex items-center gap-2">
            Try PiKrous <FaArrowRight />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="sm:hidden mt-4 flex flex-col gap-3 items-center text-sm">
          <ul className="flex flex-col gap-2 w-full text-center font-medium">
            <li className="bg-gray-300 px-4 py-2 rounded-full text-black">Home</li>
            <li className="hover:text-cyan-700 cursor-pointer">About AI</li>
            <li className="hover:text-cyan-700 cursor-pointer">Privacy & Policy</li>
          </ul>
          <button className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded-full shadow-md flex items-center gap-2">
            Try PiKrous <FaArrowRight />
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;