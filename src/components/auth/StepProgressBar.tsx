import React from "react";

interface StepProgressBarProps {
  currentStep: number;
}

const StepProgressBar = ({ currentStep }: StepProgressBarProps) => {
  return (
    <div className="flex gap-4 mb-8">
      {[1, 2, 3].map((step) => (
        <div
          key={step}
          className={`
            flex-1 h-1.5 rounded-full transition-all duration-300
            ${step <= currentStep 
              ? 'bg-[#008060] md:bg-[#008060]' // Desktop Farbe
              : 'bg-[#E5E7EB]'
            }
            ${step <= currentStep 
              ? 'max-md:bg-[#004d3a]' // Mobile Farbe (unter 768px)
              : ''
            }
          `}
        />
      ))}
    </div>
  );
};

export default StepProgressBar;