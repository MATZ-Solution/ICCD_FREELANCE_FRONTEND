import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Login from "../pages/signIn/signIn";
import SignUp from "../pages/signUp";
import VerifyOtp from "./signIn/verifyOtp";
import ForgotPassword from "./signIn/ForgotPassword";
import ChangePassword from "./signIn/ChangePassword";
import logo from "../assets/ICCD-01.png";
import CloseIcon from "@mui/icons-material/Close";
import {
  Briefcase,
  Code,
  Palette,
  TrendingUp,
  Users,
  Zap,
  X,
} from "lucide-react";

const LoginController = ({ onClose, linker }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [modalView, setModalView] = useState(linker || "login");
  const [hoveredIcon, setHoveredIcon] = useState(null);

  const handleSwitch = (view) => setModalView(view);

  const handleClose = () => {
    if (onClose) {
      onClose();
    } else {
      navigate("/");
    }
  };

  const floatingIcons = [
    {
      Icon: Briefcase,
      color: "text-blue-500",
      delay: 0,
      position: "top-[15%] left-[10%]",
    },
    {
      Icon: Code,
      color: "text-purple-500",
      delay: 0.5,
      position: "top-[25%] right-[15%]",
    },
    {
      Icon: Palette,
      color: "text-pink-500",
      delay: 1,
      position: "bottom-[30%] left-[15%]",
    },
    {
      Icon: TrendingUp,
      color: "text-green-500",
      delay: 1.5,
      position: "top-[45%] left-[20%]",
    },
    {
      Icon: Users,
      color: "text-orange-500",
      delay: 2,
      position: "bottom-[20%] right-[20%]",
    },
    {
      Icon: Zap,
      color: "text-yellow-500",
      delay: 2.5,
      position: "top-[60%] right-[10%]",
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 sm:p-6 md:p-8 overflow-y-auto">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `pulse ${2 + Math.random() * 3}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="relative flex flex-col lg:flex-row h-full w-full  max-w-5xl bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Left Banner (hidden on small screens) */}
        <div
          className="hidden lg:flex lg:w-1/2  bg-gradient-to-r from-[#44A4AD] via-[#2E7A81] to-[#1C4C50]
 relative overflow-hidden"
        >
          {/* Animated gradient overlay */}
          <div
            className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-50"
            style={{ animation: "pulse 4s ease-in-out infinite" }}
          />

          {/* Floating Icons */}
          {floatingIcons.map(({ Icon, color, delay, position }, idx) => (
            <div
              key={idx}
              className={`absolute ${position} transform transition-all duration-500 cursor-pointer`}
              style={{
                animation: `float ${3 + idx}s ease-in-out infinite`,
                animationDelay: `${delay}s`,
              }}
              onMouseEnter={() => setHoveredIcon(idx)}
              onMouseLeave={() => setHoveredIcon(null)}
            >
              <div
                className={`p-4 bg-white/20 backdrop-blur-md rounded-2xl shadow-lg transition-transform duration-300 ${
                  hoveredIcon === idx ? "scale-125" : ""
                }`}
              >
                <Icon className={`w-8 h-8 ${color}`} />
              </div>
            </div>
          ))}

          {/* Content */}
          <div className="relative z-10 flex flex-col justify-center items-center p-12 text-white text-center">
            <div className="mb-8 transform hover:scale-110 transition-transform duration-300">
              <div className="w-24 h-24 bg-white backdrop-blur-md rounded-3xl flex items-center justify-center shadow-2xl">
                <img
                  src={logo}
                  alt="ICCD Logo"
                  className="w-100 h-100 object-contain"
                />
              </div>
            </div>

            <h1 className="text-4xl font-bold mb-4">ICCD Talent Gate</h1>

            <p className="text-lg text-white/90 mb-8 max-w-md">
              Connect with top talent and clients worldwide. Your freelance
              journey starts here.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 w-full max-w-md">
              {[
                { number: "50K+", label: "Freelancers" },
                { number: "10K+", label: "Projects" },
                { number: "95%", label: "Success Rate" },
              ].map((stat, idx) => (
                <div
                  key={idx}
                  className="bg-white/10 backdrop-blur-md rounded-xl p-4 hover:bg-white/20 transition-all duration-300 hover:scale-105 cursor-pointer"
                >
                  <div className="text-2xl font-bold">{stat.number}</div>
                  <div className="text-sm text-white/80">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Decorative circles */}
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
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
