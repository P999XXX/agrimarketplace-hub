import { useIsMobile } from "@/hooks/use-mobile";

const StepProgressBar = ({ currentStep }: { currentStep: number }) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="flex gap-4 mb-8">
      {[1, 2, 3].map((step) => (
        <div
          key={step}
          className="flex-1 h-1.5 rounded-full transition-all duration-300"
          style={{
            background: step <= currentStep 
              ? (isMobile ? '#008060' : '#F97316') // Dunkelgrün in Mobile, Orange in Desktop
              : '#E5E7EB',
          }}
        />
      ))}
    </div>
  );
};

export default StepProgressBar;