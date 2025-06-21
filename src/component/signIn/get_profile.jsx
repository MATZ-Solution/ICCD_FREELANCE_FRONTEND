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


function GetProfile() {
    
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

    return (
        <div className="px-10 w-full mt-5 flex flex-col gap-2">
            <h2 className="text-2xl font-bold text-gray-800 md:text-2xl md:font-semibold ">Get your profile started</h2>
            <p className="text-[#656565] text-sm">Add a username that's unique to you, this is how you'll appear to others.</p>
            <p className="text-[#656565] text-sm font-bold">You can't change your username, so choose wisely.</p>
            <div className="w-full mt-2">
                <label className="block text-sm font-medium text-gray-700">Choose a username</label>
                <Controller
                    control={control}
                    name="userName"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <input
                            name="userName"
                            type="text"
                            value={value}
                            onChange={onChange}
                            className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="John Smith"
                        />
                    )}
                />
                {errors?.userName && (<p className="mt-1 text-red-600">{errors?.userName?.message}</p>)}
            </div>

            {(!errors?.userName) && (
                <p className="text-red-600">{error}</p>
            )}
            <button
                type="submit"
                className={`mt-3 w-full flex gap-2 items-center justify-center px-4 py-2 font-semibold text-white bg-[#15A9B2] rounded-full hover:bg-[#05929c] cursor-pointer transition`}
                // onClick={handleSubmit(onSubmit)}
                disabled={isPending ? true : false}
            >
                <p>Create my account</p>
                <div className=' rounded-full px-1 py- bg-[#60cfd6]'>
                    <EastIcon style={{ fontSize: 20 }} />
                </div>
            </button>
        </div>
    )
}

export default GetProfile