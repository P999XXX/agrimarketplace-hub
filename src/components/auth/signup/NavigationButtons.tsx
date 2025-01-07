import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { SignUpButton } from "../SignUpButton";

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
  return (
    <div className="mt-8 max-md:fixed max-md:bottom-0 max-md:left-0 max-md:right-0 max-md:bg-white/5 max-md:backdrop-blur-sm max-md:p-4 animate-fade">
      <div className="flex justify-between max-w-[calc(100vw-2rem)] mx-auto">
        <Button
          type="button"
          variant="outline"
          onClick={handleBack}
          className="w-[120px] py-6 [&_svg]:!w-[1.2rem] [&_svg]:!h-[1.2rem] md:bg-white max-md:bg-transparent max-md:text-white max-md:text-opacity-50 max-md:hover:text-opacity-100 max-md:border-0 max-md:hover:bg-[rgb(0,77,58)] max-md:hover:bg-opacity-50 max-md:hover:text-white"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Back
        </Button>
        
        {currentStep < 3 ? (
          <Button
            type="submit"
            className="w-[120px] py-6 [&_svg]:!w-[1.2rem] [&_svg]:!h-[1.2rem]"
            disabled={!canProceedToNextStep}
          >
            Next
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        ) : (
          <SignUpButton 
            isLoading={isLoading || waitTime !== null} 
            disabled={!canProceedToNextStep}
          />
        )}
      </div>
    </div>
  );
};