import { useState } from "react";
import { useSignUp } from "@/hooks/useSignUp";
import { AuthCard } from "./AuthCard";
import { SignUpSuccessDialog } from "./SignUpSuccessDialog";
import StepProgressBar from "./StepProgressBar";
import { StepContent } from "./signup/StepContent";
import { NavigationButtons } from "./signup/NavigationButtons";

export const SignUpForm = () => {
  const {
    formData,
    isLoading,
    waitTime,
    isSuccess,
    handleChange,
    handleSubmit,
  } = useSignUp();

  const [currentStep, setCurrentStep] = useState(1);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleRoleChange = (value: string) => {
    handleChange({ target: { name: 'userType', value } } as any);
    handleNext();
  };

  const canProceedToNextStep = () => {
    switch (currentStep) {
      case 1:
        return formData.userType !== "";
      case 2:
        return formData.companyName !== "" && formData.firstName !== "" && formData.lastName !== "";
      case 3:
        return formData.email !== "" && isPasswordValid && termsAccepted;
      default:
        return false;
    }
  };

  return (
    <>
      <SignUpSuccessDialog isOpen={isSuccess} />

      <AuthCard 
        title="Register for Free"
        subtitle="Hundreds of agricultural businesses are already using cropio.app to trade their products."
      >
        <div className="min-h-[calc(100vh-16rem)] md:min-h-0 flex flex-col">
          <div className="animate-fade">
            <StepProgressBar currentStep={currentStep} />
          </div>
          
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              if (currentStep === 3) {
                handleSubmit(e);
              } else {
                handleNext();
              }
            }} 
            className="flex flex-col flex-grow relative"
          >
            <div className="md:h-auto max-md:flex-grow max-md:overflow-y-auto max-md:min-h-0">
              <StepContent
                currentStep={currentStep}
                formData={formData}
                handleChange={handleChange}
                handleRoleChange={handleRoleChange}
                isPasswordValid={isPasswordValid}
                setIsPasswordValid={setIsPasswordValid}
                termsAccepted={termsAccepted}
                setTermsAccepted={setTermsAccepted}
              />
            </div>

            {currentStep > 1 && (
              <NavigationButtons
                currentStep={currentStep}
                handleBack={handleBack}
                canProceedToNextStep={canProceedToNextStep()}
                isLoading={isLoading}
                waitTime={waitTime}
              />
            )}
          </form>
        </div>
      </AuthCard>
    </>
  );
};