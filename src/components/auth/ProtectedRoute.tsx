import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { session, isLoading, error } = useAuth();

  useEffect(() => {
    if (!isLoading && !session) {
      toast({
        title: "Authentication required",
        description: "Please sign in to access this page",
        variant: "destructive",
      });
      navigate("/signin");
    }
  }, [session, isLoading, navigate, toast]);

  if (isLoading) {
    return null;
  }

  if (error) {
    toast({
      title: "Authentication Error",
      description: "Please try signing in again",
      variant: "destructive",
    });
    navigate("/signin");
    return null;
  }

  return session ? <>{children}</> : null;
};