import { Controller } from "react-hook-form";
import { X } from "lucide-react";

const LanguagesForm = ({ form, onSubmit, addLanguage, removeLanguage }) => (
  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Current Languages</label>
      <div className="flex flex-wrap gap-2 mb-3">
        {form.watch("languages").map((lang, index) => (
          <span key={index} className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full flex items-center gap-2">
            {lang}
            <button type="button" onClick={() => removeLanguage(lang)} className="text-red-500 hover:text-red-700">
              <X className="w-3 h-3" />
            </button>
          </span>
        ))}
      </div>
    </div>
    <Controller
      name="newLanguage"
      control={form.control}
      render={({ field }) => (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Add New Language</label>
          <div className="flex gap-2">
            <input
              {...field}
              type="text"
              placeholder="Enter a language"
              className="flex-1 p-3 border border-gray-300 rounded-md"
            />
            <button
              type="button"
              onClick={() => addLanguage(field.value)}
              className="px-4 py-3 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
            >
              Add
            </button>
          </div>
        </div>
      )}
    />
    <button type="submit" className="w-full p-3 bg-[#5db7be] text-white rounded-md hover:bg-[#5db7be] transition-colors">
      Update Languages
    </button>
  </form>
);

export default LanguagesForm;