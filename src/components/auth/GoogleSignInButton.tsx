import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface GoogleSignInButtonProps {
  isSignUp?: boolean;
}

export const GoogleSignInButton = ({ isSignUp = true }: GoogleSignInButtonProps) => {
  const { toast } = useToast();

  const handleGoogleSignIn = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/dashboard`,
          queryParams: {
            prompt: 'select_account',
            access_type: 'offline',
          },
        },
      });

      if (error) throw error;

      toast({
        title: "Redirecting",
        description: "Please wait while we redirect you to Google",
      });
    } catch (error: any) {
      console.error('Google Sign In Error:', error);
      toast({
        title: "Error",
        description: error.message || "Could not sign in with Google",
        variant: "destructive",
      });
    }
  };

  return (
    <Button
      type="button"
      variant="outline"
      className="w-full bg-white border-gray-200 text-gray-700 py-6 hover:bg-gray-50"
      onClick={handleGoogleSignIn}
    >
      <svg
        className="mr-2 h-5 w-5"
        aria-hidden="true"
        focusable="false"
        data-prefix="fab"
        data-icon="google"
        role="img"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 488 512"
      >
        <path
          fill="#4285F4"
          d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C315.9 106.2 285.4 88 248 88c-93.1 0-168.7 75.6-168.7 168 0 92.4 75.6 168 168.7 168 91.7 0 150.6-61.8 154.7-148h-154.7v-85.3h258.6c2.3 14.1 3.4 28.6 3.4 43.1z"
        />
      </svg>
      Sign Up with Google
    </Button>
  );
};