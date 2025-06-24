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

function ConfirmEmail({modalData, setModalData}) {

    const { userLogin, isSuccess, isPending, isError, reset, error, data } = useLogin()
    const schema = yup.object({
        userName: yup.string()
            .required('Username is required.')
    })

    const { register, control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            userName: '',
        }
    });

    const onSubmit = (data) => {
        // console.log("data: ", data)
        userLogin(data)
    };

    const [otp, setOtp] = useState('')

    return (
        <div className="px-10 w-full mt-5 flex flex-col gap-2">
              <div className='w-full flex justify-center lg:justify-start'>
                            <img
                                src={logo}
                                alt="Banner"
                                className="lg:w-24 lg:h-24 object-fit "
                            />
                        </div>
            <h2 className="text-2xl font-bold text-gray-800 md:text-2xl md:font-semibold ">Confirm your email</h2>
            <p className="text-[#656565] text-sm">Enter the verification code we emailed to:</p>
            <p className="text-[#656565] text-sm font-bold">matzsolutions@outlook.com</p>
            <div className="w-full mt-2 flex gap-5">
                {
                    Array.from({ length: 6 }).map((_, index) => (
                        <input
                        key={index}
                            className="w-12 h-12 border-2 border-gray-600 rounded-md px-4"
                            maxLength={1}
                            onChange={(e) => setOtp(otp + e.target.value)}
                        />  
                    ))
                }
            </div>
            <button
                type="submit"
                className={` mt-3 flex gap-2 items-center justify-center px-4 py-2 font-semibold text-white bg-[#15A9B2] rounded-full hover:bg-[#05929c] cursor-pointer transition`}
                onClick={() => setModalData({ ...modalData,
                     ModalName: 'choose profile',
                     isShowLeftPic: false,
                     isShowPolicy: false
                     })}
                disabled={isPending ? true : false}
            >
                <p>Submit</p>
                <div className=' rounded-full px-1 py- bg-[#60cfd6]'>
                    <EastIcon style={{ fontSize: 20 }} />
                </div>
            </button>

        </div>
    )
}

export default ConfirmEmail