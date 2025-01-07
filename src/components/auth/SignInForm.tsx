import { useState } from "react";
import { useSignIn } from "@/hooks/useSignIn";
import { AuthCard } from "./AuthCard";
import { EmailField } from "./EmailField";
import { PasswordInput } from "./PasswordInput";
import { Button } from "@/components/ui/button";
import { GoogleSignInButton } from "./GoogleSignInButton";
import { AuthDivider } from "./AuthDivider";
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";

export const SignInForm = () => {
  const { formData, isLoading, handleChange, handleSubmit } = useSignIn();
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  return (
    <AuthCard 
      title="Welcome Back"
      subtitle="Sign in to your account to continue trading agricultural products."
    >
      <div className="min-h-[calc(100vh-16rem)] md:min-h-0 flex flex-col">
        <form 
          onSubmit={handleSubmit}
          className="flex flex-col flex-grow relative space-y-6"
        >
          <div className="md:h-auto max-md:flex-grow max-md:overflow-y-auto max-md:min-h-0 space-y-6 animate-fade">
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
            <div className="flex justify-end">
              <Link to="/forgot-password" className="text-sm text-white/70 md:text-primary hover:underline">
                Forgot password?
              </Link>
            </div>
            <Button 
              disabled={isLoading || !isPasswordValid} 
              type="submit"
              className="w-full py-6"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
            <AuthDivider />
            <GoogleSignInButton isSignUp={false} />
            <div className="text-center">
              <p className="text-white/70 md:text-gray-500">
                Don't have an account yet?{" "}
                <Link to="/signup" className="text-white md:text-primary hover:underline font-medium">
                  Sign up for free
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </AuthCard>
  );
};