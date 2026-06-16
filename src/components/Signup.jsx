import React from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className="min-h-screen bg-[#090E1A] flex items-start justify-center px-4 py-10">
      <div className="w-full max-w-sm bg-[#111827] border border-slate-800 rounded-2xl p-6 shadow-xl">

        <div className="text-center mb-6">
          <div className="w-10 h-10 bg-blue-600 rounded-xl mx-auto flex items-center justify-center text-white font-bold text-sm">
            KT
          </div>

          <h1 className="text-2xl font-bold text-white mt-4">
            Create Account
          </h1>

          <p className="text-slate-400 mt-2">
            Start managing projects with KabulTrack
          </p>
        </div>

        {/* Full Name */}
        <div className="mb-4">
          <label className="text-slate-300 text-sm">Full Name</label>

          <input
            type="text"
            placeholder="Your name"
            className="w-full mt-2 px-3 py-2 bg-[#0D1526] border border-slate-700 rounded-lg text-white text-sm focus:border-blue-500 outline-none"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="text-slate-300 text-sm">Email</label>

          <input
            type="email"
            placeholder="Enter email"
            className="w-full mt-2 px-3 py-2 bg-[#0D1526] border border-slate-700 rounded-lg text-white text-sm focus:border-blue-500 outline-none"
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="text-slate-300 text-sm">Password</label>

          <input
            type="password"
            placeholder="Create password"
            className="w-full mt-2 px-3 py-2 bg-[#0D1526] border border-slate-700 rounded-lg text-white text-sm focus:border-blue-500 outline-none"
          />
        </div>

        {/* Confirm Password */}
        <div className="mb-6">
          <label className="text-slate-300 text-sm">
            Confirm Password
          </label>

          <input
            type="password"
            placeholder="Confirm password"
            className="w-full mt-2 px-3 py-2 bg-[#0D1526] border border-slate-700 rounded-lg text-white text-sm focus:border-blue-500 outline-none"
          />
        </div>

        <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm py-2 rounded-lg transition">
          Create Account
        </button>

        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-[1px] bg-slate-700"></div>
          <span className="text-slate-500 text-sm">OR</span>
          <div className="flex-1 h-[1px] bg-slate-700"></div>
        </div>

        <button className="w-full border border-slate-700 py-2 rounded-lg text-white text-sm hover:bg-slate-800 transition">
          Sign up with Google
        </button>

        <p className="text-center text-slate-400 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-orange-500">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;