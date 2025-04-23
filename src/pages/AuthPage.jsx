import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../components/index";
import SigninForm from "./auth/components/SigninForm";
import SignupForm from "./auth/components/SignupForm";

export default function AuthPage() {
  const [isSignin, setIsSignin] = useState(true);
  
  return (
    <div
      className="
        flex items-center justify-center
        h-screen w-full
        bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900"
    >
      <div className="w-full max-w-sm">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-gray-800 text-start">
              {isSignin ? "Sign-In" : "Sign-Up"}
            </CardTitle>
            <CardDescription className="text-sm text-gray-600 text-start mt-2">
              {isSignin
                ? "Enter your email below to Sign-in to your account"
                : "Create an account by filling out the form below"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isSignin ? (
              <SigninForm onToggle={() => setIsSignin(false)} />
            ) : (
              <SignupForm onToggle={() => setIsSignin(true)} />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}