import { Edit2 } from "lucide-react";
import { memo } from "react";
import { useSelector } from "react-redux";

const AboutSection = ({ openSidebar }) => {
  const profileDetails = useSelector(state => state.userProfile.userProfile)
  const { professionalTitle, professionalSummary, skills } = profileDetails
  return (
    <div id="about" className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm">

      <div className="flex justify-between">
        <h2 className="text-xl font-semibold ">Professional Summary</h2>
        <button
          onClick={() => openSidebar("about")}
          className=" p-2 cursor-pointer rounded transition-opacity border-2 border-gray-300"
          aria-label="Edit about section"
        >
          <Edit2 className="w-4 h-4 text-gray-500" />
        </button>
      </div>
      <div className="">
        <p className="text-gray-700 leading-relaxed ">
          {professionalSummary}
          {/* <button className="text-[#47AAB3] hover:underline">Read more</button> */}
        </p>
        <h3 className="text-md font-semibold mt-2">Skills</h3>
        <div className="flex flex-wrap gap-2 mt-2">
          {(skills && skills.length > 0) && skills.map((skill, index) => (
            <span key={index} className="capitalize px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full">
              {skill.skill} ({skill.level})
            </span>
          )
          )}
        </div>
      </div>

    </div>

  )
}

export default memo(AboutSection);