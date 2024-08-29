"use client";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import useAuthStore from "../store";
import { setCookie } from "cookies-next";

const Login = () => {
  const router = useRouter();
  const {
    data,
    setData,
    showPassword,
    toggleShowPassword,
    rememberMe,
    toggleRememberMe,
    error,
    setError,
  } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Adding validation logic here
    const validationErrors = {};
    if (!data.email.trim()) {
      validationErrors.email = "Email cannot be empty";
    }
    if (!data.password.trim()) {
      validationErrors.password = "Password cannot be empty";
    } else if (data.password.length < 6) {
      validationErrors.password = "Password must be at least 6 characters long";
    }
    setError(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      return;
    }
    // Continueing with login logic
    const { email, password } = data;
    try {
      const response = await axios.post(
        "https://api-melody-verse.up.railway.app/login",
        { email, password }
      );
      const responseData = response.data;
      if (responseData.error) {
        toast.error(responseData.error);
      } else {
        // Set tokens in cookies
        setCookie("accessToken", responseData.accessToken, {
          maxAge: 60 * 60 * 24 * 7,
        }); // Expires in 7 days
        setCookie("refreshToken", responseData.refreshToken, {
          maxAge: 60 * 60 * 24 * 7,
        }); // Expires in 7 days

        setData({ email: "", password: "" });
        toast.success("Login successful. Welcome!");
        router.push("/profile");
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        // Extract and display the error message from the response
        toast.error(error.response.data.error);
      } else {
        // Fallback error message
        toast.error("An error occurred during login.");
      }
    }
  };

  return (
    <>
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      <div className="flex items-center justify-center mt-12 ">
        <div className="w-[90%] md:w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-white mb-4 text-center">
            Login into your account
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
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
            <div className="flex items-center">
              <input
                id="rememberMe"
                type="checkbox"
                checked={rememberMe}
                onChange={toggleRememberMe}
                className="mr-2"
              />
              <label htmlFor="rememberMe" className="text-white text-sm">
                Remember Me
              </label>
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-[#FC0254] text-white font-semibold rounded-lg shadow-xl  focus:outline-none focus:ring-2 transition duration-300"
            >
              Login
            </button>
          </form>
          <p className="mt-6 text-center text-white text-md">
            Don&apos;t have an account?{" "}
            <Link
              className="underline font-medium text-[#FC0254] "
              href="/signup"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
