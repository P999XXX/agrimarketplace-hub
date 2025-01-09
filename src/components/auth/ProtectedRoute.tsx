import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { session, isLoading } = useAuth();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session: currentSession }, error } = await supabase.auth.getSession();
        
        console.log("Current session status:", currentSession ? "Active" : "None");
        
        if (error) {
          console.error("Session check error:", error);
          toast({
            title: "Authentication Error",
            description: "Please sign in again",
            variant: "destructive",
          });
          navigate("/signin");
          return;
        }

        if (!currentSession) {
          console.log("No active session found, redirecting to signin");
          toast({
            title: "Authentication required",
            description: "Please sign in to access this page",
            variant: "destructive",
          });
          navigate("/signin");
          return;
        }

        setIsCheckingAuth(false);
      } catch (error) {
        console.error("Auth check error:", error);
        toast({
          title: "Authentication Error",
          description: "Please try signing in again",
          variant: "destructive",
        });
        navigate("/signin");
      }
    };

    if (!isLoading) {
      checkAuth();
    }

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      console.log("Auth state changed:", event);
      if (event === 'SIGNED_OUT') {
        navigate("/signin");
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, toast, isLoading]);

  if (isLoading || isCheckingAuth) {
    return null;
  }

  return session ? <>{children}</> : null;
};