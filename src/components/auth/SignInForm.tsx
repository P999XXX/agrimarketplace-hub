import { useState } from "react";
import { AuthCard } from "./AuthCard";
import { EmailField } from "./EmailField";
import { PasswordInput } from "./PasswordInput";
import { Button } from "@/components/ui/button";
import { GoogleSignInButton } from "./GoogleSignInButton";
import { AuthDivider } from "./AuthDivider";
import { Link } from "react-router-dom";
import { useSignIn } from "@/hooks/useSignIn";
import { LogIn, ArrowRight } from "lucide-react";

export const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { handleSignIn, isLoading } = useSignIn();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleSignIn(email, password);
  };

  return (
    <AuthCard
      title="Welcome Back"
      subtitle="Sign in to your account to continue"
    >
      <div className="space-y-6">
        <form onSubmit={onSubmit} className="space-y-4">
          <EmailField
            email={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <PasswordInput
            id="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
          <Button 
            type="submit"
            className="w-full py-6"
            disabled={isLoading}
          >
            {isLoading ? (
              "Signing in..."
            ) : (
              <>
                Sign In
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </form>

        <AuthDivider />
        
        <GoogleSignInButton isSignUp={false} />

        <div className="text-center mt-6">
          <Link 
            to="/signup" 
            className="inline-flex items-center text-white/90 md:text-gray-600 hover:text-primary transition-colors gap-2"
          >
            <LogIn className="w-4 h-4" />
            <span>Don't have an account? Sign up here</span>
          </Link>
        </div>
      </div>
    </AuthCard>
  );
};