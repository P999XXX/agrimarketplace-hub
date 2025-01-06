const StepProgressBar = ({ currentStep }: { currentStep: number }) => {
  return (
    <div className="flex gap-4 mb-8">
      {[1, 2, 3].map((step) => (
        <div
          key={step}
          className="flex-1 h-2 rounded-full transition-all duration-300"
          style={{
            background: step <= currentStep ? 'var(--primary)' : '#E5E7EB',
          }}
        />
      ))}
    </div>
  );
};

export default StepProgressBar;