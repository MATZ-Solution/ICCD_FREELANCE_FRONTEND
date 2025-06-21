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
import CheckBoxOutlineBlankOutlinedIcon from '@mui/icons-material/CheckBoxOutlineBlankOutlined';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';

function Services() {

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

    const [profile, setProfile] = useState('')


    return (
        <div className="px-10 w-full mt-5 flex flex-col gap-2">
            <h2 className="text-center  font-bold text-gray-800 md:text-2xl md:font-semibold text-lg sm:text-2xl">What do you plan to order services for? </h2>
            <p className="text-center text-[#656565] text-sm">There’s something for everyone.</p>
            <div className="w-full mt-2 flex flex-col gap-5 sm:flex-row ">

                <button onClick={() => setProfile('primary job or business')} className={` relative border-2 p-7 rounded-2xl sm:p-10 ${profile === 'primary job or business' ? 'border-black' : 'border-gray-300'}`}>
                    <div className=" absolute right-2 top-2">
                        {(profile === 'primary job or business') ? (<CheckBoxOutlinedIcon />) : <CheckBoxOutlineBlankOutlinedIcon />}
                    </div>
                    <h1>Primary job or business</h1>
                   
                </button>
                <button onClick={() => setProfile('Secondary Business')} className={` relative border-2  p-7 rounded-2xl sm:p-10 ${profile === 'Secondary Business' ? 'border-black' : 'border-gray-300'}`}>
                    <div className="absolute right-2 top-2">{(profile === 'Secondary Business') ? (<CheckBoxOutlinedIcon />) : <CheckBoxOutlineBlankOutlinedIcon />}</div>
                    <h1>Secondary Business</h1>
                </button>
                <button onClick={() => setProfile('Non-business needs')} className={` relative border-2  p-7 rounded-2xl sm:p-10 ${profile === 'Non-business needs' ? 'border-black' : 'border-gray-300'}`}>
                    <div className="absolute right-2 top-2">{(profile === 'Non-business needs') ? (<CheckBoxOutlinedIcon />) : <CheckBoxOutlineBlankOutlinedIcon />}</div>
                    <h1>Non-business needs</h1>
                </button>
            </div>

            <button
                type="submit"
                className={`mt-3 w-full flex gap-2 items-center justify-center px-4 py-2 font-semibold text-white bg-[#15A9B2] rounded-full hover:bg-[#05929c] cursor-pointer transition`}
                // onClick={handleSubmit(onSubmit)}
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

export default Services