import React from "react";
import { Link } from "react-router-dom";

export default function ProgressBar({ currentStep }) {
  // Step array with name + link
  const steps = [
    { name: "Personal Info", link: "/freelancer/profile-form/1" },
    { name: "Portfolio & Work Samples", link: "/freelancer/profile-form/2" },
    { name: "Professional Info", link: "/freelancer/profile-form/3" },
  ];

  const completionRate = Math.round((currentStep / steps.length) * 100);

  return (
    <div className="mb-8">
      <div className="bg-gray-300 my-6 h-px w-full"></div>

      {/* Steps */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0 md:space-x-3 mb-5">
        <div className="flex flex-wrap items-center gap-3">
          {steps.map((step, index) => {
            const stepNumber = index + 1;
            const isActive = stepNumber === currentStep;
            const isCompleted = stepNumber < currentStep;

            return (
              <div key={stepNumber} className="flex items-center gap-1">
                {/* Step Circle */}
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors
                    ${isActive || isCompleted
                      ? "bg-[#01AEAD] text-white"
                      : "border border-gray-300 bg-white text-gray-400"
                    }`}
                >
                  {stepNumber}
                </div>

                {/* Step Label (Clickable if active or completed) */}
                {isActive || isCompleted ? (
                  <Link
                    to={step.link}
                    className="text-[#01AEAD] font-medium hover:underline"
                  >
                    {step.name}
                  </Link>
                ) : (
                  <span className="text-gray-600">{step.name}</span>
                )}
              </div>
            );
          })}
        </div>

        {/* Progress Bar */}
        <div className="w-full md:w-auto">
          <div className="text-gray-500 text-sm md:text-base mb-2 md:mb-0">
            Completion Rate: {completionRate}%
          </div>
          <div className="h-2 w-full bg-gray-200 rounded overflow-hidden">
            <div
              className="h-full bg-[#01AEAD] rounded transition-all duration-500 ease-in-out"
              style={{ width: `${completionRate}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="bg-gray-300 my-6 h-px w-full"></div>
    </div>
  );
}
