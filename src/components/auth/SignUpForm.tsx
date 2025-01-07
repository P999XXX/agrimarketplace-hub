import { useState } from "react";
import { useSignUp } from "@/hooks/useSignUp";
import { AuthCard } from "./AuthCard";
import { NameFields } from "./NameFields";
import { EmailField } from "./EmailField";
import { CompanyField } from "./CompanyField";
import { SignUpButton } from "./SignUpButton";
import { ConfirmPasswordInput } from "./ConfirmPasswordInput";
import { PasswordInput } from "./PasswordInput";
import { SignUpSuccessDialog } from "./SignUpSuccessDialog";
import { RoleSelection } from "./RoleSelection";
import { TermsAndPrivacy } from "./TermsAndPrivacy";
import StepProgressBar from "./StepProgressBar";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { GoogleSignInButton } from "./GoogleSignInButton";
import { AuthDivider } from "./AuthDivider";

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

  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return "Select Your Role";
      case 2:
        return "Tell Us About You";
      case 3:
        return "Create Your Account";
      default:
        return "";
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6 animate-fade">
            <h3 className="text-xl font-semibold text-white md:text-gray-900 mb-6">{getStepTitle()}</h3>
            <RoleSelection
              selectedRole={formData.userType}
              onRoleChange={handleRoleChange}
            />
            <AuthDivider />
            <GoogleSignInButton />
          </div>
        );
      case 2:
        return (
          <div className="space-y-4 animate-fade">
            <h3 className="text-xl font-semibold text-white md:text-gray-900 mb-6">{getStepTitle()}</h3>
            <CompanyField
              companyName={formData.companyName}
              onChange={handleChange}
            />
            <NameFields
              firstName={formData.firstName}
              lastName={formData.lastName}
              onChange={handleChange}
            />
          </div>
        );
      case 3:
        return (
          <div className="space-y-4 animate-fade">
            <h3 className="text-xl font-semibold text-white md:text-gray-900 mb-6">{getStepTitle()}</h3>
            <EmailField
              email={formData.email}
              onChange={handleChange}
            />
            <PasswordInput
              id="password"
              label="Password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              onValidationChange={setIsPasswordValid}
            />
            {isPasswordValid && (
              <ConfirmPasswordInput
                confirmPassword={formData.confirmPassword}
                onChange={handleChange}
              />
            )}
            <TermsAndPrivacy
              accepted={termsAccepted}
              onAcceptChange={setTermsAccepted}
            />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <SignUpSuccessDialog isOpen={isSuccess} />

      <AuthCard 
        title="Register for Free"
        subtitle="Hundreds of agricultural businesses are already using cropio.app to trade their products."
      >
        <div className="flex flex-col h-full">
          <div className="flex-grow">
            <div className="animate-fade mb-6">
              <StepProgressBar currentStep={currentStep} />
            </div>
            
            <form onSubmit={(e) => {
              e.preventDefault();
              if (currentStep === 3) {
                handleSubmit(e);
              } else {
                handleNext();
              }
            }} className="flex flex-col h-full">
              <div className="flex-grow">
                {renderStepContent()}
              </div>

              {currentStep > 1 && (
                <div className="flex justify-between mt-8 bg-white/5 backdrop-blur-sm md:bg-transparent md:backdrop-blur-none animate-fade sticky bottom-0 left-0 right-0 p-4 md:p-0">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleBack}
                    className="w-[120px] py-6 [&_svg]:!w-[1.2rem] [&_svg]:!h-[1.2rem]"
                  >
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    Back
                  </Button>
                  
                  {currentStep < 3 ? (
                    <Button
                      type="submit"
                      className="w-[120px] py-6 [&_svg]:!w-[1.2rem] [&_svg]:!h-[1.2rem]"
                      disabled={!canProceedToNextStep()}
                    >
                      Next
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  ) : (
                    <SignUpButton 
                      isLoading={isLoading || waitTime !== null} 
                      disabled={!canProceedToNextStep()}
                    />
                  )}
                </div>
              )}
            </form>
          </div>
        </div>
      </AuthCard>
    </>
  );
};