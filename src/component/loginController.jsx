import { useState } from "react";
import { useNavigate } from "react-router-dom";  // <-- import useNavigate
import Login from "../pages/signIn/signIn";
import SignUp from "../pages/signUp";
import VerifyOtp from "./signIn/verifyOtp";
import ForgotPassword from "./signIn/ForgotPassword";
import ChangePassword from "./signIn/ChangePassword";
import login_banner from '../../src/assets/login_banner_img.png'
import CloseIcon from '@mui/icons-material/Close';

const LoginController = ({ onClose ,linker}) => {
    const navigate = useNavigate();  // initialize navigate
    let [email, setEmail] = useState('');

    const [modalView, setModalView] = useState(linker|| "login");
    const handleSwitch = (view) => setModalView(view);
    
  const handleClose = () => {
    if (onClose) {
      onClose(); // Close the modal
    } else {
      navigate("/"); // fallback route
    }
  };
    return (
        <div className="w-full flex   fixed z-20 inset-0 sm:p-5 sm:items-center sm:justify-center lg:p-10 ">
            <div className="absolute  inset-0 bg-black/50 z-0"></div>
            <div className={`z-10 flex justify-center   w-full h-full flex-col bg-white sm:rounded-4xl sm:w-xl md:w-xl lg:flex-row lg:min-w-5xl shadow-lg `}>
                <img src={login_banner} alt="Banner" className="hidden w-full h-full object-fit lg:flex" />
                <div className='relative  w-full flex flex-col'>
                    <div
                        className="cursor-pointer absolute right-5 top-5 w-8 h-8 flex items-center justify-center bg-gray-300 rounded-full"
                        onClick={handleClose}  // navigate on click
                        role="button"
                        aria-label="Close modal"
                        tabIndex={0}
                        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") handleClose(); }}
                    >
                        <CloseIcon style={{ fontSize: 20 }} />
                    </div>
                    <div className="pb-10 rounded-tr-xl rounded-br-xl w-full h-full flex flex-col sm:items-center sm:justify-center">
                        {modalView === "login" && (
                            <Login handleSwitch={handleSwitch} />
                        )}
                        {modalView === "signup" && (
                            <SignUp handleSwitch={handleSwitch} />
                        )}
                        {modalView === "forgotPassword" && (
                            <ForgotPassword handleSwitch={handleSwitch} setEmail={setEmail} />
                        )}

                        {modalView === "verify-otp" && (
                            <VerifyOtp handleSwitch={handleSwitch} email={email} />
                        )}

                        {modalView === "change-password" && (
                            <ChangePassword handleSwitch={handleSwitch} email={email} setEmail={setEmail} />
                        )}
                    </div>
                    {/* <p className="px-10 pb-6 text-xs text-center">
                        By joining, you agree to the ICCD Freelance Terms of Service and to occasionally receive emails from us. Please read our Privacy Policy to learn how we use your personal data.
                    </p> */}
                </div>
            </div>
        </div>
    );
};

export default LoginController;
