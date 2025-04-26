import React, { useState } from "react";
import { useDispatch } from "react-redux";
import authService from "../../../firebase/AuthService";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { signin } from "../../../features/authSlice";

export default function SignupForm({ onToggle }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const password = watch("password", "");

  const create = async (data) => {
    setError("");
    setIsLoading(true);

    // Check if passwords match
    if (data.password !== data.confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      const userData = await authService.signup(data);
      if (userData) {
        const user = await authService.getCurrentUserId();
        if (user) {
          console.info("SignupForm:: userdata:: ", user);
          dispatch(signin(user));
        }
        navigate("/");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="mt-6 space-y-5" onSubmit={handleSubmit(create)}>
      {/* Show error message if exists */}
      {error && (
        <div className="p-3 rounded-lg bg-red-500/20 border border-red-500/30 text-red-200 text-sm">
          {error}
        </div>
      )}

      {/* Email Input */}
      <div className="space-y-2">
        <label htmlFor="email" className="block text-sm font-medium text-gray-300">
          Email Address
        </label>
        <input
          id="email"
          type="email"
          placeholder="your@email.com"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Please enter a valid email address",
            },
          })}
          className={`w-full px-4 py-3 bg-gray-800/60 border ${
            errors.email ? "border-red-500" : "border-gray-700"
          } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-colors`}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-400">{errors.email.message}</p>
        )}
      </div>

      {/* Password Input */}
      <div className="space-y-2">
        <label htmlFor="password" className="block text-sm font-medium text-gray-300">
          Password
        </label>
        <input
          id="password"
          type="password"
          placeholder="••••••••"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
          className={`w-full px-4 py-3 bg-gray-800/60 border ${
            errors.password ? "border-red-500" : "border-gray-700"
          } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-colors`}
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-400">{errors.password.message}</p>
        )}
      </div>

      {/* Confirm Password Input */}
      <div className="space-y-2">
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300">
          Confirm Password
        </label>
        <input
          id="confirmPassword"
          type="password"
          placeholder="••••••••"
          {...register("confirmPassword", {
            required: "Please confirm your password",
            validate: value => value === password || "Passwords do not match"
          })}
          className={`w-full px-4 py-3 bg-gray-800/60 border ${
            errors.confirmPassword ? "border-red-500" : "border-gray-700"
          } rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-colors`}
        />
        {errors.confirmPassword && (
          <p className="mt-1 text-sm text-red-400">{errors.confirmPassword.message}</p>
        )}
      </div>

      {/* Terms Agreement Checkbox */}
      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            id="terms"
            type="checkbox"
            {...register("terms", { required: "You must agree to the Terms and Conditions" })}
            className="h-4 w-4 bg-gray-800 border-gray-700 rounded focus:ring-yellow-500 text-yellow-500"
          />
        </div>
        <div className="ml-3 text-sm">
          <label htmlFor="terms" className="text-gray-300">
            I agree to the <a href="#" className="text-yellow-400 hover:text-yellow-300">Terms and Conditions</a>
          </label>
          {errors.terms && (
            <p className="mt-1 text-sm text-red-400">{errors.terms.message}</p>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3 bg-gradient-to-r from-yellow-500 to-red-500 hover:from-yellow-600 hover:to-red-600 text-white font-semibold rounded-lg transition duration-300 transform hover:-translate-y-1 disabled:opacity-70 disabled:transform-none"
      >
        {isLoading ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Creating account...
          </span>
        ) : (
          "Create Account"
        )}
      </button>

      {/* Toggle to Sign In */}
      <div className="text-center text-gray-400">
        Already have an account?{" "}
        <button
          type="button"
          onClick={onToggle}
          className="font-medium text-yellow-400 hover:text-yellow-300 transition-colors focus:outline-none"
        >
          Sign in
        </button>
      </div>
    </form>
  );
}