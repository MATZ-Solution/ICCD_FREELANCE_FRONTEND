import React from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { X, Upload, MessageSquare } from "lucide-react";
import { useAddDisputeResponse } from "../../../api/client/dispute";

const schema = yup.object().shape({
  responseMessage: yup
    .string()
    .required("Response message is required")
    .min(10, "Response should be at least 10 characters"),
  settlementMessage: yup.string().nullable(),
  files: yup
    .array()
    .of(
      yup
        .mixed()
        .test("fileSize", "File too large", (value) => {
          if (!value) return true;
          return value.size <= 5 * 1024 * 1024;
        })
    )
    .max(5, "You can upload up to 5 files only"),
});

const ResponseDispute = ({ setShowSettlementModal, userApplyResData }) => {

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      responseMessage: "",
      settlementMessage: "",
      files: [],
    },
  });

  const files = watch("files") || [];
  const maxFiles = 5;

  const handleFileChange = (e, index) => {
    const file = e.target.files[0];
    if (!file) return;
    const updatedFiles = [...files];
    updatedFiles[index] = file;
    setValue("files", updatedFiles, { shouldValidate: true });
  };

  const handleRemove = (index) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setValue("files", updatedFiles, { shouldValidate: true });
  };

  const filesToShow = [...files];
  if (filesToShow.length < maxFiles) filesToShow.push(null);

  const { addDisputeResponse, isSuccess, isPending, isError, error } = useAddDisputeResponse()

  const onSubmit = (data) => {
    const datas = { ...userApplyResData, ...data }
    const formData = new FormData();
    {
      (data.files && data.files.length > 0) && data.files?.forEach((img) => {
        if (img) formData.append("files", img);
      });
    }
    for (const key in datas) {
      if (typeof datas[key] !== "object") {
        formData.append(key, datas[key]);
      }
    }
    addDisputeResponse(formData)
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-green-600" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900">
              Respond to Dispute
            </h2>
          </div>
          <button
            onClick={() => setShowSettlementModal(false)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Response Message *
            </label>
            <Controller
              name="responseMessage"
              control={control}
              render={({ field }) => (
                <textarea
                  {...field}
                  rows={4}
                  className={`w-full border-2 rounded-xl px-4 py-3 text-sm resize-none focus:outline-none transition-colors ${errors.responseMessage
                    ? "border-red-500 focus:border-red-500"
                    : "border-gray-200 focus:border-green-500"
                    }`}
                  placeholder="Write your reply to the dispute..."
                />
              )}
            />
            {errors.responseMessage && (
              <p className="text-red-500 text-xs mt-1">
                {errors.responseMessage.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Settlement Proposal (Optional)
            </label>
            <Controller
              name="settlementMessage"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  className="w-full border-2 rounded-xl px-4 py-3 text-sm border-gray-200 focus:border-green-500 focus:outline-none transition-colors"
                  placeholder="e.g. Offering 30% refund or revised delivery"
                />
              )}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Supporting Evidence (Optional)
            </label>
            <div className="flex gap-2 flex-wrap">
              {filesToShow.map((file, idx) => (
                <div key={idx} className="relative w-24 h-24">
                  <label className="w-full h-full border-2 border-dashed border-gray-200 rounded-xl flex items-center justify-center cursor-pointer overflow-hidden hover:border-green-300 transition-colors">
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
            {errors.files && (
              <p className="text-red-500 text-xs mt-1">
                {errors.files.message}
              </p>
            )}
          </div>

          <div className="flex gap-3 pt-8">
            <button
              type="button"
              onClick={() => setShowSettlementModal(false)}
              className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors"
            >
              Submit Response
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResponseDispute;
