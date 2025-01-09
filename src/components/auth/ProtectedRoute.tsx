import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { toast } = useToast();
  const { session, isLoading } = useAuth();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    let mounted = true;

    const checkAuth = async () => {
      try {
        const { data: { session: currentSession }, error } = await supabase.auth.getSession();
        
        if (!mounted) return;
        
        console.log("Current session status:", currentSession ? "Active" : "None");
        
        if (error) {
          console.error("Session check error:", error);
          toast({
            title: "Authentication Error",
            description: "Please try signing in again",
            variant: "destructive",
          });
          return;
        }

        if (!currentSession) {
          console.log("No active session found");
          toast({
            title: "Authentication required",
            description: "Please sign in to access this page",
            variant: "destructive",
          });
          return;
        }

        setIsCheckingAuth(false);
      } catch (error) {
        console.error("Auth check error:", error);
        if (mounted) {
          toast({
            title: "Authentication Error",
            description: "Please try signing in again",
            variant: "destructive",
          });
        }
      }
    };

    if (!isLoading) {
      checkAuth();
    }

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (mounted) {
        console.log("Auth state changed:", event);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [toast, isLoading]);

  if (isLoading || isCheckingAuth) {
    return null;
  }

  return session ? <>{children}</> : null;
};