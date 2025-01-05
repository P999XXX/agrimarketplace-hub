import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface SignUpButtonProps {
  isLoading: boolean;
}

export const SignUpButton = ({ isLoading }: SignUpButtonProps) => {
  return (
    <Button disabled={isLoading} type="submit" className="w-full">
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Please wait...
        </>
      ) : (
        "Sign up"
      )}
    </Button>
  );
};