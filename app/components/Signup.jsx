"use client";
import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";
import useAuthStore from "../store";

const Signup = () => {
  const router = useRouter();
  const {
    data,
    setData,
    confirmPassword,
    setConfirmPassword,
    showPassword,
    toggleShowPassword,
    showConfirmPassword,
    toggleShowConfirmPassword,
    tnc,
    toggleTnc,
    error,
    setError,
  } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Adding validation logic here

    const validationErrors = {};
    if (!data.username.trim()) {
      validationErrors.username = "Username cannot be empty";
    }
    if (!data.email.trim()) {
      validationErrors.email = "Email cannot be empty";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      validationErrors.email = "Email format is invalid";
    }
    if (!data.password.trim()) {
      validationErrors.password = "Password cannot be empty";
    } else if (data.password.length < 6) {
      validationErrors.password = "Password must be at least 6 characters long";
    }
    if (data.password !== confirmPassword) {
      validationErrors.confirmPassword = "Passwords do not match";
    }
    if (!tnc) {
      validationErrors.tnc = "Please accept the terms and conditions";
    }
    setError(validationErrors);
    if (
      Object.keys(validationErrors).length > 0 ||
      !tnc ||
      data.password !== confirmPassword
    ) {
      return;
    }
    // Continueing with signup logic
    const { username, email, password } = data;
    try {
      const response = await axios.post(
        "https://api.melodyverse.anshjatana.online/signup",
        { username, email, password }
      );
      const responseData = response.data;
      if (responseData.error) {
        toast.error(responseData.error);
      } else {
        setData({ username: "", email: "", password: "" });
        toast.success("User registered successfully");
        router.push("/login");
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        // Extract and display the error message from the response
        toast.error(error.response.data.error);
      } else {
        // Fallback error message
        toast.error("An error occurred during Signup.");
      }
    }
  };

  return (
    <>
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      <div className="flex items-center justify-center">
        <div className="w-[90%] md:w-full  max-w-md mt-12 p-8 bg-gray-800 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-white mb-4 text-center">
            Sign up for new account
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="username"
                className="block text-white text-sm font-semibold mb-1"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                value={data.username}
                onChange={(e) => setData({ ...data, username: e.target.value })}
                required
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-700"
                placeholder="Enter your username"
              />
              {error.username && (
                <span className="text-red-500">{error.username}</span>
              )}
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-white text-sm font-semibold mb-1"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
                required
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-700"
                placeholder="Enter your email"
              />
              {error.email && (
                <span className="text-red-500">{error.email}</span>
              )}
            </div>
            <div className="relative">
              <label
                htmlFor="password"
                className="block text-white text-sm font-semibold mb-1"
              >
                Password
              </label>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
                required
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-700"
                placeholder="Enter your password"
              />
              {error.password && (
                <span className="text-red-500">{error.password}</span>
              )}
              {showPassword ? (
                <Eye
                  color="white"
                  className="absolute right-4 top-[69%] transform -translate-y-1/2 cursor-pointer"
                  onClick={toggleShowPassword}
                />
              ) : (
                <EyeOff
                  color="white"
                  className="absolute right-4 top-[69%] transform -translate-y-1/2 cursor-pointer"
                  onClick={toggleShowPassword}
                />
              )}
            </div>
            <div className="relative">
              <label
                htmlFor="confirmPassword"
                className="block text-white text-sm font-semibold mb-1"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
                required
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-700"
                placeholder="Re-enter your password"
              />
              {error.confirmPassword && (
                <span className="text-red-500">{error.confirmPassword}</span>
              )}
              {showConfirmPassword ? (
                <Eye
                  color="white"
                  className="absolute right-4 top-[69%] transform -translate-y-1/2 cursor-pointer"
                  onClick={toggleShowConfirmPassword}
                />
              ) : (
                <EyeOff
                  color="white"
                  className="absolute right-4 top-[69%] transform -translate-y-1/2 cursor-pointer"
                  onClick={toggleShowConfirmPassword}
                />
              )}
            </div>
            <div className="flex items-center">
              <input
                id="terms"
                type="checkbox"
                checked={tnc}
                onChange={toggleTnc}
                className="mr-2"
              />
              <label htmlFor="Terms" className="text-white text-sm">
                Accept Terms and Conditions
              </label>
              {error.tnc && <span className="text-red-500">{error.tnc}</span>}
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-[#FC0254] text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-pink-700 transition duration-300"
            >
              Create Account
            </button>
          </form>
          <p className="mt-6 text-center text-white text-md">
            Already have an account?{" "}
            <Link
              className="underline font-medium text-[#FC0254]"
              href="/login"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Signup;
