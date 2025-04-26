import React, { useState } from "react";
import SigninForm from "./auth/components/SigninForm";
import SignupForm from "./auth/components/SignupForm";
import { Link } from "react-router-dom";

export default function AuthPage() {
  const [isSignin, setIsSignin] = useState(true);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 flex items-center justify-center p-4 sm:p-6 md:p-8 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full bg-red-500 blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full bg-yellow-500 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/4 w-24 h-24 rounded-full bg-orange-400 blur-3xl"></div>
      </div>
      
      {/* Auth Container */}
      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <Link to="/" className="flex items-center mb-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-yellow-500 to-red-500 flex items-center justify-center text-white font-bold text-2xl">
              R
            </div>
          </Link>
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-red-500">
            Ramen Paradise
          </span>
        </div>
        
        {/* Card */}
        <div className="backdrop-blur-sm bg-gray-900/40 rounded-2xl shadow-2xl border border-gray-700 overflow-hidden">
          {/* Tab Navigation */}
          <div className="flex border-b border-gray-700">
            <button
              onClick={() => setIsSignin(true)}
              className={`flex-1 py-4 text-center font-medium transition-colors duration-300 ${
                isSignin 
                  ? 'text-white border-b-2 border-yellow-500' 
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsSignin(false)}
              className={`flex-1 py-4 text-center font-medium transition-colors duration-300 ${
                !isSignin 
                  ? 'text-white border-b-2 border-yellow-500' 
                  : 'text-gray-400 hover:text-gray-300'
              }`}
            >
              Sign Up
            </button>
          </div>
          
          {/* Form Container */}
          <div className="p-6 sm:p-8">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-white">
                {isSignin ? "Welcome Back" : "Create Account"}
              </h1>
              <p className="text-gray-400 mt-2">
                {isSignin
                  ? "Sign in to access your account and place orders"
                  : "Join Ramen Paradise for exclusive offers and faster checkout"}
              </p>
            </div>
            
            {/* Render appropriate form */}
            {isSignin ? (
              <SigninForm onToggle={() => setIsSignin(false)} />
            ) : (
              <SignupForm onToggle={() => setIsSignin(true)} />
            )}
            
            {/* Social Login Options */}
            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-gray-900/40 text-gray-400">Or continue with</span>
                </div>
              </div>
              
              <div className="mt-4 grid grid-cols-2 gap-3">
                <button className="flex justify-center items-center py-2.5 border border-gray-700 rounded-lg hover:bg-gray-800/50 transition-colors duration-300">
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.545 10.239v3.821h5.445c-0.712 2.315-2.647 3.972-5.445 3.972-3.332 0-6.033-2.701-6.033-6.032s2.701-6.032 6.033-6.032c1.498 0 2.866 0.549 3.921 1.453l2.814-2.814c-1.798-1.677-4.203-2.701-6.735-2.701-5.552 0-10.054 4.502-10.054 10.054s4.502 10.054 10.054 10.054c8.396 0 10.054-7.629 10.054-10.053 0-0.672-0.057-1.32-0.163-1.944h-9.891z" />
                  </svg>
                  <span className="text-white font-medium">Google</span>
                </button>
                <button className="flex justify-center items-center py-2.5 border border-gray-700 rounded-lg hover:bg-gray-800/50 transition-colors duration-300">
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                  </svg>
                  <span className="text-white font-medium">Facebook</span>
                </button>
              </div>
            </div>
            
            {/* Additional Info */}
            <div className="mt-8 text-center text-gray-400 text-sm">
              By continuing, you agree to our{' '}
              <a href="#" className="text-yellow-400 hover:text-yellow-300">Terms of Service</a>
              {' '}and{' '}
              <a href="#" className="text-yellow-400 hover:text-yellow-300">Privacy Policy</a>
            </div>
          </div>
        </div>
        
        {/* Back to Home */}
        <div className="mt-8 text-center">
          <Link 
            to="/" 
            className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center justify-center"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 mr-2" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path 
                fillRule="evenodd" 
                d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" 
                clipRule="evenodd" 
              />
            </svg>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}