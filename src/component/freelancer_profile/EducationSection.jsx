import { GraduationCap, Plus, X } from "lucide-react";

const EducationSection = ({ educationList, removeEducation, openSidebar }) => (
  <div id="education" className="bg-white border border-gray-200 rounded-lg shadow-sm">
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Education</h2>
      <div className="space-y-4 mb-4">
        {educationList.map((edu) => (
          <div key={edu.id} className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center flex-shrink-0">
              <GraduationCap className="w-4 h-4 text-gray-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-1">{edu.institution}</h3>
              <p className="text-gray-600 mb-1">{edu.degree} Degree, {edu.major}</p>
              <p className="text-gray-500 text-sm">Graduated {edu.year}</p>
            </div>
            <button onClick={() => removeEducation(edu.id)} className="p-1 hover:bg-gray-100 rounded text-red-500">
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
      <button
        onClick={() => openSidebar("education")}
        className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors text-sm"
      >
        <Plus className="w-4 h-4" />
        <span>Edit education</span>
      </button>
    </div>
  </div>
);

export default EducationSection;