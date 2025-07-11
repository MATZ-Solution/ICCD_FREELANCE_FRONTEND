import { Plus, X } from "lucide-react";

const CertificationsSection = ({ certificationList, removeCertification, openSidebar }) => (
  <div id="certifications" className="bg-white border border-gray-200 rounded-lg shadow-sm">
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-2">Certifications</h2>
      <p className="text-gray-600 mb-4">Showcase your mastery with certifications earned in your field.</p>
      {certificationList.length > 0 ? (
        <div className="space-y-3 mb-4">
          {certificationList.map((cert) => (
            <div key={cert.id} className="p-3 border border-gray-200 rounded-md flex justify-between items-start">
              <div>
                <h3 className="font-medium text-gray-900">{cert.name}</h3>
                <p className="text-sm text-gray-600">{cert.organization}</p>
                <p className="text-sm text-gray-500">Issued: {cert.issueDate}</p>
              </div>
              <button onClick={() => removeCertification(cert.id)} className="p-1 hover:bg-gray-100 rounded text-red-500">
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-sm mb-4">No certifications added yet.</p>
      )}
      <button
        onClick={() => openSidebar("certifications")}
        className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors text-sm"
      >
        <Plus className="w-4 h-4" />
        <span>Add certifications</span>
      </button>
    </div>
  </div>
);

export default CertificationsSection;