import React from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { FcGoogle } from "react-icons/fc";


const Signup = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-[#090E1A] flex items-start justify-center px-4 py-10 transition-colors duration-300 relative">

      {/* Toggle button - top right corner */}
      <div className="absolute top-5 right-5 z-10">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-sm bg-slate-50 dark:bg-[#111827] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xl">

        <div className="text-center mb-6">
          <div className="w-10 h-10 bg-blue-600 rounded-xl mx-auto flex items-center justify-center text-white font-bold text-sm">
            KT
          </div>

          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mt-4">
            Create Account
          </h1>

          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Start managing projects with KabulTrack
          </p>
        </div>

        {/* Full Name */}
        <div className="mb-4">
          <label className="text-slate-700 dark:text-slate-300 text-sm">Full Name</label>

          <input
            type="text"
            placeholder="Your name"
            className="w-full mt-2 px-3 py-2 bg-white dark:bg-[#0D1526] border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white text-sm focus:border-blue-500 outline-none"
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="text-slate-700 dark:text-slate-300 text-sm">Email</label>

          <input
            type="email"
            placeholder="Enter email"
            className="w-full mt-2 px-3 py-2 bg-white dark:bg-[#0D1526] border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white text-sm focus:border-blue-500 outline-none"
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="text-slate-700 dark:text-slate-300 text-sm">Password</label>

          <input
            type="password"
            placeholder="Create password"
            className="w-full mt-2 px-3 py-2 bg-white dark:bg-[#0D1526] border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white text-sm focus:border-blue-500 outline-none"
          />
        </div>

        {/* Confirm Password */}
        <div className="mb-6">
          <label className="text-slate-700 dark:text-slate-300 text-sm">
            Confirm Password
          </label>

          <input
            type="password"
            placeholder="Confirm password"
            className="w-full mt-2 px-3 py-2 bg-white dark:bg-[#0D1526] border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white text-sm focus:border-blue-500 outline-none"
          />
        </div>

        <button className="w-full bg-blue-500 cursor-pointer hover:bg-blue-600 text-white font-semibold text-sm py-2 rounded-lg transition">
          Create Account
        </button>

        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-[1px] bg-slate-300 dark:bg-slate-700"></div>
          <span className="text-slate-400 dark:text-slate-500 text-sm">OR</span>
          <div className="flex-1 h-[1px] bg-slate-300 dark:bg-slate-700"></div>
        </div>

        <button className="w-full cursor-pointer flex items-center justify-center gap-3 border border-slate-300 dark:border-slate-700 py-2 rounded-lg text-slate-900 dark:text-white text-sm hover:bg-slate-100 dark:hover:bg-slate-800 transition">
          <FcGoogle className="text-xl" />
          Sign up with Google
        </button>

        <p className="text-center text-slate-600 dark:text-slate-400 mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:text-blue-600 dark:hover:text-blue-400">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
