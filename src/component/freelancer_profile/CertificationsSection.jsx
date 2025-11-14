import { Plus, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setUserProfile } from "../../../redux/slices/userProfileSlice";
import { memo } from "react";

const CertificationsSection = ({ openSidebar }) => {
  const dispatch = useDispatch();
  const profileDetails = useSelector((state) => state.userProfile.userProfile);
  const { certifications } = profileDetails;

  const removeCert = (data) => {
    const updatedCerts =
      profileDetails?.certifications?.filter(
        (item) => item.certificateId !== data.certificateId
      ) || [];
    dispatch(setUserProfile({ certifications: updatedCerts }));
  };

  return (
    <div
      id="certifications"
      className="bg-white border border-gray-200 rounded-xl shadow-sm w-full max-w-3xl mx-auto p-4 sm:p-6"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
        <div>
          <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
            Certifications
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">
            Showcase your mastery with certifications earned in your field.
          </p>
        </div>

        <button
          onClick={() => openSidebar("certifications")}
          className="mt-3 sm:mt-0 flex items-center space-x-2 px-3 sm:px-4 py-1.5 sm:py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors text-xs sm:text-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Add</span>
        </button>
      </div>

      {/* Certification List */}
      {certifications && certifications.length > 0 ? (
        <div className="space-y-3 sm:space-y-4">
          {certifications.map((cert, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row sm:items-start sm:justify-between border border-gray-100 p-3 sm:p-4 rounded-lg hover:shadow-sm transition-all"
            >
              <div>
                <h3 className="font-medium text-gray-900 text-sm sm:text-base">
                  {cert.name}
                </h3>
                <p className="text-gray-700 text-xs sm:text-sm">
                  {cert.organization}
                </p>
                <p className="text-gray-500 text-xs sm:text-sm">
                  Issued: {cert.year}
                </p>
              </div>
              <button
                onClick={() => removeCert(cert)}
                className="mt-2 sm:mt-0 p-1 sm:p-1.5 hover:bg-gray-100 rounded-md text-red-500 self-end sm:self-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-sm mt-3">No certifications added yet.</p>
      )}
    </div>
  );
};

export default memo(CertificationsSection);
