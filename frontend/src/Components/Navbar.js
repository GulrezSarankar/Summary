import React, { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full backdrop-blur-md bg-white/60 shadow-sm fixed top-0 left-0 z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <h1 className="text-3xl font-extrabold text-indigo-600 select-none">
          Smart<span className="text-purple-600">Summarizer</span>
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8 text-gray-800 font-medium">
          <Link to="/" className="hover:text-indigo-600 transition">Home</Link>
          <Link to="/about" className="hover:text-indigo-600 transition">About</Link>
          <Link to="/features" className="hover:text-indigo-600 transition">Features</Link>
          <Link to="/contact" className="hover:text-indigo-600 transition">Contact</Link>

          <Link
            to="/login"
            className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 shadow-md transition-all"
          >
            Login
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-3xl text-gray-700"
        >
          ☰
        </button>

      </div>

      {/* Mobile Dropdown Menu */}
      {open && (
        <div className="md:hidden bg-white/90 shadow-lg border-t border-gray-200">
          <div className="flex flex-col items-center space-y-4 py-5 text-gray-800 font-medium">
            <Link onClick={() => setOpen(false)} to="/" className="hover:text-indigo-600">Home</Link>
            <Link onClick={() => setOpen(false)} to="/about" className="hover:text-indigo-600">About</Link>
            <Link onClick={() => setOpen(false)} to="/features" className="hover:text-indigo-600">Features</Link>
            <Link onClick={() => setOpen(false)} to="/contact" className="hover:text-indigo-600">Contact</Link>

            <Link
              onClick={() => setOpen(false)}
              to="/login"
              className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 shadow-md transition-all"
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
