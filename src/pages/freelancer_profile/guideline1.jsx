import SellingImage from "../../assets/image 17.png";
import { useNavigate } from 'react-router-dom';
import checkImage from '../../assets/check.png';


export default function StartSelling() {
    const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="flex-1 flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[70vh]">
            <div className=" sm:space-y-8 flex flex-col items-center justify-center  lg:items-start lg:text-left">
              <div>
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                  Ready to start selling on ICCD Freelance?
                </h1>
                <p className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900">
                  Here's the breakdown:
                </p>
              </div>

              <div className="space-y-3 mt-2 sm:space-y-8 w-full max-w-md">
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                    <div style={{ backgroundImage: `url(${checkImage})` }} className="w-8 h-8 sm:w-10 sm:h-10  bg-contain bg-no-repeat" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1">
                      Learn what makes a successful profile
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Discover the do's and don'ts to ensure you're always on the right track.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[url('src/assets/2.png')] bg-contain bg-no-repeat" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1">
                      Create your seller profile
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Add your profile picture, description, and professional information.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[url('src/assets/3.png')] bg-contain bg-no-repeat" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1">
                      Publish your Gig
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Create a Gig of the service you're offering and start selling instantly.
                    </p>
                  </div>
                </div>
              </div>

             <button
                onClick={() => navigate('/profile-tips')}
                className="bg-[#043A53] flex items-center justify-center gap-x-2 hover:bg-teal-900 text-white px-6 sm:px-8 py-3 w-28 h-10 sm:w-48 rounded-full transition-colors duration-200 mt-4"
                >
                Continue
                <span className="w-16 h-5 sm:w-6 sm:h-6 bg-[url('src/assets/profile-icons/arrow.png')] bg-contain bg-no-repeat" />
                </button>

            </div>

            <div className=" mb-11 lg:flex lg:items-center lg:justify-center relative w-full h-full">
              <img
                src={SellingImage}
                alt="Start Selling"
                className="w-full max-w-md xl:max-w-lg object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}