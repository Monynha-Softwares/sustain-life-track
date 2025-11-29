import React, { useState, useEffect, createContext, useContext } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate, useLocation } from 'react-router-dom';
import { Toaster, toast } from 'sonner';

interface SessionContextType {
  session: Session | null;
  user: User | null;
  isLoading: boolean;
}

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const SessionContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        if (currentSession) {
          setSession(currentSession);
          setUser(currentSession.user);
          // If authenticated user is on login, home, or demo, redirect to app
          if (event === 'SIGNED_IN' || event === 'INITIAL_SESSION') {
            if (location.pathname === '/login' || location.pathname === '/' || location.pathname.startsWith('/demo')) {
              navigate('/app');
            }
            toast.success('Welcome back!', { description: 'You have successfully logged in.' });
          }
        } else {
          setSession(null);
          setUser(null);
          if (event === 'SIGNED_OUT') {
            // If signed out and not on home or demo, redirect to login
            if (location.pathname !== '/' && !location.pathname.startsWith('/demo')) {
              navigate('/login');
            }
            toast.info('Logged out', { description: 'You have been signed out.' });
          }
        }
        setIsLoading(false);
      }
    );

    // Initial session check
    supabase.auth.getSession().then(({ data: { session: initialSession } }) => {
      setSession(initialSession);
      setUser(initialSession?.user || null);
      setIsLoading(false);
      
      const isHomePath = location.pathname === '/';
      const isDemoPath = location.pathname.startsWith('/demo');
      const isLoginPath = location.pathname === '/login';

      if (!initialSession) {
        // If unauthenticated, allow access to home and demo, otherwise redirect to login
        if (!isHomePath && !isDemoPath && !isLoginPath) {
          navigate('/login');
        }
      } else {
        // If authenticated, and on home, login, or demo, redirect to app
        if (isHomePath || isLoginPath || isDemoPath) {
          navigate('/app');
        }
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [navigate, location.pathname]);

  return (
    <SessionContext.Provider value={{ session, user, isLoading }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error('useSession must be used within a SessionContextProvider');
  }
  return context;
};