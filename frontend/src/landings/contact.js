import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await fetch("http://localhost:5000/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      alert("Message sent successfully!");
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      alert("Failed to send message. Please try again.");
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 overflow-hidden">

      <Navbar />

      {/* Floating Background Orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full blur-[120px] opacity-30 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-br from-pink-400 to-yellow-300 rounded-full blur-[140px] opacity-30 animate-pulse"></div>

      {/* Floating Shapes */}
      <div className="absolute top-1/3 right-20 w-20 h-20 bg-indigo-200 shadow-xl rounded-2xl rotate-45 animate-floating"></div>
      <div className="absolute bottom-40 left-20 w-24 h-24 bg-purple-200 shadow-xl rounded-full animate-floating-slow"></div>

      <style>
        {`
          @keyframes floating {
            0% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-25px) rotate(10deg); }
            100% { transform: translateY(0px) rotate(0deg); }
          }
          @keyframes floating-slow {
            0% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-40px) rotate(-12deg); }
            100% { transform: translateY(0px) rotate(0deg); }
          }
          .animate-floating { animation: floating 6s ease-in-out infinite; }
          .animate-floating-slow { animation: floating-slow 11s ease-in-out infinite; }
        `}
      </style>

      {/* CONTACT FORM */}
      <div className="relative flex justify-center px-6 pt-36 pb-20 z-10">
        <div className="max-w-2xl w-full bg-white/50 backdrop-blur-md border border-gray-200 rounded-3xl shadow-2xl p-10">

          <h1 className="text-4xl font-extrabold text-gray-900 text-center mb-6">
            Contact{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
              Us
            </span>
          </h1>

          <p className="text-gray-600 text-center mb-10 text-lg">
            Have questions or feedback? We're here to help!
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Name */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Full Name</label>
              <input
                type="text"
                name="name"
                className="w-full p-4 rounded-xl border border-gray-300 bg-white/70 
                focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400 outline-none transition"
                placeholder="Enter your full name"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Email Address</label>
              <input
                type="email"
                name="email"
                className="w-full p-4 rounded-xl border border-gray-300 bg-white/70 
                focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400 outline-none transition"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">Message</label>
              <textarea
                name="message"
                rows="4"
                className="w-full p-4 rounded-xl border border-gray-300 bg-white/70 
                focus:border-indigo-500 focus:ring-2 focus:ring-indigo-400 outline-none transition"
                placeholder="Write your message"
                value={form.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-4 text-lg bg-indigo-600 text-white rounded-xl shadow-lg 
              hover:bg-indigo-700 hover:scale-[1.03] transition-all"
            >
              Send Message
            </button>

          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
