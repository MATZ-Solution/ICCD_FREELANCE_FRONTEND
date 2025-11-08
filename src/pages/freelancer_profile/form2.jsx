
import * as Yup from "yup";
import { useEffect } from "react";
import { useDispatch, useSelector, } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { setUserProfile } from "../../../redux/slices/userProfileSlice";
import { fileToBase64 } from "../../../functions/base64FileConversion";
import ProgressBar from "../../component/freelancer_profile/ProgressBar";
// ✅ Validation Schema
const validationSchema = Yup.object({
    portfolio_link: Yup.string().required("Portfolio link is required"),
    portfolio_files: Yup.mixed()
        .test("required", "At least one file is required", (value) => value && value.length > 0)
        .test("maxFiles", "You can upload up to 3 files", (value) => !value || value.length <= 3)
        .test("fileSize", "Each file must be less than 5MB", (value) =>
            value ? value.every((file) => file.size <= 5 * 1024 * 1024) : true
        )
        .test(
            "fileType",
            "Only images (.png, .jpg) or .docx files are allowed",
            (value) =>
                value &&
                value.every((file) =>
                    [
                        "image/jpeg",
                        "image/png",
                        "image/gif",
                        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                    ].includes(file.type)
                )
        ),
});

export default function Portfolio() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userProfile = useSelector(state => state.userProfile.userProfile)

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: {
            portfolio_link: "",
            portfolio_files: [],
        },
    });

    const onSubmit = async (data) => {
        try {
            // Convert files to base64
            const base64Files = await Promise.all(
                data.portfolio_files.map(async (file) => ({
                    name: file.name,
                    type: file.type,
                    base64: await fileToBase64(file),
                }))
            );

            dispatch(
                setUserProfile({
                    ...data,
                    portfolio_files: base64Files,
                })
            );

            console.log("✅ Form submitted successfully:", {
                ...data,
                files: base64Files,
            });

            navigate("/freelancer/profile-form/3");
        } catch (error) {
            console.error("❌ Error in onSubmit:", error);
        }
    };

    // Log validation errors
    useEffect(() => {
        if (Object.keys(errors).length > 0) {
            console.warn("⚠️ Validation Errors Detected:", errors);
        }
    }, [errors]);

    return (
        <div className="max-w-6xl mx-auto p-5">
            <ProgressBar currentStep={2}/>
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between md:items-center mb-8">
                <div>
                    <h2 className="text-2xl font-bold mb-3">Portfolio</h2>
                    <p className="text-gray-600 whitespace-pre-wrap mb-6">
                        Tell us a bit about yourself. This information will appear on your
                        public profile, so potential buyers can get to know you better.
                    </p>
                </div>
                <p className="text-[#01AEAD] text-lg italic font-semibold md:self-end">
                    * Mandatory fields
                </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

                {/* Portfolio URL */}
                <div className="grid grid-cols-2 items-start">
                    <div>
                        <label className="block font-semibold text-lg mb-2">
                            Portfolio URL *
                        </label>
                        <p className="text-sm text-gray-600">
                            E.g., Behance, GitHub, LinkedIn
                        </p>
                    </div>
                    <div>
                        <Controller
                            name="portfolio_link"
                            control={control}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    type="text"
                                    placeholder="Portfolio Link"
                                    className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                />
                            )}
                        />
                        {errors.portfolio_link && (
                            <p className="text-red-500 text-sm mt-2">
                                {errors.portfolio_link.message}
                            </p>
                        )}
                    </div>
                </div>

                {/* Upload Work Samples */}
                <div className="grid grid-cols-2 gap-8 items-start">
                    <div>
                        <label className="block font-semibold text-lg mb-2">
                            Upload Work Samples *
                        </label>
                        <p className="text-sm text-gray-600">
                            Add up to 3 images or .docx files to showcase your work.
                        </p>
                    </div>

                    <div>
                        <Controller
                            name="portfolio_files"
                            control={control}
                            render={({ field: { value = [], onChange } }) => {
                                const handleFileChange = (e) => {
                                    const newFiles = Array.from(e.target.files);
                                    const updatedFiles = [...value, ...newFiles].slice(0, 3);
                                    onChange(updatedFiles);
                                    e.target.value = ""; // ✅ clear file input
                                };

                                const handleRemove = (index) => {
                                    const remaining = value.filter((_, i) => i !== index);
                                    onChange(remaining);
                                };

                                return (
                                    <>
                                        <input
                                            type="file"
                                            multiple
                                            onChange={handleFileChange}
                                            className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 
                                            file:font-semibold file:bg-cyan-50 file:text-cyan-700 
                                            hover:file:bg-cyan-100"
                                        />

                                        {/* Show uploaded files */}
                                        <ul className="mt-3 text-sm text-gray-700 space-y-1">
                                            {value.map((file, index) => (
                                                <li
                                                    key={index}
                                                    className="flex items-center justify-between border p-2 rounded"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        {file.type.startsWith("image/") && (
                                                            <img
                                                                src={URL.createObjectURL(file)}
                                                                alt="Preview"
                                                                className="w-12 h-12 object-cover rounded"
                                                            />
                                                        )}
                                                        <span className="truncate">{file.name}</span>
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={() => handleRemove(index)}
                                                        className="text-red-500 hover:underline text-xs"
                                                    >
                                                        Remove
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>

                                        {errors.files && (
                                            <p className="text-red-500 text-sm mt-2">
                                                {errors.files.message}
                                            </p>
                                        )}
                                    </>
                                );
                            }}
                        />
                    </div>
                </div>

                {/* Submit */}
                <div className="">
                    <button
                        type="submit"
                        className="px-8 py-3 bg-slate-800 text-white rounded-full hover:bg-slate-900 transition-colors"
                    >
                        Continue →
                    </button>
                </div>
            </form>
        </div>
    );
}
