import { useDispatch, useSelector } from "react-redux";
import { setUserProfile } from "../../../redux/slices/userProfileSlice";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useState } from "react";

const LanguagesForm = () => {
  const dispatch = useDispatch()
  const profileDetails = useSelector(state => state.userProfile.userProfile)
  console.log("language section profileDetails: ", profileDetails)

  const [languages, setLanguages] = useState([]);

  const schema = yup.object({
    language: yup.string(),
    level: yup.string()

    // You can validate array if needed
  });

  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      language: '',
      level: ''
    }
  });

  const addLanguage = (data) => {
    const newLang = {
      skill: data.language,
      level: data.level
    };
    dispatch(setUserProfile({ languages: [...profileDetails.languages, newLang] }))
    reset();
  };

  const removeLanguage = (data) => {
    // setLanguages(languages.filter(item => item !== lang));

    let removeLang = profileDetails.languages.filter(item => item.language !== data.language)
    if (removeLang.length === 0) {
      console.log("1")
      dispatch(setUserProfile({ languages: [] }))
    } else {
      dispatch(setUserProfile({ languages: removeLang }))
    }
  };

  const onSubmit = (data) => {
    const newLang = {
      language: data.language,
      level: data.level
    };
    dispatch(setUserProfile({ languages: [...profileDetails.languages, newLang] }))
    reset();
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">Current Languages</label>

      <div className="flex flex-wrap gap-2 mb-3">
        {profileDetails.languages.length > 0 && (profileDetails.languages.map((lang, index) => (
          <span key={index} className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full flex items-center gap-2">
            {lang.language}
            <button type="button" onClick={() => removeLanguage(lang)} className="text-red-500 hover:text-red-700">
              ×
            </button>
          </span>
        )))
        }
      </div>

      <Controller
        control={control}
        name="language"
        render={({ field: { onChange, value } }) => (
          <div className="flex gap-2">
            <input
              type="text"
              value={value}
              onChange={onChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter language"
            />
            {/* <button
              type="button"
              onClick={() => {
                addLanguage(value);
                onChange(''); // clear input
              }}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Add
            </button> */}
          </div>
        )}
      />

      <Controller
        name="level"
        control={control}
        render={({ field }) => (
          <select
            {...field}
            className={`w-full p-3 border rounded-md ${errors.level ? "border-red-500" : "border-gray-300"}`}
          >
            <option value="">Select level</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="expert">Expert</option>
          </select>
        )}
      />

      <button
        onClick={handleSubmit(onSubmit)}
        className="w-full p-3 bg-[#5db7be] text-white rounded-md hover:bg-[#5db7be] transition-colors"
      >
        Update Languages
      </button>
    </div>
  );
};

export default LanguagesForm;
