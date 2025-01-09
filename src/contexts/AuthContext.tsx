import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  session: Session | null;
  user: User | null;
  isLoading: boolean;
  error: Error | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;

    async function getInitialSession() {
      try {
        setIsLoading(true);
        const { data: { session: initialSession }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error('Session error:', sessionError);
          throw sessionError;
        }
        
        if (mounted) {
          if (initialSession) {
            setSession(initialSession);
            setUser(initialSession.user);
          } else {
            // Wenn keine Sitzung gefunden wurde und wir auf einer geschützten Route sind,
            // leiten wir zum Login um
            const protectedRoutes = ['/dashboard', '/dashboard/team-members', '/dashboard/certificates'];
            if (protectedRoutes.some(route => window.location.pathname.startsWith(route))) {
              navigate('/signin');
              toast({
                title: "Session expired",
                description: "Please sign in again",
                variant: "destructive",
              });
            }
          }
        }
      } catch (error) {
        console.error('Initial session error:', error);
        if (mounted) {
          setError(error as Error);
          toast({
            title: "Authentication Error",
            description: "Failed to initialize session",
            variant: "destructive",
          });
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    }

    getInitialSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, currentSession) => {
      console.log('Auth state changed:', event, !!currentSession);
      
      if (mounted) {
        setSession(currentSession);
        setUser(currentSession?.user ?? null);
        setIsLoading(false);

        if (event === 'SIGNED_OUT') {
          navigate('/signin');
        } else if (event === 'SIGNED_IN' && currentSession) {
          // Optional: Navigiere zur Dashboard-Seite nach erfolgreichem Login
          navigate('/dashboard');
        }
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [navigate, toast]);

  return (
    <AuthContext.Provider value={{ session, user, isLoading, error }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}