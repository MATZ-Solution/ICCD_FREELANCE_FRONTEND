import { Controller } from "react-hook-form";
import { ChevronDown } from "lucide-react";

const EducationForm = ({ form, onSubmit }) => (
  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
    <Controller
      name="country"
      control={form.control}
      render={({ field, fieldState: { error } }) => (
        <div>
          <div className="relative">
            <select
              {...field}
              className={`w-full p-3 border rounded-md appearance-none bg-white ${error ? "border-red-500" : "border-gray-300"}`}
            >
              <option value="">College/university country</option>
              <option value="Pakistan">Pakistan</option>
              <option value="United States">United States</option>
              <option value="United Kingdom">United Kingdom</option>
              <option value="Canada">Canada</option>
              <option value="Australia">Australia</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
          {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
        </div>
      )}
    />
    <Controller
      name="universityName"
      control={form.control}
      render={({ field, fieldState: { error } }) => (
        <div>
          <input
            {...field}
            type="text"
            placeholder="College/university name"
            className={`w-full p-3 border rounded-md ${error ? "border-red-500" : "border-gray-300"}`}
          />
          {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
        </div>
      )}
    />
    <div className="grid grid-cols-2 gap-3">
      <Controller
        name="degree"
        control={form.control}
        render={({ field, fieldState: { error } }) => (
          <div>
            <div className="relative">
              <select
                {...field}
                className={`w-full p-3 border rounded-md appearance-none bg-white ${error ? "border-red-500" : "border-gray-300"}`}
              >
                <option value="">Degree</option>
                <option value="B.Sc.">Bachelor's</option>
                <option value="M.Sc.">Master's</option>
                <option value="Ph.D.">PhD</option>
                <option value="Diploma">Diploma</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
            {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
          </div>
        )}
      />
      <Controller
        name="major"
        control={form.control}
        render={({ field, fieldState: { error } }) => (
          <div>
            <input
              {...field}
              type="text"
              placeholder="Major"
              className={`w-full p-3 border rounded-md ${error ? "border-red-500" : "border-gray-300"}`}
            />
            {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
          </div>
        )}
      />
    </div>
    <Controller
      name="graduationYear"
      control={form.control}
      render={({ field, fieldState: { error } }) => (
        <div>
          <div className="relative">
            <select
              {...field}
              className={`w-full p-3 border rounded-md appearance-none bg-white ${error ? "border-red-500" : "border-gray-300"}`}
            >
              <option value="">Year of graduation</option>
              {Array.from({ length: 10 }, (_, i) => {
                const year = new Date().getFullYear() + 1 - i;
                return (
                  <option key={year} value={year.toString()}>
                    {year}
                  </option>
                );
              })}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
          {error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
        </div>
      )}
    />
    <button type="submit" className="w-full p-3 bg-[#47AAB3] text-white rounded-md hover:bg-[#5db7be] transition-colors">
      Add Education
    </button>
  </form>
);

export default EducationForm;