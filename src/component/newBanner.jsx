import { useState } from "react";
import { Briefcase, Code, Palette, TrendingUp, Users, Zap, X } from "lucide-react";

// Mock Login Component - Replace with your actual Login import
const Login = ({ handleSwitch }) => (
  <div className="w-full space-y-5">
    <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
    <p className="text-gray-500">Login to continue to your account</p>
    
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium text-gray-700 mb-1 block">Email</label>
        <input 
          type="email" 
          placeholder="you@example.com" 
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
        />
      </div>
      
      <div>
        <label className="text-sm font-medium text-gray-700 mb-1 block">Password</label>
        <input 
          type="password" 
          placeholder="••••••••" 
          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
        />
      </div>
    </div>

    <button className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all transform hover:scale-[1.02] active:scale-[0.98]">
      Login
    </button>

    <div className="flex items-center my-4 text-gray-400">
      <hr className="flex-grow border-gray-300" />
      <span className="mx-2 text-sm">OR</span>
      <hr className="flex-grow border-gray-300" />
    </div>

    <button className="w-full py-3 rounded-lg bg-white hover:bg-gray-50 text-gray-700 font-semibold transition-all border-2 border-gray-200 flex items-center justify-center gap-2 transform hover:scale-[1.02]">
      <svg className="w-5 h-5" viewBox="0 0 24 24">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
      </svg>
      Continue with Google
    </button>
    
    <div className="flex justify-between text-sm text-gray-600 mt-4">
      <span onClick={() => handleSwitch("signup")} className="cursor-pointer hover:text-blue-600 transition">Sign Up</span>
      <span onClick={() => handleSwitch("forgotPassword")} className="cursor-pointer hover:text-blue-600 transition">Forgot Password?</span>
    </div>
  </div>
);

const SignUp = ({ handleSwitch }) => (
  <div className="w-full space-y-4">
    <h2 className="text-3xl font-bold text-gray-800">Create Account</h2>
    <p className="text-gray-500">Join ICCD Freelance today</p>
    <button onClick={() => handleSwitch("login")} className="text-blue-600 hover:underline text-sm">
      ← Back to Login
    </button>
  </div>
);

const ForgotPassword = ({ handleSwitch }) => (
  <div className="w-full space-y-4">
    <h2 className="text-3xl font-bold text-gray-800">Reset Password</h2>
    <p className="text-gray-500">Enter your email to reset password</p>
    <button onClick={() => handleSwitch("login")} className="text-blue-600 hover:underline text-sm">
      ← Back to Login
    </button>
  </div>
);

const LoginController = ({ onClose, linker }) => {
  const [email, setEmail] = useState("");
  const [modalView, setModalView] = useState(linker || "login");
  const [hoveredIcon, setHoveredIcon] = useState(null);

  const handleSwitch = (view) => setModalView(view);

  const handleClose = () => {
    if (onClose) onClose();
  };

  const floatingIcons = [
    { Icon: Briefcase, color: "text-blue-500", delay: 0, position: "top-[15%] left-[10%]" },
    { Icon: Code, color: "text-purple-500", delay: 0.5, position: "top-[25%] right-[15%]" },
    { Icon: Palette, color: "text-pink-500", delay: 1, position: "bottom-[30%] left-[15%]" },
    { Icon: TrendingUp, color: "text-green-500", delay: 1.5, position: "top-[45%] left-[20%]" },
    { Icon: Users, color: "text-orange-500", delay: 2, position: "bottom-[20%] right-[20%]" },
    { Icon: Zap, color: "text-yellow-500", delay: 2.5, position: "top-[60%] right-[10%]" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900 p-4 sm:p-6 md:p-8 overflow-hidden">
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

      <div className="relative flex flex-col lg:flex-row w-full max-w-6xl bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden z-10">
        
        {/* Left Creative Section */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 relative overflow-hidden">
          {/* Animated gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-50" 
               style={{ animation: 'pulse 4s ease-in-out infinite' }} />
          
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
              <div className={`p-4 bg-white/20 backdrop-blur-md rounded-2xl shadow-lg transition-transform duration-300 ${hoveredIcon === idx ? 'scale-125' : ''}`}>
                <Icon className={`w-8 h-8 ${color}`} />
              </div>
            </div>
          ))}

          {/* Content */}
          <div className="relative z-10 flex flex-col justify-center items-center p-12 text-white text-center">
            <div className="mb-8 transform hover:scale-110 transition-transform duration-300">
              <div className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-3xl flex items-center justify-center shadow-2xl">
                <Briefcase className="w-12 h-12" />
              </div>
            </div>
            
            <h1 className="text-4xl font-bold mb-4">
              ICCD Freelance
            </h1>
            
            <p className="text-lg text-white/90 mb-8 max-w-md">
              Connect with top talent and clients worldwide. Your freelance journey starts here.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 w-full max-w-md">
              {[
                { number: "50K+", label: "Freelancers" },
                { number: "10K+", label: "Projects" },
                { number: "95%", label: "Success Rate" },
              ].map((stat, idx) => (
                <div key={idx} className="bg-white/10 backdrop-blur-md rounded-xl p-4 hover:bg-white/20 transition-all duration-300 hover:scale-105 cursor-pointer">
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
        <div className="relative flex flex-col w-full lg:w-1/2 p-6 sm:p-8 md:p-12">
          {/* Close Button */}
          <button
            onClick={handleClose}
            aria-label="Close modal"
            className="absolute right-4 top-4 w-10 h-10 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200 transition-all duration-300 hover:rotate-90 group z-20"
          >
            <X className="w-5 h-5 text-gray-600 group-hover:text-gray-800" />
          </button>

          {/* Mobile Logo */}
          <div className="lg:hidden flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Briefcase className="w-8 h-8 text-white" />
            </div>
          </div>

          <div className="flex-grow flex flex-col justify-center max-w-md mx-auto w-full">
            {/* Form Content */}
            {modalView === "login" && <Login handleSwitch={handleSwitch} />}
            {modalView === "signup" && <SignUp handleSwitch={handleSwitch} />}
            {modalView === "forgotPassword" && <ForgotPassword handleSwitch={handleSwitch} />}
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-xs text-gray-500">
              By continuing, you agree to our{" "}
              <span className="text-blue-600 hover:underline cursor-pointer">Terms</span> and{" "}
              <span className="text-blue-600 hover:underline cursor-pointer">Privacy Policy</span>
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }
      `}</style>
    </div>
  );
};

export default LoginController;
