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
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { CheckCircle } from "lucide-react";
import { useState } from "react";

export const SignUpForm = () => {
  const {
    formData,
    isLoading,
    waitTime,
    isSuccess,
    handleChange,
    handleSubmit,
  } = useSignUp();

  const [isPasswordValid, setIsPasswordValid] = useState(false);

  return (
    <>
      <Dialog open={isSuccess}>
        <DialogContent className="sm:max-w-md">
          <div className="flex flex-col items-center justify-center space-y-4 py-8">
            <CheckCircle className="h-16 w-16 text-green-500" />
            <div className="text-center space-y-2">
              <h3 className="font-semibold text-2xl">Thank You!</h3>
              <p className="text-gray-600">
                Your registration was successful. Please check your email to verify your account.
              </p>
              <p className="text-sm text-gray-500">
                You can close this window now.
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <AuthCard 
        title="Register for Free"
        subtitle="Hundreds of agricultural businesses are already using cropio.app to trade their products."
      >
        <div className="space-y-4">
          <div className="md:hidden">
            <GoogleSignInButton />
            <AuthDivider />
          </div>

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
              onValidationChange={setIsPasswordValid}
            />

            {isPasswordValid && (
              <ConfirmPasswordInput
                confirmPassword={formData.confirmPassword}
                onChange={handleChange}
              />
            )}

            <SignUpButton isLoading={isLoading || waitTime !== null} />

            <div className="hidden md:block">
              <AuthDivider />
              <GoogleSignInButton />
            </div>
          </form>
        </div>
      </AuthCard>
    </>
  );
};