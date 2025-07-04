import { useLogin } from '../../../api/client/user';
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useNavigate } from 'react-router-dom';
import EastIcon from '@mui/icons-material/East';
import SignIn_modal1 from '../../component/modal/signIn_Modal1';

function Login({ modalData, setModalData }) {

  const navigate = useNavigate()
  const { userLogin, isSuccess, isPending, isError, reset, error, data } = useLogin()

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

  return (
    <SignIn_modal1>
      <div className="px-10 w-full mt-5 flex flex-col gap-2">
        <div className='w-full flex justify-center lg:justify-start'>
          {/* <img
                    src={logo}
                    alt="Banner"
                    className="lg:w-24 lg:h-24 object-fit "
                /> */}
        </div>
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
        <div className="flex justify-between">
          <p className="underline" onClick={() => navigate('/signUp')}>Sign Up</p>
        </div>
      </div>
    </SignIn_modal1>
  )
}

export default Login