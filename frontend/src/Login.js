import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "./api";   // <-- IMPORTANT: use api instead of axios

export default function Auth({ isRegister }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isRegister ? "/register" : "/login";
      const payload = isRegister
        ? { username, email, password }
        : { email, password };

      const res = await api.post(endpoint, payload);

      if (!isRegister) {
        localStorage.setItem("token", res.data.access_token);
        navigate("/dashboard");
      } else {
        alert("Registration Successful!");
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.msg || "Something went wrong. Try again.");
    }
  };

  return (
    <div className="relative flex items-center justify-center w-full h-screen overflow-hidden bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">

      {/* Background shapes */}
      <div className="absolute w-72 h-72 bg-white/50 backdrop-blur-xl rounded-full top-10 left-10 blur-2xl opacity-60 animate-pulse"></div>
      <div className="absolute w-80 h-80 bg-white/40 backdrop-blur-xl rounded-full bottom-10 right-10 blur-2xl opacity-60 animate-pulse"></div>

      {/* Main Card */}
      <div className="relative w-full max-w-md p-8 bg-white/70 backdrop-blur-2xl shadow-xl rounded-3xl border border-white/50 animate-fadeUp">

        <h2 className="text-3xl font-bold text-center text-gray-800">
          {isRegister ? "Create Account" : "Welcome Back"}
        </h2>

        <p className="text-center text-gray-600 mt-1 mb-4">
          {isRegister ? "Join our community" : "Log in to continue"}
        </p>

        {error && (
          <p className="text-red-500 text-center mb-2 font-medium">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          {isRegister && (
            <input
              type="text"
              placeholder="Username"
              required
              className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 text-gray-900 focus:ring-2 focus:ring-blue-400 outline-none"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          )}

          <input
            type="email"
            placeholder="Email Address"
            required
            className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 text-gray-900 focus:ring-2 focus:ring-blue-400 outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            required
            className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 text-gray-900 focus:ring-2 focus:ring-blue-400 outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="w-full py-3 bg-blue-500 text-white font-semibold rounded-xl shadow-md hover:bg-blue-600 transition-all"
          >
            {isRegister ? "Sign Up" : "Log In"}
          </button>
        </form>

        <button
          onClick={() => navigate(isRegister ? "/login" : "/register")}
          className="w-full mt-4 text-blue-600 font-medium hover:underline"
        >
          {isRegister
            ? "Already have an account? Log In"
            : "Don't have an account? Sign Up"}
        </button>

        <button
          onClick={() => navigate("/")}
          className="w-full mt-2 py-2 text-gray-700 font-medium border border-gray-300 rounded-xl hover:bg-gray-100 transition"
        >
          Go to Home
        </button>
      </div>

      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeUp {
          animation: fadeUp 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}
