interface StepProgressBarProps {
  currentStep: number;
}

const StepProgressBar = ({ currentStep }: StepProgressBarProps) => {
  return (
    <div className="flex gap-2 sm:gap-4 mb-8 px-4 sm:px-0">
      {[1, 2, 3].map((step) => (
        <div
          key={step}
          className="flex-1 h-1 sm:h-1.5 rounded-full transition-all duration-300"
          style={{
            background: step <= currentStep ? '#008060' : '#E5E7EB',
          }}
        />
      ))}
    </div>
  );
};

export default StepProgressBar;