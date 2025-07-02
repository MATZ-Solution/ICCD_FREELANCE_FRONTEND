import { useNavigate } from "react-router-dom";
import fileTextIcon from "../../assets/freelancer_profile/g1.png";
import messageCircleIcon from "../../assets/freelancer_profile/g2.png";
import checkSquareIcon from "../../assets/freelancer_profile/g3.png";
import userIcon from "../../assets/freelancer_profile/g4.png";
import arrowRightIcon from "../../assets/freelancer_profile/arrow.png";
import profile_tip from '../../assets/freelancer_profile/profiletips.png'

export default function ICCDGuidelinesPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen p-4 sm:p-6 bg-white flex flex-col">
      {/* Logo */}

      {/* Grid Parent */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 p-4 sm:p-6 max-w-7xl mx-auto w-full">
        {/* Left Column (Image) */}
        <div className="flex justify-center">
          <img
            src={profile_tip}
            alt="Side"
            className="rounded-xl w-full max-w-[300px] sm:max-w-[400px] lg:max-w-[450px] object-cover shadow-lg"
          />
        </div>

        {/* Right Column (Content) */}
        <div className="space-y-6 flex flex-col items-center justify-center">
          <div className="text-center lg:text-left">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
              Now, let's talk about the things you want to steer clear of.
            </h1>
            <p className="text-gray-600 mt-2 text-sm sm:text-base">
              Your success on ICCD is important to us. Avoid the following to keep in line with our community standards.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 w-full">
            <Tip icon={fileTextIcon} text="Providing any misleading or inaccurate information about your identity." />
            <Tip icon={messageCircleIcon} text="Opening duplicate accounts. Remember, you can always create more Gigs." />
            <Tip icon={checkSquareIcon} text="Soliciting other community members for work on ICCD Freelancer." />
            <Tip icon={userIcon} text="Requesting to take communication and payment outside of ICCD Freelancer." />
          </div>

          <div className="flex flex-col items-center sm:flex-row gap-4 pt-4 w-full justify-center lg:justify-start">
            <button
              onClick={() => navigate("/multi-step-form")}
              className="bg-[#043A53] hover:bg-teal-900 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full flex items-center justify-center gap-2 text-sm sm:text-base w-full sm:w-auto"
            >
              Continue
              <img src={arrowRightIcon} alt="Arrow Right" className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button
              onClick={() => navigate("/profile-tips")}
              className="text-teal-600 hover:text-teal-700 px-4 py-2 text-sm sm:text-base w-full sm:w-auto text-center"
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Tip({ icon, text }) {
  return (
    <div className="flex flex-col gap-3 items-start">
      <img src={icon} alt="Tip Icon" className="w-8 h-8 sm:w-10 sm:h-10" />
      <p className="text-gray-700 text-sm sm:text-base font-medium">{text}</p>
    </div>
  );
}