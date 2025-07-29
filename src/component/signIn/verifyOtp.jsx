import { Link } from "react-router-dom";
import EastIcon from '@mui/icons-material/East';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import WestOutlinedIcon from '@mui/icons-material/WestOutlined';
import login_banner from '../../assets/login_banner_img.png'
import logo from '../../assets/ICCD-01.png'
import { useLogin } from "../../../api/client/user";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useState } from "react";
import { useSubmitOtp } from "../../../api/client/user";
import SignIn_modal1 from "../modal/signIn_Modal1";

function VerifyOtp({ handleSwitch, email }) {

    const { handleOtp, isSuccess, isPending, isError, error, data } = useSubmitOtp({
        onSuccess: (response) => {
            handleSwitch("change-password")
        },
    })

    const schema = yup.object({
        otp: yup.string().required('Otp is required')
    })

    const { register, control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            otp: '',
        }
    });

    const onSubmit = (data) => {
        const allData = { ...data, email: email }
        handleOtp(allData)
        //    console.log("allData: ", allData)
    };


    return (
        <div className="px-10 w-full mt-5 flex flex-col gap-2">
            <div className='w-full flex justify-center lg:justify-start'>
                <img
                    src={logo}
                    alt="Banner"
                    className="lg:w-24 lg:h-24 object-fit "
                />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 md:text-2xl md:font-semibold ">Verification Code</h2>
            <p className="text-[#656565] text-sm">Enter the verification code we emailed to:</p>
            <p className="text-[#656565] text-sm font-bold">{email}</p>
            <div className="w-full mt-2 flex gap-5">
                <Controller
                    control={control}
                    name="otp"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <input
                            name="otp"
                            value={value}
                            onChange={onChange}
                            className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter Otp"
                        />
                    )}
                />
            </div>
            <div className='flex gap-4'>
                <button
                    type="submit"
                    className={`mt-3 w-full flex gap-2 items-center justify-center px-4 py-2 font-semibold text-white bg-[#15A9B2] rounded-full hover:bg-[#05929c] cursor-pointer transition`}
                    onClick={() => handleSwitch('forgotPassword')}
                    disabled={isPending ? true : false}
                >
                    {/* <div className=' rounded-full px-1 py- bg-[#60cfd6]'>
            <ArrowLeft style={{ fontSize: 20 }} />
          </div> */}
                    <p>Back</p>
                </button>
                <button
                    type="submit"
                    className={`w-full mt-3 flex gap-2 items-center justify-center px-4 py-2 font-semibold text-white bg-[#15A9B2] rounded-full hover:bg-[#05929c] cursor-pointer transition`}
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
    )
}

export default VerifyOtp