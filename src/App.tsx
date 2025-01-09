import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { ThemeProvider } from "@/hooks/use-theme";
import Index from "./pages/Index";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import ResetPassword from "./pages/ResetPassword";
import ThankYou from "./pages/ThankYou";
import Dashboard from "./pages/Dashboard";
import TeamMembers from "./pages/TeamMembers";
import Certificates from "./pages/Certificates";
import { useEffect, useState } from "react";
import { supabase } from "./integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchOnWindowFocus: true,
    },
  },
});

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Get initial session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) throw sessionError;
        
        setIsAuthenticated(!!session);

        // Set up auth state change listener
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
          console.log("Auth state changed:", event, !!session);
          
          switch (event) {
            case 'SIGNED_IN':
              setIsAuthenticated(true);
              toast({
                title: "Signed in successfully",
                description: "Welcome back!",
              });
              break;
            
            case 'SIGNED_OUT':
              setIsAuthenticated(false);
              queryClient.clear();
              toast({
                title: "Signed out",
                description: "You have been signed out of your account",
              });
              break;
            
            case 'TOKEN_REFRESHED':
              setIsAuthenticated(true);
              break;

            case 'INITIAL_SESSION':
              setIsAuthenticated(!!session);
              break;
          }
        });

        return () => {
          subscription.unsubscribe();
        };
      } catch (error) {
        console.error("Auth initialization error:", error);
        setIsAuthenticated(false);
        toast({
          title: "Authentication Error",
          description: "There was a problem with authentication. Please try signing in again.",
          variant: "destructive",
        });
      }
    };

    initializeAuth();
  }, [toast]);

  // Show loading state while checking authentication
  if (isAuthenticated === null) {
    return null;
  }

  return (
    <ThemeProvider defaultTheme="light" storageKey="cropio-theme">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/thank-you" element={<ThankYou />} />
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/dashboard/team-members" 
                element={
                  <ProtectedRoute>
                    <TeamMembers />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/dashboard/certificates" 
                element={
                  <ProtectedRoute>
                    <Certificates />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;