import React,{useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { signin as authSignin} from "../../../features/authSlice";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import authService from "../../../firebase/AuthService";
import {Input,Button} from "../../../components/index"

export default function SigninForm({ onToggle }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {register,handleSubmit} = useForm();
  const [error, setError] = useState(null);

  const signin = async (data)=> {
    setError("")
    try{
      const session = await authService.signin(data)
      if(session){
        const userData = await authService.getCurrentUserId()
        if(userData){
          dispatch(authSignin(userData))
        }
        navigate("/")
      }
    }catch(error){
      console.log(error.message)
      setError(error.message)
    }
  }

  return (
    <form className="mt-6" onSubmit={handleSubmit(signin)} >
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
          <div className="flex justify-center items-center">
            <a href="#" className="text-sm text-blue-500 hover:underline">
              Forgot your password?
            </a>
          </div>
        </div>
        {/* Sign-in Button */}
        <Button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Sign-in
        </Button>
        {/* Google Sign-in Button */}
        <Button
          type="Button"
          className="w-full py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition duration-300"
        >
          Sign-in with Google
        </Button>
      </div>
      {/* Toggle to Signup */}
      <div className="mt-4 text-center text-sm text-gray-600">
        Don&apos;t have an account?{" "}
        <Button
          type="button"
          onClick={onToggle}
          className="text-blue-500 hover:underline"
        >
          Sign up
        </Button>
      </div>
    </form>
  );
}