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

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <RoleSelection
            selectedRole={formData.userType}
            onRoleChange={(value) => handleChange({ target: { name: 'userType', value } } as any)}
          />
        );
      case 2:
        return (
          <div className="space-y-4">
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
          <div className="space-y-4">
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
        <div className="space-y-6">
          <StepProgressBar currentStep={currentStep} />
          
          <form onSubmit={(e) => {
            e.preventDefault();
            if (currentStep === 3) {
              handleSubmit(e);
            } else {
              handleNext();
            }
          }} className="space-y-6">
            {renderStepContent()}

            <div className="flex justify-between mt-8">
              {currentStep > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleBack}
                  className="w-[120px]"
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              )}
              
              {currentStep < 3 ? (
                <Button
                  type="submit"
                  className="w-[120px] ml-auto"
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
          </form>
        </div>
      </AuthCard>
    </>
  );
};