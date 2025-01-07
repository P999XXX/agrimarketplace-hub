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
          className="flex-1 h-1.5 rounded-full transition-all duration-300"
          style={{
            background: step <= currentStep 
              ? 'var(--primary-color, #008060)' // Desktop default
              : '#E5E7EB',
            ['@media (max-width: 768px)']: {
              background: step <= currentStep 
                ? '#004d3a' // Dunkleres Grün im Mobile View
                : '#E5E7EB',
            }
          }}
        />
      ))}
    </div>
  );
};

export default StepProgressBar;