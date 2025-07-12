import { Controller } from "react-hook-form";

const AboutForm = ({ form, onSubmit }) => (
  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
    <Controller
      name="about_tagline"
      control={form.control}
      render={({ field, fieldState: { error } }) => (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tagline</label>
          <input
            {...field}
            type="text"
            placeholder="Enter your professional tagline"
            className={`w-full p-3 border rounded-md ${error ? "border-red-500" : "border-gray-300"}`}
          />
          {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
        </div>
      )}
    />
    <Controller
      name="about_description"
      control={form.control}
      render={({ field, fieldState: { error } }) => (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            {...field}
            rows={6}
            placeholder="Tell us about yourself, your experience, and what you do..."
            className={`w-full p-3 border rounded-md resize-none ${error ? "border-red-500" : "border-gray-300"}`}
          />
          {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
        </div>
      )}
    />
    <button type="submit" className="w-full p-3 bg-[#47AAB3] text-white rounded-md hover:bg-[#5db7be] transition-colors">
      Update About Section
    </button>
  </form>
);

export default AboutForm;