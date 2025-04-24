import React from "react";
import { useDispatch } from "react-redux";
import authService  from "../../../firebase/AuthService";
import { Link,useNavigate } from "react-router-dom";
import { Button,Input,Logo } from "../../../components";
import { useForm } from "react-hook-form";
import { signin } from "../../../features/authSlice";

export default function SignupForm({ onToggle }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error,setError] = React.useState(null);
  const {register,handleSubmit} = useForm();

  const create = async (data) => {
    setError("");

    // Check if passwords match
    if (data.password !== data.confirmPassword) {
        setError("Passwords do not match");
        return;
    }

    try {
        const userData = await authService.signup(data);
        if (userData) {
            const user = await authService.getCurrentUserId();
            if (user) {
                console.info("SignupForm:: userdata:: ",user)
                dispatch(signin(user));
            }
            navigate("/");
        }
    } catch (error) {
        setError(error.message);
    }
};

  return (
    <form className="mt-6" onSubmit={handleSubmit(create)}>
      <div className="flex flex-col gap-2">
        {/* Email Input */}
        <div className="flex flex-col gap-1">
          <Input
            label="Email"
            id="email"
            type="email"
            placeholder="m@example.com"
            {...register("email", { required: true,
              validate: (value) => {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailRegex.test(value) || "Invalid email address";
              },
            })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        {/* Password Input */}
        <div className="flex flex-col gap-1">
          <Input
            label="Password"
            id="password"
            type="password"
            placeholder="Enter your password"
            {...register("password", { required: true })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        {/* Confirm Password Input */}
        <div className="flex flex-col gap-1">
        <Input
            label="Confirm password"
            id="confirm-password"
            type="password"
            placeholder="Enter your password"
            {...register("confirmPassword", { required: true })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        {/* Sign-up Button */}
        <Button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
          onClick={()=>{handleSubmit}}
        >
          Sign-up
        </Button>
        {/* Google Sign-up Button */}
        <Button
          type="button"
          className="w-full py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition duration-300"
        >
          Sign-up with Google
        </Button>
      </div>
      {/* Toggle to Signin */}
      <div className="mt-4 text-center text-sm text-gray-600">
        Already have an account?{" "}
        <Button
          type="button"
          onClick={onToggle}
          className="text-blue-500 hover:underline"
        >
          Sign in
        </Button>
      </div>
    </form>
  );
}