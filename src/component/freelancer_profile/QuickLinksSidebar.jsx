import { Edit2, Share2, EyeIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { memo } from "react";

const QuickLinksSidebar = ({ openSidebar }) => {
  const profileDetails = useSelector(state => state.userProfile.userProfile)
  const { educations, certifications, skills, languages } = profileDetails
  console.log("profileDetails: ", profileDetails)
  return (
    <div className="lg:col-span-1">
      <div className="sticky top-6">
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4 text-gray-900">Quick Links</h3>
          <div className="space-y-3">
            
              <Link
                to="/freelancer/manage-gigs/overview"
                className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-50 transition-colors text-gray-700 hover:text-gray-900"
              >
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">Gigs</span>
              </Link>         
          </div>
          <hr className="my-4 border-gray-200" />
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-gray-900">Actions</h4>
            <button
              onClick={() => openSidebar("profile")}
              className="w-full flex items-center justify-center space-x-2 p-2 bg-green-50 text-[#47AAB3] rounded-md hover:text-black transition-colors text-sm"
            >
              <Edit2 className="w-4 h-4" />
              <span>Edit Profile</span>
            </button>
            <button className="w-full flex items-center justify-center space-x-2 p-2 bg-blue-50 text-blue-700 rounded-md hover:bg-blue-100 transition-colors text-sm">
              <Share2 className="w-4 h-4" />
              <span>Share Profile</span>
            </button>
            <button className="w-full flex items-center justify-center space-x-2 p-2 bg-gray-50 text-gray-700 rounded-md hover:bg-gray-100 transition-colors text-sm">
              <EyeIcon className="w-4 h-4" />
              <span>Preview Mode</span>
            </button>
          </div>
          <hr className="my-4 border-gray-200" />
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-900">Profile Stats</h4>
            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="p-2 bg-gray-50 rounded-md">
                <div className="text-lg font-semibold text-gray-900">{(profileDetails && profileDetails.educations) && educations.length}</div>
                <div className="text-xs text-gray-500">Education</div>
              </div>
              <div className="p-2 bg-gray-50 rounded-md">
                <div className="text-lg font-semibold text-gray-900">{(profileDetails && profileDetails.certifications) && certifications.length}</div>
                <div className="text-xs text-gray-500">Certificates</div>
              </div>
              <div className="p-2 bg-gray-50 rounded-md">
                <div className="text-lg font-semibold text-gray-900">{(profileDetails && profileDetails.skills) && skills.length}</div>
                <div className="text-xs text-gray-500">Skills</div>
              </div>
              <div className="p-2 bg-gray-50 rounded-md">
                <div className="text-lg font-semibold text-gray-900">{(profileDetails && profileDetails.languages) && languages.length}</div>
                <div className="text-xs text-gray-500">Languages</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default memo(QuickLinksSidebar);