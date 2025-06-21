import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import logo from '../../assets/ICCD-01.png'
import { useLocation } from 'react-router-dom';
import WestOutlinedIcon from '@mui/icons-material/WestOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';

function CreateNewAccount() {
    const location = useLocation()
    const { pathname } = location
    return (
        <div className='h-full'>
            <div className={`mt-5 w-full pr-5 flex items-center  ${pathname === '/login' ? 'justify-end' : 'justify-between flex'}`}>
                <button
                    onClick={() => setWithEmail(false)}
                    className={`flex items-center gap-2 cursor-pointer ${pathname === '/login' && 'hidden'} `}>
                    <WestOutlinedIcon />
                    <p className="text-black font-semibold">Back</p>
                </button>
                <button
                    onClick={() => setWithEmail(false)}
                    className="self-end bg-gray-200 flex p-2 rounded-full items-center gap-2 cursor-pointer">
                    <CloseOutlinedIcon />
                </button>
            </div>
            <div className="px-10 w-full flex flex-col h-full items-center justify-center">
                <div className="w-full flex items-center flex-col ">
                    <img
                        src={logo}
                        alt="Banner"
                        className=" object-fit lg:hidden"
                    />
                    <h2 className="text-2xl font-bold text-gray-800 md:text-3xl md:font-semibold ">Create a New Account</h2>
                    <p className="mt-4">Already have an account? <span className="text-[#15A9B2] underline">Sign in</span></p>
                    <div className="w-full space-y-4 ">
                        <div className="relative w-full mt-5 text-black hover:text-white">
                            <EmailOutlinedIcon className="absolute top-2 left-2 " />
                            <button
                                type="submit"
                                className={`border-[1px] border-gray-300 w-full px-4 py-2 font-semibold  bg-white rounded-md  hover:bg-[#01AEAD] transition`}
                            // onClick={handleSubmit(onSubmit)}
                            // disabled={isPending ? true : false}
                            >
                                Continue with Google
                            </button>
                        </div>

                        <div className="relative w-full mt-5 text-black hover:text-white">
                            <EmailOutlinedIcon className="absolute top-2 left-2 " />
                            <button
                                type="submit"
                                className={`border-[1px] border-gray-300 w-full px-4 py-2 font-semibold  bg-white rounded-md hover:bg-[#01AEAD] transition`}
                            // onClick={() => setWithEmail(true)}
                            // disabled={isPending ? true : false}
                            >
                                Continue with email
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateNewAccount