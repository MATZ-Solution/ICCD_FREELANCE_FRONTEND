import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { AlertTriangle, Upload, X } from "lucide-react";

// ✅ Yup Schema
const schema = yup.object().shape({
  subject: yup.string().required("Subject is required"),
  reason: yup.string().required("Reason is required"),
  settlementOffer: yup.string().optional(), // optional
  proof: yup.mixed().optional(),            // optional
});

export const DisputeModal = ({ onClose, onSubmit }) => {
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
      proof: null,
    },
  });

  const onFormSubmit = (data) => {
    onSubmit(data);
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
            <h2 className="text-2xl font-semibold text-gray-900">
              Raise a Dispute
            </h2>
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
                errors.subject
                  ? "border-red-500"
                  : "border-gray-200 focus:border-red-500"
              }`}
              placeholder="Brief description of the issue"
            />
            {errors.subject && (
              <p className="text-red-500 text-sm mt-1">
                {errors.subject.message}
              </p>
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
                    errors.reason
                      ? "border-red-500"
                      : "border-gray-200 focus:border-red-500"
                  }`}
                  placeholder="Please provide a detailed explanation of your concern..."
                ></textarea>
              )}
            />
            {errors.reason && (
              <p className="text-red-500 text-sm mt-1">
                {errors.reason.message}
              </p>
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

          {/* Supporting Evidence (Optional) */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Supporting Evidence (Optional)
            </label>
            <Controller
              name="proof"
              control={control}
              render={({ field }) => (
                <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-red-300 transition-colors">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-600 mb-2">
                    Upload screenshots, documents, or other proof
                  </p>
                  <input
                    type="file"
                    accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
                    onChange={(e) => field.onChange(e.target.files[0])}
                    className="text-sm text-gray-600"
                  />
                  {field.value && (
                    <p className="mt-2 text-sm text-gray-700">
                      {field.value.name}
                    </p>
                  )}
                </div>
              )}
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
