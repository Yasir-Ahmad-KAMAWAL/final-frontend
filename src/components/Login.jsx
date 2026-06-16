import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Email Validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newErrors.email = "Please enter a valid email";
    }

    // Password Validation
    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setServerError("");

    if (!validateForm()) return;

    try {
      setLoading(true);

      // API Call Here
      console.log("Login Data:", formData);

      // Example:
      // const response = await axios.post("/api/v1/users/login", formData)

      await new Promise((resolve) => setTimeout(resolve, 1500));

      alert("Login Successful");
    } catch (error) {
      setServerError(
        error?.response?.data?.message ||
          "Invalid email or password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-[#090E1A] flex items-center justify-center px-4 py-8">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-[#111827] border border-slate-800 rounded-2xl p-6 shadow-xl"
      >
        {/* Logo */}
        <div className="text-center mb-6">
          <div className="w-10 h-10 bg-blue-600 rounded-xl mx-auto flex items-center justify-center text-white font-bold text-sm">
            KT
          </div>

          <h1 className="text-2xl font-bold text-white mt-4">
            Welcome Back
          </h1>

          <p className="text-slate-400 text-sm mt-1">
            Login to your KabulTrack workspace
          </p>
        </div>

        {/* Server Error */}
        {serverError && (
          <div className="mb-4 bg-red-500/10 border border-red-500 text-red-400 p-3 rounded-lg text-sm">
            {serverError}
          </div>
        )}

        {/* Email */}
        <div className="mb-4">
          <label className="text-slate-300 text-sm">
            Email Address
          </label>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className={`w-full mt-2 px-3 py-2 bg-[#0D1526] rounded-lg text-white text-sm outline-none border transition ${
              errors.email
                ? "border-red-500"
                : "border-slate-700 focus:border-blue-500"
            }`}
          />

          {errors.email && (
            <p className="text-red-400 text-sm mt-1">
              {errors.email}
            </p>
          )}
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="text-slate-300 text-sm">
            Password
          </label>

          <div className="relative mt-2">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              className={`w-full px-3 py-2 bg-[#0D1526] rounded-lg text-white text-sm outline-none border transition ${
                errors.password
                  ? "border-red-500"
                  : "border-slate-700 focus:border-blue-500"
              }`}
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          {errors.password && (
            <p className="text-red-400 text-sm mt-1">
              {errors.password}
            </p>
          )}
        </div>

        {/* Remember Me */}
        <div className="flex items-center justify-between mb-6 text-sm gap-3">
          <label className="flex items-center gap-2 text-slate-400 cursor-pointer">
            <input
              type="checkbox"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
              className="h-4 w-4"
            />
            Remember Me
          </label>

          <Link
            to="/forgot-password"
            className="text-sm text-blue-500 hover:text-blue-400"
          >
            Forgot Password?
          </Link>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded-lg font-semibold text-white text-sm transition ${
            loading
              ? "bg-orange-400 cursor-not-allowed"
              : "bg-orange-500 hover:bg-orange-600"
          }`}
        >
          {loading ? "Logging In..." : "Login"}
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-[1px] bg-slate-700"></div>
          <span className="text-slate-500 text-sm">OR</span>
          <div className="flex-1 h-[1px] bg-slate-700"></div>
        </div>

        {/* Google Login */}
        <button
          type="button"
          className="w-full border border-slate-700 py-3 rounded-lg text-white hover:bg-slate-800 transition"
        >
          Continue with Google
        </button>

        {/* Signup */}
        <p className="text-center text-slate-400 mt-6">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-orange-500 hover:text-orange-400"
          >
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;