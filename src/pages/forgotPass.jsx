// ForgotPassword.tsx
import React, { useState } from "react";
import { useSendOtp } from "../../api/client/user";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const ForgotPassword = ({ handleSwitch, setEmail }) => {

  const { handleEmail, isSuccess, isPending, isError, error, data } = useSendOtp({
    onSuccess: (response, data) => {
      handleSwitch('verify-otp')
      setEmail(data?.email)
    },
    onError: (err) => {
      console.error("Signup error:", err);
    },
  })

  const schema = yup.object({
    email: yup.string()
      .email('Please enter a valid email address').required('Email is required')
  })

  const { register, control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      email: '',
    }
  });

  const onSubmit = (data) => {
    handleEmail(data)
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="mb-6 text-2xl font-bold text-center">Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2 text-sm font-medium">Email</label>
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
                placeholder="Enter your email"
              />
            )}
          />
          {errors.email && (<p className="mt-4 text-red-600">{errors.email.message}</p>)}

          {(error && !errors.email) && (<p className="text-red-500">{error}</p>)}
          <button
            type="submit"
            className="w-full py-2 font-semibold text-white bg-blue-600 mt-4 rounded hover:bg-blue-700"
            onClick={handleSubmit(onSubmit)}
          >
            Send OTP
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
