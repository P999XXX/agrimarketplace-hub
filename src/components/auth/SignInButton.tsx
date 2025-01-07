import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface SignInButtonProps {
  isLoading: boolean;
  disabled: boolean;
}

export const SignInButton = ({ isLoading, disabled }: SignInButtonProps) => {
  return (
    <Button 
      type="submit"
      className="w-full py-6"
      disabled={isLoading || disabled}
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
  );
};