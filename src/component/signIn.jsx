import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import EastIcon from '@mui/icons-material/East';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import WestOutlinedIcon from '@mui/icons-material/WestOutlined';
import login_banner from '../assets/login_banner_img.png'
import { useLogin } from "../../api/client/user";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const Login = () => {

  const { userLogin, isSuccess, isPending, isError, reset, error, data } = useLogin()
  const [withEmail, setWithEmail] = useState(false)
  const schema = yup.object({
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
      email: '',
      password: ''
    }
  });
  const onSubmit = (data) => {
    // console.log("data: ", data)
    userLogin(data)
  };

  useEffect(() => {
    if (showLogin) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => document.body.classList.remove("overflow-hidden");
  }, [showLogin]);

  return (
    <div className=" w-full flex items-center justify-center p-5 h-[100vh] lg:p-10 fixed z-20 inset-0">
      <div className="absolute inset-0 bg-black/50 z-0"></div>
      <div className="z-10 rounded-4xl bg-red-300 flex w-full h-full  bg-white lg:w-[80%] shadow-lg">
        <img
          src={login_banner}
          alt="Banner"
          className="hidden  w-full h-full object-fit  lg:flex"
        />
        <div className="px-10 pb-10 rounded-tr-xl rounded-br-xl  w-full flex items-center justify-center flex-col ">
          {
            !withEmail && (
              <div className=" ">
                <h2 className="text-2xl font-bold  text-gray-800 md:text-4xl md:font-semibold ">Create a New Account</h2>
                <p className="mt-4">Already have an account? <span className="text-[#15A9B2] underline">Sign in</span></p>
                <div className="w-full space-y-4 ">
                  <div className="relative w-full mt-5 text-black hover:text-white">
                    <EmailOutlinedIcon className="absolute top-2 left-2 " />
                    <button
                      type="submit"
                      className={`border-[1px] border-gray-300 w-full px-4 py-2 font-semibold  bg-white rounded-md  hover:bg-[#01AEAD] transition`}
                      // onClick={handleSubmit(onSubmit)}
                      disabled={isPending ? true : false}
                    >
                      Continue with Google
                    </button>
                  </div>

                  <div className="relative w-full mt-5 text-black hover:text-white">
                    <EmailOutlinedIcon className="absolute top-2 left-2 " />
                    <button
                      type="submit"
                      className={`border-[1px] border-gray-300 w-full px-4 py-2 font-semibold  bg-white rounded-md hover:bg-[#01AEAD] transition`}
                      onClick={() => setWithEmail(true)}
                      disabled={isPending ? true : false}
                    >
                      Continue with email
                    </button>
                  </div>
                </div>
              </div>
            )
          }
          {
            withEmail && (
              <div className="w-full mt-5 flex flex-col gap-2">
                <button
                  onClick={() => setWithEmail(false)}
                  className="flex items-center gap-2 cursor-pointer">
                  <WestOutlinedIcon />
                  <p className="text-black font-semibold">Back</p>
                </button>
                <h2 className="text-2xl font-bold text-gray-800 md:text-2xl md:font-semibold ">Continue with your email</h2>
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
                  {errors?.password && (<p className="mt-1 text-red-600">{errors?.password?.message}</p>)}
                </div>

                {(!errors?.email && !errors?.password) && (
                  <p className="text-red-600">{error}</p>
                )}
                <button
                  type="submit"
                  className={`mt-3 w-full flex gap-2 items-center justify-center px-4 py-2 font-semibold text-white bg-[#15A9B2] rounded-full hover:bg-[#05929c] cursor-pointer transition`}
                  onClick={handleSubmit(onSubmit)}
                  disabled={isPending ? true : false}
                >
                  <p>Continue</p>
                  <div className=' rounded-full px-1 py- bg-[#60cfd6]'>
                    <EastIcon style={{ fontSize: 20 }} />
                  </div>
                </button>
                {/* <div className="flex flex-col gap-1">
                  <p>At least 8 characters</p>
                  <p>At least 1 uppercase letter</p>
                  <p>At least 1 lowercase letter</p>
                  <p>At least 1 number</p>
                </div> */}
                <div className="flex justify-end">
                  {/* <Link className="underline" to='/signUp'>Sign Up</Link> */}
                  <Link className="self-end underline hover:text-[#01AEAD]" to='/forgot-password'>Forgot Password?</Link>
                </div>
              </div>
            )
          }
          <p className="mt-10 text-sm text-center">
            By joining, you agree to the ICCD Freelance Terms of Service and to occasionally receive emails from us. Please read our Privacy Policy to learn how we use your personal data.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
