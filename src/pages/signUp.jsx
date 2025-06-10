import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useSignUp } from "../../api/client/user";

const Signup = () => {

  const { userSignUp, isSuccess, isPending, isError, reset, error, data } = useSignUp()

  const schema = yup.object({

    name: yup.string().required("Name is required"),
    email: yup.string()
      .email('Please enter a valid email address')
      .required('Email is required')
    ,
    password: yup.string()
    // .min(6, 'Password must be at least 6 characters')
    // .max(20, 'Password cannot exceed 20 characters')
    // .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    // .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    // .matches(/[0-9]/, 'Password must contain at least one number')
    // .matches(/[@$!%*?&#]/, 'Password must contain at least one special character')
    // .required('Password is required')
    ,
  })

  const { register, control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      password: ''
    }
  });

  const onSubmit = (data) => {
    // console.log("data: ", data)
    userSignUp(data)
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800">Create Account</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, onBlur, value } }) => (
                <input
                  name="name"
                  type="name"
                  value={value}
                  onChange={onChange}
                  className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your name"
                />
              )}
            />
            {errors.name && <p className="mt-4 text-red-600">{errors.name.message}</p>}
          </div>
          <div>
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
                  placeholder="Enter your email"
                />
              )}
            />
            {errors.email && <p className="mt-4 text-red-600">{errors.email.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <Controller
              control={control}
              name="password"
              render={({ field: { onChange, onBlur, value } }) => (
                <input
                  name="password"
                  type="password"
                  value={value}
                  onChange={onChange}
                  className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="••••••••"
                />
              )}
            />
            {errors.email && <p className="mt-4 text-red-600">{errors.email.message}</p>}
          </div>
          {error && <p className="text-red-600">{error}</p>}
          <button
            type="submit"
            className="w-full px-4 py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 transition"
            onClick={handleSubmit(onSubmit)}
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
