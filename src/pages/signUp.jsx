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
    name: yup.string().required('Email is required'),
    email: yup.string()
      .email('Please enter a valid email address')
      .required('Email is required'),
    password: yup.string()
    // .min(6, 'Password must be at least 6 characters')
    // .max(20, 'Password cannot exceed 20 characters')
    // .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    // .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    // .matches(/[0-9]/, 'Password must contain at least one number')
    // .matches(/[@$!%*?&#]/, 'Password must contain at least one special character')
    // .required('Password is required')
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

  return (
    <div className="px-10 w-full mt-5 flex flex-col gap-2">
      <div className='w-full flex justify-center lg:justify-start'>
        {/* <img
                    src={logo}
                    alt="Banner"
                    className="lg:w-24 lg:h-24 object-fit "
                /> */}
      </div>
      {/* <div className='flex '>
        <ArrowLeft />
        <button className=' flex outline-none'><p>back</p>
        </button>
      </div> */}

      <h2 className="text-2xl font-bold text-gray-800 md:text-2xl md:font-semibold ">Sign Up</h2>
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
              placeholder="you@example.com"
            />
          )}
        />
        {errors?.name && (<p className="mt-1 text-red-600">{errors?.name?.message}</p>)}
      </div>

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
        {errors?.email && (<p className="mt-1 text-red-600">{errors?.email?.message}</p>)}
      </div>

      <div>
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
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="20" height="20"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5 0-9-3.5-9-7s4-7 9-7c1.065 0 2.09.22 3.03.61M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="20" height="20"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7zM15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                )}
              </button>
            </div>
          )}
        />
        {errors?.password && (<p className="mt-1 text-red-600">{errors?.password?.message}</p>)}
      </div>

      {(!errors?.email && !errors?.password) && (
        <p className="text-red-600">{error}</p>
      )}

      <div className='flex gap-4'>
        <button
          type="submit"
          className={`mt-3 w-full flex gap-2 items-center justify-center px-4 py-2 font-semibold text-white bg-[#15A9B2] rounded-full hover:bg-[#05929c] cursor-pointer transition`}
          onClick={() => handleSwitch('login')}
          disabled={isPending ? true : false}
        >
          {/* <div className=' rounded-full px-1 py- bg-[#60cfd6]'>
            <ArrowLeft style={{ fontSize: 20 }} />
          </div> */}
          <p>Back</p>
        </button>
        <button
          type="submit"
          className={`mt-3 w-full flex gap-2 items-center justify-center px-4 py-2 font-semibold text-white bg-[#15A9B2] rounded-full hover:bg-[#05929c] cursor-pointer transition`}
          onClick={handleSubmit(onSubmit)}
          disabled={isPending ? true : false}
        >
          <p>Submit</p>
          {/* <div className=' rounded-full px-1 py- bg-[#60cfd6]'>
            <EastIcon style={{ fontSize: 20 }} />
          </div> */}
        </button>
      </div>
    </div>
  );
}

export default SignUp;
