import profilepic from "../../assets/client_dashboard/clientdp.png";
import { Share2, MapPin, MessageSquare, EyeIcon, Edit2 } from "lucide-react";
import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";

const ProfileHeader = ({ openSidebar }) => {
  const dispatch = useDispatch();
  const profileDetails = useSelector((state) => state.userProfile.userProfile);
  const {
    firstName,
    lastName,
    fileUrl,
    languages,
    professionalTitle,
    freelancerCity,
    freelancerCountry,
  } = profileDetails;

  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-start sm:space-x-4 space-y-3 sm:space-y-0 w-full bg-white rounded-xl p-4 shadow-sm">
      {/* Profile Picture */}
      <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden flex-shrink-0">
        <img
          src={fileUrl || profilepic}
          alt="Profile"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Profile Info */}
      <div className="flex-1 text-center sm:text-left">
        {/* Name + Edit */}
        <div className="flex flex-col sm:flex-row items-center sm:items-center sm:space-x-2 mb-2 group">
          <h1 className="text-xl sm:text-2xl font-bold">
            {firstName} {lastName}{" "}
            <span className="text-sm sm:text-base text-gray-600">
              ({professionalTitle})
            </span>
          </h1>

          <button
            onClick={() => openSidebar("profile")}
            className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-100 rounded transition-opacity"
            aria-label="Edit profile"
          >
            <Edit2 className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        {/* Location + Languages */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-sm text-gray-500 gap-2 sm:gap-0 justify-center sm:justify-start">
          <div className="flex items-center justify-center sm:justify-start">
            <MapPin className="w-4 h-4 mr-1" />
            <span>
              {freelancerCity}, {freelancerCountry}
            </span>
          </div>

          {languages && languages.length > 0 && (
            <div className="flex flex-wrap justify-center sm:justify-start items-center gap-2">
              <MessageSquare width={16} height={16} />
              {languages.map((item, index) => (
                <span
                  key={index}
                  className="capitalize px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full"
                >
                  {item.language}
                </span>
              ))}
              <button
                onClick={() => openSidebar("languages")}
                className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-100 rounded transition-opacity"
                aria-label="Edit languages"
              >
                <Edit2 className="w-3 h-3 text-gray-500" />
              </button>
            </div>
          )}
        </div>
      </div>

 
    </div>
  );
};

export default memo(ProfileHeader);
