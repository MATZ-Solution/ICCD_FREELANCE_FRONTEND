import { Edit2 } from "lucide-react";

const AboutSection = ({ profileData, skillsList, openSidebar }) => (
  <div id="about" className="bg-white border border-gray-200 rounded-lg shadow-sm">
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-2">About Me</h2>
      <div className="group">
        <div className="flex items-start justify-between">
          <h2 className="text-lg mb-2 font-bold flex-1">{profileData.tagline}</h2>
          <button
            onClick={() => openSidebar("about")}
            className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-100 rounded transition-opacity"
            aria-label="Edit about section"
          >
            <Edit2 className="w-4 h-4 text-gray-500" />
          </button>
        </div>
        <p className="text-gray-700 leading-relaxed mb-4">
          {profileData.description} <button className="text-[#47AAB3] hover:underline">Read more</button>
        </p>
      </div>
      <h3 className="text-md font-semibold mb-2">Skills</h3>
      <div className="flex flex-wrap gap-2 mb-4">
        {skillsList.map((skill) => (
          <span key={skill.id} className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full">
            {skill.name} ({skill.level})
          </span>
        ))}
      </div>
    </div>
  </div>
);

export default AboutSection;