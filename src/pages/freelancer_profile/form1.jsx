import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
// import { FiArrowRight, FiArrowLeft } from "react-icons/fi";

import PersonalInfoStep from './profile/personal-info-step';
import ProfessionalInfoStep from './profile/professional-info-step';
import AccountSecurityStep from './profile/AccountSecurityStep';

import {
    personalInfoSchema,
    professionalInfoSchema,
    accountSecuritySchema,
} from "./YupSchema";

const steps = [
    {
        label: "Personal Info",
        component: PersonalInfoStep,
        schema: personalInfoSchema,
        description:
            "Tell us a bit about yourself. This information will appear on your \n public profile, so that potential buyers can get to know you better.",
    },
    {
        label: "Professional Info",
        component: ProfessionalInfoStep,
        schema: professionalInfoSchema,
        description:
            "This is your time to shine. Let potential buyers know what you do \n best and how you gained your skills, certifications and experience.",
    },
    {
        label: "Account Security",
        component: AccountSecurityStep,
        schema: accountSecuritySchema,
        description:
            "Trust and safety is a big deal in our community. Please verify your \n email and phone number so that we can keep your account secured.",
    },
];

const MultiStepForm = () => {
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const currentStep = steps[currentStepIndex];
    const [completedSteps, setCompletedSteps] = useState([]);

    const methods = useForm({
        resolver: yupResolver(currentStep.schema),
        mode: "onTouched",
        defaultValues: {
            firstName: "",
            lastName: "",
            displayName: "",
            profilePicture: null,
            description: "",
            languages: [],
            occupation: "",
            skills: [],
            education: [],
            certifications: [],
            personalWebsite: "",
            phoneNumber: "",
        },
    });

    const {
        handleSubmit,
        trigger,
        formState: { errors },
    } = methods;

    const onSubmit = (data) => {
        trigger().then((isValid) => {
            if (isValid) {
                if (!completedSteps.includes(currentStepIndex)) {
                    setCompletedSteps((prev) => [...prev, currentStepIndex]);
                }
                if (currentStepIndex < steps.length - 1) {
                    setCurrentStepIndex((prev) => prev + 1);
                } else {
                    console.log("Form has been submitted successfully ", data);
                }
            }
        });
    };

    const handleBack = () => {
        if (currentStepIndex > 0) {
            setCurrentStepIndex((prev) => prev - 1);
        }
    };

    const StepComponent = currentStep.component;

    const completionPercentage = Math.round(
        ((currentStepIndex + 1) / steps.length) * 100
    );

    return (
        <FormProvider {...methods}>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8"
            >
                <hr className="border-gray-300 border-t mb-5 my-4" />

                {/* Step Navigation Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-6">
                    <div className="flex flex-wrap gap-4 sm:gap-6 flex-1">
                        {steps.map((step, index) => (
                            <div
                                key={index}
                                className="flex items-center flex-1 min-w-[160px] sm:min-w-0 cursor-pointer"
                                onClick={() => setCurrentStepIndex(index)}
                            >
                                {/* Step Number Circle */}
                                <div
                                    className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-white text-sm font-bold
                ${index === currentStepIndex
                                            ? "bg-green-500" // current step
                                            : completedSteps.includes(index)
                                                ? "bg-green-600" // completed step
                                                : "bg-gray-300" // upcoming step
                                        }`}
                                >
                                    {index + 1}
                                </div>

                                {/* Step Label */}
                                <div className="ml-2 mr-4 text-xs sm:text-sm font-medium text-gray-700 truncate">
                                    {step.label}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Completion Info */}
                    <div className="flex flex-col w-full sm:w-auto gap-2">
                        <div className="text-sm font-medium text-gray-700 whitespace-nowrap text-center sm:text-right">
                            Completion Rate: {completionPercentage}%
                        </div>
                        <div className="w-full bg-gray-200 h-2 rounded">
                            <div
                                className="bg-blue-600 h-2 rounded transition-all duration-500 ease-in-out"
                                style={{ width: `${completionPercentage}%` }}
                            ></div>
                        </div>
                    </div>
                </div>

                <hr className="border-gray-300 border-t mb-5 my-4" />

                <h2 className="text-3xl font-bold mb-4">{currentStep.label}</h2>

                <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
                    <p className="whitespace-pre-line flex-1">{currentStep.description}</p>
                    <h1 className="text-[#01AEAD] italic font-semibold whitespace-nowrap">
                        Mandatory fields*
                    </h1>
                </div>

                <hr className="border-gray-300 border-t mb-5 my-4" />

                <StepComponent
                    errors={errors}
                    setValue={methods.setValue}
                    watch={methods.watch}
                    register={methods.register}
                />

                <div className="flex flex-col sm:flex-row justify-between mt-8 gap-4">
                    <button
                        type="submit"
                        className="w-full sm:w-auto  bg-[#043A53] text-white px-4 py-2 rounded-3xl hover:bg-green-900 transition flex items-center justify-center gap-2"
                    >
                        {/* {currentStepIndex < steps.length - 1 ? (
    <>
      Continue <FiArrowRight />
    </>
  ) : (
    "Submit"
  )} */}
                    </button>

                    {/* {currentStepIndex > 0 ? (
  <button
    type="button"
    onClick={handleBack}
    className="w-full sm:w-auto bg-gray-300 text-gray-700 px-4 py-2 rounded-3xl hover:bg-gray-400 transition flex items-center justify-center gap-2"
  >
    <FiArrowLeft /> Back
  </button>
) : (
  <div className="w-full sm:w-auto"></div> // empty for alignment
)} */}


                </div>

            </form>
        </FormProvider>
    );
};

export default MultiStepForm;