import { Controller } from "react-hook-form";

const SkillsForm = ({ form, onSubmit }) => (
  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
    <Controller
      name="skillName"
      control={form.control}
      render={({ field, fieldState: { error } }) => (
        <div>
          <input
            {...field}
            type="text"
            placeholder="Enter a skill"
            className={`w-full p-3 border rounded-md ${error ? "border-red-500" : "border-gray-300"}`}
          />
          {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
        </div>
      )}
    />
    <Controller
      name="level"
      control={form.control}
      render={({ field, fieldState: { error } }) => (
        <div>
          <select
            {...field}
            className={`w-full p-3 border rounded-md ${error ? "border-red-500" : "border-gray-300"}`}
          >
            <option value="">Select level</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="expert">Expert</option>
          </select>
          {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
        </div>
      )}
    />
    <button type="submit" className="w-full p-3 bg-[#47AAB3] text-white rounded-md hover:bg-[#5db7be] transition-colors">
      Add Skill
    </button>
  </form>
);

export default SkillsForm;