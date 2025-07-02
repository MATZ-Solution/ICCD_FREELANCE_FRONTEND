import { useNavigate } from "react-router-dom";
import fileTextIcon from "../../assets/freelancer_profile/1.png";
import messageCircleIcon from "../../assets/freelancer_profile/2.png";
import checkSquareIcon from "../../assets/freelancer_profile/3.png";
import userIcon from "../../assets/freelancer_profile/4.png";
import shieldIcon from "../../assets/freelancer_profile/5.png";
import arrowRightIcon from "../../assets/freelancer_profile/arrow.png";
import profileTipImage from "../../assets/freelancer_profile/profiletip1.png";

export default function ICCDProfileTipsPage() {
  const navigate = useNavigate();

  return (
    <main className="mt-16 min-h-screen bg-white flex flex-col space-y-8">
      {/* Logo */}

      {/* Content */}
      <section className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center justify-center gap-10 px-4 md:px-8">
        {/* Image */}
        <div className="flex-shrink-0 w-full max-w-md">
          <img
            src={profileTipImage}
            alt="Profile Tips Illustration"
            className="rounded-2xl w-full object-cover shadow-lg"
          />
        </div>

        {/* Text + Tips */}
        <article className="w-full flex flex-col space-y-6 text-center lg:text-left">
          <div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2 sm:mb-4">
              What makes a successful ICCD Freelance profile?
            </h1>
            <p className="text-gray-600 text-base sm:text-lg">
              Your first impression matters! Create a profile that will stand out from the crowd on ICCD.
            </p>
          </div>

          {/* Tips grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <Tip icon={fileTextIcon} text="Take your time in creating your profile so it's exactly as you want it to be." />
            <Tip icon={messageCircleIcon} text="Add credibility by linking out to your relevant professional networks." />
            <Tip icon={checkSquareIcon} text="Accurately describe your professional skills to help you get the work you want." />
            <Tip icon={userIcon} text="Put a face to your name! Upload a profile picture that clearly shows your face." />
            <Tip icon={shieldIcon} text="To keep our community secure for everyone, we may ask you to verify your ID." />
          </div>

          {/* Buttons */}
          <nav className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-6">
            <button
              onClick={() => navigate("/iccd-guidelines")}
              className="bg-[#043A53] hover:bg-teal-900 text-white px-8 py-3 rounded-full flex items-center justify-center gap-2 transition-colors duration-200"
            >
              Continue
              <img src={arrowRightIcon} alt="Arrow Right" className="w-5 h-5" />
            </button>
            <button
              onClick={() => navigate("/start-selling")}
              className="text-teal-600 hover:text-teal-700 transition-colors duration-200"
            >
              Back
            </button>
          </nav>
        </article>
      </section>
    </main>
  );
}

function Tip({ icon, text }) {
  return (
    <div className="flex items-start gap-3">
      <img src={icon} alt="Tip Icon" className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg" />
      <p className="text-gray-700 text-sm sm:text-base leading-relaxed text-left">
        {text}
      </p>
    </div>
  );
}