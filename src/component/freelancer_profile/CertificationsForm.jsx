import { Controller } from "react-hook-form";

const CertificationsForm = ({ form, onSubmit }) => (
  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
    <Controller
      name="name"
      control={form.control}
      render={({ field, fieldState: { error } }) => (
        <div>
          <input
            {...field}
            type="text"
            placeholder="Certification name"
            className={`w-full p-3 border rounded-md ${error ? "border-red-500" : "border-gray-300"}`}
          />
          {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
        </div>
      )}
    />
    <Controller
      name="organization"
      control={form.control}
      render={({ field, fieldState: { error } }) => (
        <div>
          <input
            {...field}
            type="text"
            placeholder="Issuing organization"
            className={`w-full p-3 border rounded-md ${error ? "border-red-500" : "border-gray-300"}`}
          />
          {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
        </div>
      )}
    />
    <Controller
      name="issueDate"
      control={form.control}
      render={({ field, fieldState: { error } }) => (
        <div>
          <input
            {...field}
            type="date"
            className={`w-full p-3 border rounded-md ${error ? "border-red-500" : "border-gray-300"}`}
          />
          {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
        </div>
      )}
    />
    <button type="submit" className="w-full p-3 bg-[#47AAB3] text-white rounded-md hover:bg-[#5db7be] transition-colors">
      Add Certification
    </button>
  </form>
);

export default CertificationsForm;