import { GraduationCap, Plus, X } from "lucide-react";
import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserProfile } from "../../../redux/slices/userProfileSlice";

const EducationSection = ({ openSidebar }) => {
  const dispatch = useDispatch();
  const profileDetails = useSelector((state) => state.userProfile.userProfile);
  const { educations } = profileDetails;

  const removeEdu = (data) => {
    const updatedEdu = profileDetails.educations.filter(
      (item) => item.educationId !== data.educationId
    );
    dispatch(setUserProfile({ educations: updatedEdu.length ? updatedEdu : [] }));
  };

  return (
    <div
      id="education"
      className="bg-white border border-gray-200 rounded-xl shadow-sm w-full max-w-3xl mx-auto p-4 sm:p-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
          Education
        </h2>
        <button
          onClick={() => openSidebar("education")}
          className="flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-1.5 sm:py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors text-xs sm:text-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Edit</span>
        </button>
      </div>

      {/* Education List */}
      <div className="space-y-4">
        {educations && educations.length > 0 ? (
          educations.map((edu, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row sm:items-start sm:space-x-3 border border-gray-100 p-3 sm:p-4 rounded-lg hover:shadow-sm transition-all"
            >
              {/* Icon */}
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mb-2 sm:mb-0 flex-shrink-0">
                <GraduationCap className="w-5 h-5 text-gray-600" />
              </div>

              {/* Details */}
              <div className="flex-1">
                <h3 className="capitalize font-semibold text-gray-900 text-sm sm:text-base mb-1">
                  {edu.university_name}
                </h3>
                <p className="capitalize text-gray-700 text-sm sm:text-base mb-1">
                  {edu.degree} Degree, {edu.major}
                </p>
                <p className="text-gray-500 text-xs sm:text-sm">
                  Graduated {edu.year}
                </p>
              </div>

              {/* Remove button */}
              <button
                onClick={() => removeEdu(edu)}
                className="p-1 sm:p-1.5 hover:bg-gray-100 rounded-md text-red-500 self-end sm:self-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm text-center py-2">
            No education details added yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default memo(EducationSection);
