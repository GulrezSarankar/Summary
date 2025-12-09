import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const Features = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">

      <Navbar />

      {/* Background Gradient Orbs */}
      <div className="absolute top-10 left-10 w-80 h-80 bg-indigo-400 opacity-20 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-purple-400 opacity-20 blur-[120px] rounded-full"></div>

      {/* Floating Animations */}
      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
            100% { transform: translateY(0px); }
          }
          .animate-float {
            animation: float 6s ease-in-out infinite;
          }
        `}
      </style>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-28 relative z-10">

        <h1 className="text-5xl font-extrabold text-gray-900 mb-16 text-center drop-shadow-sm">
          Explore Our
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
            {" "} Powerful Features
          </span>
        </h1>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-12">

          {[
            {
              icon: "🔍",
              title: "AI Summarization",
              desc: "Extractive and abstractive summaries powered by T5 Transformer."
            },
            {
              icon: "📌",
              title: "Bullet Points",
              desc: "Convert long paragraphs into clear, readable bullet formats."
            },
            {
              icon: "💾",
              title: "Save Summaries",
              desc: "Automatically save summaries with Meeting IDs for later use."
            },
            {
              icon: "🔐",
              title: "Secure Authentication",
              desc: "Your data is protected using JWT-based authentication."
            },
            {
              icon: "⚡",
              title: "Fast Processing",
              desc: "Summaries generated in seconds even for large text."
            },
            {
              icon: "🎨",
              title: "Modern UI",
              desc: "Clean, modern, and minimal user interface for smooth workflow."
            }
          ].map((item, index) => (
            <div
              key={index}
              className="p-10 bg-white/80 rounded-3xl backdrop-blur-xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-gray-200 animate-float"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="text-6xl mb-5">{item.icon}</div>
              <h3 className="text-2xl font-bold text-gray-900">{item.title}</h3>
              <p className="text-gray-600 mt-3 text-lg leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Features;
