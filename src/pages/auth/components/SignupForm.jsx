import React from "react";
import { useDispatch } from "react-redux";
import authService  from "../../../features/authSlice";

export default function SignupForm({ onToggle }) {
  const dispatch = useDispatch();
  return (
    <form className="mt-6">
      <div className="flex flex-col gap-2">
        {/* Email Input */}
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="m@example.com"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        {/* Password Input */}
        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            id="password"
            type="password"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        {/* Confirm Password Input */}
        <div className="flex flex-col gap-1">
          <label htmlFor="confirm-password" className="text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <input
            id="confirm-password"
            type="password"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        {/* Sign-up Button */}
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
          onClick={()=>{handleSubmit}}
        >
          Sign-up
        </button>
        {/* Google Sign-up Button */}
        <button
          type="button"
          className="w-full py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition duration-300"
        >
          Sign-up with Google
        </button>
      </div>
      {/* Toggle to Signin */}
      <div className="mt-4 text-center text-sm text-gray-600">
        Already have an account?{" "}
        <button
          type="button"
          onClick={onToggle}
          className="text-blue-500 hover:underline"
        >
          Sign in
        </button>
      </div>
    </form>
  );
}