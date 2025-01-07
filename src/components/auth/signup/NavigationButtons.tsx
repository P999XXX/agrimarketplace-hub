import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface NavigationButtonsProps {
  currentStep: number;
  handleBack: () => void;
  canProceedToNextStep: boolean;
  isLoading: boolean;
  waitTime: number | null;
}

export const NavigationButtons = ({
  currentStep,
  handleBack,
  canProceedToNextStep,
  isLoading,
  waitTime,
}: NavigationButtonsProps) => {
  const isLastStep = currentStep === 3;

  return (
    <div className="flex justify-between mt-6 md:mt-8">
      <Button
        type="button"
        variant="outline"
        onClick={handleBack}
        className="py-6"
      >
        Back
      </Button>
      <Button 
        type="submit"
        disabled={!canProceedToNextStep || isLoading || (isLastStep && waitTime !== null)} 
        className="w-[120px] py-6 [&_svg]:!w-[1.2rem] [&_svg]:!h-[1.2rem]"
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Wait...
          </>
        ) : waitTime !== null && isLastStep ? (
          `Wait ${waitTime}s`
        ) : (
          isLastStep ? "Sign Up" : "Next"
        )}
      </Button>
    </div>
  );
};