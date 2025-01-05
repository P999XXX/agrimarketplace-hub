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

export const SignUpForm = () => {
  const {
    formData,
    isLoading,
    waitTime,
    handleChange,
    handleSubmit,
  } = useSignUp();

  return (
    <AuthCard 
      title="Register for Free"
      subtitle="Hundreds of agricultural businesses are already using cropio.app to trade their products."
    >
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
    </AuthCard>
  );
};