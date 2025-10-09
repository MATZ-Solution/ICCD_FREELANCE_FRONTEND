import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Login from "../pages/signIn/signIn";
import SignUp from "../pages/signUp";
import VerifyOtp from "./signIn/verifyOtp";
import ForgotPassword from "./signIn/ForgotPassword";
import ChangePassword from "./signIn/ChangePassword";
import login_banner from "../../src/assets/login_banner_img.png";
import CloseIcon from "@mui/icons-material/Close";

const LoginController = ({ onClose, linker }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [modalView, setModalView] = useState(linker || "login");

  const handleSwitch = (view) => setModalView(view);

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      navigate("/");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 sm:p-6 md:p-8 overflow-y-auto">
      <div className="relative flex flex-col lg:flex-row w-full max-w-5xl bg-white rounded-2xl shadow-lg overflow-hidden">

        {/* Left Banner (hidden on small screens) */}
        <div className="hidden lg:flex w-1/2">
          <img
            src={login_banner}
            alt="Banner"
            className="object-cover w-full h-full"
          />
        </div>

        {/* Right Form Section */}
        <div className="relative flex flex-col w-full lg:w-1/2 p-6 sm:p-8 md:p-10">
          {/* Close Button */}
          <button
            onClick={handleClose}
            aria-label="Close modal"
            className="absolute right-4 top-4 w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300 transition"
          >
            <CloseIcon style={{ fontSize: 20 }} />
          </button>

          <div className="flex-grow flex flex-col items-center justify-center">
            {modalView === "login" && <Login handleSwitch={handleSwitch} />}
            {modalView === "signup" && <SignUp handleSwitch={handleSwitch} />}
            {modalView === "forgotPassword" && (
              <ForgotPassword handleSwitch={handleSwitch} setEmail={setEmail} />
            )}
            {modalView === "verify-otp" && (
              <VerifyOtp handleSwitch={handleSwitch} email={email} />
            )}
            {modalView === "change-password" && (
              <ChangePassword
                handleSwitch={handleSwitch}
                email={email}
                setEmail={setEmail}
              />
            )}
          </div>

          {/* Optional Terms text */}
          {/* <p className="text-xs text-center text-gray-500 mt-4">
            By joining, you agree to the ICCD Freelance Terms of Service and
            Privacy Policy.
          </p> */}
        </div>
      </div>
    </div>
  );
};

export default LoginController;
