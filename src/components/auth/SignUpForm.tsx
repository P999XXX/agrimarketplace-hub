import { useSignUp } from "@/hooks/useSignUp";
import { GoogleSignInButton } from "./GoogleSignInButton";
import { AuthCard } from "./AuthCard";
import { NameFields } from "./NameFields";
import { EmailField } from "./EmailField";
import { CompanyField } from "./CompanyField";
import { AuthDivider } from "./AuthDivider";
import { SignUpButton } from "./SignUpButton";
import { ConfirmPasswordInput } from "./ConfirmPasswordInput";
import { PasswordInput } from "./PasswordInput";
import { Check } from "lucide-react";

export const SignUpForm = () => {
  const {
    formData,
    isLoading,
    waitTime,
    isSuccess,
    handleChange,
    handleSubmit,
  } = useSignUp();

  return (
    <AuthCard 
      title={isSuccess ? "Registration Successful!" : "Register for Free"}
      subtitle={
        isSuccess 
          ? "Please check your email to verify your account."
          : "Hundreds of agricultural businesses are already using cropio.app to trade their products."
      }
    >
      {isSuccess ? (
        <div className="flex flex-col items-center justify-center space-y-4 py-8">
          <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
            <Check className="h-6 w-6 text-green-600" />
          </div>
          <div className="text-center space-y-2">
            <p className="text-gray-600">
              We've sent you an email with a verification link. Please click on it to complete your registration.
            </p>
            <p className="text-sm text-gray-500">
              You can close this window now.
            </p>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <CompanyField
            companyName={formData.companyName}
            onChange={handleChange}
          />

          <NameFields
            firstName={formData.firstName}
            lastName={formData.lastName}
            onChange={handleChange}
          />

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
          />

          <ConfirmPasswordInput
            confirmPassword={formData.confirmPassword}
            onChange={handleChange}
          />

          <SignUpButton isLoading={isLoading || waitTime !== null} />

          <AuthDivider />

          <GoogleSignInButton />
        </form>
      )}
    </AuthCard>
  );
};