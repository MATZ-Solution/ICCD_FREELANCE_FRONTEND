import login_banner from '../../assets/login_banner_img.png'
import CreateNewAccount from "../signIn/create_new_acc";
import ContinueWithEmail from '../signIn/continue_with_email';
import GetProfile from '../signIn/get_profile'
import ConfirmEmail from '../signIn/confirm_email'
import ChooseProfile from '../signIn/choose_profile'
import Services from '../signIn/services'

function SignIn_modal1({ type }) {
    return (
        <div className={`z-10 rounded-4xl bg-red-300 flex w-full h-full bg-white 
        ${type === 'registration' ? 'md:w-[80%] lg:w-[70%] shadow-lg' : 'md:w-[80%] lg:w-[70%] shadow-lg'} `}>
            {
                type === 'registration' && (
                    <img
                        src={login_banner}
                        alt="Banner"
                        className="hidden w-full h-full object-fit  lg:flex"
                    />
                )
            }

            <div className="pb-10 rounded-tr-xl rounded-br-xl w-full flex items-center justify-center flex-col ">
                {/* <CreateNewAccount /> */}
                {/* <ContinueWithEmail /> */}
                {/* <GetProfile /> */}
                {/* <ConfirmEmail /> */}
                <ChooseProfile />
                {/* <Services /> */}
                <p className="px-10 mt-10 text-sm text-center">
                    By joining, you agree to the ICCD Freelance Terms of Service and to occasionally receive emails from us. Please read our Privacy Policy to learn how we use your personal data.
                </p>
            </div>
        </div>

    )
}

export default SignIn_modal1