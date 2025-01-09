import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useNavigate, useLocation } from 'react-router-dom';

interface AuthContextType {
  session: Session | null;
  user: User | null;
  isLoading: boolean;
  error: Error | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const PUBLIC_ROUTES = ['/signin', '/signup', '/reset-password'];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let mounted = true;

    async function getInitialSession() {
      try {
        setIsLoading(true);
        const { data: { session: initialSession }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          if (sessionError.message.includes('session_not_found')) {
            if (!PUBLIC_ROUTES.includes(location.pathname)) {
              navigate('/signin');
            }
            return;
          }
          throw sessionError;
        }

        if (mounted) {
          if (initialSession) {
            setSession(initialSession);
            setUser(initialSession.user);
          } else if (!PUBLIC_ROUTES.includes(location.pathname)) {
            navigate('/signin');
          }
        }
      } catch (error) {
        console.error('Initial session error:', error);
        if (mounted) {
          setError(error as Error);
          toast({
            title: "Authentication Error",
            description: "Please sign in again",
            variant: "destructive",
          });
          if (!PUBLIC_ROUTES.includes(location.pathname)) {
            navigate('/signin');
          }
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    }

    getInitialSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, currentSession) => {
      if (mounted) {
        if (currentSession) {
          setSession(currentSession);
          setUser(currentSession.user);
          setError(null);
        } else {
          setSession(null);
          setUser(null);
          if (!PUBLIC_ROUTES.includes(location.pathname)) {
            navigate('/signin');
          }
        }
        setIsLoading(false);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [navigate, toast, location.pathname]);

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