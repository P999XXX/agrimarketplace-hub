import { Button } from "@/components/ui/button";

interface SignUpButtonProps {
  isLoading: boolean;
}

export const SignUpButton = ({ isLoading }: SignUpButtonProps) => {
  return (
    <Button 
      type="submit" 
      className="w-full bg-brand-500 hover:bg-brand-600"
      disabled={isLoading}
    >
      {isLoading ? "Signing up..." : "Sign Up"}
    </Button>
  );
};