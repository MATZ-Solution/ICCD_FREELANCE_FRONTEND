import { Plus, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setUserProfile } from "../../../redux/slices/userProfileSlice";
import { memo } from "react";
const SkillsSection = ({ openSidebar }) => {

  const dispatch = useDispatch()
  const profileDetails = useSelector(state => state.userProfile.userProfile)
  const { skills } = profileDetails

  const removeSkills = (data) => {
    let removeSkill = profileDetails.skills.filter(item => item.skillId !== data.skillId)
    if (removeSkill.length === 0) {
      dispatch(setUserProfile({ skills: [] }))
    } else {
      dispatch(setUserProfile({ skills: removeSkill }))
    }
  };


  return (
    <div id="skills" className="bg-white border border-gray-200 rounded-lg shadow-sm">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">Skills and expertise</h2>
        <div className="flex flex-wrap gap-2 mb-4">
          {(skills && skills.length > 0) && (skills.map((skill, index) => (
            <span key={index} className="px-3 py-2 bg-gray-100 text-gray-800 text-sm rounded-full flex items-center gap-2">
              {skill.skill} ({skill.level})
              <button onClick={() => removeSkills(skill)} className="text-red-500 hover:text-red-700">
                <X className="w-3 h-3" />
              </button>
            </span>
          )))
          }
        </div>
        <button
          onClick={() => openSidebar("skills")}
          className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors text-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Edit skills and expertise</span>
        </button>
      </div>
    </div>
  )
}

export default memo(SkillsSection);