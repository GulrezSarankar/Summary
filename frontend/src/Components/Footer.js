import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const openLink = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <footer className="bg-gray-900 text-white py-10 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10">

        {/* Brand Section */}
        <div>
          <h2 className="text-2xl font-bold text-indigo-400">Smart Summarizer</h2>
          <p className="text-gray-400 mt-3">
            AI-powered summarization for productivity and clarity.
          </p>
        </div>

        {/* Navigation Section */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-gray-300">
            <li><Link to="/" className="hover:text-indigo-400">Home</Link></li>
            <li><Link to="/about" className="hover:text-indigo-400">About</Link></li>
            <li><Link to="/features" className="hover:text-indigo-400">Features</Link></li>
            <li><Link to="/contact" className="hover:text-indigo-400">Contact</Link></li>
          </ul>
        </div>

        {/* Social Media — using ONLY BUTTONS */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Follow Us</h3>
          <ul className="space-y-2 text-gray-300">

            <li>
              <button
                onClick={() => openLink("https://github.com")}
                className="hover:text-indigo-400 text-left"
              >
                GitHub
              </button>
            </li>

            <li>
              <button
                onClick={() => openLink("https://linkedin.com")}
                className="hover:text-indigo-400 text-left"
              >
                LinkedIn
              </button>
            </li>

            <li>
              <button
                onClick={() => openLink("https://twitter.com")}
                className="hover:text-indigo-400 text-left"
              >
                Twitter
              </button>
            </li>

          </ul>
        </div>
      </div>

      <hr className="border-gray-700 my-6" />

      <p className="text-center text-gray-400">
        © {new Date().getFullYear()} Smart Summarizer — All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
