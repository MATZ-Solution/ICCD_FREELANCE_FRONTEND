import { Plus, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setUserProfile } from "../../../redux/slices/userProfileSlice";
import { memo } from "react";

const SkillsSection = ({ openSidebar }) => {
  const dispatch = useDispatch();
  const profileDetails = useSelector((state) => state.userProfile.userProfile);
  const { skills } = profileDetails;

  const removeSkills = (data) => {
    const updatedSkills =
      profileDetails.skills?.filter((item) => item.skillId !== data.skillId) || [];
    dispatch(setUserProfile({ skills: updatedSkills }));
  };

  return (
    <div
      id="skills"
      className="bg-white border border-gray-200 rounded-xl shadow-sm w-full max-w-3xl mx-auto p-4 sm:p-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
          Skills & Expertise
        </h2>
        <button
          onClick={() => openSidebar("skills")}
          className="flex items-center space-x-1 sm:space-x-2 px-3 sm:px-4 py-1.5 sm:py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors text-xs sm:text-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Edit</span>
        </button>
      </div>

      {/* Skills List */}
      {skills && skills.length > 0 ? (
        <div className="flex flex-wrap gap-2 mb-4">
          {skills.map((skill, index) => (
            <span
              key={index}
              className="flex items-center gap-1 sm:gap-2 px-3 py-1.5 bg-gray-100 text-gray-800 text-xs sm:text-sm rounded-full hover:shadow-sm transition-all"
            >
              {skill.skill}{" "}
              <span className="text-gray-500">({skill.level})</span>
              <button
                onClick={() => removeSkills(skill)}
                className="text-red-500 hover:text-red-700 transition-colors"
              >
                <X className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>
            </span>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-sm mb-4">No skills added yet.</p>
      )}
    </div>
  );
};

export default memo(SkillsSection);
