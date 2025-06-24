import login_banner from '../assets/login_banner_img.png'
import SignIn_modal1 from "../component/modal/signIn_Modal1";

const Login = () => {
  return (
    <div className=" w-full flex items-center justify-center p-5 h-[100vh] lg:p-10 fixed z-20 inset-0">
      <div className="absolute inset-0 bg-black/50 z-0"></div>
      {/* <SignIn_modal1 type='profile'/> */}
      <SignIn_modal1 />
    </div>
  );
};

export default Login;
