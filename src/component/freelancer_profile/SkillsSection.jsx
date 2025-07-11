import { Plus, X } from "lucide-react";

const SkillsSection = ({ skillsList, removeSkill, openSidebar }) => (
  <div id="skills" className="bg-white border border-gray-200 rounded-lg shadow-sm">
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Skills and expertise</h2>
      <div className="flex flex-wrap gap-2 mb-4">
        {skillsList.map((skill) => (
          <span key={skill.id} className="px-3 py-2 bg-gray-100 text-gray-800 text-sm rounded-full flex items-center gap-2">
            {skill.name} ({skill.level})
            <button onClick={() => removeSkill(skill.id)} className="text-red-500 hover:text-red-700">
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}
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
);

export default SkillsSection;