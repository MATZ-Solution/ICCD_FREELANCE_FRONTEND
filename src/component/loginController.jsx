import React, { useState } from "react";
import Login from "../pages/signIn/signIn";
import SignUp from "../pages/signUp";
import ForgotPassword from "../pages/forgotPass";
import VerifyOtp from "../pages/otpVerification";
import ChangePassword from "../pages/changePass";

// VerifyOtp
import ConfirmEmail from "./signIn/confirm_email";

// ForgotPassword
import GetProfile from "./signIn/get_profile";

// ChangePassword
import ContinueWithEmail from "./signIn/continue_with_email";



const LoginController = () => {

    let [email, setEmail] = useState('')
    const [modalView, setModalView] = useState("change-password");
    const handleSwitch = (view) => setModalView(view);

    return (
        <>
            {modalView === "login" && (
                <Login handleSwitch={handleSwitch} />
            )}
            {modalView === "signup" && (
                <SignUp handleSwitch={handleSwitch} />
            )}

            {/* ############################### */}
            {/* {modalView === "forgotPassword" && (
                <ForgotPassword handleSwitch={handleSwitch} setEmail={setEmail} />
            )} */}

            {modalView === "forgotPassword" && (
                <GetProfile handleSwitch={handleSwitch} setEmail={setEmail} />
            )}

            {/* ############################### */}


            {/* ######################### */}
            {/* {modalView === "verify-otp" && (
                <VerifyOtp handleSwitch={handleSwitch} email={email} />
            )} */}

            {modalView === "verify-otp" && (
                <ConfirmEmail handleSwitch={handleSwitch} email={email} />
            )}

            {/* ######################### */}

            {/* {modalView === "change-password" && (
                <ChangePassword handleSwitch={handleSwitch} email={email} setEmail={setEmail} />
            )} */}

             {modalView === "change-password" && (
                <ContinueWithEmail handleSwitch={handleSwitch} email={email} setEmail={setEmail} />
            )}

        </>
    );
};

export default LoginController;
