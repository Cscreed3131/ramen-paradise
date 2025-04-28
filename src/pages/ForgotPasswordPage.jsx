import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import authService from "../firebase/AuthService";

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const resetPassword = async (data) => {
    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);
    
    try {
      await authService.resetPassword(data.email);
      setSuccessMessage("Password reset email sent. Please check your inbox.");
    } catch (error) {
      setError(error.message || "Failed to send reset email. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700 shadow-xl p-8">
        <div className="text-center">
          <Link to="/" className="flex items-center justify-center mb-6">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-yellow-500 to-red-500 flex items-center justify-center text-white font-bold text-xl">R</div>
          </Link>
          <h2 className="text-3xl font-extrabold text-white">Reset your password</h2>
          <p className="mt-2 text-sm text-gray-400">
            Enter your email and we'll send you a link to reset your password
          </p>
        </div>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit(resetPassword)}>
          {/* Show error message if exists */}
          {error && (
            <div className="p-3 rounded-lg bg-red-500/20 border border-red-500/30 text-red-200 text-sm">
              {error}
            </div>
          )}

          {/* Show success message if exists */}
          {successMessage && (
            <div className="p-3 rounded-lg bg-green-500/20 border border-green-500/30 text-green-200 text-sm">
              {successMessage}
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
                Sending...
              </span>
            ) : (
              "Send Reset Link"
            )}
          </button>

          {/* Back to Login */}
          <div className="text-center text-gray-400">
            <Link
              to="/signin"
              className="font-medium text-yellow-400 hover:text-yellow-300 transition-colors focus:outline-none"
            >
              Back to sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}