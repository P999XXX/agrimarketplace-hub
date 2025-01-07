import { useState } from "react";
import { Link } from "react-router-dom";
import { useSignIn } from "@/hooks/useSignIn";
import { AuthCard } from "./AuthCard";
import { EmailField } from "./EmailField";
import { PasswordInput } from "./PasswordInput";
import { SignInButton } from "./SignInButton";
import { GoogleSignInButton } from "./GoogleSignInButton";
import { AuthDivider } from "./AuthDivider";

export const SignInForm = () => {
  const { formData, isLoading, handleChange, handleSubmit } = useSignIn();
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  return (
    <AuthCard
      title="Welcome Back"
      subtitle="Sign in to your account to continue"
      variant="signin"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
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

        <div className="pt-2">
          <SignInButton isLoading={isLoading} disabled={!isPasswordValid} />
        </div>

        <AuthDivider />

        <GoogleSignInButton isSignUp={false} />

        <div className="text-center">
          <Link 
            to="/signup" 
            className="text-white/90 md:text-gray-600"
          >
            <span>Don't have an account? </span>
            <span className="hover:text-primary-mobile md:hover:text-primary transition-colors">Sign up here</span>
          </Link>
        </div>
      </form>
    </AuthCard>
  );
};