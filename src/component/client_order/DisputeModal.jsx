import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { AlertTriangle, Upload, X } from "lucide-react";
import { useAddDispute } from "../../../api/client/dispute";
const schema = yup.object().shape({
  subject: yup.string().required("Subject is required"),
  reason: yup.string().required("Reason is required"),
  settlementOffer: yup.string().optional(),
  proof: yup.array().optional(), // array of files
});

export const DisputeModal = ({ onClose, orderDetails }) => {
  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      subject: "",
      reason: "",
      settlementOffer: "",
      proof: [],
    },
  });

  console.log("orderDetails: ", orderDetails)
  const { addDispute, isSuccess, isPending, isError, error } = useAddDispute()
  
  const onFormSubmit = (data) => {
    console.log("data: ", data)
    const datas = { ...orderDetails, ...data }
    const formData = new FormData();
    {
      (data.proof && data.proof.length > 0) && data.proof?.forEach((img) => {
        if (img) formData.append("files", img);
        console.log("img.file: ", img)
      });
    }
    // Append other data
    for (const key in datas) {
      if (typeof datas[key] !== "object") {
        formData.append(key, datas[key]);
      }
    }
    addDispute(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900">Raise a Dispute</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
          {/* Subject */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Subject *
            </label>
            <input
              {...register("subject")}
              type="text"
              className={`w-full border-2 rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors ${
                errors.subject ? "border-red-500" : "border-gray-200 focus:border-red-500"
              }`}
              placeholder="Brief description of the issue"
            />
            {errors.subject && (
              <p className="text-red-500 text-sm mt-1">{errors.subject.message}</p>
            )}
          </div>

          {/* Reason */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Detailed Reason *
            </label>
            <Controller
              name="reason"
              control={control}
              render={({ field }) => (
                <textarea
                  {...field}
                  rows={5}
                  className={`w-full border-2 rounded-xl px-4 py-3 text-sm focus:outline-none transition-colors resize-none ${
                    errors.reason ? "border-red-500" : "border-gray-200 focus:border-red-500"
                  }`}
                  placeholder="Please provide a detailed explanation of your concern..."
                ></textarea>
              )}
            />
            {errors.reason && (
              <p className="text-red-500 text-sm mt-1">{errors.reason.message}</p>
            )}
          </div>

          {/* Settlement Offer (Optional) */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Settlement Offer (Optional)
            </label>
            <input
              {...register("settlementOffer")}
              type="text"
              className="w-full border-2 rounded-xl px-4 py-3 text-sm border-gray-200 focus:border-red-500 focus:outline-none transition-colors"
              placeholder="e.g. I propose a refund of 50% or revised delivery"
            />
            <p className="text-xs text-gray-500 mt-1">
              Suggest a fair resolution (refund, revision, partial payment, etc.)
            </p>
          </div>

          {/* Supporting Evidence (Dynamic Upload) */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Supporting Evidence (Optional)
            </label>
            <Controller
              name="proof"
              control={control}
              render={({ field }) => {
                const maxFiles = 5;

                const handleFileChange = (e, index) => {
                  const file = e.target.files[0];
                  if (!file) return;
                  const updatedFiles = field.value ? [...field.value] : [];
                  updatedFiles[index] = file;
                  field.onChange(updatedFiles);
                };

                const handleRemove = (index) => {
                  const updatedFiles = [...(field.value || [])];
                  updatedFiles.splice(index, 1);
                  field.onChange(updatedFiles);
                };

                // Add an empty slot if less than max
                const filesToShow = field.value ? [...field.value] : [];
                if (filesToShow.length < maxFiles) filesToShow.push(null);

                return (
                  <div className="flex gap-2 flex-wrap">
                    {filesToShow.map((file, idx) => (
                      <div key={idx} className="relative w-24 h-24">
                        <label className="w-full h-full border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-center cursor-pointer overflow-hidden hover:border-red-300 transition-colors">
                          {file ? (
                            <>
                              <img
                                src={URL.createObjectURL(file)}
                                alt="preview"
                                className="w-full h-full object-cover"
                              />
                              <button
                                type="button"
                                onClick={() => handleRemove(idx)}
                                className="absolute top-1 right-1 bg-white rounded-full p-1 shadow"
                              >
                                <X className="w-4 h-4 text-red-600" />
                              </button>
                            </>
                          ) : (
                            <div className="flex flex-col items-center justify-center text-gray-400">
                              <Upload className="w-6 h-6 mb-1" />
                              <span className="text-xs">Upload</span>
                            </div>
                          )}
                          <input
                            type="file"
                            accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
                            className="hidden"
                            onChange={(e) => handleFileChange(e, idx)}
                          />
                        </label>
                      </div>
                    ))}
                  </div>
                );
              }}
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-8">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-red-600 text-white rounded-xl font-medium hover:bg-red-700 transition-colors"
            >
              Submit Dispute
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
