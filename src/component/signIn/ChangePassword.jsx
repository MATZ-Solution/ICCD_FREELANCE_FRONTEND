import EastIcon from '@mui/icons-material/East';
import logo from '../../assets/ICCD-01.png'
import { useLogin } from "../../../api/client/user";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useChangePassword } from '../../../api/client/user';
import SignIn_modal1 from '../modal/signIn_Modal1';

function ChangePassword({ handleSwitch, email, setEmail }) {

    const schema = yup.object({
        new_pass: yup.string().required('New Password is required'),
        password: yup.string().required('Confirm Password is required')
    })

    const { register, control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            new_pass: '',
            password: ''
        }
    });

    const onSubmit = (data) => {
        const allData = { ...data, email: email }
        change_pass(allData)
        handleSwitch("login")
    };

    const { change_pass, isSuccess, isPending, isError, error, data } = useChangePassword({
        onSuccess: (response, data) => {
            handleSwitch('login')
            setEmail("")
        },
        onError: (err) => {
            console.error("Signup error:", err);
        },
    })

    return (
        <div className="px-10 w-full mt-5 flex flex-col gap-2">
            <div className='w-full flex justify-center lg:justify-start'>
                <img
                    src={logo}
                    alt="Banner"
                    className="lg:w-24 lg:h-24 object-fit "
                />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 md:text-2xl md:font-semibold ">Change Password</h2>
            <div className="w-full mt-2">
                <label className="block text-sm font-medium text-gray-700">New Password</label>
                <Controller
                    control={control}
                    name="new_pass"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <input
                            name="new_pass"
                            type="text"
                            value={value}
                            onChange={onChange}
                            className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder=""
                        />
                    )}
                />
                {errors?.new_pass && (<p className="mt-1 text-red-600">{errors?.new_pass?.message}</p>)}
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                <Controller
                    control={control}
                    name="password"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <input
                            name="password"
                            type="text"
                            value={value}
                            onChange={onChange}
                            className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        // placeholder="••••••••"
                        />
                    )}
                />
                {errors?.password && (<p className="mt-1 text-red-600">{errors?.password?.message}</p>)}
            </div>

            {(!errors?.password && !errors?.new_pass) && (
                <p className="text-red-600">{error}</p>
            )}
            <div className='flex gap-4'>
                <button
                    className={`mt-3 w-full flex gap-2 items-center justify-center px-4 py-2 font-semibold text-white bg-[#15A9B2] rounded-full hover:bg-[#05929c] cursor-pointer transition`}
                    onClick={() => handleSwitch('verify-otp')}
                    disabled={isPending ? true : false} 
                >
                    <p>Back</p>
                </button>
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
            </div>
            {/* <div className="flex flex-col gap-1">
                  <p>At least 8 characters</p>
                  <p>At least 1 uppercase letter</p>
                  <p>At least 1 lowercase letter</p>
                  <p>At least 1 number</p>
                </div> */}
            <div className="flex justify-between">
                <p className="underline" onClick={() => setModalData({ ...modalData, ModalName: 'signup' })}>Sign Up</p>
            </div>
        </div>
    )
}

export default ChangePassword