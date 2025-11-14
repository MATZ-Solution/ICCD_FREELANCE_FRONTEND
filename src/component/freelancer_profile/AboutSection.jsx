import { Edit2 } from "lucide-react";
import { memo } from "react";
import { useSelector } from "react-redux";

const AboutSection = ({ openSidebar }) => {
  const profileDetails = useSelector((state) => state.userProfile.userProfile);
  const { professionalSummary, skills } = profileDetails;

  return (
    <div
      id="about"
      className="p-4 sm:p-6 bg-white border border-gray-200 rounded-xl shadow-sm w-full max-w-3xl mx-auto"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
          Professional Summary
        </h2>
        <button
          onClick={() => openSidebar("about")}
          className="p-1.5 sm:p-2 border-2 border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          aria-label="Edit about section"
        >
          <Edit2 className="w-4 h-4 text-gray-500" />
        </button>
      </div>

      {/* Summary Text */}
      <p className="text-gray-700 text-sm sm:text-base leading-relaxed mb-4 break-words">
        {professionalSummary || "No summary added yet."}
      </p>

      {/* Skills */}
      <div>
        <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2">
          Skills
        </h3>
        {skills && skills.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="capitalize px-3 py-1 bg-gray-100 text-gray-800 text-xs sm:text-sm rounded-full shadow-sm"
              >
                {skill.skill}{" "}
                <span className="text-gray-500 text-xs">({skill.level})</span>
              </span>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-sm">No skills added yet.</p>
        )}
      </div>
    </div>
  );
};

export default memo(AboutSection);
