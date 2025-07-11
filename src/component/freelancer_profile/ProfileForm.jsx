import { Controller } from "react-hook-form";

const ProfileForm = ({ form, onSubmit }) => (
  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
    <Controller
      name="name"
      control={form.control}
      render={({ field, fieldState: { error } }) => (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input
            {...field}
            type="text"
            placeholder="Enter your full name"
            className={`w-full p-3 border rounded-md ${error ? "border-red-500" : "border-gray-300"}`}
          />
          {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
        </div>
      )}
    />
    <Controller
      name="username"
      control={form.control}
      render={({ field, fieldState: { error } }) => (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
          <input
            {...field}
            type="text"
            placeholder="Enter your username"
            className={`w-full p-3 border rounded-md ${error ? "border-red-500" : "border-gray-300"}`}
          />
          {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
        </div>
      )}
    />
    <button type="submit" className="w-full p-3 bg-[#47AAB3] text-white rounded-md hover:bg-[#5db7be] transition-colors">
      Update Profile
    </button>
  </form>
);

export default ProfileForm;