import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface SignUpButtonProps {
  isLoading: boolean;
  disabled?: boolean;
}

export const SignUpButton = ({ isLoading, disabled }: SignUpButtonProps) => {
  return (
    <Button 
      disabled={isLoading || disabled} 
      type="submit" 
      className="w-[120px] ml-auto py-6 [&_svg]:!w-[1.2rem] [&_svg]:!h-[1.2rem]"
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Wait...
        </>
      ) : (
        "Sign Up"
      )}
    </Button>
  );
};