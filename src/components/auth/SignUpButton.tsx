import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface SignUpButtonProps {
  isLoading: boolean;
}

export const SignUpButton = ({ isLoading }: SignUpButtonProps) => {
  return (
    <Button 
      disabled={isLoading} 
      type="submit" 
      className="w-full bg-brand-500 hover:bg-brand-600 text-white py-6"
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please wait...
        </>
      ) : (
        "Start your free 30-day trial"
      )}
    </Button>
  );
};