import React, { useState } from 'react';
import EastIcon from '@mui/icons-material/East';
import { useSignUp } from '../../api/client/user';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import SignIn_modal1 from '../component/modal/signIn_Modal1';
import { ArrowLeft } from 'lucide-react';

function SignUp({ handleSwitch }) {
  const { userSignUp, isSuccess, isPending, isError, error, } = useSignUp({
    onSuccess: (res) => {
      handleSwitch("login")
      toast.success("Registered successfull")
    },
    onError: (err) => {
      console.error("Signup error:", err);
    },
  });

  const [showPassword, setShowPassword] = useState(false);

  const schema = yup.object({
    name: yup.string().required('Name is required'),
    email: yup.string()
      .email('Please enter a valid email address')
      .required('Email is required'),
    password: yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required')
  });

  const { register, control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  });

  const onSubmit = (data) => {
    userSignUp(data);
  };

  const handleGoogleLogin = () => {
    window.open("http://localhost:22306/auth/google", "_self");
  };

  return (
    <div className="px-10 w-full mt-5 flex flex-col gap-2">
      <div className='w-full flex justify-center lg:justify-start'>
        {/* Logo can be added here */}
      </div>

      <h2 className="text-2xl font-bold text-gray-800 md:text-2xl md:font-semibold">Sign Up</h2>

      {/* Name Field */}
      <div className="w-full mt-2">
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, onBlur, value } }) => (
            <input
              name="name"
              type="text"
              value={value}
              onChange={onChange}
              className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="eg: John Doe"
            />
          )}
        />
        {errors?.name && (<p className="mt-1 text-sm text-red-600">{errors?.name?.message}</p>)}
      </div>

      {/* Email Field */}
      <div className="w-full mt-2">
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <input
              name="email"
              type="email"
              value={value}
              onChange={onChange}
              className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
            />
          )}
        />
        {errors?.email && (<p className="mt-1 text-sm text-red-600">{errors?.email?.message}</p>)}
      </div>

      {/* Password Field */}
      <div className="mt-2">
        <label className="block text-sm font-medium text-gray-700">Password</label>
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                value={value}
                onChange={onChange}
                className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-500 focus:outline-none"
                tabIndex={-1}
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="20" height="20">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5 0-9-3.5-9-7s4-7 9-7c1.065 0 2.09.22 3.03.61M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="20" height="20">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7zM15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                )}
              </button>
            </div>
          )}
        />
        {errors?.password && (<p className="mt-1 text-sm text-red-600">{errors?.password?.message}</p>)}
      </div>

      {/* Error Message */}
      {(!errors?.email && !errors?.password && !errors?.name) && error && (
        <p className="text-sm text-red-600">{error}</p>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        className={`mt-3 w-full flex gap-2 items-center justify-center px-4 py-2 font-semibold text-white bg-[#15A9B2] rounded-full hover:bg-[#05929c] transition ${isPending ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        onClick={handleSubmit(onSubmit)}
        disabled={isPending}
      >
        <p>{isPending ? 'Submitting...' : 'Sign Up'}</p>
      </button>

      {/* Divider */}
      <div className="flex items-center gap-3 my-3">
        <div className="flex-1 h-px bg-gray-300"></div>
        <span className="text-sm text-gray-500">OR</span>
        <div className="flex-1 h-px bg-gray-300"></div>
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

      {/* Back to Login */}
      <button
        type="button"
        className="mt-2 w-full text-sm text-gray-600 hover:text-gray-800 transition"
        onClick={() => handleSwitch('login')}
      >
        Already have an account? <span className="font-semibold text-[#15A9B2]">Sign In</span>
      </button>
    </div>
  );
}

export default SignUp;