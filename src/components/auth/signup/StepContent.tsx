import { RoleSelection } from "../RoleSelection";
import { CompanyField } from "../CompanyField";
import { NameFields } from "../NameFields";
import { EmailField } from "../EmailField";
import { PasswordInput } from "../PasswordInput";
import { ConfirmPasswordInput } from "../ConfirmPasswordInput";
import { TermsAndPrivacy } from "../TermsAndPrivacy";
import { GoogleSignInButton } from "../GoogleSignInButton";
import { AuthDivider } from "../AuthDivider";
import { AlreadyRegistered } from "../AlreadyRegistered";

interface StepContentProps {
  currentStep: number;
  formData: any;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleRoleChange: (value: string) => void;
  isPasswordValid: boolean;
  setIsPasswordValid: (valid: boolean) => void;
  termsAccepted: boolean;
  setTermsAccepted: (accepted: boolean) => void;
}

export const StepContent = ({
  currentStep,
  formData,
  handleChange,
  handleRoleChange,
  isPasswordValid,
  setIsPasswordValid,
  termsAccepted,
  setTermsAccepted,
}: StepContentProps) => {
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
          <AlreadyRegistered />
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