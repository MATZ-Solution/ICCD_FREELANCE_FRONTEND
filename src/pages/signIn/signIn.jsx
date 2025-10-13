import React, { useState } from "react";
import { useLogin } from "../../../api/client/user";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import EastIcon from "@mui/icons-material/East";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Button from "../../component/button";
import { Mail } from "lucide-react";

function Login({ handleSwitch }) {
  const navigate = useNavigate();
  const { userLogin, isSuccess, isPending, isError, reset, error } = useLogin();
  const [showPassword, setShowPassword] = useState(false);

  const schema = yup.object({
    email: yup
      .string()
      .email("Enter a valid email")
      .required("Email is required"),
    password: yup.string().required("Password is required"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = (data) => userLogin(data);

  const handleGoogleLogin = () => {
    window.open("https://iccd.freelanceserver.matzsolutions.com/auth/google", "_self");
  };

  return (
    <div className="w-full">
      <h2 className="text-3xl font-bold text-gray-800 text-center">
        Welcome Back
      </h2>
      <p className="text-gray-500 text-center">
        Login to continue to your account
      </p>

      {/* Email Input */}
      <div className="mt-2 flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">Email</label>
        <Controller
          control={control}
          name="email"
          render={({ field }) => (
            <input
              {...field}
              type="email"
              placeholder="you@example.com"
              className={`px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-150 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
          )}
        />
        {errors?.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
        )}
      </div>

      {/* Password Input */}
      <div className="mt-2 flex flex-col relative">
        <label className="text-sm font-medium text-gray-700 mb-1">
          Password
        </label>
        <Controller
          control={control}
          name="password"
          render={({ field }) => (
            <div className="relative">
              <input
                {...field}
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-blue-500 focus:outline-none transition duration-150 ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </button>
            </div>
          )}
        />
        {errors?.password && (
          <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
        )}
      </div>

      {/* API Error */}
      {isError && <p className="text-red-500 text-center">{error}</p>}

      {/* Submit Button */}
      <Button
        className="w-full py-3 rounded-lg bg-[#46A5AD] hover:bg-[#1a7078] text-white font-semibold mt-5 transition disabled:opacity-50 disabled:cursor-not-allowed"
        text={isPending ? "Logging in..." : "Login"}
        onClick={handleSubmit(onSubmit)}
        disabled={isPending}
      />

      {/* OR Divider */}
      <div className="flex items-center my-4 text-gray-400">
        <hr className="flex-grow border-gray-300" />
        <span className="mx-2">OR</span>
        <hr className="flex-grow border-gray-300" />
      </div>

      {/* Google Login */}
      <button
        onClick={handleGoogleLogin}
        className="w-full py-3 rounded-lg bg-white hover:bg-gray-50 text-gray-700 font-semibold transition flex items-center justify-center gap-2 border-2 border-gray-200 shadow-sm"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
        <span>Continue with Google</span>
      </button>
      {/* Switch Links */}
      <div className="flex justify-between mt-4 text-gray-600">
        <p
          className="cursor-pointer underline hover:text-gray-800"
          onClick={() => handleSwitch("signup")}
        >
          Sign Up
        </p>
        <p
          className="cursor-pointer underline hover:text-gray-800"
          onClick={() => handleSwitch("forgotPassword")}
        >
          Forgot Password?
        </p>
      </div>
    </div>
  );
}

export default Login;
