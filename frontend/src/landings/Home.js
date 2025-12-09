import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";  // <-- Common Footer Added

const Home = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 text-gray-900 overflow-hidden">

      {/* Navbar */}
      <Navbar />

      {/* Background Gradient Orbs */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full blur-[130px] opacity-30 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-pink-400 to-yellow-300 rounded-full blur-[150px] opacity-30 animate-pulse"></div>

      {/* Floating Shapes */}
      <div className="absolute top-1/3 left-1/4 w-24 h-24 bg-indigo-200 shadow-2xl rounded-2xl rotate-45 animate-floating"></div>
      <div className="absolute bottom-40 right-1/3 w-28 h-28 bg-purple-200 shadow-xl rounded-full animate-floating-slow"></div>
      <div className="absolute top-1/2 right-20 w-20 h-20 bg-pink-200 shadow-lg rounded-xl animate-floating"></div>

      {/* Animations */}
      <style>
        {`
          @keyframes floating {
            0% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-30px) rotate(10deg); }
            100% { transform: translateY(0px) rotate(0deg); }
          }
          @keyframes floating-slow {
            0% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-40px) rotate(-10deg); }
            100% { transform: translateY(0px) rotate(0deg); }
          }
          .animate-floating { animation: floating 6s ease-in-out infinite; }
          .animate-floating-slow { animation: floating-slow 10s ease-in-out infinite; }
        `}
      </style>

      {/* HERO SECTION */}
      <header className="relative flex flex-col items-center justify-center text-center px-6 pt-40 pb-28 z-20">

        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-indigo-300 opacity-20 blur-[200px] rounded-full"></div>

        <h1 className="text-6xl md:text-7xl font-extrabold leading-tight text-gray-900 z-10">
          Powerful AI for  
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
            {" "}Instant Summaries
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-gray-700 mt-6 max-w-3xl z-10 leading-relaxed">
          Summarize long paragraphs, extract bullet points, and organize your work —
          all powered by advanced AI technology.
        </p>

        <div className="mt-10 flex flex-col md:flex-row gap-5 z-10">
          <Link
            to="/register"
            className="px-12 py-4 bg-indigo-600 text-white text-lg rounded-2xl shadow-xl hover:bg-indigo-700 hover:scale-[1.05] transition-all"
          >
            Get Started Free
          </Link>

          <Link
            to="/login"
            className="px-12 py-4 border border-indigo-600 text-indigo-600 text-lg rounded-2xl hover:bg-indigo-600 hover:text-white hover:scale-[1.05] transition-all"
          >
            Login
          </Link>
        </div>
      </header>

      {/* FEATURES SECTION */}
      <section className="relative py-24 px-6 bg-white border-t border-gray-200 rounded-t-[40px] shadow-inner z-30">
        <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-16">
          Why Choose Smart Summarizer?
        </h2>

        <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-12">
          {[
            { emoji: "⚡", title: "Lightning Fast Summaries", desc: "Powered by advanced transformer AI models." },
            { emoji: "📌", title: "Bullet Point Extraction", desc: "Convert long text into clean bullet points." },
            { emoji: "💾", title: "Save & Retrieve Summaries", desc: "Access anytime with Meeting ID support." },
            { emoji: "🔐", title: "Secure Login", desc: "Your data is protected with JWT authentication." },
            { emoji: "🎯", title: "Clean & Modern UI", desc: "Simple, minimal, and distraction-free interface." },
            { emoji: "🤖", title: "AI Powered Engine", desc: "Smart NLP models trained for accuracy." }
          ].map((item, index) => (
            <div
              key={index}
              className="p-10 bg-white rounded-3xl shadow-xl hover:shadow-2xl hover:-translate-y-3 transition-all border border-gray-100"
            >
              <div className="text-6xl mb-6">{item.emoji}</div>
              <h3 className="text-2xl font-semibold text-gray-900">{item.title}</h3>
              <p className="text-gray-600 mt-3 text-lg">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* COMMON FOOTER */}
      <Footer />

    </div>
  );
};

export default Home;
