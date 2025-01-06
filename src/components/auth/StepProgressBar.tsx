import React from "react";

interface StepProgressBarProps {
  currentStep: number;
}

const StepProgressBar = ({ currentStep }: StepProgressBarProps) => {
  const steps = [1, 2, 3];

  return (
    <div className="w-full mb-8">
      <div className="flex justify-between">
        {steps.map((step) => (
          <div
            key={step}
            className={`flex-1 ${
              step !== steps.length ? "relative" : ""
            }`}
          >
            {/* Progress Line */}
            {step !== steps.length && (
              <div
                className={`absolute top-1/2 left-[calc(50%+16px)] right-[calc(50%-16px)] h-[2px] -translate-y-1/2 ${
                  currentStep > step ? "bg-brand-600" : "bg-gray-200"
                }`}
              />
            )}

            {/* Step Circle */}
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                  currentStep >= step
                    ? "border-brand-600 bg-brand-600 text-white"
                    : "border-gray-200 bg-white text-gray-400"
                }`}
              >
                {step}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepProgressBar;