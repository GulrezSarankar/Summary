import React from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const About = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 overflow-hidden">

      <Navbar />

      {/* Background Orbs */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-indigo-500 opacity-20 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500 opacity-20 blur-[120px] rounded-full"></div>

      {/* Floating Objects */}
      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-22px) rotate(10deg); }
            100% { transform: translateY(0px) rotate(0deg); }
          }
          @keyframes float-slow {
            0% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-35px) rotate(-10deg); }
            100% { transform: translateY(0px) rotate(0deg); }
          }
          .float { animation: float 6s ease-in-out infinite; }
          .float-slow { animation: float-slow 10s ease-in-out infinite; }
        `}
      </style>

      <div className="absolute top-48 left-1/4 w-20 h-20 bg-white/30 rounded-2xl shadow-xl backdrop-blur-xl float"></div>
      <div className="absolute bottom-40 right-1/4 w-24 h-24 bg-white/40 rounded-full shadow-xl backdrop-blur-xl float-slow"></div>

      {/* Content */}
      <div className="relative max-w-6xl mx-auto px-6 pt-32 pb-28">

        {/* Page Title */}
        <h1 className="text-6xl font-extrabold text-center text-gray-900 mb-6 leading-tight">
          About  
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
            {" "}Smart Summarizer
          </span>
        </h1>

        <p className="text-xl text-gray-700 text-center max-w-4xl mx-auto leading-relaxed">
          Smart Summarizer transforms long paragraphs and complex information into meaningful, readable summaries using cutting-edge AI.  
          Designed for students, professionals, and teams who want speed and clarity.
        </p>

        {/* Large Glass Card */}
        <div className="mt-16 bg-white/40 backdrop-blur-2xl border border-gray-200 shadow-2xl rounded-3xl p-12 relative overflow-hidden">

          {/* Glowing Decorative Balls */}
          <div className="absolute -top-14 -left-14 w-56 h-56 bg-indigo-400 opacity-30 blur-[100px] rounded-full"></div>
          <div className="absolute bottom-0 right-0 w-56 h-56 bg-purple-400 opacity-30 blur-[100px] rounded-full"></div>

          {/* Section: What We Offer */}
          <h2 className="text-4xl font-bold text-gray-900 mb-6">✨ What We Offer</h2>

          <ul className="grid md:grid-cols-2 gap-6 text-gray-700 text-lg relative z-10">

            {[
              "Extractive & Abstractive Summaries",
              "Bullet Point Extraction",
              "Meeting ID Saved Summaries",
              "Secure JWT Authentication",
            ].map((text, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-indigo-600 text-2xl">✔</span>
                {text}
              </li>
            ))}
          </ul>

          {/* Divider */}
          <div className="border-t border-gray-300 my-12"></div>

          {/* Mission Section */}
          <h2 className="text-4xl font-bold text-gray-900 mb-6">🚀 Our Mission</h2>

          <p className="text-gray-700 text-lg leading-relaxed mb-12">
            Our mission is to help people learn and process information at lightning speed.  
            With AI-powered summaries, understanding complex content becomes effortless.
          </p>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-10 relative z-10">

            {[
              { icon: "🤖", title: "AI Driven", desc: "Built with advanced NLP transformers." },
              { icon: "⚡", title: "Ultra Fast", desc: "Summaries in seconds — not minutes." },
              { icon: "🔐", title: "Secure", desc: "Your content stays private & encrypted." },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white shadow-xl rounded-3xl p-8 text-center hover:scale-[1.04] transition-all border border-gray-100"
              >
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-2xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}

          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
};

export default About;
