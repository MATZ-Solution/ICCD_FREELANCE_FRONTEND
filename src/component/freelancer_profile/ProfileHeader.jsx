import porfilepic from "../../assets/client_dashboard/clientdp.png";
import { Share2, MapPin, MessageSquare, EyeIcon, Edit2 } from "lucide-react";

const ProfileHeader = ({ profileData, languages, openSidebar }) => (
  <div className="flex items-start space-x-4">
    <div className="w-20 h-20 rounded-full overflow-hidden">
      <img src={porfilepic} alt="Profile picture" width={80} height={80} className="w-full h-full object-cover" />
    </div>
    <div className="flex-1">
      <div className="flex items-center space-x-2 mb-2 group">
        <h1 className="text-2xl font-bold">{profileData.name}</h1>
        <span className="text-gray-500">@{profileData.username}</span>
        <button
          onClick={() => openSidebar("profile")}
          className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-100 rounded transition-opacity"
          aria-label="Edit profile"
        >
          <Edit2 className="w-4 h-4 text-gray-500" />
        </button>
      </div>
      <div className="flex items-center space-x-4 mb-2">
        <div className="flex items-center space-x-4 text-sm text-gray-500">
          <div className="flex items-center">
            <MapPin className="w-4 h-4 mr-1" />
            Pakistan
          </div>
          <div className="flex gap-2 items-center group">
            <MessageSquare width={16} height={16} />
            <span className="flex gap-1 flex-wrap">
              {languages.map((item, index) => (
                <span key={index} className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                  {item}
                </span>
              ))}
            </span>
            <button
              onClick={() => openSidebar("languages")}
              className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-100 rounded transition-opacity"
              aria-label="Edit languages"
            >
              <Edit2 className="w-3 h-3 text-gray-500" />
            </button>
          </div>
        </div>
      </div>
    </div>
    <div className="flex items-center space-x-2">
      <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors" aria-label="Share profile">
        <Share2 className="w-4 h-4" />
      </button>
      <button className="p-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors" aria-label="Report profile">
        <EyeIcon className="w-4 h-4" />
      </button>
    </div>
  </div>
);

export default ProfileHeader;